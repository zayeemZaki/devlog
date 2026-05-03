---
sidebar_position: 11
title: Sieve
sidebar_label: Sieve
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Sieve</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-03</em></span>
</h1>

My Solution: [Exercism Sieve solution](https://exercism.org/tracks/python/exercises/sieve/solutions/zayeemZaki)

## Instructions

Return all prime numbers less than or equal to a given limit.

If the limit is below `2`, return an empty list.

## Solution

```python
def primes(limit):
    if limit < 2:
        return []

    is_prime = [True] * (limit + 1)
    is_prime[0] = is_prime[1] = False

    for p in range(2, int(limit ** .5) + 1):
        if is_prime[p]:
            for i in range(p * p, limit + 1, p):
                is_prime[i] = False

    return [p for p in range(2, limit + 1) if is_prime[p]]
```

## Syntax Notes

- A boolean list tracks which numbers are still considered prime.
- Multiples of each discovered prime are marked `False`.
- The outer loop only needs to run up to the square root of the limit.
- The final list comprehension collects every number that remained prime.
