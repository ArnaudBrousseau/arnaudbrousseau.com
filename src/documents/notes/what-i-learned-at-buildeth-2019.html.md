---
title: "What I Learned at BuildEth 2019"
date: 2019-07-19
layout: "note"
activeNavItem: "notes"
---

## The State of the Ethereum Network (Scott Bigelow, Amberdata)

[Amberdata][amberdata] is a tool keeping track of trends on the Ethereum network:
* on average the network burns throough 40B unit of gas per day
* contract calls are getting deeper and deeper
* https://2018.ethereuminreview.com/ for a full list

Dapps have become more tightly integrated together
* [uniswap][uniswap] is a protocol to exchange anything in a decentralized way
* [Pooltogether.us][pooltogether] is a "lossless" lottery, built on top of
  [Compound.finance][compound]
* [MakerDAO][makerdao] interacts with more and more assets types
* [0x][0x] is a decentralized exchange leveraging uniswap and other protocols
* Because of ERC721 you can now wrap your Cryptokitties and swap them in a decentralized way

## The State of the Community (Grant Hummer, Chromatic Capital)

User community is not there yet for Ethereum. Today there's barely  20,000
users per day across all dapps. The most popular dapps see 1,000 users per day.
This is ridiculously low by web standards.

DeFi is the exception! It has the potential to attract a lot of users because
of the use cases it unlocks.

Dev community is healthy, with 1.3M users on Meetups. EthGlobal hackathons are
blooming. Investors are the least important part of the community.

## The Ethereum Foundation (Albert Ni, Ethereum Foundation)

Nothing really important to note here except one quote and one book. Quote:
"Coherence is not completeness". Which we can interpret as: it's easier to have
a strong opinion with less information.

And one book: [Good Strategy Bad Strategy][good-strategy-bad-strategy].


## A Tour of the DApp Landscape (Orest Byskosh, Ausum Ventures)

This was more or less an inventory of all the interesting dapps out there.

Did you know? [Nick Szabo][szabo] coined the term smart contract. From inception to August 2018, over 28B dollars have been raised.


Collectibles:
* [CryptoKitties][cryptokitties] (126 users/day)
* [SuperRare][superrare] (10 users/day)
* [OpenSea][opensea] (148 users/day)
* [Auctionity][auctionity] (149 users/day)

Games and gambling are significantly more successful with users:
* [TRONbet/Wink][wink] (3.7k users/day)
* [My crypto heroes][cryptoheroes] (2.7k users/day)
* [Dice][dice] (2.2k users/day)

Decentralized finance:
* [0x][0x] sees 700k txs/day
* [IDEX][idex] has 1,000 users/day
* [Kyber][kyber] (350 users per day)
* [Uniswap][uniswap] (2,000 ETH in daily volume)
* [Bancor][bancor] (300 transactions/day)

## Wallets, UX/UI, and More (Austin Griffith, Burner Wallet)

Several interesting concepts here:
* [Bouncer proxies][bouncer-proxy] let users interact with smart contracts
  without holding ETH. This is often a big source of friction. This lets a
  proxy gas transactions on behalf of users.
* [Burner wallets][burner-wallet] is a quick way to generate keys in-browser.
  This is ideal from small transactions. This has been [proven to work][how-to-host-a-burner-wallet-event]!

## The Finality Gadget: Putting ETH2 to Work (Alex Stokes, Ethereum Foundation)

This talk went over my head a bit, forgive me for the rough notes.

ETH 2.0 rollout will happen in 3 phases:
* Phase 0: beacon chain
* Phase 1: shard data chains
* Phase 2: shard application chains

Phase 0 (beacon chain): beacon chain is a systel-level blockchain. Along with
beacon chain, Casper (PoS consensus) is being rolled out. Empty references to
shards are being dropped.

Phase 1: 1024 shards are being added to shard data. Blocks just have 16kb of
random data. Canonical shards are crosslinked into the beacon chain.

Phase 2: eWASM VM, flexible execution environments, and sharding of application
chains

Ethereum 1.x can be improved today without waiting for ETH2.0. One of these things is Finality Gadget.

Finality Gadget (part of Casper):
* in the normal case, validators attest to blocks in the canonical chain
* if more than 2/3rd of validators attest to a given block, it is justified
* if validators make two successive justifications, then the first justified
  block is finalized

Under normal conditions ETH1.0 block hashes enter the beacon chain with every
beacon block. The casper consensus finalizes these beacon blocks. if an ETH1.0
block hash is finalized on the beacon chain, then every block beneath it in on
the ETH 1.0 chain is implicitly finalized as well.

More details are available in [this blog post][finality-gadget].

## How We Developed the ETH2 Client (Terence Tsao, Prysmatic Labs)

This talk wasn't very dense. Takeaways:
* We need standards! [Link to in-progress specs][beacon-chain-spec]
* Ethereum 2.0 has two parts: the beacon node (which maintains the state of the beacon chain, communicates with other beacon nodes, and responds to validator client queries), and the validator client (which maintains private / sensitive data & query beacon nodes to perform validator duties)

