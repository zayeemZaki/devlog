---
sidebar_position: 2
title: Strategy Pattern
sidebar_label: Strategy Pattern
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Strategy Pattern</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-07</em></span>
</h1>

## Deep Dive: The Strategy Pattern

It is a behavioral design pattern that lets us define a family of algorithms, separate each of them into different classes, and make their objects interchangeable.

## How it works

We take a class that performs a specific task in different ways and extract its different algorithms into separate classes called strategies.

### The Context

The original class. Instead of executing the algorithms on its own, it delegates the work to a linked strategy object (stored in a field that references the strategy). The Context works with all strategies through the same generic interface.

### The Client

The piece of code that actually passes the desired strategy to the Context.

## Aggregation vs. Composition (Crucial Distinction)

The Strategy pattern is based on Aggregation (a looser form of composition).

- Composition: Means "is composed of". For instance, if class A initiates class B inside of it, A is composed of B. (new keyword)
- Aggregation: We pass B as a parameter to the class (via the constructor or setter methods). (Loose composition)

## Code Example: Parking Lot Pricing

```python
from enum import Enum
from abs import ABC, abstractmethod

class SPOT_SIZE(Enum):
    small = 1
    medium = 2
    large = 3

# --- 1. THE STRATEGIES ---
# We extract the different algorithms into separate classes.
class PricingStrategy(ABC):
    @abstractmethod
    def calculate_price(self):
        pass

class SmallSpotPrice(PricingStrategy):
    def calculate_price(self):
        return 10

class MediumSpotPrice(PricingStrategy):
    def calculate_price(self):
        return 15

class LargeSpotPrice(PricingStrategy):
    def calculate_price(self):
        return 30


# --- 2. THE CONTEXT ---
# The original class that delegates the work instead of doing it itself.
class ParkingLot:
    # Aggregation: We pass the strategies into the class as a parameter
    def __init__(self, revenue, spots_available, parked_vehicles, pricing_strategies):
        self.revenue = revenue
        self.spots_available = spots_available
        self.parked_vehicles = parked_vehicles

        # Stored in a field that references the strategy
        self.pricing_strategies = pricing_strategies

    def park_vehicle(self, vehicle):
        plate_number = vehicle.plate_number
        allowed_spots = vehicle.get_allowed_spot_sizes()

        for spot_size in allowed_spots:
            if self.spots_available[spot_size]:
                park_spot = self.spots_available[spot_size].pop()
                self.parked_vehicles[plate_number] = [park_spot, spot_size]

                # Context delegates work to the linked strategy object
                # It works with all strategies through the same generic interface
                strategy = self.pricing_strategies[spot_size]
                self.revenue += strategy.calculate_price()

                return f"Parked vehicle: {plate_number} at: {park_spot}"


# --- 3. THE CLIENT ---
if __name__ == '__main__':
    # The Client creates the strategy objects...
    strategies = {
        SPOT_SIZE.small: SmallSpotPrice(),
        SPOT_SIZE.medium: MediumSpotPrice(),
        SPOT_SIZE.large: LargeSpotPrice()
    }

    # ...and passes the desired strategies to the Context
    parking_lot = ParkingLot(
        revenue=0,
        spots_available={
            SPOT_SIZE.small: ['1a', '2a'],
            SPOT_SIZE.medium: ['3a', '4a'],
            SPOT_SIZE.large: ['6a', '7a']
        },
        parked_vehicles={},
        pricing_strategies=strategies
    )
```