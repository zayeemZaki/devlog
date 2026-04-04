---
sidebar_position: 5
title: Functions, Signatures & Generics
sidebar_label: Functions, Signatures & Generics
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
  <span>Functions, Signatures & Generics</span>
  <span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-04</em></span>
</h1>

These notes cover how TypeScript models JavaScript functions, including call signatures, construct signatures, generics, overloads, `this`, rest syntax, and `void` behavior.

### Call Signatures

In JavaScript, functions are objects, so we can attach properties to them.

The issue is that a plain function type like `(arg: number) => boolean` only describes inputs and output. It does not describe extra properties on the function object.

Use a call signature inside an object type when you need both:

1. object properties
2. callable function behavior

```typescript
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
```

Important syntax difference:

1. function type expression uses `=>`
2. call signature in an object uses `:`

### Construct Signatures

Some JavaScript functions are meant to be called with `new` to construct objects.

A construct signature adds `new` to the signature:

```typescript
type SomeConstructor = {
  new (s: string): SomeObject;
};
```

Some APIs can be called with or without `new` (for example, `Date`). TypeScript can model that hybrid style:

```typescript
interface CallOrConstruct {
  (n?: number): string;
  new (s: string): Date;
}
```

### Generics for Precise Return Types

Using `any[]` loses type precision:

```typescript
function firstElement(arr: any[]) {
  return arr[0];
}
```

Use a generic so the return type tracks the array element type:

```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

### Generic Constraints with `extends`

Use `extends` when a generic must have specific properties.

```typescript
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  }

  return b;
}

const longerArray = longest([1, 2], [1, 2, 3]);
const longerString = longest("alice", "bob");
const notOK = longest(10, 100); // Error: number has no length
```

### Prefer Fewer Type Parameters

If a type parameter does not relate multiple values, it is often unnecessary.

```typescript
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}
```

`filter1` is usually better because `Func` adds complexity without adding useful relationships.

### Function Overloads

Use overloads when a function supports multiple valid argument shapes.

```typescript
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  }

  return new Date(mOrTimestamp);
}

const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3); // Error: no overload with 2 arguments
```

The last signature is the implementation signature. It is not visible to callers, and it must be compatible with all overload signatures above it.

### Declaring `this` in TypeScript

In callbacks, TypeScript may need help understanding what `this` points to.

You can annotate `this` by adding a fake first parameter:

```typescript
interface User {
  admin: boolean;
}

interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

declare function getDB(): DB;

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```

Use `function`, not arrow syntax, for this pattern. Arrow functions capture `this` from surrounding scope.

### Rest Parameters vs Rest Arguments

Both use `...`, but they do opposite jobs.

Rest parameters gather multiple arguments into one array inside a function definition:

```typescript
function multiply(multiplier: number, ...numbers: number[]) {
  return numbers.map((x) => x * multiplier);
}

multiply(10, 1, 2, 3, 4);
```

Spread (rest arguments) unpacks an existing array into separate arguments at call time:

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

arr1.push(...arr2);
```

### The `as const` Tuple Fix

When spreading into functions that expect a fixed number of arguments, TypeScript may reject plain arrays.

```typescript
const args = [8, 5];
const angle = Math.atan2(...args); // Error
```

Use `as const` to lock the array as a tuple with fixed length:

```typescript
const args = [8, 5] as const;
const angle = Math.atan2(...args); // OK
```

### The Optional Callback Trap

When defining callback types, it can feel natural to make parameters optional with `?` if users might not need them.

```typescript
// Bad: index? means the callback might be called without index
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
```

TypeScript interprets `index?` as: the caller might receive `undefined` for that argument.

```typescript
myForEach([1, 2, 3], (a, i) => {
  console.log(i.toFixed()); // Error: 'i' is possibly 'undefined'
});
```

Rule: only use `?` in callback parameter types if your implementation genuinely calls the callback without that argument.

```typescript
// Good: define exactly what your implementation passes
function myForEach(arr: any[], callback: (arg: any, index: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
```

JavaScript ignores extra parameters naturally, so users can still write `(a) => console.log(a)` even when the callback type includes `(arg, index)`.

### `void` Return Type Behavior

A function type like `() => void` means callers should ignore any returned value.

That is why callback-heavy JavaScript patterns still work:

```typescript
const src = [1, 2, 3];
const dst: number[] = [];

src.forEach((el) => dst.push(el));
```

Even though `push` returns a `number`, `forEach` accepts a callback typed with `void` return.

However, if you explicitly annotate a function declaration with `: void`, TypeScript enforces no returned value:

```typescript
function f2(): void {
  return true; // Error
}
```