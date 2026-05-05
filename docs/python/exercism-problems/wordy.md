---
sidebar_position: 18
title: Wordy
sidebar_label: Wordy
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Wordy</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-05</em></span>
</h1>

## Instructions

Evaluate simple math word problems.

- The question starts with `What is` and ends with `?`.
- Supported operations are addition, subtraction, multiplication, and division.
- Operations are evaluated left to right.
- Invalid questions should raise a `ValueError`.

## Solution

```python
def answer(question):

    if not question.startswith("What is"):
        raise ValueError("unknown operation")

    question = question.removeprefix("What is").replace('?', '').strip()
    question = question.replace('multiplied by', 'multiplied').replace('divided by', 'divided')

    if not question:
        raise ValueError("syntax error")

    words = question.split(' ')
    try:
        res = int(words[0])
    except ValueError:
        raise ValueError("syntax error")

    valid_ops = {'plus', 'minus', 'multiplied', 'divided'}
    for i in range(1, len(words), 2):
        op = words[i]

        if op not in valid_ops:
            if op.lstrip('-').isdigit():
                raise ValueError("syntax error")
            raise ValueError("unknown operation")

        if i + 1 >= len(words):
            raise ValueError("syntax error")

        try:
            num = int(words[i+1])
        except ValueError:
            raise ValueError("syntax error")

        if op == 'plus':
            res += num
        elif op == 'minus':
            res -= num
        elif op == 'multiplied':
            res *= num
        elif op == 'divided':
            res /= num
        else:
            raise ValueError("unknown operation")

    return res
```

## Syntax notes

- `lstrip('-')` + `isdigit()` — detect negative integers (e.g. `-5`).
- `removeprefix('What is')` — drop the question opener.
- `try/except int()` — validate numeric tokens.
- `range(1, len(words), 2)` — step through operator positions.