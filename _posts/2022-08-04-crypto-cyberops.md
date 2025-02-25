---
layout: post
comments: true
title: Crypto Cyberops
date: 2022-08-04 08:00:00
description: Writing this down because the other liability is forgetting the protocol
tags: blockchain
categories: tutorial
---

Here's my multifactor way to store your crypto safely with a break glass scenario for emergencies:

Use Gnosis Safe to manage a multi-sig wallet secured by multiple hardware wallets like those from [Ledger](https://www.ledger.com/), [Grid+ Lattice1](https://gridplus.io/products/grid-lattice1), and [Trezor](https://trezor.io/).

Next, secure your hardware wallets with the following protocol:

1. Use steel plates/capsules to protect from physical events and degradation over time.
2. Utilize [BIP39 passphrase](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed) to require a password on top of the seed phrase.
3. Shamir's secret sharing to shard seed phrases to store steel plates/capsules in multiple locations, and prevents any single discovery to be an issue like [Shamir39](https://github.com/iancoleman/shamir39)

i.e., multisig wallet with the hardware wallets access to multiple factors with password/pins, and recovery of hardware wallets in case of hardware failure requires knowledge (BIP39 passphrase) on top of just physically recovering multiple seeds. The hardware wallets are somewhat optional but it can be a security risk itself to try and recover your private keys often.
