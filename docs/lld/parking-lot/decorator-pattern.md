---
sidebar_position: 6
title: Decorator Pattern
sidebar_label: Decorator Pattern
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Decorator Pattern</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-09</em></span>
</h1>

The decorator pattern is a structural design pattern that lets us attach new behavior to an object by wrapping it inside another object that implements the same interface.

Instead of creating more subclasses every time we want a feature variation, we compose behavior at runtime. The decorator delegates the core work to the wrapped object, then adds its own logic before or after that call.

Because every decorator follows the same base interface, we can nest them as many times as we want. That makes the final behavior flexible, reusable, and calculated dynamically.

## How it works

We start with a common interface for pricing.

The concrete component provides the base price.

The base decorator stores a wrapped strategy and forwards the request to it.

Concrete decorators extend the base decorator and add their own extra charge.

## Code Example: Parking Lot Pricing

Here is how I modeled optional parking services like car wash and EV charging using decorators instead of subclass combinations.

```python
from abc import ABC, abstractmethod


# --- THE INTERFACE ---
class PricingStrategy(ABC):
    @abstractmethod
    def calculate_price(self):
        pass


# --- THE CONCRETE COMPONENT ---
class LargeSpotPrice(PricingStrategy):
    def calculate_price(self):
        return 30


# --- THE BASE DECORATOR ---
# It wraps a strategy and is also a strategy itself
class PricingDecorator(PricingStrategy):
    def __init__(self, pricing_strategy: PricingStrategy):
        self.wrapped_strategy = pricing_strategy

    def calculate_price(self):
        return self.wrapped_strategy.calculate_price()


# --- CONCRETE DECORATORS ---
class CarWashDecorator(PricingDecorator):
    def calculate_price(self):
        # Delegate to wrapped object, then add $5
        return super().calculate_price() + 5


class EvChargingDecorator(PricingDecorator):
    def calculate_price(self):
        # Delegate to wrapped object, then add $7
        return super().calculate_price() + 7


# --- DYNAMIC IMPLEMENTATION IN CONTEXT ---
class ParkingLot:
    # ... other methods ...

    def park_vehicle(self, vehicle, services=None):
        services = services or []

        # 1. Get the base strategy
        strategy = self.pricing_strategies[vehicle.spot_size]

        # 2. Wrap the strategy dynamically (the nesting)
        for service in services:
            strategy = service(strategy)

        # 3. Final price bubbles up through the decorators
        self.revenue += strategy.calculate_price()
        return 'Parked'


# --- THE CLIENT ---
# Truck ($30) + Charging ($7) + Car Wash ($5) = $42
parking_lot.park_vehicle(truck, services=[EvChargingDecorator, CarWashDecorator])
```

## Why It Helps

- It avoids a subclass explosion when features can be combined in many ways.
- It keeps the base pricing logic closed for modification but open for extension.
- It makes optional add-ons easy to assemble at runtime.