---
sidebar_position: 3
title: Space Age
sidebar_label: Space Age
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
  <span>Space Age</span>
  <span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-03</em></span>
</h1>

My Solution: [Exercism Space Age solution](https://exercism.org/tracks/typescript/exercises/space-age/solutions/zayeemZaki)

## Instructions

Calculate a person's age on different planets given their age in Earth seconds.

Constraints: One Earth year is 31,557,600 seconds. Return the final number rounded to two decimal places.

| Planet | Orbital period in Earth Years |
| --- | --- |
| Mercury | 0.2408467 |
| Venus | 0.61519726 |
| Earth | 1.0 |
| Mars | 1.8808158 |
| Jupiter | 11.862615 |
| Saturn | 29.447498 |
| Uranus | 84.016846 |
| Neptune | 164.79132 |

## Solution

```typescript
const ORBITAL_PERIODS: Record<string, number> = {
  mercury: 0.2408467,
  venus: 0.61519726,
  earth: 1.0,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132
};

export function age(planet: string, seconds: number): number {
  const SECONDS_IN_YEAR_ON_EARTH = 31557600;

  return Number((seconds / SECONDS_IN_YEAR_ON_EARTH / ORBITAL_PERIODS[planet]).toFixed(2));
}
```

## Test Cases

```typescript
expect(age('earth', 1000000000)).toEqual(31.69);
expect(age('mercury', 2134835688)).toEqual(280.88);
expect(age('venus', 189839836)).toEqual(9.78);
expect(age('mars', 2129871239)).toEqual(35.88);
```

## Mental Model

Treat Earth years as the base unit.

The Math: Convert the total seconds to Earth years first. Then, normalize that number by dividing it by the target planet's specific orbital period. Round to two decimal places at the very end to pass the strict tests.

The TS Architecture (Record): Instead of using a quirky TypeScript enum, I used a standard JavaScript object and wrapped it in the `Record<string, number>` utility type. This is a cleaner pattern that guarantees every planet key maps strictly to a numerical multiplier, preventing runtime lookup errors.
