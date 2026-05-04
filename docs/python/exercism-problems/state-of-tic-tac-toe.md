---
sidebar_position: 14
title: State of Tic-Tac-Toe
sidebar_label: State of Tic-Tac-Toe
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>State of Tic-Tac-Toe</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-26</em></span>
</h1>

My Solution: [Exercism State of Tic-Tac-Toe solution](https://exercism.org/tracks/python/exercises/state-of-tic-tac-toe/solutions/zayeemZaki)

## Instructions

Determine the current state of a tic-tac-toe board.

Rules:

- Return whether the game is `win`, `draw`, or `ongoing`.
- Raise `ValueError` for impossible boards or invalid turn order.
- A board is won when a player has three marks in a row, column, or diagonal.

## Solution

```python
def gamestate(board):

    win_boxes = [
        [(0, 0), (0, 1), (0, 2)], [(1, 0), (1, 1), (1, 2)], [(2, 0), (2, 1), (2, 2)],
        [(0, 0), (1, 0), (2, 0)], [(0, 1), (1, 1), (2, 1)], [(0, 2), (1, 2), (2, 2)],
        [(0, 0), (1, 1), (2, 2)], [(0, 2), (1, 1), (2, 0)]           
    ]

    total_x = 0
    total_o = 0
    for line in board:
        line = line.replace(" ", "")
        for ch in line:
            if ch == 'X':
                total_x += 1
            else:
                total_o += 1

    if total_x - total_o >= 2:
        raise ValueError("Wrong turn order: X went twice")
    if total_o > total_x:
        raise ValueError("Wrong turn order: O started")

        
    occupied_boxes = total_o + total_x

    x_wins = False
    o_wins = False
    for route in win_boxes:
        cord1, cord2, cord3 = route 

        item_cord1 = board[cord1[0]][cord1[1]]
        item_cord2 = board[cord2[0]][cord2[1]]
        item_cord3 = board[cord3[0]][cord3[1]]

        if ((item_cord1 != " " and item_cord1 and item_cord2 and item_cord3) and 
            item_cord1 == item_cord2  == item_cord3):
            if item_cord1 == 'X':
                x_wins = True
            elif item_cord1 == 'O':
                o_wins = True        

    if x_wins and o_wins:
        raise ValueError("Impossible board: game should have ended after the game was won")
        
    if x_wins or o_wins:
        return "win"
    
    if occupied_boxes == 9:
        return "draw"
    
    if occupied_boxes == 9:
        return "draw"

    return "ongoing"
```

## Syntax Notes

- The code counts X and O marks first so it can reject invalid turn order early.
- The `win_boxes` list enumerates every row, column, and diagonal to check.
- Each route is compared against the board to see whether all three cells match.
- A game is a win if either player completes a line, but not both.
- A full board with no winner is a draw; otherwise the game is ongoing.
