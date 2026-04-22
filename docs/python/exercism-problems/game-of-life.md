---
sidebar_position: 6
title: Game of Life
sidebar_label: Game of Life
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Game of Life</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-22</em></span>
</h1>

My Solution: [Exercism Game of Life solution](https://exercism.org/tracks/python/exercises/game-of-life/solutions/zayeemZaki)

## Instructions

Each cell interacts with its 8 neighbors (horizontal, vertical, diagonal) every generation.

Rules:

- Any live cell with 2 or 3 live neighbors lives on.
- Any dead cell with exactly 3 live neighbors becomes live.
- All other cells die or stay dead.

Given a matrix of `1` (live) and `0` (dead), apply these rules to every cell and return the next generation.

## Solution

```python
def tick(matrix):
    if not matrix or not matrix[0]:
        return []

    rows = len(matrix)
    cols = len(matrix[0])
    
    res = [[0 for _ in range(cols)] for _ in range(rows)]    
    
    for i in range(rows):
        for j in range(cols):
            live_cells = 0
            dir = [(-1, -1), (0, -1), (1, -1), (-1, 0), (1, 0), (-1, 1), (0, 1), (1, 1)]

            for d in dir:
                new_x = i + d[0]
                new_y = j + d[1]

                if new_x < 0 or new_x > rows-1 or new_y < 0 or new_y > cols-1:
                    continue 

                if matrix[new_x][new_y] == 1:
                    live_cells += 1

            if matrix[i][j] == 1:
                if (live_cells == 2 or live_cells == 3):
                    res[i][j] = 1
                else:
                    res[i][j] = 0
            else:
                if live_cells == 3:
                    res[i][j] = 1
                else:
                    res[i][j] = 0

    return res
```

## Mental Model

For each cell, count live neighbors in all eight surrounding directions, then apply Conway's rules to build the next grid in a separate matrix.
