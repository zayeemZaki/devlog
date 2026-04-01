# Why TypeScript?

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
