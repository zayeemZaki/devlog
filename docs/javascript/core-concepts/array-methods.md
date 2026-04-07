---
sidebar_position: 4
title: Array Methods
sidebar_label: Array Methods
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Array Methods</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-06</em></span>
</h1>

These methods are common in everyday JavaScript. They help you transform, search, and update arrays.

## `reduce`

`reduce` combines array items into a single final value.

Syntax:

```javascript
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

- `accumulator` stores the running result.
- `item` is the current element.
- `index` is the current index.
- `array` is the original array.
- `initial` is the starting accumulator value.

Example:

```javascript
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

## `splice`

`splice` changes the original array. It can remove items, insert items, or do both.

Syntax:

```javascript
arr.splice(start[, deleteCount, elem1, ..., elemN]);
```

### Example 1: Replace elements

```javascript
let arr = ["I", "study", "JavaScript", "right", "now"];

// remove first 3 elements and replace them
arr.splice(0, 3, "Let's", "dance");

alert(arr); // ["Let's", "dance", "right", "now"]
```

### Example 2: Remove elements

```javascript
let arr = ["I", "study", "JavaScript", "right", "now"];

// remove first 2 elements
let removed = arr.splice(0, 2);

alert(removed); // ["I", "study"]
```

## `slice`

`slice` returns a copy of part of an array and does not modify the original array.

```javascript
let arr = ["t", "e", "s", "t"];

alert(arr.slice(1, 3)); // ["e", "s"]
alert(arr.slice(-2));   // ["s", "t"]
```

## `split` and `join`

Use `split` to convert a string into an array.
Use `join` to convert an array back into a string.

```javascript
let names = "Bilbo, Gandalf, Nazgul";

let arr = names.split(", ");
alert(arr); // ["Bilbo", "Gandalf", "Nazgul"]

let str = arr.join(" | ");
alert(str); // "Bilbo | Gandalf | Nazgul"
```

## `forEach`

`forEach` runs a function for each item. It is used for side effects (like logging or rendering), not for creating a new array.

Syntax:

```javascript
arr.forEach(function(item, index, array) {
  // ... do something with an item
});
```

Example:

```javascript
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

## `filter`

`filter` returns a new array with items that pass a condition.

Syntax:

```javascript
let results = arr.filter(function(item, index, array) {
  // if true, item is pushed to results
  // returns empty array if nothing matches
});
```

Example:

```javascript
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" }
];

// returns first two users
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## `map`

`map` returns a new array where each item is transformed.

Syntax:

```javascript
let result = arr.map(function(item, index, array) {
  // returns the new value
});
```

Example:

```javascript
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);

alert(lengths); // [5, 7, 6]
```

## `sort`

`sort` reorders the array in place.

Without a compare function, values are sorted as strings. For numbers, pass a compare callback:

```javascript
arr.sort((a, b) => a - b);
```

- If result is `< 0`, `a` comes before `b`.
- If result is `> 0`, `a` comes after `b`.
- If result is `0`, their order stays unchanged.

Example:

```javascript
let numbers = [5, 2, 10, 1];
numbers.sort((a, b) => a - b);

alert(numbers); // [1, 2, 5, 10]
```

## Quick Summary

- `reduce`: many values -> one value.
- `splice`: add/remove/replace in the original array.
- `slice`: copy part of an array.
- `split`/`join`: convert between string and array.
- `forEach`: run code for each item.
- `filter`: keep matching items.
- `map`: transform every item.
- `sort`: reorder items (in place).

## Important Note

`sort`, `reverse`, and `splice` modify the original array.
