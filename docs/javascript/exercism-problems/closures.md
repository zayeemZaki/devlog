---
sidebar_position: 1
title: Closures
sidebar_label: Closures
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Closures</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-06</em></span>
</h1>

My Solution: [Exercism Closures solution](https://exercism.org/tracks/javascript/exercises/coordinate-transformation/solutions/zayeemZaki)

Closures let a function remember values from its outer scope even after that outer scope has finished executing.

## Introduction

Closures let nested functions use values from an outer scope after that scope has finished running.

## Closures to Save State

A closure can preserve state between calls.

```javascript
let counter = 0;

export function increment() {
  counter += 1;
  return counter;
}
```

## Enclosing Private State

A common pattern is to return a function that keeps access to local values.

```javascript
export function makeCounter() {
  let counter = 0;

  return function increment() {
    counter += 1;
    return counter;
  };
}
```

## Instructions

Build four closure-based helpers for 2D coordinate transforms:

- `translate2d(dx, dy)` should return a function that adds `dx` and `dy` to any input coordinate pair.
- `scale2d(sx, sy)` should return a function that multiplies the input coordinate pair by the scaling factors.
- `composeTransform(f, g)` should return a function that calls `f(x, y)` first and then passes the result into `g`.
- `memoizeTransform(f)` should return a function that remembers the last `(x, y)` input and reuses the previous result when the same pair is called again.

Use closures to keep the transform values private inside the outer function.

## Solution

```javascript
export function translate2d(dx, dy) {
  return function(x, y) {
    return [x + dx, y + dy];
  };
}

export function scale2d(sx, sy) {
  return function(x, y) {
    return [x * sx, y * sy];
  };
}

export function composeTransform(f, g) {
  return function(x, y) {
    const [tempX, tempY] = f(x, y);
    return g(tempX, tempY);
  };
}

export function memoizeTransform(f) {
  let lastX;
  let lastY;
  let lastResult;

  return function(x, y) {
    if (x === lastX && y === lastY) {
      return lastResult;
    }

    lastResult = f(x, y);
    lastX = x;
    lastY = y;

    return lastResult;
  };
}
```

## Tests

```javascript
const moveCoordinatesRight2Px = translate2d(2, 0);
const result = moveCoordinatesRight2Px(4, 8);
// result => [6, 8]

const doubleScale = scale2d(2, 2);
const scaled = doubleScale(6, -3);
// scaled => [12, -6]

const composedTransformations = composeTransform(
  moveCoordinatesRight2Px,
  doubleScale,
);
const composed = composedTransformations(0, 1);
// composed => [4, 2]

const tripleScale = scale2d(3, 3);
const memoizedScale = memoizeTransform(tripleScale);

memoizedScale(4, 3); // => [12, 9]
memoizedScale(4, 3); // => [12, 9]
```

## Mental Model

  - Returning a function lets each call keep its own private state.
  - Composition means the output of one function becomes the input of another.
  - Memoization stores a previous result so the same work does not run twice.
