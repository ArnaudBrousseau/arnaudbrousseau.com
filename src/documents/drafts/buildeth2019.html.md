---
title: "What I Learned at BuildEth"
date: 2019-07-19
layout: "draft"
activeNavItem: "notes"
---

# The State of the Ethereum NetworkScott Bigelow, Amberdata

Trends on Ethereum:
* 40B gas per day burned
* deeper contract calls
* https://2018.ethereuminreview.com/

Dapps:
* uniswap
* pooltogether
* makerDAO: interacting with a lot more assets going forward
* ZRX
* wrapped crypto kitties

(amberdata.io)

# The State of the CommunityGrant Hummer, Chromatic Capita

User community is not there.

24,000 (2016)
240,000 (2017)
420,000 (2018)
440,000 (2019)

today 20,000 users per day across all dapps
most popular dapps are 1,000 users per day

DeFi is the exception

Dev community: healthy, with 1.3M users on Meetups

EthGlobal hackathons: blooming.

Investors are the least important part of the community.

# The Ethereum FoundationAlbert Ni, Ethereum Foundation

Ethereum foundation: how they think about community development?

* Coherence is not completeness => easier to have a strong opinion with less info

Good Strategy Bad Strategy => good book to pick up?


# A Tour of the DApp LandscapeOrest Byskosh, Ausum Ventures

Tour of dapp landscape:


Nick Szabo coined the term smart contract

Elementus (analytics tool)
(https://elementus.io/)k

August 2018: over 28B dollars have been raised.

CryptoKitties (126 users)
Superrare (10 users)
opensea (148 users)
auctionity (149 users)

Games and gambling are significantly more successful with users
* TRONbet (3.7k)
* My crypto heroes (2.7k)
* Dice (2.2k)

Decentralized finance
* 0x has 700k txs
* IDEX has 1k users per day)
* Kyber (350 users per day)
* Uniswap (2k ETH in daily volume)
* Bancor (300 tx a day)

# Wallets, UX/UI, and MoreAustin Griffith, Burner Wallet

Bouncer proxy
metatx.io

burner wallet

"how to host a burner wallet event"

the DAOG game

Running on xDAI


# The Finality Gadget: Putting ETH2 to WorkAlex Stokes, Ethereum Foundation

ETH 2.0, the finality gadget (Alex Stokes)

Updates:
* PoS consensus
scalability with sharding

ETH 2.0 rollout:
* Phase 0: beacon chain
* Phase 1: shard data chains
* Phase 2: shard application chains

Beacon chain is a systel-level blockchain. Along with beacon chain Casper (PoS consensus) is being rolled out. Empty references to shards are being dropped.

Shard data chains (add 1024 shards)
Blocks just have 16kb of random data
canonical shards are crosslinked into the beacon chain

Phase 2: eWASM VM, flexible execution environments, sharing of application chains

Ethereum 1.x can be improved today without waiting for ETH2.0. One of these things is Finality Gadget.

Finality Gadget (part of casper):
* in the normal case, validators attest to blocks in the canonical chain
* if more than 2/3rd of validators attest to a given block, it is
if the validators make two successive justifications, then the first justfiied block is finalized

If a block becomes finalized we can prove

Under normal conditions ETH1.0 block hashes enter the beaconn chain with every beacon block

The casper consensus finallizes these beacon blocks
if an ETH1.0 block hash is finalized on the beacon chain, then every block beneath it in on the ETH 1.0 chain is implicitly finalized as well

This is still experimental. Taking place on ethereum-magicians.org/t/finality...

# How We Developed the ETH2 ClientTerence Tsao, Prysmatic Labs

Terence Tsao (Prysmatic Labs), How we design the ETH2.0 client

ETH2.0:
* Beacon node: maintains the state of the beacon chain, communicates with other beacon nodes, responds to validator client queries
* Validator client: maintains private / sensitive data & query beacon nodes to perform validator duties

We need standards! in-progress specs: https://github.com/ethereum/eth2.0-specs/blob/dev/specs/core/0_beacon-chain.md

# Using Randomness in Smart ContractsHaseeb Qureshi, Metastable

