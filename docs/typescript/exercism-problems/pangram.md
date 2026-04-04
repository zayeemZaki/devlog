---
sidebar_position: 4
title: Pangram
sidebar_label: Pangram
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
  <span>Pangram</span>
  <span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-03</em></span>
</h1>

My Solution: [Exercism Pangram solution](https://exercism.org/tracks/typescript/exercises/pangram/solutions/zayeemZaki)

## Instructions

Check if a sentence is a pangram, meaning it contains every letter of the English alphabet at least once. The check is case insensitive.

## Solution

```typescript
export function isPangram(sentence: string): boolean {
  const letters = new Set(sentence.toLowerCase().match(/[a-z]/g));
  return letters.size === 26;
}
```

## Tests

```typescript
// Happy path
console.log(isPangram('the quick brown fox jumps over the lazy dog')); // true

// False case
console.log(isPangram('a quick movement of the enemy will jeopardize five gunboats')); // false

// Edge case with underscores
console.log(isPangram('the_quick_brown_fox_jumps_over_the_lazy_dog')); // true

// Empty string
console.log(isPangram('')); // false
```

## Mental Model

- **Set Usage**: The `Set` object stores unique values. Here, it collects all unique lowercase alphabetic characters from the input sentence.
- **Regex Explanation**: The regular expression `/[a-z]/g` matches all lowercase alphabetic characters in the string globally (i.e., across the entire string).
- **Equality Check**: `===` (strict equality) ensures both value and type are the same, whereas `==` (loose equality) allows type coercion. In this solution, `letters.size === 26` ensures the set contains exactly 26 unique letters without type conversion.