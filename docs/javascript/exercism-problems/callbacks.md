---
sidebar_position: 2
title: Callbacks
sidebar_label: Callbacks
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Callbacks</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-06</em></span>
</h1>

My Solution: [Exercism Callbacks solution](https://exercism.org/tracks/javascript/exercises/fruit-picker/solutions/zayeemZaki)

Callbacks are functions passed into other functions so they can be called later.

## Introduction

A callback must match the signature expected by the function that calls it.

```javascript
const squareLength = 5;

function applyToSquare(callback) {
  return callback(squareLength);
}

function areaOfSquare(number) {
  return number * number;
}

applyToSquare(areaOfSquare); // => 25
```

You can pass callbacks as named functions, anonymous functions, or arrow functions.

## Instructions

Build a small library for the grocer's API:

- `onSuccess()` should call `notify` with `{ message: 'SUCCESS' }`.
- `onError()` should call `notify` with `{ message: 'ERROR' }`.
- `orderFromGrocer(query, onSuccessCallback, onErrorCallback)` should forward all arguments to `order`.
- `postOrder(variety, quantity)` should call `orderFromGrocer` with the query object and the shared callbacks.

Keep the callbacks reusable so the same success and error handlers can be passed around.

## Solution

```javascript
import { notify } from './notifier';
import { order } from './grocer';

export function onSuccess() {
  return notify({ message: 'SUCCESS' });
}

export function onError() {
  return notify({ message: 'ERROR' });
}

export function orderFromGrocer(query, onSuccessCallback, onErrorCallback) {
  return order(query, onSuccessCallback, onErrorCallback);
}

export function postOrder(variety, quantity) {
  return orderFromGrocer({ variety, quantity }, onSuccess, onError);
}
```

## Tests

```javascript
onSuccess();
// => notify called with { message: 'SUCCESS' }

onError();
// => notify called with { message: 'ERROR' }

orderFromGrocer(
  { variety: 'pear', quantity: 12 },
  exampleSuccessCallback,
  exampleErrorCallback,
);
// => order called with the query and callbacks

postOrder('peach', 100);
// => order placed for 100 peaches
```

## Mental Model

- A callback is just a function value passed to another function.
- The caller decides when the callback runs.
- The callback must accept the arguments the caller will provide.
- Named functions are easier to reuse when the same behavior is needed in multiple places.
- Wrapping `order` inside `orderFromGrocer` keeps the rest of the codebase isolated from API changes.
