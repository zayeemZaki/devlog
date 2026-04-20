---
sidebar_position: 1
title: Say
sidebar_label: Say
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Say</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-19</em></span>
</h1>

My Solution: [Exercism Say solution](https://exercism.org/tracks/python/exercises/say/solutions/zayeemZaki)

## Instructions

Convert a non-negative integer into its English words representation.

The valid range is from `0` to `999_999_999_999`. If the input is outside that range, raise a `ValueError` with the message `input out of range`.

Rules:

- `0` becomes `zero`
- Numbers below `20` use their direct word form
- Numbers below `100` use tens words with a hyphen when needed, like `twenty-one`
- Numbers below `1000` use `hundred`
- Larger numbers use `thousand`, `million`, and `billion`

## Solution

```python
def say(number):

    if number < 0 or number > 999_999_999_999:
        raise ValueError("input out of range")

    if number == 0:
        return 'zero'
    
    ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
                "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
                "seventeen", "eighteen", "nineteen"]
    TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
    SCALES = ["", "thousand", "million", "billion"]

    def less_than_1000(n):
        if n < 20:
            return ONES[n]
        elif n < 100:
            tens_word = TENS[n // 10]
            ones_word = ONES[n % 10]
            return f"{tens_word}-{ones_word}" if ones_word else tens_word
        else:
            hundreds_word = ONES[n // 100] + " hundred"
            remainder = less_than_1000(n % 100)
            return f"{hundreds_word} {remainder}" if remainder else hundreds_word

    chunks = []
    scale_idx = 0
    
    while number > 0:
        chunk = number % 1000
        if chunk != 0:
            chunk_str = less_than_1000(chunk)
            if SCALES[scale_idx]:
                chunk_str += " " + SCALES[scale_idx]
            chunks.append(chunk_str)

        number //= 1000
        scale_idx += 1

    return " ".join(reversed(chunks))
```

## Mental Model

Break the number into groups of three digits, convert each chunk independently, then attach the right scale word before combining them from largest to smallest.