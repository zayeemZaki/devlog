---
sidebar_position: 1
title: State Pattern
sidebar_label: State Pattern
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>State Pattern</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-14</em></span>
</h1>

## Deep Dive: The State Pattern

The State Pattern is a behavioral design pattern that allows an object to change its behavior when its internal state changes.

Instead of a single class bloated with conditional logic (like giant if/else or switch statements), each state is encapsulated into its own class.

This promotes the Open/Closed Principle, allowing the addition of new states without modifying existing code.

In this vending machine implementation, the machine delegates all actions (inserting money, selecting products, and dispensing) to a current state object.

Transitions, such as moving from `NoMoneyState` to `HasMoneyState` or from `DispenseState` to `SoldOutState`, are handled dynamically by the state objects themselves.

## Full Implementation

See [Vending Machine LLD](./vending-machine-problem.md) for the complete code implementation.