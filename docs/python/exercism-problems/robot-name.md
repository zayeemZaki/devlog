---
sidebar_position: 4
title: Robot Name
sidebar_label: Robot Name
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Robot Name</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-21</em></span>
</h1>

My Solution: [Exercism Robot Name solution](https://exercism.org/tracks/python/exercises/robot-name/solutions/zayeemZaki)

## Instructions

Manage a robot factory where each robot gets a unique name made of two uppercase letters followed by three digits, like `RX837`.

Rules:

- A robot should lazily generate its name the first time `name` is requested.
- The generated name should stay the same for that robot until `reset()` is called.
- `reset()` should clear the robot's current name so that the next access to `name` generates a fresh one.
- Generated names should not be reused.

## Solution

```python
import random
import string

class Robot:
    _used_names = set()
    
    def __init__(self):
        self._name = None 

    @property
    def name(self):
        if not self._name:
            self._name = self._generate_name()

        return self._name

    def _generate_name(self):
        while True:
            letters = "".join(random.choices(string.ascii_uppercase, k=2))
            digits = "".join(random.choices(string.digits, k=3))
            new_name = letters + digits

            if new_name not in Robot._used_names:
                Robot._used_names.add(new_name)
                return new_name

    def reset(self):
        self._name = None
```

## Syntax Notes

- A leading underscore in `_name` and `_generate_name` signals internal/private-by-convention members.
- The `@property` decorator lets `name` be accessed like an attribute (`robot.name`) while still running method logic.
- `_used_names` is a class attribute, shared across all robot instances to enforce global uniqueness.
