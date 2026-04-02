---
sidebar_position: 2
title: Resistor Color Trio
sidebar_label: Resistor Color Trio
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
  <span>Resistor Color Trio</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-02</em></span>
</h1>

This exercise decodes 3 resistor color bands into a human-readable value label, like `33 ohms` or `67 megaohms`.

Source: [Exercism Resistor Color Trio exercise](https://exercism.org/tracks/typescript/exercises/resistor-color-trio)

## Problem

```text
black: 0
brown: 1
red: 2
orange: 3
yellow: 4
green: 5
blue: 6
violet: 7
grey: 8
white: 9
```

You take 3 colors as input:

- First color = first digit
- Second color = second digit
- Third color = number of zeros to append

Examples:

- `orange-orange-black` -> `33 ohms`
- `orange-orange-red` -> `3300 ohms`
- `orange-orange-orange` -> `33 kiloohms`

The output must be a label ending in `ohms`, using metric prefixes for large values (`kilo`, `mega`, `giga`).

## Solution

```typescript
export const COLORS = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white'
];

export function decodedResistorValue(colorsName: string[]): string {
  let firstDigit = COLORS.indexOf(colorsName[0]);
  let secondDigit = COLORS.indexOf(colorsName[1]);
  let numOfZerors = COLORS.indexOf(colorsName[2]);

  let ohms = (firstDigit * 10 + secondDigit) * (10 ** numOfZerors);

  let prefixIndex = 0;
  const prefixes = ['', 'kilo', 'mega', 'giga'];
  while (ohms >= 1000 && prefixIndex < prefixes.length - 1) {
    ohms /= 1000;
    prefixIndex++;
  }

  return `${ohms} ${prefixes[prefixIndex]}ohms`;
}
```

## Test Cases

```typescript
expect(decodedResistorValue(['orange', 'orange', 'black'])).toEqual('33 ohms');
expect(decodedResistorValue(['red', 'black', 'red'])).toEqual('2 kiloohms');
expect(decodedResistorValue(['green', 'brown', 'orange'])).toEqual('51 kiloohms');
expect(decodedResistorValue(['yellow', 'violet', 'yellow'])).toEqual('470 kiloohms');
expect(decodedResistorValue(['blue', 'violet', 'blue'])).toEqual('67 megaohms');
```

## Notes

- `COLORS.indexOf(...)` maps each band color to its numeric digit.
- The third color is used as a power of 10 to append zeros.
- Repeatedly dividing by 1000 selects the correct metric prefix for the final label.
