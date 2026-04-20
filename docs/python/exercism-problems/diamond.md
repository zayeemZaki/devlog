---
sidebar_position: 2
title: Diamond
sidebar_label: Diamond
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Diamond</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-19</em></span>
</h1>

My Solution: [Exercism Diamond solution](https://exercism.org/tracks/python/exercises/diamond/solutions/zayeemZaki)

## Instructions

Generate a diamond shape from a given uppercase letter.

The diamond is centered, symmetrical, and built from lines of letters with spaces between repeated characters. The first and last rows contain only `A`. The widest row contains the target letter twice, with all letters between the top and bottom mirrored around the center.

Example for `C`:

<div style={{ margin: '1rem auto', width: 'fit-content', fontFamily: 'monospace', whiteSpace: 'pre', lineHeight: 1.15, fontSize: '1.1rem', textAlign: 'left' }}>
{`  A  
   B B 
  C   C
   B B 
    A  `}
</div>

## Solution

```python
def rows(letter):
    n = ord(letter) - ord('A')
    top_half = []

    for i in range(n+1):
        char = chr(ord('A') + i)
        outer_space = ' ' * (n-i)

        if i == 0:
            row = outer_space + char + outer_space
        else:
            inner_space = ' ' * (2 * i - 1)
            row = outer_space + char + inner_space + char + outer_space    

        top_half.append(row)


    return top_half + top_half[:-1][::-1]
```

## Mental Model

Build the top half from `A` up to the requested letter, then mirror that list without the last row to form the bottom half.