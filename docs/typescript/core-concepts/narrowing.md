---
sidebar_position: 4
title: Type Narrowing
sidebar_label: Type Narrowing
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
  <span>Type Narrowing</span>
  <span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-03</em></span>
</h1>

Type narrowing is how TypeScript reduces a union type to a smaller, safer type before you use it.

### `typeof` for Primitives

`typeof` is a useful guard when you are checking primitive values.

```typescript
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
    return;
  }

  console.log(value.toFixed(2));
}
```

JavaScript has some long-standing quirks here. `typeof null` is still `"object"`, and arrays also report `"object"`.
TypeScript is aware of those cases, but `typeof` is still best reserved for primitives like `string`, `number`, `boolean`, `symbol`, `bigint`, and `function`.

### Nullish Checks

`== null` is a compact way to check for both `null` and `undefined`.

```typescript
function logName(name: string | null | undefined) {
  if (name == null) {
    console.log("missing name");
    return;
  }

  console.log(name.toUpperCase());
}
```

`== undefined` behaves the same way for `null` and `undefined`, but `== null` is the more common form.

### Type Predicates

When `typeof` is not enough for custom objects, use a type predicate with the `is` keyword.

The predicate must be written as `parameterName is Type`, where `parameterName` is one of the function parameters.

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
    return;
  }

  pet.fly();
}
```

This works because `typeof` alone would only tell us that both custom types are `"object"`, which is not specific enough.

### `never` for Exhaustive Checks

`never` represents a state that should be impossible to reach.
It is useful when you have narrowed a union so far that no possibilities remain.

That makes it perfect for exhaustive checking in `switch` statements.

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default: {
      const exhaustiveCheck: never = shape;
      return exhaustiveCheck;
    }
  }
}
```

If `Triangle` is part of `Shape` and you forget to handle it in the `switch`, TypeScript fails at the `never` assignment and forces you to update the missing case.