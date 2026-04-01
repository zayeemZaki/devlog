# Hello World 

## The Challenge

[Original challenge reference](https://github.com/type-challenges/type-challenges/blob/main/questions/00013-warm-hello-world/README.md)

Change the `HelloWorld` type so that it evaluates to a string, passing the type system assertion.

## My Solution

```typescript
// Before
type HelloWorld = any;

// After
type HelloWorld = string;
```

## Takeaways

- Avoid `any`: The default boilerplate used `any`, which effectively disables type safety.
- Type assignment: Just as you assign a value in JavaScript (`const hello = "world"`), you can assign a concrete type to a type alias in TypeScript.

