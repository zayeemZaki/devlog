---
sidebar_position: 10
title: Pythagorean Triplet
sidebar_label: Pythagorean Triplet
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Pythagorean Triplet</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-26</em></span>
</h1>

My Solution: [Exercism Pythagorean Triplet solution](https://exercism.org/tracks/python/exercises/pythagorean-triplet/solutions/zayeemZaki)

## Instructions

A Pythagorean triplet is a set of three natural numbers, &#123;a, b, c&#125;, for which:

```text
a^2 + b^2 = c^2
```

and such that:

```text
a < b < c
```

Given an input integer N, find all Pythagorean triplets for which `a + b + c = N`.

For example, with N = 1000, there is exactly one Pythagorean triplet for which `a + b + c = 1000`: &#123;200, 375, 425&#125;.

Return a list of lists, such as `[[a, b, c]]`. The order of the outer list does not matter.

## Solution

```python
def triplets_with_sum(number):

    # We can solve this by combining the two equations:
    # c = number - a - b
    # a^2 + b^2 = c^2
    # which gives:
    # b = (number^2 - 2 * number * a) / (2 * (number - a))

    triplets = []

    for a in range(1, number // 3):
        numerator = (number ** 2) - (2 * number * a)
        denominator = 2 * (number - a)

        if numerator % denominator == 0:
            b = numerator // denominator
            c = number - a - b

            if a < b < c:
                triplets.append([a, b, c])

    return triplets
```

## Syntax Notes

- The sum condition lets us write `c` in terms of `a`, `b`, and `number`.
- Substituting that into `a^2 + b^2 = c^2` gives a direct formula for `b`.
- `range(1, number // 3)` is enough because `a` must be the smallest value in the triplet.
- The `numerator % denominator == 0` check ensures `b` is a whole number.
- The `a < b < c` check filters out duplicates and keeps the triplet in ascending order.