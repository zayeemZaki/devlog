---
sidebar_position: 3
title: Everyday Types
sidebar_label: Everyday Types
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
  <span>Everyday Types</span>
  <span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-02</em></span>
</h1>

These are the TypeScript types we use all the time. Simple stuff, but getting these right makes everything else easier.

### The Primitives

- `string`
- `number` (there is no separate `int` or `float` in JavaScript/TypeScript)
- `boolean`

### Arrays

You can declare arrays in multiple ways, and all of these are valid:

```typescript
let nums: number[] = [1, 2, 3];
let names: string[] = ["A", "B"];
let flags: Array<boolean> = [true, false];
```

### any

`any` basically disables type checking for that value. It is useful sometimes, but overusing it defeats the purpose of TypeScript.

```typescript
let payload: any = "hello";
payload = 123;
payload = { ok: true };
```

### Functions

You can annotate parameter types and return types.

```typescript
function greet(name: string): string {
  return `Hello ${name}`;
}
```

### Object Types

You can describe the shape of an object inline, including optional properties.

```typescript
function printCoord(pt: { x: number; y: number; z?: number }) {
  console.log("x coordinate: " + pt.x);
  console.log("y coordinate: " + pt.y);

  if (pt.z !== undefined) {
    console.log("z coordinate: " + pt.z);
  }
}
```

### Union Types

A union lets a value be one of multiple types.

```typescript
function printId(id: number | string) {
  console.log("your id is: " + id);
}
```

TypeScript only allows operations that are valid for every type in the union. For example, calling `.toUpperCase()` directly on `number | string` is not allowed.

You can narrow the type first:

```typescript
function printIdUpper(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  }
}
```

### Type Aliases

Type aliases let you name reusable types.

```typescript
type Point = {
  x: number;
  y: number;
};

function printCoord(pt: Point) {
  console.log("x: " + pt.x);
  console.log("y: " + pt.y);
}
```

### Type vs Interface

Both can describe object shapes and are often interchangeable.

- `interface` supports `extends` for inheritance-style composition.
- `type` can be combined using intersections like `&`.
- Interfaces can be reopened and merged later; type aliases cannot.

### let, var, const

You can declare variables using `let`, `var`, or `const`. `const` means the binding cannot be reassigned, but object properties can still be mutated.

```typescript
const obj = { counter: 0 };

if (someCondition) {
  obj.counter += 1;
}
```

### Literal Types

You can combine union types with exact values to restrict a variable to a fixed set of strings or numbers.

```typescript
// Literal type union
type Direction = "left" | "right" | "up" | "down";
```
