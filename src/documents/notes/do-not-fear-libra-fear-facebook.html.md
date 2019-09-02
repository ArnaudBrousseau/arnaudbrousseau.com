---
title: "Don't fear Libra. Fear Facebook"
date: 2019-06-25
layout: "note"
activeNavItem: "notes"
---

I read [The Libra Blockchain][libra-hosted] (this link is a hosted version of
what can be found at [this live URL][libra-online]) to make up my mind about Facebook's new cryptocurrency, Libra.

## Too Long; Didn't Read

What I want you to take away: Libra is boring. It's a simple cryptocurrency
composed of well-known, battle-tested components.

I also want to convince you that if users transact through Facebook products
like Whatsapp or Messenger they are doomed to leak a lot of valuable data to
Facebook. No matter what (crypto)currency Facebook adopts.

## Libra Overview

### Main Components

Libra is a permissioned proof-of-stake blockchain. "Permissioned" because only
Libra Association members can run validator nodes, for the modest cost of $10
million USD. "Validators" are nodes which produce new blocks. A block
is an aggregation of user transactions. User accounts are public/private key
pairs, and transactions are based on smart contracts. Smart contracts are based
on a new Language, Mova.

Long-term Libra might shift towards a permissionless system.

### Libra Blockchain vs Protocol vs Core
In the paper we see a distinction drawn between "Libra Blockchain", "Libra
Protocol" and "Libra Core". Until proven otherwise Libra Core will probably be
the only implementation of the Libra Protocol. And the Libra Protocol will
probably be the only protocol for the Libra Blockchain. Enough already.

### Cryptography
Libra's hash function of choice is [SHA3-256][sha3-256]. The keys/signatures
use EdDSA ([Ed25519 curve][ed25519]). These are standard, unsurprising
decisions (Stellar also uses Ed25519)

Once a public/private key pair is generated, Libra has a `create_account`
operation (similar to Stellar!).

Libra also supports changing an account's underlying Ed25519 key pair without
changing its Libra public key (similar to Stellar!!...spotting a theme yet?)

### Transactions

In Libra transaction execution and smart contract calls are one and the same.
Smart contracts closely follow what Ethereum does (concept of code to execute,
gas price, gas cost).

Each transaction has a sender address/pubkey, a program, a gas price, a max gas
amount and a sequence number. It's basically exactly the same than Ethereum
except that all transactions are smart contract calls (including raw
send/receive operations)

The Libra paper states a difference between gas in Libra vs Ethereum: _"The
system is designed to have low fees during normal operations, when sufficient
capacity is available. This approach differs from some existing blockchains,
which target validators with lower capacity and thus at times have more demand
to process transactions than throughput. In these systems, fees spike during
periods of high demand -- representing a revenue source for the validators but
a cost for the users"_...this makes no sense to me. How are validators not
benefitting from high gas price?

Libra transactions have side effects. This is the concept of "events" (Stellar
has the exact same thing, called "effects"). Transactions cannot read events.
In other words, transactions cannot take as input side effects of previous
transactions. The only supported mutation is explicit state mutation.

In terms of protocol, applying a transaction is defined as:
`apply(state`<sub>`i-1`</sub>`, transaction`<sub>`i`</sub>`)` yields
(`output`<sub>`i`</sub>, `state`<sub>`i`</sub>)

Transactions are only a function of the current state. Because transactions are
deterministic, transactions/blocks can be replayed and auditing can be performed.

A neat idea in this paper: to configure the genesis block and forks, special
transactions are added to the consensus protocol through configuration. They're
not part of the ledger history. Essentially, configuration-as-vote.

### Move

I've said above that transactions are implemented as smart contract calls. And
contracts are based on Move, a new programming language designed specifically
for Libra.

Move source code compiles to Move IR (Intermediate Representation), which
compiles eventually to Move Bytecode. This is like Ethereum's Solidity which
eventually gets compiled down to EVM (Ethereum Virtual Machine) instructions.

