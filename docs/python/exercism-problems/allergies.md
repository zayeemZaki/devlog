---
sidebar_position: 8
title: Allergies
sidebar_label: Allergies
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Allergies</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-26</em></span>
</h1>

My Solution: [Exercism Allergies solution](https://exercism.org/tracks/python/exercises/allergies/solutions/zayeemZaki)

## Instructions

Determine whether a person is allergic to a given item based on their allergy score.

Each allergen corresponds to a bit in the score. Return the allergens in score order and report whether the person is allergic to a specific item.

For example, if Tom is allergic to peanuts and chocolate, he gets a score of 34.

Given that score, your program should be able to:

- Tell whether Tom is allergic to any one of those allergens.
- List all the allergens Tom is allergic to.

Scores can also include allergens not listed above, such as 256, 512, or 1024. Your program should ignore those higher bits. For example, if the score is 257, your program should only report the eggs allergy.

## Solution

```python
class Allergies:

    def __init__(self, score):
        self.score = score
        self.allergens = {
            1: 'eggs',
            2: 'peanuts',
            4: 'shellfish',
            8: 'strawberries',
            16: 'tomatoes',
            32: 'chocolate',
            64: 'pollen',
            128: 'cats'
        }

    def allergic_to(self, item):
        return item in self.lst

    @property
    def lst(self):
        res = []
        for value, name in self.allergens.items():
            if value & self.score:
                res.append(name)

        return res
```

## Syntax Notes

- The allergy score is treated as a bit mask, so each allergen maps to a power of two.
- The `&` operator is bitwise AND. It compares two numbers one bit at a time and keeps a bit only when that bit is set in both values.
- Here, `value & self.score` checks whether the allergen's bit is present in the score. If the result is non-zero, that allergen is included.
- The `lst` property collects all matching allergens in score order.
- `allergic_to` checks membership against the computed allergen list.
