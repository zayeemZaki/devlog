---
sidebar_position: 16
title: Queen Attack
sidebar_label: Queen Attack
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Queen Attack</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-29</em></span>
</h1>

My Solution: [Exercism Queen Attack solution](https://exercism.org/tracks/python/exercises/queen-attack/solutions/zayeemZaki)

## Instructions

Determine if two queens on a chessboard can attack each other.

Rules:

- Queens are on an 8x8 board with coordinates `0` to `7`.
- Raise `ValueError` with appropriate messages for invalid positions (not positive, not on board).
- Raise `ValueError` if both queens are in the same square.
- Queens can attack horizontally, vertically, or diagonally.

## Solution

```python
class Queen:
    def __init__(self, row, column):
        if row < 0:
            raise ValueError("row not positive")
        if row > 7:
            raise ValueError("row not on board")
        if column < 0:
            raise ValueError("column not positive")
        if column > 7:
            raise ValueError("column not on board")
            
        self.row = row 
        self.column = column
        
    def can_attack(self, another_queen):
        if self.row == another_queen.row and self.column == another_queen.column:
            raise ValueError("Invalid queen position: both queens in the same square")

        return (
            self.row == another_queen.row or 
            self.column == another_queen.column or 
            abs(another_queen.row - self.row) == abs(another_queen.column - self.column)
        )
```

## Syntax Notes

- Validation happens in `__init__` so invalid positions are caught at construction time.
- `can_attack()` first checks for the same-square edge case.
- Same row: `self.row == another_queen.row`
- Same column: `self.column == another_queen.column`
- Diagonal: the absolute differences in row and column are equal.
