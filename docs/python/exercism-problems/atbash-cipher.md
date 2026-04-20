---
sidebar_position: 3
title: Atbash Cipher
sidebar_label: Atbash Cipher
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Atbash Cipher</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-19</em></span>
</h1>

My Solution: [Exercism Atbash Cipher solution](https://exercism.org/tracks/python/exercises/atbash-cipher/solutions/zayeemZaki)

## Instructions

Implement the Atbash cipher for encoding and decoding text.

Encoding should normalize the input to lowercase, keep only letters and digits, map letters to their reversed alphabet counterpart, and group the result into chunks of five characters separated by spaces.

Decoding should reverse the mapping and remove any spaces from the cipher text.

## Solution

```python
import string

PLAIN = string.ascii_lowercase
CIPHER = PLAIN[::-1]
TRANSLATOR = dict(zip(PLAIN, CIPHER))

def encode(plain_text):
    res = ''
    for ch in plain_text.lower():
        if ch.isalnum():
            res += TRANSLATOR.get(ch, ch)

    chunked = ''
    for i in range(len(res)):
        if i > 0 and i % 5 == 0:
            chunked += ' '
        chunked += res[i]

    return chunked
    
def decode(ciphered_text):
    res = ''
    for ch in ciphered_text.lower():
        if ch.isalnum():
            res += TRANSLATOR.get(ch, ch)

    return res
```

## Mental Model

Use one translation table for both directions. Encoding filters and transforms the text, then inserts spacing every five characters. Decoding just strips spaces and applies the same reversed alphabet mapping.