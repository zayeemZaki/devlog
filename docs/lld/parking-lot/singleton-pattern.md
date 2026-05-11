---
sidebar_position: 5
title: Singleton Pattern
sidebar_label: Singleton Pattern
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Singleton Pattern</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-11</em></span>
</h1>

The Singleton is a creational design pattern that lets us ensure a class has only one single instance, while providing a global access point to that instance.

## How it works (Conceptually)

In strict object-oriented languages, Singletons are usually implemented by making the default constructor private. This prevents other objects from using the new operator with the Singleton class. Instead, we create a static creation method that acts as a constructor-it creates an object, saves it in a static field, and all following calls just return that cached object.

## How it works (In Python)

Python doesn't have true "private" constructors. Instead, we intercept the actual memory allocation step by overriding the __new__ method. We use a class-level variable to store the instance, and if it already exists, __new__ simply returns the existing memory address rather than building a new object.

## Code Example: The Parking Lot Singleton

Here is how I implemented the Singleton pattern for the central ParkingLot system. There should only ever be one physical parking lot in the application; if a bug tries to instantiate a second one, it will just return a reference to the first one, keeping all revenue and spot data perfectly in sync.

```python
class ParkingLot:
    # 1. A static, class-level field to hold the cached instance
    _instance = None

    # 2. Override __new__ to act as our static creation method
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            # If it doesn't exist, create it and cache it
            cls._instance = super(ParkingLot, cls).__new__(cls)
        
        # All following calls return the cached object
        return cls._instance

    def __init__(self, revenue, spots_available, parked_vehicles, pricing_strategies):
        # 3. Prevent the initializer from wiping the data if called again
        if not hasattr(self, '_initialized'):
            self.revenue = revenue
            self.spots_available = spots_available
            self.parked_vehicles = parked_vehicles
            self.pricing_strategies = pricing_strategies
            
            self.observers = []
            self._initialized = True  # Flag to ensure one-time setup

    # ... remaining methods (park_vehicle, notify_observers, etc.) ...


# --- THE CLIENT PROOF ---
if __name__ == '__main__':
    # Attempt to create the first lot
    lot_A = ParkingLot(0, {'small': ['1a']}, {}, {})
    
    # Attempt to create a second lot somewhere else in the code
    lot_B = ParkingLot(500, {'small': ['99z']}, {}, {})

    # PROOF: They are the exact same object in memory!
    print(lot_A is lot_B) # Output: True

    # lot_B did not overwrite lot_A's initial state
    print(lot_B.revenue)  # Output: 0
```