---
sidebar_position: 17
title: Simple Cipher
sidebar_label: Simple Cipher
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Simple Cipher</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-27</em></span>
</h1>

My Solution: [Exercism Simple Cipher solution](https://exercism.org/tracks/python/exercises/simple-cipher/solutions/zayeemZaki)

## Instructions

Build a simple substitution cipher using a lowercase key.

- If no key is provided, generate one randomly.
- To encode, shift each plaintext letter forward by the matching key letter.
- To decode, shift each ciphertext letter backward by the matching key letter.
- The key repeats when the text is longer than the key.

## Solution

```python
import random
import string

class Cipher:
    def __init__(self, key=None):
        if key:
            self.key = key
        else:
            self.key = ''.join(random.choices(string.ascii_lowercase, k=100))
    
    def encode(self, text):
        res = ''
        for i, ch in enumerate(text):
            shift = ord(self.key[i % len(self.key)]) - ord('a')

            res += chr((ord(ch) - ord('a') + shift) % 26 + ord('a'))

        return res

    def decode(self, text):
        res = ''
        for i, ch in enumerate(text):
            shift = ord(self.key[i % len(self.key)]) - ord('a')

            res += chr((ord(ch) - ord('a') - shift) % 26 + ord('a'))
            
        return res
```

## Syntax Notes

- `ord(char)` gives the Unicode number for a character.
- `chr(number)` converts a number back to a character.
- `ord('a')` is used as a zero point so letters map cleanly to `0..25`.
- `shift = ord(key_char) - ord('a')` turns each key letter into a shift amount.
- `% 26` wraps around the alphabet (for example, after `z` comes `a`).
- `enumerate(text)` gives both index `i` and character `ch`.
- `i % len(self.key)` cycles through the key when text is longer than the key.
- `random.choices(string.ascii_lowercase, k=100)` picks 100 random lowercase letters.
- `''.join(...)` combines those letters into one key string.
