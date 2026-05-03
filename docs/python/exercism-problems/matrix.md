---
sidebar_position: 9
title: Matrix
sidebar_label: Matrix
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Matrix</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-27</em></span>
</h1>

My Solution: [Exercism Matrix solution](https://exercism.org/tracks/python/exercises/matrix/solutions/zayeemZaki)

## Instructions

Given a string that represents a matrix of numbers, parse it into rows and columns.

Rows are separated by newlines, and the numbers in each row are separated by spaces. For example, the string:

```text
9 8 7
5 3 2
6 6 7
```

represents the rows `9, 8, 7`, `5, 3, 2`, and `6, 6, 7`.

Your program should be able to return:

- A list of the rows, reading each row left-to-right from top to bottom.
- A list of the columns, reading each column top-to-bottom from left to right.

## Solution

```python
class Matrix:
    matrix_array = []

    def __init__(self, matrix_string):
        self.matrix_array = []
        for row in matrix_string.split('\n'):
            matrix_row = []
            for num in row.split():
                matrix_row.append(int(num))

            self.matrix_array.append(matrix_row)

    def row(self, index):
        return self.matrix_array[index - 1]

    def column(self, index):
        res = []
        for row in self.matrix_array:
            res.append(row[index - 1])

        return res
```

## Syntax Notes

- `split('\n')` breaks the matrix string into separate rows.
- `split()` on each row breaks that row into individual number strings.
- `int(num)` converts each string number into a real integer before storing it.
- `row(index)` and `column(index)` use 1-based indexing, so `index - 1` converts the user-facing index into a Python list position.
- `column(index)` walks through each stored row and picks the same position from each one.
