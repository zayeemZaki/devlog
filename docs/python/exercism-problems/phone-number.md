---
sidebar_position: 5
title: Phone Number
sidebar_label: Phone Number
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Phone Number</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-21</em></span>
</h1>

My Solution: [Exercism Phone Number solution](https://exercism.org/tracks/python/exercises/phone-number/solutions/zayeemZaki)

## Instructions

Clean, validate, and format North American phone numbers from a raw input string.

Rules:

- Reject letters with `letters not permitted`.
- Reject unsupported punctuation with `punctuations not permitted`.
- The cleaned number must be 10 digits, or 11 digits starting with `1`.
- Area code and exchange code cannot start with `0` or `1`.
- Expose the area code and a pretty string format.

## Solution

```python
class PhoneNumber:
    def __init__(self, number):
        self.number = self._clean_number(number)
        
    def _clean_number(self, raw_number):
        clean_number = ''
        for ch in raw_number:
            if ch.isalpha():
                raise ValueError("letters not permitted")
            if not ch.isdigit() and ch not in " +-.()":
                raise ValueError("punctuations not permitted")
            if ch.isdigit():
                clean_number += ch
                
        if len(clean_number) < 10:
            raise ValueError("must not be fewer than 10 digits")
        if len(clean_number) > 11:
            raise ValueError("must not be greater than 11 digits")

        if len(clean_number) == 11:
            if clean_number[0] != '1':
                raise ValueError("11 digits must start with 1")
            clean_number = clean_number[1:]

        if clean_number[0] == '0':
            raise ValueError("area code cannot start with zero")
        if clean_number[0] == '1':
            raise ValueError("area code cannot start with one")
        if clean_number[3] == '0':
            raise ValueError("exchange code cannot start with zero")
        if clean_number[3] == '1':
            raise ValueError("exchange code cannot start with one")

        return clean_number

    @property
    def area_code(self):
        return self.number[:3]

    def pretty(self):
        return f"({self.number[:3]})-{self.number[3:6]}-{self.number[6:]}"
```

## Syntax Notes

- A leading underscore in `_clean_number` signals an internal/helper method by convention.
- The `@property` decorator lets `area_code` be accessed like an attribute (`obj.area_code`) instead of a method call.
- `__init__` is the constructor that runs on object creation and stores the cleaned value in `self.number`.
