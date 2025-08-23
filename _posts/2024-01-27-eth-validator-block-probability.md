---
layout: post
comments: true
giscus_comments: true
title: Estimating the Probability of Not Proposing an Ethereum Block
date: 2024-01-27 08:00:00
description: When your solo staking setup isn't proposing, you are asking "WHAT ARE THE ODDS?!"
tags: blockchain tutorial
---

**Plot**: [yewjin.com/assets/html/eth_block_probability.html](https://www.yewjin.com/assets/html/eth_block_probability.html) is a plot of the probabilities where you can fit in your own values.

**Note (June 2024)**: This blog post is updated regularly (ideally daily!) with the current eligible ETH value from the blockchain.

As an Ethereum staker, one of the key aspects of participation in the network is decentralization ... OK ... nevermind it's the opportunity to propose a block and hope for winning the block lottery. The probability of getting this chance, however, depends on several factors, most notably the total number of validators in the network and the number of validators you control. Here's how to calculate the probability of not proposing a block over different time periods - an hour, a day, a week, or even a month. Because, admit it, you are only asking this question after not getting a block proposal for that long and you are asking: "WHAT ARE THE ODDS?!"

The Ethereum PoS protocol, specifically in the context of block validation, operates with discrete time units called slots. A new block is proposed in each slot by a randomly selected validator. The probability of a specific validator being chosen for any given slot is inversely proportional to the total number of effective ETH balance of each validator. See [Block Proposal (ethereum.org)](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/block-proposal/)

1. **Total Eligible ETH (N):** The total amount of eligible ETH in the network. As of 2025-08-23 10:15, it's approximately 35713059 ETH.
2. **Your ETH (V):** The amount of ETH you have staked.
3. **Time Period (T):** The duration for which you want to calculate the probability, measured in slots. (Note: The Ethereum network typically operates with a slot time of 12 seconds.)

### Calculating the Probability

The probability of not proposing a block in a single slot, for a user with V ETH, is calculated as follows:

```
Probability (Single Slot) = 1 - (V / N)
```

To extend this to a specific time period, T slots, the formula becomes:

```
Probability (T Slots) = (1 - (V / N))^T
```

Handy number of slots in various time periods

- **For One Hour:** With T = 300 slots (assuming 12 seconds per slot).
- **For One Day:** T = 7,200 slots.
- **For One Week:** T = 50,400 slots.
- **For One Month:** Approximating a month as 30 days, T = 216,000 slots.

## Probabilities for 32 ETH

- **Probability of not proposing a block in one slot:** $$ 1 - \frac{32}{35713059} $$
- **One Hour (300 slots):** $$ \left( 1 - \frac{32}{35713059} \right)^{300} $$
- **One Day (7,200 slots):** $$ \left( 1 - \frac{32}{35713059} \right)^{7200} $$
- **One Week (50,400 slots):** $$ \left( 1 - \frac{32}{35713059} \right)^{50400} $$
- **One Month (approx. 30 days, 216,000 slots):** $$ \left( 1 - \frac{32}{35713059} \right)^{216000} $$

### Summary

- **Chance of not proposing a block in one hour:** Approximately 99.97%
- **Chance of not proposing a block in one day:** Approximately 99.36%
- **Chance of not proposing a block in one week:** Approximately 95.58%
- **Chance of not proposing a block in one month:** Approximately 82.40%

## Probabilities for 3200 ETH

- **Probability of not proposing a block in one slot:** $$ 1 - \frac{3200}{35713059} $$
- **One Hour (300 slots):** $$ \left( 1 - \frac{3200}{35713059} \right)^{300} $$
- **One Day (7,200 slots):** $$ \left( 1 - \frac{3200}{35713059} \right)^{7200} $$
- **One Week (50,400 slots):** $$ \left( 1 - \frac{3200}{35713059} \right)^{50400} $$
- **One Month (approx. 30 days, 216,000 slots):** $$ \left( 1 - \frac{3200}{35713059} \right)^{216000} $$

### Summary

- **Chance of not proposing a block in one hour:** Approximately 97.35%
- **Chance of not proposing a block in one day:** Approximately 52.46%
- **Chance of not proposing a block in one week:** Approximately 1.09%
- **Chance of not proposing a block in one month:** Practically 0% (very close to zero)

# Calculating the Probability of Proposing At Least B Blocks

To calculate the probability of proposing at least B blocks, we can use the Poisson distribution as an approximation for large T, where T is the total number of slots and p is the probability of proposing a block in a slot. The parameter lambda (λ) for the Poisson distribution is:

$$ \lambda = T \times \left( \frac{V}{N} \right) $$

The cumulative probability of proposing at least B blocks is:

<!-- prettier-ignore -->
$$ P(\text{proposing at least } B \text{ blocks}) = 1 - \sum_{k=0}^{B-1} \frac{\lambda^k e^{-\lambda}}{k!} $$

where $$ \lambda = T \times \left( \frac{V}{N} \right) $$.

### Example Probabilities for 32 ETH

<!-- prettier-ignore -->
- **Probability of proposing at least 1 block in one day:** $$ 1 - \sum_{k=0}^{0} \frac{\lambda_{1 \, day}^k e^{-\lambda_{1 \, day}}}{k!} $$
<!-- prettier-ignore -->
- **Probability of proposing at least 2 blocks in one week:** $$ 1 - \sum_{k=0}^{1} \frac{\lambda_{1 \, week}^k e^{-\lambda_{1 \, week}}}{k!} $$
<!-- prettier-ignore -->
- **Probability of proposing at least 5 blocks in one month:** $$ 1 - \sum_{k=0}^{4} \frac{\lambda_{1 \, month}^k e^{-\lambda_{1 \, month}}}{k!} $$

Finally, if you want to see the latest statistics on block proposal frequency, see [LuckyStaker.com](https://luckystaker.com/home/)