Move "resources" are values (strings, integers, etc). Move modules are code to
interact with resources. Resources are hierarchical, stored under
`<account>/resources/<resource_account>.<resource_type>` (e.g.
`0x12/resources/0x56.MyCurrency`)

Modules are code units published on Libra (equivalent to an Ethereum
constract). They declare structs and procedures. Structs contain data and/or
other structs. Procedures are functions. _"At a high level, the
module/struct/procedure relationship is similar to the class/object/method
relationship in object-oriented programming"_.

If you think this looks general-purpose you'd be right. But: "while move is
used to defined core system concepts, such as the Libra currency, users are
unable to publish custom modules that declare their own resource types". In
other words: _there is no custom smart contract support!_

_"The key feature of Move is the ability to define custom resource types, which
have semantics inspired by linear logic"_. What's "linear logic"? You tell me,
[here is the paper][linear-logic].

_"The Move type system provides special safety guarantees for resources. A
resource can never be copied, only moved"_. Hence the name. Aha! More on the
design of move is [available here][move-design].

### Storage
For storage Libra uses Merkle trees. Nothing new here. History can be pruned by
validators. And validators _"are free to discard historical data not needed to
process new transactions"_. In practice this could be a huge headache. Yes data
can be authenticated because it's all part of an authenticated merkle tree. But
someone has to keep the whole history somewhere.

The paper states: _"Clients can optionally create a replica of
the entire database by synchronizing the transaction history from the
validators. While creating a replica, a client can verify that validators
executed transactions correctly, which increases accountability and
transparency in the system"_. This is true **provided that validators keep track
of the entire history and open up their APIs**. Given that Libra is a
permissioned blockchain I doubt anonymous internet users would be able to
mirror the entire blochchain freely unless they've been following the network
since genesis. Validator nodes are likely to prune history after some time.
When this happens Libra's full history might be in the hands of a happy few
(Facebook will certainly keep a copy if I had to guess!).

### Consensus
Consensus in Libra is driven by "LibraBFT", based on [HotStuff][hotstuff]. It
has the property to require 2 or more confirmations, and work with the concept
of blocks and "QC"s (Quorum Certificates). Nothing new under the sun.

### Networking
Networking is done with [libp2p][libp2p]. Discovery/bootstrapping seems
unsolved: _"We currently assume clients have an out-of-band mechanism to find
the addresses of validators to submit transactions to -- the final version of
this mechanism is yet to be designed"_

## If Libra is boring, why fear Facebook?

It should be pretty clear from the previous section that Libra brings
absolutely nothing new to the world of cryptocurrency. In some ways this is
good. It'll probably be robust and safe to use because most of its components
have been battle-tested by others.

Libra is "pseudonymous". Accounts aren't linked to anything by default. They're
a formatted hash of a completely random public/private key pair. However, as
soon as Libra accounts are linked to real names and personal data, Libra stops
being anonymous and starts being worrisome.

The same is true of Bitcoin or Ethereum today! If Facebook were to adopt them
as cryptocurrency, and users started paying each other through a wallet that
Facebook controls (existing Facebook apps, or the new [Calibra wallet][calibra] app), they'll
inevitably tie financial information to the existing mountain of data Facebook
already has about them.

In short: don't fear Libra. Fear Facebook.

[sha3-256]: https://en.wikipedia.org/wiki/SHA-3
[ed25519]: https://en.wikipedia.org/wiki/EdDSA#Ed25519
[libra-online]: https://developers.libra.org/docs/assets/papers/the-libra-blockchain.pdf
[libra-hosted]: /pdfs/the-libra-blockchain.pdf
[linear-logic]: http://girard.perso.math.cnrs.fr/LLL.pdf
[move-design]: https://developers.libra.org/docs/assets/papers/libra-move-a-language-with-programmable-resources.pdf
[libp2p]: https://libp2p.io/
[hotstuff]: https://arxiv.org/abs/1803.05069
[calibra]: https://calibra.com/
