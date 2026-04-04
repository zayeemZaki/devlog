---
sidebar_position: 4
title: D&D Character
sidebar_label: D&D Character
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
  <span>D&D Character</span>
  <span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-03</em></span>
</h1>

My Solution: [Exercism D&D Character exercise](https://exercism.org/tracks/typescript/exercises/dnd-character)

## Instructions

Generate six abilities (strength, dexterity, constitution, intelligence, wisdom, charisma) by rolling four 6-sided dice, dropping the lowest roll, and summing the top three. Set hitpoints to `10 + constitution modifier`, where modifier is `Math.floor((constitution - 10) / 2)`.

## Solution

```typescript
export class DnDCharacter {
  public strength: number;
  public dexterity: number;
  public constitution: number;
  public intelligence: number;
  public wisdom: number;
  public charisma: number;
  public hitpoints: number;

  constructor() {
    this.strength = DnDCharacter.generateAbilityScore();
    this.dexterity = DnDCharacter.generateAbilityScore();
    this.constitution = DnDCharacter.generateAbilityScore();
    this.intelligence = DnDCharacter.generateAbilityScore();
    this.wisdom = DnDCharacter.generateAbilityScore();
    this.charisma = DnDCharacter.generateAbilityScore();

    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
  }

  public static generateAbilityScore(): number {
    const rolls: number[] = [];

    for (let i = 0; i < 4; i++) {
      rolls.push(Math.floor(Math.random() * 6) + 1);
    }

    return rolls
      .sort((a, b) => a - b)
      .slice(1)
      .reduce((sum, roll) => sum + roll, 0);
  }

  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2);
  }
}
```

## Test Cases

```typescript
expect(DnDCharacter.getModifierFor(3)).toEqual(-4);
expect(DnDCharacter.getModifierFor(10)).toEqual(0);
expect(DnDCharacter.getModifierFor(18)).toEqual(4);

const score = DnDCharacter.generateAbilityScore();
expect(score).toBeGreaterThanOrEqual(3);
expect(score).toBeLessThanOrEqual(18);

const character = new DnDCharacter();
expect(character.hitpoints).toEqual(10 + DnDCharacter.getModifierFor(character.constitution));
```

## Mental Model

We created public properties for each ability (`strength`, `dexterity`, `constitution`, `intelligence`, `wisdom`, `charisma`) and `hitpoints`.

Then we initialize all abilities inside the constructor using the static `generateAbilityScore()` method.

Inside `generateAbilityScore()`, we roll the dice 4 times and store each roll in an array.

Then the array pipeline handles the D&D rule:

- `sort((a, b) => a - b)` arranges rolls from smallest to largest.
- `slice(1)` removes the first item, which is the lowest roll.
- `reduce((sum, roll) => sum + roll, 0)` adds the remaining three rolls to produce the final ability score.

Finally, `hitpoints` is computed as `10 + getModifierFor(this.constitution)`, and `getModifierFor` uses `Math.floor((abilityValue - 10) / 2)`.
