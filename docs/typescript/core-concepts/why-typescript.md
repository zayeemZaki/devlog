---
sidebar_position: 1
title: Why TypeScript?
sidebar_label: Why TypeScript?
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
  <span>Why TypeScript?</span>
  <span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-01</em></span>
</h1>

TypeScript compiles to JavaScript, so browsers still run JavaScript.
It extends JavaScript with static type safety to reduce runtime bugs.

### Type Inference

In inferred (implicit) typing, TypeScript determines the type from the assigned value.

```typescript
let greeting = "Hello There!";
greeting = 123; // Error: number is not assignable to string
```

### Explicit Typing

In explicit typing, you declare the type directly.

```typescript
let greeting: string = "Hello There!";
greeting = 123; // Error: number is not assignable to string
```

### Compilation on Error

By default, TypeScript can still emit JavaScript even when type errors exist.
Use `noEmitOnError` if you want to block JavaScript output on errors.

### Developer Experience (IntelliSense)
TypeScript powers our code editor. It provides real-time autocomplete, inline documentation, and catches errors during development (write-time) rather than execution (runtime).

### Defining Data Shapes
TypeScript's true power lies in enforcing exact shapes for complex objects using Interfaces or Types.

```typescript
interface User {
  name: string;
  id: number;
  isAdmin?: boolean; // Optional property
}

const currentUser: User = { name: "Zayeem", id: 101 };