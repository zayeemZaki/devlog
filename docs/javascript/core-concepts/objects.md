---
sidebar_position: 3
title: Objects
sidebar_label: Objects
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Objects</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-05</em></span>
</h1>

Objects store data in `key: value` pairs.

## Creating an Object

```javascript
let user = {
  name: "John",
  age: 30,
  "likes birds": true // multi-word key must be quoted
};
```

## Add, Read, and Delete Properties

```javascript
user.isAdmin = true;      // add
alert(user.name);         // read with dot notation

delete user.age;          // delete
```

## Dot Notation vs Bracket Notation

Use dot notation for normal keys:

```javascript
alert(user.name);
```

Use bracket notation for multi-word keys or dynamic keys:

```javascript
alert(user["likes birds"]);
```

## Optional Chaining

The optional chaining `?.` syntax has three forms:

- `obj?.prop` returns `obj.prop` if `obj` exists, otherwise `undefined`.
- `obj?.[prop]` returns `obj[prop]` if `obj` exists, otherwise `undefined`.
- `obj.method?.()` calls `obj.method()` if `obj.method` exists, otherwise returns `undefined`.

```javascript
let user = null;
alert(user?.name); // undefined

let key = "name";
let person = { name: "John" };
alert(person?.[key]); // John

let admin = {};
alert(admin.sayHi?.()); // undefined
```

## Computed Property Access

Property names can come from any expression:

```javascript
let key = prompt("What do you want to know about the user?", "name");
alert(user[key]); // works
```

This does **not** work the same way:

```javascript
alert(user.key); // undefined
```

`user.key` looks for a literal property named `"key"`.

## Checking Whether a Property Exists

You can check with either approach:

```javascript
user.age === undefined;
"age" in user;
```

The `=== undefined` check can be misleading when a property exists but stores `undefined`:

```javascript
let user = { age: undefined };

alert(user.age === undefined); // true
alert("age" in user);          // true
```

If you specifically need existence (not value), prefer `in`.

## Looping Through Object Keys

Use `for...in`:

```javascript
for (let key in user) {
  alert(key);
  alert(user[key]);
}
```

Order rules (modern engines):

- Integer-like keys are iterated in ascending numeric order.
- Other string keys are iterated in insertion order.

## Objects Are Copied by Reference

Primitives are copied by value. Objects are copied by reference.

```javascript
let user = { name: "John" };
let admin = user;

admin.name = "Pete";
alert(user.name); // Pete
```

Both variables point to the same object.

## Shallow Copy with `Object.assign`

```javascript
let user = {
  name: "John",
  age: 30
};

let clone = Object.assign({}, user);

alert(clone.name); // John
alert(clone.age);  // 30
```

You can also merge multiple objects:

```javascript
let user = { name: "John" };
let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

Object.assign(user, permissions1, permissions2);

alert(user.name);    // John
alert(user.canView); // true
alert(user.canEdit); // true
```

If a key already exists, the later source overwrites it.

## Shallow Copy Limitation

`Object.assign` is shallow. Nested objects are still shared references.

```javascript
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert(user.sizes === clone.sizes); // true (same nested object)

user.sizes.width = 60;
alert(clone.sizes.width); // 60
```

## Deep Copy with `structuredClone`

```javascript
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = structuredClone(user);

alert(user.sizes === clone.sizes); // false (different nested object)

user.sizes.width = 60;
alert(clone.sizes.width); // 50
```

## When `structuredClone` Is Not Enough

`structuredClone` cannot clone some values (for example, functions).

In those cases, a library helper like Lodash can be useful:

```javascript
const deepCopy = _.cloneDeep(obj);
```

Use this only when needed, because extra libraries add bundle size.
