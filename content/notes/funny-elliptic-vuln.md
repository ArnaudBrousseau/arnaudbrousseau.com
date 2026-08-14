---
title: "What's \"funny\"? Filling the missing piece of a critical elliptic vuln"
date: 2026-08-14T09:03:56-05:00
draft: false
---

<script> MathJax = { loader: { load: ['input/asciimath', 'output/chtml'] } }; </script>
<script type="text/javascript" src="/js/mathjax/tex-chtml.js" id="MathJax-script" async></script>

## TL;DR

The [GHSA-vjh7-7g9h-fjfh](https://github.com/indutny/elliptic/security/advisories/GHSA-vjh7-7g9h-fjfh) advisory for [`elliptic`](https://github.com/indutny/elliptic) suggests that for any previously signed message, an attacker can construct a second message that forces nonce reuse and enables ECDSA private key recovery.

Below I'm investigating this claim by reverse-engineering the `funny` function included in the GHSA "full attack" snippet, which constructs this second message.

The trick turns out to be related to sign symmetry in BN serialization (it's the root cause of the vuln, see [the patch](https://github.com/indutny/elliptic/commit/04cb6f54ce552b3ebde6be06d6050419e1c7333e)). However, constructing a second message to trigger a nonce reuse requires more than that: `truncateToN`, an internal function, needs to be reversed. For a standard 256-bit digest I'll show that a second message exists only for a subset of digests: 1-in-16 digests for secp256k1, and 1-in-8 digests for ed25519. Goes without saying: still very bad. Please upgrade `elliptic` if you haven't, it's been well over a year!

## What is this GHSA about

In February 2025, the [`elliptic`](https://github.com/indutny/elliptic) package disclosed a critical vulnerability related to nonce generation during signing: [GHSA-vjh7-7g9h-fjfh](https://github.com/indutny/elliptic/security/advisories/GHSA-vjh7-7g9h-fjfh). The advisory describes a bug which leads to two distinct messages sharing the same nonce. This "k reuse" enables private key recovery with simple algebra: from two signatures sharing the same nonce, it's trivial to recover the private key. ECDSA signatures are produced with the following:

\`s = k^{-1}(z + rd) mod n\`

where:
* z = message hash
* d = private key
* k = nonce
* r = x coordinate of kG

If two messages \`z_1\` and \`z_2\` are signed with the same nonce k, they share the same r value and satisfy:

\`s_1 = k^{-1}(z_1 + rd)\` and \`s_2 = k^{-1}(z_2 + rd)\`

Subtracting the two equations gives:

\`s_1 - s_2 = k^{-1}(z_1 - z_2)\`

Hence we can compute k, assuming \`(s_1 - s_2)\` is invertible modulo n:

\`k = (z_1 - z_2)/(s_1 - s_2) mod n\`

And then we can compute the private key:

\`d = (s_1 k - z_1)/r mod n\`

Thus a single nonce reuse leaks the private key; game over 💀

## A `funny` hook

The [GHSA advisory](https://github.com/indutny/elliptic/security/advisories/GHSA-vjh7-7g9h-fjfh) states that _"a message can be constructed for any already known message/signature pair, meaning that the attack needs only a single malicious message being signed for a full key extraction"_.

In other words, given historical signatures, an attacker can compute a malicious message which, if signed, will lead to nonce reuse and private key recovery. Crazy. In the advisory details there is abridged code for a "full attack". The `funny` function on line 6 caught my eye...

<pre class="brush:js; highlight: [6,6]">
// Any message, e.g. previously known signature
const msg0 = crypto.getRandomValues(new Uint8Array(32))
const sig0 = ec.sign(msg0, privateKey)

// Attack
const msg1 = funny(msg0) // this is a string here, but can also be of other non-Uint8Array types
const sig1 = ec.sign(msg1, privateKey)
</pre>

The `funny(msg0)` function here isn't defined in the GHSA "on purpose". I couldn't help but wonder: what's the shape of this `funny` function? Is it easy to implement? Let's find out.

## The core issue: BN serialization

Before we jump into writing the core of this `funny` function let's review the details of the vulnerability and what broke exactly. This will help us design the `funny` function later on. 

At a high level, `elliptic`'s vulnerable signing code ([link](https://github.com/indutny/elliptic/blob/3e46a48fdd2ef2f89593e5e058d85530578c9761/lib/elliptic/ec/index.js#L100-L107)) performs the following transformations:

* A message (string) is truncated with `truncateToN(...)` to yield a big number for signing (BN).
* The resulting BN is serialized with `toArray('be', 32)` to yield the base bytes for nonce generation

The vulnerability exists because this pipeline is not injective: distinct messages can eventually produce identical nonce inputs.

When first reading the advisory, it is tempting to focus on the `truncateToN()` function. Much of the complexity lives there: message parsing, bit-length calculations, shifting, and reduction modulo the curve order.

I initially focused on constructing collisions inside `truncateToN()`. Seems reasonable: if the same message yields the same BN after truncation logic, it follows that we'll see the same nonce as well!

If an attacker wants to target an existing signature (for message `m`), perhaps they need to find another message `m'` such that `truncateToN(m') = truncateToN(m)`

Turns out this is the wrong mental model: the result of `truncateToN` (BN) is used not only for nonce generation but also as an input for signing. In other words: if we find `m'` such that `truncateToN(m')` equals `truncateToN(m)`, then the two signatures will be _exactly_ the same: same `r` component, same `s` component. That's because the message-to-be-signed (a BN) is the same. This will not lead to a private key leak: we saw in the first section that private key extraction requires 2 distinct signatures to work: \`s_1\` and \`s_2\`. This determinism is a feature, not a bug; we're simply seeing message collision (distinct messages, same signatures).

The real issue is later in the pipeline and it's related to BN serialization. After truncation, the library serializes the resulting BN with:

<pre class="brush:js">
var nonce = msg.toArray('be', 32);
</pre>

The subtle but critical detail is that BN serialization to a fixed-length byte array drops sign information. **This is the core of the vulnerability**. For example:

<pre class="brush:js">
const n = new BN(
  "c1c7740ee5c0f246640f4be0934024e6e1536cf90f970d7bd4c1461b60af11dc",
  16
);

const negN = n.neg();

n.toArray('be', 32) === negN.toArray('be', 32);
</pre>

Both serialize to the same 32-byte array ⚠️

If you look at the [commit which fixes the vulnerability](https://github.com/indutny/elliptic/commit/04cb6f54ce552b3ebde6be06d6050419e1c7333e), bingo: it's all about preventing negative numbers from being signed to prevent potential nonce reuse issues.

## What our `funny` function does

The BN serialization sign-drop is at the core of the vuln. If a message truncates to some value `x`, and we can craft a second message that truncates to `-x`, then the two serialize to the *same* 32 bytes. Same nonce, but different input messages: that's the combo that'll get your private key leaked.

So the `funny` function has one job: given `msg0` (which truncates to some `x`), produce a `msg1` that truncates to `-x`. Visually speaking:

<img src="/img/funny-inner-workings.png" alt="Inner workings of funny function" style="max-width: 500px" />

The rest of this post is about whether the dashed arrow can always work. Spoiler: nope!

## Inverting `truncateToN`: not always possible

Let's look at what we're inverting. The full routine is [here](https://github.com/indutny/elliptic/blob/b8a7edd61a0d9bddd0bbf3436a4b476401edbe20/lib/elliptic/ec/index.js#L81-L108) but it boils down to:

* Measure the input message's **synthetic byte length** (let's call it `L` going forward): for strings this is derived from their length, which includes any `"-"` sign, adding 1, and dividing by two (using `floor()`). For example `-c0ffee` has 7 characters, which means a synthetic byte length of `floor((7+1)/2) = 4`.
* Right-shift the value by \`∂ = 8L - b\` (where `b` is the curve order's bit length), if that delta is strictly positive.
* If the value is still more than the curve order after the shift, subtract it (this never happens for negative numbers).

To build a `msg1` that truncates to `-x`, we'd left-shift `-x` back up by `∂`. But `∂` depends on the *synthetic bit length of the result*, which depends on the string we're constructing. That's a circular dependency. If you fix the target length and work it through (I did, for a range of lengths), a pattern emerges: **there's a ceiling on how large `|x|` can be and still have a pre-image.**

Here's what this looks like for messages of different lengths. We take ed25519 as an example, where the curve order has 253 bits (secp256k1 is 256 bits, which makes the table a bit less interesting.)

<style>
table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.95rem;
}

table th {
    border-bottom: 2px solid #ddd;
    padding: 0.75rem 1rem;
    text-align: center;
    white-space: nowrap;
}

table td {
    padding: 0.65rem 1rem;
    text-align: center;
    vertical-align: middle;
}

table tbody tr:nth-child(even) {
    background: rgba(127, 127, 127, 0.06);
}

table tbody tr:hover {
    background: rgba(127, 127, 127, 0.12);
}

table td:nth-child(1),
table td:nth-child(2),
table td:nth-child(5) {
    font-weight: 600;
}

table td:nth-child(3),
table td:nth-child(4),
table td:nth-child(6) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

table code {
    background: none;
    padding: 0;
}
</style>

| Synthetic byte length `L` | Hex digits | Range for \|msg1\| | δ              | Range for \|x\| |
|---------------------------|:----------:|:------------------:|:--------------:|:---------------:|
| 29                        | [57,58]    | [2^220, 2^228)     | -21 (no shift) | [2^220, 2^228)  |
| 30                        | [59,60]    | [2^228, 2^236)     | -13 (no shift) | [2^228, 2^236)  |
| 31                        | [61,62]    | [2^236, 2^244)     | -5 (no shift)  | [2^236, 2^244)  |
| 32                        | [63,64]    | [2^244, 2^252)     | 3              | [2^241, 2^249)  |
| 33                        | [65,66]    | [2^252, 2^260)     | 11             | [2^241, 2^249)  |
| 34                        | [67,68]    | [2^260, 2^268)     | 19             | [2^241, 2^249)  |

In the table above, we look at increasing byte lengths for a message, and look at the numerical ranges of the input (`msg1`), the computed delta given `b=253` (`∂ = 8L-253`), and the resulting range for `|x|`. It's clear that `|x|` caps out at `2^249`.

Now let's figure out why and prove it.

## A small proof: where `funny` runs out of room

What we want to prove:

> A negative number \`-x\` has a pre-image under `truncateToN` **if and only if** \`|x| < 2^{b-4}\`, where \`b\` is the curve order's bit length

Recall what `truncateToN` does on a negative hex string `s = "-..."`:

* It reads a **synthetic byte length** \`L\` from the character count: \`L = floor((\l\e\n(s) + 1)/2)\`, where \`\l\e\n(s)\` counts the leading `"-"`.
* It parses `s` as a BN with `new BN(s, 16)` (let's call this number `M`)
* It right-shifts `M` by \`∂ = 8L - b\`

Let's start with a simple fact: a negative string `s` of synthetic byte length `L` has at most `2L-1` hex digits of amplitude. So \`|M| < 16^{2L-1}\`, or \`|M| < 2^{8L-4}\` ("fact 1")

Given an input string and its resulting `|M|`, two cases to consider.

**No shift (`∂ ≤ 0`, which means `8L ≤ b`):** `M` passes through "untouched".  
\`|truncateToN(s)| = M\` and we have \`|truncateToN(s)| <= 2^{8L-4}\` (by fact 1).  
Given `8L ≤ b`:  \`|truncateToN(s)| <= 2^{b-4}\`.

**Shift (`∂ > 0`, which means `8L > b`):** `M` is right-shifted by \`∂ = 8L - b\`. Let's define `M'` as the result of this right-shift: `M' = M >> ∂`. A right-shift removes bits, which means the magnitude of `M'` is predictable: we have \`|M'| < 2^{8L-4} / 2^{8L-b}\`.  
Simplifying the upper bound: \`2^{8L-4} / 2^{8L-b} = 2^{(8L-4)-(8L-b)} = 2^{b-4}\`.  
`M'` is the result returned by `truncateToN`, so we have shown \`|truncateToN(s)| < 2^{b-4}\`.

In both cases we've proven \`|truncateToN(s)| < 2^{b-4}\`. We've established \`2^{b-4}\` as our upper bound, and proven that no pre-image exists past that.

Now let's quickly prove that a pre-image exists when \`|truncateToN(s)| < 2^{b-4}\`.

To write \`|truncateToN(s)|\` in hex we need at most \`b/4 - 1\` hex digits (\`16^{b/4-1} = 2^{b-4}\`). Now let's write \`|truncateToN(s)|\` in hex and prepend a minus sign, and call the result `s`. Its length is at most \`b/4\` hex digits, so \`L\` is at most \`floor((b/4 + 1)/2) = floor((b+4)/8) <= b/8\`. \`L <= b/8\` implies \`8L <= b\`, and \`∂ <= 0\` by definition of \`∂\`. With no shift, \`truncateToN\` just parses the integer. So our constructed `s` is a valid pre-image.

Together: a negative integer `-x` has a pre-image exactly on \`(0, 2^{b-4})\` ∎

The above is the formal version of the intuition that *"a longer hex string doesn't help."* Every extra synthetic byte "buys" 8 bits of representable magnitude but "costs" 8 bits of shift. This is what we observed in the table. They're the same quantity, so they cancel each other out: no string, however long, results in a single bit above `2^{b-4}`. Now we know why!


## Exploitable ranges for standard digests

We've shown that given a target `-x`, a pre-image exists if and only if `x` lands in the reachable window \`(0, 2^{b-4})\`. The next question to ask is: **which original messages are targetable?** A signature message is exploitable only if its own truncated value `x` lands in \`(0, 2^{b-4})\`. We need to know which digests produce such an `x` to deduce the exploitable ranges.

Luckily the function to invert is the same: `truncateToN`. We now apply it to a *positive* message. The extra wrinkle compared to negative messages: the subtraction step.

**Two disjoint bands for ed25519**

Let's use ed25519 here (so `b = 253`). For a standard 32-byte digest, `L` is 32, which means `∂ = 8*32 - 253 = 3`. \`truncateToN\` computes \`floor({\m\s\g}/8)\` (right-shift by 3 is a division by 8), then subtracts `N` if the result still exceeds `N`. A digest is exploitable when that value lands in \`(0, 2^{249})\` (see proof above), and there are **two** separate ways to get there:

* If \`msg < 2^{252}\`, then \`floor({msg}/8) < 2^{249}\` already; the subtraction branch never fires, and we land in range directly. This band is \`(0, 2^{252})\`, trivially.
* If \`floor({msg}/8)\` overshoots the curve order, the subtraction pulls it back down into range. That happens for `msg` in \`(8n, 8n + 2^{252})\`, our second band of width `2^{252}`, sitting up near `2^{255}`.

**Only one band for secp256k1**

The same construction on secp256k1 yields `∂ = 0` (standard digests have 64 chars, which matches the curve order's 256-bit length). The result of `truncateToN` simplifies to either `msg`, or `msg-N` when `msg > N`. The first "low" band we found survives: \`msg < 2^{252}\` lands in range. But the second band would sit *above* the digest space. A 256-bit digest can't exceed \`2^{256}\`, so the second band doesn't exist.

**Likelihood of a vulnerable signature**

We've done a lot of hard work, now it's smooth sailing. Just need to count the bands!
* For ed25519, two disjoint bands each of width \`2^{252}\` sit inside the \`2^{256}\` digest space: \`P_{\v\u\l\n\e\r\a\b\l\e} = (2*2^{252})/2^256 = 1/8 = 12.5%\`
* For secp256k1, only one band: \`P_{\v\u\l\n\e\r\a\b\l\e} = 2^{252}/2^256 = 1/16 = 6.25%\`

So the bottom line, for a standard 256-bit digest, **only a portion of pre-existing signatures are exploitable by our `funny` function: `6.25%` for secp256k1, `12.5%` for ed25519**. To be clear, that is *catastrophically* high. A one-in-sixteen chance of full private-key recovery per signature is not a chance worth taking. But it contradicts the GHSA's claim that "a message can be constructed for any already known message/signature pair".

## Conclusion

Reading [GHSA-vjh7-7g9h-fjfh](https://github.com/indutny/elliptic/security/advisories/GHSA-vjh7-7g9h-fjfh) got me curious: what is this `funny()` function exactly? Months later, here's what the reverse-engineering turned up:
* My first instinct was to hunt for collisions inside `truncateToN()`, where most of the complexity lives. I was wrong: the vulnerability comes from a loss of injectivity *later*, when `toArray` discards sign information.
* I was not able to verify the GHSA claim that there exists a `funny` function which computes a vulnerable message for any pre-existing signature. Some message ranges are out of reach with the construction above. For a standard 256 bit digest, there's a 6.25% chance (for secp256k1) or 12.5% chance (for ed25519) that our `funny` candidate works. If you come across other `funny` tricks to reach the remaining ranges, [let me know](https://x.com/arnaudbrousseau)!
* Even with unreachable ranges this vulnerability is still critical! It's still bad bad bad. Please upgrade if you haven't! (I really hope you have, it's been well over a year!)

Thanks for reading, you're a beast for making it this far!

## Reproducibility and source code

The candidate constructions and reachability tests discussed in this post are available in the accompanying repository: [`funny-elliptic-vuln`](https://github.com/ArnaudBrousseau/funny-elliptic-vuln). The tests exercise the sign-symmetry construction across the reachable and unreachable ranges described above. If you find a construction that reaches the remaining ranges, I'd be very interested to hear about it. Please [reach out](https://x.com/arnaudbrousseau).