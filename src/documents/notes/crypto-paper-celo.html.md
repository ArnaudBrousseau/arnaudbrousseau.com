---
title: "Crypto Paper: Celo"
date: 2019-04-13
layout: "note"
activeNavItem: "notes"
---

I read [Celo: A Multi-Asset Cryptographic Protocol for Decentralized Social
Payments][celo-whitepaper-hosted] (this link is a hosted version of what can be
found at [this live URL][celo-whitepaper-online], which points to version DRAFT
0.22 at the time of writing.)

What did I learn? What did I understand? What was confusing? Is Celo worth something? Let's write this down.

## New Concepts

Let's cover what I had to research while reading this whitepaper. Celo didn't
invent these concepts but they are referenced or used.

* **Deflationary price instability**. Fancy term to say that prices denominated
  in a currency tend to fall when the currency's value goes up. For instance,
  if goods were priced in ETH during the 2017 market boom, the prices
  denominated in ETH would go down. This is the case for most (all?) cryptocurrencies
* **ZK-SNARKs**. Stands for "Zero-Knowledge Succinct Non-Interactive Argument
  of Knowledge". A mathematical to prove the knowledge of a something (say, the
  knowledge of which number hashes to `0x654737...`) without revealing it to a
  counter-party (in this example, you'd prove you know which number hashes to
  `0x654737...` without revealing the number). This is what
  [ZCash][zcash-zksnark] uses. See [this article][vitalik-zksnark] by Vitalik
  for an in-depth look.
* **Elastic supply rule**. Not entirely sure about that one to be honest. I
  believe this refer's to Celo's "elastic" supply of Celo Dollars to make it
  stable. When the demand grows more Celo Dollars are issued. When it
  shrinks Celo Dollars are bought back.
* **EigenTrust** (and PowerMethod). Algorithm to compute trust in a
  peer-to-peer system. In the context of Celo this is used to make the network
  feel more trustworthy. See [EigenTrust][wikipedia-eigentrust]. The "Power
  Method" is an implementation detail relevant to how eigenvectors (in the
  context of EigenTrust) are computed. See [Power Iteration][wikipedia-power-iteration].
* **Proof-of-bonded-stake**: a small variation on "Proof of Stake". In Celo the
  participants' weight is computed using the amount of Celo Gold bonded AND the
  time left before each bond expires (the more time left for each bond, and the
  more Celo Gold, the better)
* **CPI: Consumer Price Index**. A measure of the cost of various common goods
  and services in a region or country.
* **Shelling-point scheme**. In Celo this is used to establish the fair price
  of stable currencies. A "Schelling Point" is a [Focal
  Point][wikipedia-focal-point]: a piece of data people agree upon without
  communication. In this context Celo uses a "commit-then-reveal" scheme to
  have voters agree on the price of stable coins. First, submit the hash of
  your answer to the question "how much is COINX worth?". Then, on the next
  block, submit your answer. In order to get a reward your answer has to hash
  what you committed on the previous block and be between some percentiles of
  the right answer (say min. 25th, max. 75th). This incentivizes voters to give
  an accurate answer.
* **A "run"**. Term for sell-pressure. When a lot of people want to get rid of
  some asset (correlates with prices going down)
* **Dash's masternodes voting scheme**. See [Dash
  docs][dash-masternode-voting]. This is a type of governance to allocate
  budgets to projects and developers in a decentralized way. Celo plans to use
  this to fund technical improvements to the network, with a proposals and
  "fee-for-implementation" on each of them, voted on by bonded stakeholders.
* **Futarchical governance**. To quote Wikipedia: futarchical governance is "a
  form of government [...] in which elected officials define measures of
  national wellbeing, and prediction markets are used to determine which
  policies will have the most positive effect". This is cited by Celo as a
  potential future improvement so that prediction markets as well as bonded
  stakeholders can weigh in on currency or technical proposals. See
  [Futarchy][wikipedia-futarchy].