Source of randomness on the blockchain:
* blockhashes suck
* off-chain beacons are expensive
* RANDAO: last actor problem

Unbiasable solutions:
* verifiable delay functions: hard function that can only be computed sequentially (not parallelizable)
* example: iterated hashing. But slow to verify

Solution: f(D, N1 ^ N2 ^ N3 ...)

# Writing Smart Contracts with ZK ProofsElena Nadolinski, Beanstalk Network

ZKPs on ETH

ZKPs: how to reveal knowledge without the solution (waldo analogy)

ZKPs != privacy
ZKPs == computation proof

f(x) = y. Reveal y + proof, without x

x can be change to a smart contract (coda)

possible applications:
* credit card score reveal (it's more than 700, without revealing it
* my dna is in this set of good people, without revealing the DNA
* I made a tx with this account, without revealing the tx
* I'm a part of a group which can access this website (without revealing who I am) -- auth
* outsourcing computation (to prove that a computer made honest computation)

zk-SNARKSs (most popular, more than 50+ variations, some quantum secure).
288 bytes, 2.3s 10ms (proof size, prover time, verification time)
zk-STARKs (newer)
45Kb-200Kb, 1.6s, 16ms(proof size, prover time, verification time)
bulletproofs (coming from Stanford) -- Stellar is working on improvements -- good for range proofs
1.3kb, 30s, 1100ms(proof size, prover time, verification time)
sonic (solves the problem of 
Aurora

Projects using ZKPs:
Coda, beanstalk (privacy coin), 0x, Zcash, monero. Matter

SNARKS:
* zokrates, bellman, snarky, libsnark, circum, zksnark-sr, SIZK, Go-snark

STARKSs: go, C++ implementations

Bulletproofs: ristretto, Benedikt's Bunzz Java implementations

Easiest to start on:
* zokrates (https://github.com/ethereum/eth2.0-specs/blob/dev/specs/core/0_beacon-chain.md), ETHSnarks 
* iden3/circum/snarkjs
* tutorial by matter labs
* rollup and roll up token
* sempahore (to prove that you're part of a group -- to prove that you're part of a company and make a statement without revealing who you are

(TODO: get link to paper in the slides)

@leanthebean
beanstalk.network

# Geofencing with ERC 1404Mason Borda, TokenSoft

ERC-1404, by tokensoft

Tokensoft Clients: Hashgraph, Tezos, tokenized funds, real estate. 30 clients.

Security tokens:
* any token treated as a security token
* asset backed or not


banking (KYC/AML)
securities
tax

Regulation S (take money from US investors)
Regulation D (take money from foreign entities)
Distributionnn compliance period (can't have tokens cross borders)


"Knox wallet": multisig wallet on top of ethereum. QR code videos?!

Other things possible with ERC1404:
* geofencing
* set maximum ownership
* revocability
* administrators

# Wallet Interoperability DiscussionMyungin Lee/Alex Patin, Squarelink

Squarelink people
=================
Portus, Squarelink
Problem is discoverability

https://squarelink.com/


# PY-EVM: Reinventing Sync is Easier than Optimizing PythonJason Carver, Ethereum Foundation
Syncing Trinity, Jason Carver
=============================
Trinity is the Python client for the ethereum blockchain, powered by py-evm

Beam sync: why haven't we been doing this from the start?

Regular sync: begin at genesis, execute transactions in block, locally generate state at the end.

Fast sync: SKIP execution till recent head, download state from that head, then go from there. Bottlenecks:
* account and storage download
* things move while you download => trie pivot, because peers drop old roots (happens after ~100 blocks)

Beam sync:
* collect only state data needed to execute block
* start up without state
* request on data fault (page fault like)
* Generate state at next block
* keep requested and generated state
* repeat on next block
* typical mainnet block: 3000 state trie nodes

Swarming as a side benefit


# Ethereum Name Service as a UX SolutionBrantly Millegan, Ethereum Name Service
ENS (brantly millegan)

History:
* namecoin (.bit) first fork of bitcoin code, blockchain just dedicated to naming
* .eth => ENS

ENS has no servers! Entirely based on smart contracts

name.eth inside of opera just works and loads IPFS websites

http://almonit.eth.link/
