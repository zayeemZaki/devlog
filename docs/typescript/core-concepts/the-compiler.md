---
sidebar_position: 2
title: The Compiler & Strictness
sidebar_label: The Compiler & Strictness
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>The Compiler & Strictness</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-02</em></span>
</h1>

TypeScript helps catch mistakes before the code runs. It gives you static type checking during compilation, while JavaScript checks types at runtime. You also get useful suggestions while typing.

### The Compiler (tsc)

`tsc` is the TypeScript compiler.

Install it globally:

```bash
npm install -g typescript
```

Compile a `.ts` file into JavaScript:

```bash
tsc file_name.ts
```

This generates a `file_name.js` file.

### Strictness Flags

TypeScript has strictness settings in your `tsconfig.json` that help keep the codebase safer.

`noImplicitAny` makes sure TypeScript does not silently allow implicit `any` types.

`strictNullChecks` helps catch `null` and `undefined` issues before runtime.

### Type Erasure

TypeScript types are completely removed during compilation. The runtime only sees plain JavaScript, so types have zero impact on runtime performance.

### Downleveling

`tsc` can translate modern ES6+ JavaScript into older JavaScript targets. This helps support legacy browsers while still letting you write modern code.
