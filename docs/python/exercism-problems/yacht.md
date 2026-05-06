---
sidebar_position: 15
title: Yacht
sidebar_label: Yacht
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Yacht</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-06</em></span>
</h1>

My Solution: [Exercism Yacht solution](https://exercism.org/tracks/python/exercises/yacht/solutions/zayeemZaki)

## Instructions

Yacht is a compact scoring exercise built around five dice and a category-based score table.

You always score the same five dice through exactly one category, and each category has its own rule. The problem is mostly about recognizing patterns in a short list:

- Number categories like Ones, Twos, and Threes only count matching faces.
- Full House needs exactly three of one value and two of another.
- Four of a Kind scores four matching dice, even if a fifth die is different.
- Little Straight is `1, 2, 3, 4, 5` and Big Straight is `2, 3, 4, 5, 6`.
- Yacht scores `50` when all five dice are the same.

## Approach

I solved this with one `score(dice, category)` function and a frequency map.

Once I know how many times each face appears, the category checks become straightforward:

- For Ones through Sixes, multiply the face value by how many times it appears.
- For Full House, look for the exact count pattern `[2, 3]`.
- For Four of a Kind, return the score as soon as any face appears four or more times.
- For the straights, compare the sorted dice against the expected sequence.
- For Yacht, confirm that there is only one unique face.

Because the input is always just five dice, this style is easier to read and test than trying to compress everything into one complicated expression.

## Solution

```python
# Score categories.
# Change the values as you see fit.
YACHT = "Yacht"
ONES = "Ones"
TWOS = "Twos"
THREES = "Threes"
FOURS = "Fours"
FIVES = "Fives"
SIXES = "Sixes"
FULL_HOUSE = "Full House"
FOUR_OF_A_KIND = "Four of a Kind"
LITTLE_STRAIGHT = "Little Straight"
BIG_STRAIGHT = "Big Straight"
CHOICE = "Choice"


def score(dice, category):
    counts = {x: dice.count(x) for x in set(dice)}

    if category == ONES: 
        return 1 * counts.get(1, 0)
    elif category == TWOS: 
        return 2 * counts.get(2, 0)
    elif category == THREES: 
        return 3 * counts.get(3, 0)
    elif category == FOURS: 
        return 4 * counts.get(4, 0)
    elif category == FIVES: 
        return 5 * counts.get(5, 0)
    elif category == SIXES: 
        return 6 * counts.get(6, 0)
    elif category == FULL_HOUSE: 
        if sorted(counts.values()) == [2, 3]:
            return sum(dice)
        return 0
    elif category == FOUR_OF_A_KIND: 
        for face, count in counts.items():
            if count >= 4:
                return face * 4
        return 0
    elif category == LITTLE_STRAIGHT:
        return 30 if sorted(dice) == [1, 2, 3, 4, 5] else 0
    elif category == BIG_STRAIGHT:
        return 30 if sorted(dice) == [2, 3, 4, 5, 6] else 0
    elif category == CHOICE:
        return sum(dice)
    elif category == YACHT:
        return 50 if len(counts) == 1 else 0

    return 0
```

## Syntax Notes

- A frequency map keeps the scoring logic compact.
- Branching early keeps each scoring rule isolated and easy to scan.
- Full house is detected by the frequency pattern `[2, 3]`, which avoids false positives like five of a kind.
- Straight scoring is just a sorted list comparison because the dice may arrive unordered.
- Yacht is the simplest case: all dice must have the same face.