## Using Randomness in Smart Contracts (Haseeb Qureshi, Metastable)

Really interesting session. The first idea is that the blockchain itself does
not have good solutions for sources of randomness:
* blockhashes aren't random enough. Given enough financial incentive miners can
  discard/keep hashes that are advantageous to them
* off-chain beacons are expensive
* [RANDAO][randao] is a nice distributed scheme where actors
  summit numbers in a decentralized way. However this scheme suffers from the
  "last actor" problem: what if the person who goes last does not want to
  reveal their number based on what they're seeing so far? They can force a
  discard and influence the outcome.

VDFs (Verifiable Delay Functions) are hard function that can only be computed
sequentially (not parallelizable). Example: iterative hashing. Iterative
hashing is a VDF but cannot be verified easily (to verify the output, the
verifier has to compute the iterative hashes).

Final solution: `f(D, N1 ^ N2 ^ N3 ...)`. See also [NEAR's article on
randomness][near-randomness], which explores these notions and goes a step
further.

## Writing Smart Contracts with ZK Proofs (Elena Nadolinski, Beanstalk Network)

Very good talk. [Link to slides][zkp-slides].

What are ZKPs? (Zero-Knowledge Proofs). It's a system to reveal knowledge of a
solution to a probem without revealing the solution itself. For instance, if I
want to reveal the knowledge of a solution to a "where is Waldo" problem, I can
take a close-up picture of Waldo without any surrounding context to prove that
I know where he is. But that doesn't reveal his location on the page.

ZKPs are different from privacy. ZKPs, fundamentally, are computation proofs.
In math terms, if `f(x) = y`, ZKPs are a way to reveal a proof and `y`, without
revealing `x`, to convince somebody that I've done computation `f`

ZKPs have a lot of possible applications:
* credit card score reveal (proving that it's more than 700, without revealing
  its exact value)
* proving that my dna is in this set, without revealing my genes
* proving that I made a tx with this account, without revealing the tx itself
* proving that I'm a part of a group which can access this website (without
  revealing who I am)
* proving that a computer has made honest computation

ZKPs come in different flavors:
* zk-SNARKSs (most popular, more than 50+ variations, some quantum secure). Size: 288 bytes, prover time: 2.3s, verification time: 10ms
* zk-STARKs (newer). Size: 45Kb-200Kb, prover time: 1.6s, verification time: 16ms
* bulletproofs (coming from Stanford). Stellar is working on improvements. Right now size is at 1.3kb, prover time is 30s, and verification time is 1100ms
* Sonic
* Aurora

Projects using ZKPs:
Coda, beanstalk (privacy coin), 0x, Zcash, monero. Matter
* [Coda][coda] is a blockchain where `x` is the entire history `f` is how the
  chain progresses. This chain progresses by "proof inception" (a proof which
  proves that a proof which proves that a proof...is true.)
* [Beanstalk][beanstalk] (privacy coin)
* [0x][0x]
* [Zcash][zcash]
* [Monero][monero]

Tooling for SNARKS:
* [Zokrates][zokrates]
* [bellman][bellman] (Rust implementation)
* [snarky][snarky] (OCaml)
* [libsnark][libsnark] (C++)
* [Circom][circom] and [snarkjs][snarkjs] (JS)
* [go-snark][go-snark] (Golang)

Tooling for STARKs:
* [libSTARK][libstark]
* [experimental Go implementation][stark-go]

Tooling for Bulletproofs:
* [Ristretto][ristretto] (Rust implementation)
* [BulletProofLib][bulletprooflib], Benedikt's Bunzz Java implementation

What's easiest to start with
* [Why and How zk-SNARK Works: Definitive Explanation][zk-snark-explanation]
  (great PDF going in-depth on the foundations of zk-SNARKs)
* [Zokrates][zokrates], [snarkjs][snarkjs], [ETHSnarks][ethsnarks]
* [This tutorial][edcon2019] by Matter Labs
* [sempahore][semaphore]. Try to prove that you're part of a company and make a
  statement without revealing who you are!


## Geofencing with ERC 1404 (Mason Borda, TokenSoft)

Interesting talk, mostly because I work for Coinbase Custody and ERC20
regulation is relevant. The speaker is a Tokensoft employee. Their clients:
Hedera (Hashgraph), Tezos, tokenized funds, real estate and more. They've got
more than 30 clients at the moment

Their approach is to treat all ERC20s as a security token, asset-backed or not.
The need for a standard comes from banking regulations (KYC/AML), securities
laws, tax regulations (more specifically regulation S and D).

One specific regulation that's hard to comply with on the Ethereum blockchain
is the distribution compliance period, during which tokens cannot cross
borders. [ERC 1404][erc1404] helps with tracking this.

Other things possible with ERC1404:
* set maximum ownership
* revocability
* administrators

## Wallet Interoperability (Myungin Lee and Alex Patin, Squarelink)

Pretty dull discussion overall. The main problem is discoverability. We talked
about [Squarelink][squarelink] and how it approaches the problem, but never
talked about concrete solutions.

