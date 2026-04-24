---
sidebar_position: 7
title: Transpose
sidebar_label: Transpose
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Transpose</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-24</em></span>
</h1>

My Solution: [Exercism Transpose solution](https://exercism.org/tracks/python/exercises/transpose/solutions/zayeemZaki)

## Instructions

Transpose a list of strings so that rows become columns and shorter lines are padded with spaces only where needed.

Rules:

- Return an empty string for empty input.
- Preserve the shape implied by the longest line.
- Pad missing characters with spaces after trimming any trailing placeholder padding.

## Solution

```python
def transpose(text):
    if text == "":
        return ""

    lines = text.split('\n')

    max_len = 0
    for line in lines:
        max_len = max(max_len, len(line))

    transpose = []

    for col in range(max_len):
        new_row = ""
        for row in lines:
            if col < len(row):
                new_row += row[col]
            else:
                new_row += '~'

        new_row = new_row.rstrip("~")
        new_row = new_row.replace("~", " ")

        transpose.append(new_row)

    return "\n".join(transpose)
```

## Syntax Notes

- The early return handles the empty-input edge case directly.
- The placeholder character `~` makes it easy to distinguish real characters from padded gaps before converting them to spaces.
- The outer loop builds each output row by walking one column at a time across the input lines.
