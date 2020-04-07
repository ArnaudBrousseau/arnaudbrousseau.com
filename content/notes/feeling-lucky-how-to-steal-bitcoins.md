---
title: "Feeling Lucky? How-to: Steal Bitcoins"
date: 2019-09-13
---

Get this: all of the Bitcoin private keys are currently out there, in the open.
What you need to steal coins right now: a insane amount of luck and the
knowledge to exploit it. I can't help with the luck part, but I'll arm you with
knowledge.

## Steal what?

I'm assuming you're familiar with [Bitcoin][bitcoin], the most popular (and
first) cryptocurrency, created by Satoshi Nakamoto in 2009. A Bitcoin "wallet"
is nothing more than a random number, kept private ("private" key).  This
number is then used to generate another number (your "public" key). This is
considered secure because a private key is picked from an extremely big range:
from 1 to 2^256 (see next section for a good explanation on how big 2^256 is).
So it's unlikely that you and me pick the same private key when we choose one
randomly.

What about random luck though? What if you happen to pick the same private key
than me? If you do, my money is essentially yours.

If you happen to pick the same private key than Satoshi Nakamoto when (s)he
mined the first block, you'll be famous but not that rich.
`1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa` (genesis public key) currently holds 68 BTC
(~$500k). Not bad. If you happen the pick the same private key than one of
[these people][bitcoin-top-100], however: congratulations, you're a
billionnaire.

## What are my odds?

In short: close to nothing. More precisely, if you're targetting a particular
address, your odds are: 1 over...

<code style="font-size:11px">
115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,936
</code>
(that's the decimal notation for 2^256)

This number is big. Mind-boggling big. The following YouTube video attempts to explain this:

<iframe width="560" height="315" src="https://www.youtube.com/embed/S9JGmA5_unY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

While your odds are close to nothing it's still worth asking the question:
"what if?". Assuming you randomly pick the same private key than a weathly
Bitcoin wallet, how do you make them yours?

## Enters `keys.lol`

Since all Bitcoin private keys are known and easy to enumerate, Sjors Ottjes
created [keys.lol][keys.lol], a directory of all the Bitcoin keys in existence:

![keys.lol homepage](/img/keys.lol.png)

This website displays random batches of 128 Bitcoin keys and whether they hold
unspent coins, by talking to a 3rd party API. Go ahead: click the "Random page"
button on the homepage. You have a shot at landing on the page where Satoshi's
private key is listed. Exciting isn't it?

## I've found an active key! Now what?

Let's redeem your prize! Unspent Bitcoins on the network are called "Unspent
transaction outputs", or UTXO. If you found a UTXO attributed to a public key
listed on keys.lol, you know the associated private key. Hence you can "steal"
the associated coins (aka UTXOs) and move them under the control of another
private key only you know.

Do do this you need to send a transaction to the Bitcoin network, signed by the
initial private key (the one you found on keys.lol), which moves one or more
UTXOs to a new public key. Naturally, this new public key will be controlled by
another private key, and known only by you!

A great website to do this is [coinb.in][coinb.in]. If you were to stumble upon
satoshi's private key, here's how you'd generate a modest transaction
transfering 0.001 BTC ($7) to another address:

![coinb.in transaction](/img/coinb.in.png)

Then use the signing utility to sign the transaction:

![coinb.in signature](/img/coinb.in.signature.png)

Then use their free broadcasting tool to submit this transaction on the Bitcoin
network. Congratulations!

## Don't trust, verify

When I first learned about keys.lol I immediately thought:
* How does this work at a high level? How to you go from page and offset to a seed, then to a private key? Which formats is the site using?
* Can I recover a page and offset from a known private key?
* Is it safe? What if I display my own private key? Does this website log anything?

With this in mind I started re-implementing public key crypto (a very basic
subset of it!) and keys.lol's functionality in JavaScript. Enters:
`keys.deconstructed`, a webapp which works offline and has **zero external
dependencies**.

![keys.deconstructed UI](/img/keys.deconstructed-ui.png)

&rarr; [keys.deconstructed][keys.deconstructed]

Coding the above toy app I learned that keys.lol generates seed from page and
offset using `seed = (page - 1) * 128 + offset`. From that seed, an
uncompressed private key is generated, and two public keys (both compressed and
uncompressed are generated). This sounds complex but it can be done in ~500
lines of code! Here's the code: [keys.deconstructed.js][keys.deconstructed.js].

Another feature I built is going the reverse route: from a known WIF
uncompressed private key, recover the seed, then compute the page/offset on
keys.lol. This is useful if you want to view your own addresses.

Going the other route (page/offet, to seed, to private key) lets me
double-check what keys.lol displays, and ensures that the private key displayed
on the site is indeed the private key controlling the public keys listed there.

This leaves us with one question: does keys.lol log anything when I view keys
with unspent transaction outputs?

## Honeypot

I generated a random page number between 0 and 9046..6675
(total number of pages) and sent 0.001 BTC to one of the public keys listed
there (I picked `1A2zNEFyMAfmZdy4yeXUoaPdt5Kns6vu3s`).

Then I visited the keys.lol page where this address appears. If the site owner
logs anything, we should see the coins move at some point. I've obscured the
private keys, but there you have it: a green key on keys.lol!

![keys.lol honeypot](/img/keys.lol.honeypot.png)

Now the question is: was this logged in any way? Here's a link to the public
key so you can monitor this with me:
[1A2zNEFyMAfmZdy4yeXUoaPdt5Kns6vu3s](https://www.blockchain.com/btc/address/1A2zNEFyMAfmZdy4yeXUoaPdt5Kns6vu3s).
If we see these coins move: keys.lol is rigged. Time will tell. Please email
or tweet at me if you see something!

[bitcoin]: https://bitcoin.org/en/
[bitcoin-top-100]: https://bitinfocharts.com/top-100-richest-bitcoin-addresses.html
[keys.lol]: https://keys.lol/
[coinb.in]: https://coinb.in/#newTransaction
[keys.deconstructed]: /labs/keys.deconstructed
[keys.deconstructed.js]: https://github.com/ArnaudBrousseau/arnaudbrousseau.com/blob/master/src/files/labs/keys.deconstructed/keys.deconstructed.js