## PY-EVM: Reinventing Sync is Easier than Optimizing Python (Jason Carver, Ethereum Foundation)

[Trinity][trinity] is the Python client for the ethereum blockchain, powered by
[py-evm][py-evm].

This talk was about the different strategies for syncing a node. This isn't
something I've given a lot of thought before. There's "regular sync", "fast
sync", and "beam sync". "Beam sync" is a new syncing strategy.

**Regular sync**:
* Begin at genesis
* Execute transactions in block, locally generate state
* Repeat until you reach tip

**Fast sync**:
* SKIP execution until the most-recent head
* Download state from that head, then go from there.

Bottlenecks for fast sync are account/storage download. The chain progresses
forward while download is happening, and peers might drop old roots (happens
every 100 blocks or so).

**Beam sync**:
* SKIP execution until the most-recent head
* Start up without state (no download!)
* Execute blocks, and request on "data fault"
* Keep requested and generated state
* Repeat as the chain moves forward
* A typical mainnet block requires 3000 state trie nodes for execution

The main benefit here is that all beam-syncing peers will download the same
trie nodes. There's a big caching opportunity.

## Ethereum Name Service as a UX Solution (Brantly Millegan, Ethereum Name Service)

[Namecoin][namecoin] (.bit) is a blockchain just dedicated to naming. [Ethereum
Name Service][ens] (ENS) is a smart contract dedicated to naming, built on top
of Ethereum.

Unlike DNS, ENS has no servers! It's entirely based on smart contracts. It's
been integrated into a ton of wallet apps and even browsers! Typing
`somename.eth` in opera "just works" and loads IPFS websites. For browsers
which do not support `.eth` directly, `.eth.link` is a compatibility layer to
load IPFS websites. Example: [http://almonit.eth.link/][almonit.eth].

## In closing

Super high-quality conference for the price that it cost (I paid $75 for my
ticket!). I'd highly recommend it for people who want to get more familiar with
the Ethereum ecosystem/community.


[uniswap]: https://uniswap.io/
[amberdata]: https://amberdata.io/
[pooltogether]: https://www.pooltogether.us/
[compound]: https://compound.finance/
[makerdao]: https://makerdao.com/
[0x]: https://0x.org/
[szabo]: https://en.wikipedia.org/wiki/Nick_Szabo
[good-strategy-bad-strategy]: https://www.amazon.com/gp/product/1781256179
[cryptokitties]: https://www.cryptokitties.co
[superrare]: https://superrare.co/
[opensea]: https://opensea.io/
[auctionity]: https://www.auctionity.com/
[wink]: https://www.wink.org
[cryptoheroes]: https://www.mycryptoheroes.net/
[dice]: https://dice.one/
[idex]: https://idex.market/
[kyber]: https://kyber.network/
[bancor]: https://www.bancor.network/token/DAPP
[bouncer-proxy]: https://github.com/austintgriffith/bouncer-proxy
[burner-wallet]: https://github.com/austintgriffith/burner-wallet
[how-to-host-a-burner-wallet-event]: https://medium.com/gitcoin/how-to-host-a-burner-wallet-event-53a429035a24
[finality-gadget]: https://medium.com/@ralexstokes/the-finality-gadget-2bf608529e50
[beacon-chain-spec]: https://medium.com/@ralexstokes/the-finality-gadget-2bf608529e50
[randao]: https://www.randao.org/
[near-randomness]: https://nearprotocol.com/blog/randomness-in-blockchain-protocols/
[coda]: https://codaprotocol.com/
[zcash]: https://z.cash/
[monero]: https://www.getmonero.org/
[beanstalk]: https://www.beanstalk.network/
[zkp-slides]: https://docs.google.com/presentation/d/1-QB6DAHliQRAUW5rdCqSRQ_w6W2yGTidB61UWzq_p20
[zokrates]: https://github.com/Zokrates/ZoKrates
[bellman]: https://github.com/zkcrypto/bellman
[snarky]: https://github.com/o1-labs/snarky
[libsnark]: https://github.com/scipr-lab/libsnark
[circom]: https://github.com/iden3/circom
[snarkjs]: https://github.com/iden3/snarkjs
[go-snark]: https://github.com/arnaucube/go-snark
[zk-snark-explanation]: https://arxiv.org/pdf/1906.07221.pdf
[stark-go]: https://github.com/wolkdb/deepblockchains/tree/master/stark
[libstark]: https://github.com/elibensasson/libSTARK
[bulletprooflib]: https://github.com/bbuenz/BulletProofLib
[ristretto]: https://github.com/dalek-cryptography/bulletproofs
[edcon2019]: https://github.com/matter-labs/Edcon2019_material
[semaphore]: https://github.com/kobigurk/semaphore
[ethsnarks]: https://github.com/HarryR/ethsnarks
[erc1404]: https://erc1404.org/
[squarelink]: https://squarelink.com/
[trinity]: https://trinity.ethereum.org/
[py-evm]: https://github.com/ethereum/py-evm
[namecoin]: https://www.namecoin.org/
[ens]: https://ens.domains/
[almonit.eth]: http://almonit.eth.link/
