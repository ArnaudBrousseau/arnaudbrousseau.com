---
title: "Crypto-currencies"
date: 2017-12-28
layout: "draft"
activeNavItem: "notes"
---
This note is an attempt at documenting my journey to understanding what BTC,
ETH, and other cryptocurrencies are about. I'm trying to record links and key
concepts that they've explained or consolidated for me. YMMV of course so it's
no guarantee that the same resources will have the same effects on you!

# What's Ethereum?

https://medium.com/@gilpenchina/ethereum-technical-deep-dive-from-uc-berkeley-meetup-june-2017-f1dfbd898ff2


# Solidity you say?

https://github.com/ArnaudBrousseau/solidity-app

https://remix.ethereum.org

# Learning by doing: blockbin.io

https://github.com/ArnaudBrousseau/blockbin

# Diving into details

## SHA256
http://www.righto.com/2014/09/mining-bitcoin-with-pencil-and-paper.html

## Ethereum Trie

https://github.com/ethereum/wiki/wiki/Patricia-Tree
https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/

## Mining
http://www.righto.com/2014/02/bitcoin-mining-hard-way-algorithms.html

Explain the concept of miner pool and how they work in practice, as well as the protocol underneath

## BTC protocol
http://www.righto.com/2014/02/bitcoins-hard-way-using-raw-bitcoin.html

## Easter eggs
Didn't know Bitcoin allowed for something like this to happen!
http://www.righto.com/2014/02/ascii-bernanke-wikileaks-photographs.html


## Crypto kitties contract

- contracts and code associated with them stick around forever. Here's CryptoKitties': https://etherscan.io/address/0x06012c8cf97bead5deae237070f9587f8e7a266d#code
- UI has to be sleek: https://www.cryptokitties.co/marketplace
- Given that everything is "public", how can you bake "secret sauce" in? Answer: obfuscation. For instance, the algorithm for CryptoKitties breeding, supposed to be super secret, is deployed compiled at https://etherscan.io/address/0xf97e0a5b616dffc913e72455fde9ea8bbe946a2b#code


