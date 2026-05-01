---
sidebar_position: 13
title: Saddle Points
sidebar_label: Saddle Points
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Saddle Points</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-26</em></span>
</h1>

My Solution: [Exercism Saddle Points solution](https://exercism.org/tracks/python/exercises/saddle-points/solutions/zayeemZaki)

## Instructions

Find all saddle points in a matrix.

A saddle point is an element that is the largest value in its row and the smallest value in its column.

Rules:

- Return a list of saddle points as objects with 1-based `row` and `column` values.
- Return an empty list for an empty matrix.
- Raise `ValueError("irregular matrix")` if the rows are not all the same length.

## Solution

```python
def saddle_points(matrix):

    if not matrix:
        return []

    target_len = len(matrix[0])
    for row in matrix:
        if len(row) != target_len:
            raise ValueError("irregular matrix")
    
    max_rows = [max(row) for row in matrix]
    min_cols = [min(col) for col in zip(*matrix)]

    spots = []
    for r in range(len(matrix)):
        for c in range(len(matrix[r])):
            if matrix[r][c] == max_rows[r] and matrix[r][c] == min_cols[c]:
                spots.append({"row": r + 1, "column": c + 1})

    return spots
```

## Syntax Notes

- The empty-matrix check comes first so the rest of the logic can assume at least one row exists.
- `max_rows` stores the largest value from each row.
- `zip(*matrix)` transposes the matrix so each column can be analyzed as a sequence.
- `min_cols` stores the smallest value from each column.
- A point qualifies only when its value matches both the row maximum and the column minimum.
