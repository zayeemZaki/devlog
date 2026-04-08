---
sidebar_position: 4
title: Maps, Sets, and Traversal
sidebar_label: Maps, Sets, and Traversal
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Maps, Sets, and Traversal</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-07</em></span>
</h1>

## Map

Regular objects force keys to be strings (or symbols). A `Map` lets the key be almost anything, including another object.

```javascript
let userConfig = new Map();
let userObj = { name: "Zayeem" };

userConfig.set(userObj, "dark theme");
console.log(userConfig.get(userObj)); // "dark theme"
```

This is useful when you want to attach metadata to an object without modifying that object.

## Set

A `Set` stores only unique values. Adding a duplicate does nothing.

```javascript
let rawData = ["tech", "coding", "tech"];
let uniqueData = [...new Set(rawData)];

console.log(uniqueData); // ["tech", "coding"]
```

One common production use case is removing duplicates from arrays.

## WeakMap

`WeakMap` is useful for temporary object-linked data. If the original key object is no longer referenced elsewhere, its `WeakMap` entry can be garbage-collected automatically.

Engineers use this pattern to cache temporary data while reducing memory-leak risk.

## Object Traversal Methods

You cannot run a simple loop over a plain object with array methods directly. To read data efficiently, convert the object first with `Object.keys`, `Object.values`, or `Object.entries`.

```javascript
let userStats = { posts: 10, likes: 50 };
let numbersOnly = Object.values(userStats);

console.log(numbersOnly); // [10, 50]
```

## Object Traversal with `forEach`

You cannot use `forEach` directly on a plain object because it is not an array. Once you convert it with `Object.entries` or `Object.keys`, you can chain `forEach` immediately.

```javascript
let serverConfig = { port: 8080, status: "active" };

// Convert to an array of pairs, then loop through each pair.
Object.entries(serverConfig).forEach(([key, value]) => {
  console.log(key, value);
});
```

## Map Traversal with `forEach`

Unlike plain objects, `Map` already has `forEach`. The callback receives `value` first, then `key`.

```javascript
let userRoles = new Map();
userRoles.set("Zayeem", "Admin");
userRoles.set("Alex", "Editor");

// Notice the order: value comes before key.
userRoles.forEach((role, name) => {
  console.log(name, role);
});
```

## Destructuring and The Rest Pattern

Destructuring lets you pull out only the fields you need from large objects, rename fields, and collect the remaining fields.

```javascript
let apiResponse = { id: 1, title: "Hello", author: "Zayeem", views: 500 };

// Pull title, rename views to totalViews, and collect the rest.
let { title, views: totalViews, ...otherData } = apiResponse;

console.log(title); // "Hello"
console.log(totalViews); // 500
console.log(otherData); // { id: 1, author: "Zayeem" }
```

## Mental Model

- If you need guaranteed unique items, use a `Set`.
- If you need keys that are not strings, use a `Map`.
- If you need cache-like object keys with safer memory behavior, use a `WeakMap`.
- If you are handling large API responses, use destructuring to keep variables focused and clean.
