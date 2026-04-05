---
sidebar_position: 1
title: Logical Operators
sidebar_label: Logical Operators
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Logical Operators</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-04</em></span>
</h1>

Logical operators in JavaScript do more than return `true` or `false`. They return actual values, and they stop evaluating as soon as the result is known.

## `||` OR

`||` returns the first truthy value it finds. If every value is falsy, it returns the last value in the chain.

This is useful for defaults:

```javascript
const displayName = user.name || "Anonymous";
```

If `user.name` is an empty string, `||` treats it as missing and falls back to `"Anonymous"`.

## `&&` AND

`&&` returns the first falsy value it finds. If every value is truthy, it returns the last value.

It is often used to guard execution:

```javascript
isLoggedIn && showDashboard();
```

When the left side is falsy, JavaScript stops immediately and does not evaluate the rest.

## `!` NOT

`!` converts a value to a boolean first, then flips it.

```javascript
!"hello"; // false
!0; // true
```

Because it forces boolean conversion, `!!value` is a common shortcut for turning any value into a strict boolean.

## `??` Nullish Coalescing

`??` returns the first value that is not `null` and not `undefined`.

This is a safer defaulting operator than `||` when `0`, `false`, or `""` are valid values:

```javascript
const result = a ?? b;
```

That is equivalent to:

```javascript
const result = a !== null && a !== undefined ? a : b;
```

Use `||` when you want to reject all falsy values. Use `??` when only `null` and `undefined` should trigger the fallback.

## Precedence

`!` has the highest precedence of the logical operators, then `&&`, then `||`.

If you mix `&&` and `||`, parentheses make the intent explicit:

```javascript
(a && b) || (c && d);
```

`??` is separate from `||` and `&&` in practice, so it is best to parenthesize mixed expressions to keep the logic obvious.

## Summary

- `||` finds the first truthy value.
- `&&` finds the first falsy value.
- `!` converts to boolean and flips it.
- `??` finds the first defined value.

These operators are about control flow as much as comparison. The returned value matters.