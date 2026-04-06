---
sidebar_position: 2
title: Functions
sidebar_label: Functions
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Functions</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-04</em></span>
</h1>

## Two Types of Function

### Function Declaration

```javascript
function sum(a, b) {
  return a + b;
}
```

### Function Expression

```javascript
let sum = function(a, b) {
  return a + b;
};
```

## Key Difference: When They Become Usable

A function declaration is hoisted with its implementation, so it is usable anywhere in the same script scope, even before the line where it is written.

```javascript
sayHi("Zayeem"); // Hello, Zayeem

function sayHi(name) {
  alert(`Hello, ${name}`);
}
```

A function expression is created only when execution reaches that line. Calling it before initialization throws an error.

```javascript
sayHi("Zayeem"); // error

let sayHi = function(name) {
  alert(`Hello, ${name}`);
};
```

## Callback Functions

A callback is a function passed into another function to be called later.

In this example, `showOk` and `showCancel` are callback functions:

```javascript
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

function showOk() {
  alert("You agreed.");
}

function showCancel() {
  alert("You canceled the execution.");
}

ask("Do you agree?", showOk, showCancel);
```

## Arrow Functions

Arrow syntax is a shorter way to write function expressions.

Arrow functions are created when execution reaches their definition line, so they are usable only from that point onward.

```javascript
let func = (arg1, arg2, ..., argN) => expression;
```

Equivalent long form:

```javascript
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

### Multiline Arrow Function

```javascript
let sum = (a, b) => {
  let result = a + b;
  return result;
};

alert(sum(1, 2)); // 3
```

If an arrow function uses curly braces `{}`, you must write an explicit `return` to return a value.

## Constructor Function

Constructor functions are named with a capital letter and should be called only with the `new` operator.

```javascript
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user = new User("Jack");

alert(user.name); // Jack
alert(user.isAdmin); // false
```

This is how a constructor function executes internally:

```javascript
function User(name) {
  // this = {};  (implicitly)

  // add properties to this
  this.name = name;
  this.isAdmin = false;

  // return this;  (implicitly)
}
```

## Quick Summary

- Function declarations are hoisted and can be used before they appear in code.
- Function expressions are created at runtime when execution reaches them.
- Callbacks are functions passed as arguments to control later behavior.
- Arrow functions are concise function expressions.
- Multiline arrow functions need an explicit `return`.
- Constructor functions use `new`, create an object via `this`, and return it implicitly.