* **Demurrage-charged currencies**. Demurrage is the cost of keeping a given
  currency. In the case of standard earthling gold, you need a safe. A good
  one. And maybe some cameras and gards if you have a lot of it. In the context
  of Celo, demurrage is explored as a possibility to give people incentive to
  keep regional currency flowing and avoid centralization. See
  [Demurrage][wikipedia-demurrage].
* **Natural-capital-backed currencies**. A mouthful to designate currencies
  backed by something concrete/natural (gold, land, water, etc).


## Celo Concepts

Now let's get into the meat of this paper: what is Celo? It's a collection of
cryptocurrencies aimed at enabling social payments (think: [Venmo][venmo-url]
or [TransferWise][transferwise-url]).

Celo doesn't have any technical innovations at its core. The innovation is in
how the pieces are put together. To enable social payments Celo bets on
**making public keys disappear** and have users issue payment to phone numbers,
emails, or other more familiar destination "addresses". That's done through a
simple distributed hash table of (alias, public key). To write a record
`(email@example.org, '0x12345...')` in the shared hash table, a validator has
to generate a secret and send it to email@example.org. This secret then has to
be signed with the private key associated with `0x12345...` and sent back to
the validator. It's not rocket-science but it sounds solid. I'd be happy not to
have to deal with public keys or QR codes to pay friends and family. This is
**extremely similar** to [Ethereum Name Service][ethereum-name-service].

Another "social" Celo feature is a distributed "trust" score based on previous
user payment activity. Neat but not exactly new or mind-boggling.

The other interesting piece is the way Celo makes its currencies stable. Celo
Gold and a basket of other crypto-currencies (ETH, BTC, etc) are in the Celo
Reserve. This backs the Celo Dollar, which is a stable crypto-currency pegged
to USD. How is it kept stable? If the Celo Dollar goes above the US Dollar,
more Celo Dollars are created. If the Celo Dollar goes below: Celo dollars are
bought back with the Celo Reserve. The interesting bit comes from the fact that
the Celo Reserve is **common to multiple stable currencies in Celo**. Say Celo
Dollar, Celo Euro and Celo Yen use the same underlying Celo reserve. If the
Celo Dollar is above its USD peg and the Celo Yen is below its JPY peg, the
reserve does not need to be touched. Celo Yens are bought back with brand-new
Celo Dollars. This shrinks the supply of Celo Yen and expands the Celo Dollar
without touching Celo's reserve of Celo Gold and crypto-currencies.

Celo also allows for new currencies to be created with their own reserve
("partition reserve") instead of using the common pre-established Celo reserve
of Celo Gold and other cryptos ("shared reserve").

Celo is a proof-of-stake network, with the variation that the weight of the
participant is proportional to the amount of money bonded AND the time left in
each bond. Each network participant can vote on the price of stable currencies
when they're created and vote on network proposals which can be technical
improvements or new stable currencies. I personally really like the idea of the
network voting on technical proposals along with an implementation fee. Dash
does this as well.

[celo-whitepaper-online]: https://storage.googleapis.com/celo_whitepapers/Celo__A_Multi_Asset_Cryptographic_Protocol_for_Decentralized_Social_Payments.pdf
[celo-whitepaper-hosted]: /pdfs/celo-whitepaper-draft-version-0.22.pdf
[zcash-zksnark]: https://z.cash/technology/zksnarks/
[vitalik-zksnark]: https://medium.com/@VitalikButerin/zk-snarks-under-the-hood-b33151a013f6
[wikipedia-eigentrust]: https://en.wikipedia.org/wiki/EigenTrust
[wikipedia-power-iteration]: https://en.wikipedia.org/wiki/Power_iteration
[wikipedia-focal-point]: https://en.wikipedia.org/wiki/Focal_point_(game_theory)
[dash-masternode-voting]: https://docs.dash.org/en/stable/governance/understanding.html#budgets-and-masternode-voting
[wikipedia-futarchy]: https://en.wikipedia.org/wiki/Futarchy
[wikipedia-demurrage]: https://en.wikipedia.org/wiki/Demurrage_(currency)
[venmo-url]: https://venmo.com/
[transferwise-url]: https://transferwise.com
[ethereum-name-service]: https://ens.domains/
