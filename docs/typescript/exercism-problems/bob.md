---
sidebar_position: 5
title: Bob
sidebar_label: Bob
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
  <span>Bob</span>
  <span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-04</em></span>
</h1>

My Solution: [Exercism Bob solution](https://exercism.org/tracks/typescript/exercises/bob/solutions/zayeemZaki)

## Instructions

Determine Bob's response based on the input. Bob responds with:

- **"Sure."** – If you ask a question (ends with ?)
- **"Whoa, chill out!"** – If you yell (ALL CAPS)
- **"Calm down, I know what I'm doing!"** – If you yell a question
- **"Fine. Be that way!"** – If you say nothing (only whitespace)
- **"Whatever."** – For anything else

## Solution

```typescript
export function hey(message: string): string {
  const trimmed = message.trim();
  if (trimmed === "") {
    return "Fine. Be that way!";
  }
  
  const isQuestion = trimmed.endsWith('?');
  const isYelling = trimmed.toUpperCase() === trimmed && /[A-Z]/.test(trimmed);
  
  if (isQuestion && isYelling) {
    return "Calm down, I know what I'm doing!";
  }
  else if (isQuestion) {
    return "Sure.";
  }
  else if (isYelling) {
    return "Whoa, chill out!";
  }
  return "Whatever.";
}
```

## Tests

```typescript
// Stating something
console.log(hey('Tom-ay-to, tom-aaaah-to.')); // "Whatever."

// Shouting
console.log(hey('WATCH OUT!')); // "Whoa, chill out!"

// Asking a question
console.log(hey('Does this cryogenic chamber make me look fat?')); // "Sure."

// Yelling a question
console.log(hey('WHAT IS WRONG WITH YOU?')); // "Calm down, I know what I'm doing!"

// Silence
console.log(hey('   ')); // "Fine. Be that way!"

// Empty string
console.log(hey('')); // "Fine. Be that way!"
```

## Mental Model

- **`trim()`**: Removes leading/trailing whitespace to detect silence
- **`endsWith('?')`**: Checks if trimmed string ends with ?
- **`trimmed.toUpperCase() === trimmed`**: Compares uppercase version (all-caps test)
- **`/[A-Z]/.test(trimmed)`**: Ensures at least one letter exists (prevents "???" from being treated as yelling)
