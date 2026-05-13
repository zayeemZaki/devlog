---
sidebar_position: 1
title: Adapter Pattern
sidebar_label: Adapter Pattern
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Adapter Pattern</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-13</em></span>
</h1>


The Adapter Pattern is a structural design pattern that allows two incompatible interfaces to work together.

In this weather dashboard example, the client expects weather data in Celsius and kilometers per hour through a standard interface.
The third-party service returns raw values in Fahrenheit and miles per hour.

The adapter sits between them, translates the legacy values into the format the client expects, and keeps the rest of the app decoupled from the external API.

## Full Implementation

See [Weather App LLD](./weather-app-problem.md) for the complete code implementation.