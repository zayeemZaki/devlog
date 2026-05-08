---
sidebar_position: 3
title: Factory Pattern
sidebar_label: Factory Pattern
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Factory Method</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-08</em></span>
</h1>

## Deep Dive: The Factory Pattern

The factory method is a creational design pattern that provides an interface for creating objects in a superclass, while allowing subclasses to alter the type of objects that are created.

## How it works

We move the direct object construction calls (using the new operator) out of the main client code and into a dedicated factory method.

This way, we can override the factory method in subclasses to change the class of products being created.

All products must implement a common interface. The base class (the Creator) declares its return type as this interface.

We then create ConcreteCreator subclasses which extend the base Creator and override the create_vehicle factory method to return specific products.

## Code Example: Parking Lot Vehicles

Here is how I implemented the Factory Method to handle vehicle instantiation without cluttering my client code with if/else checks.

```python
from enum import Enum
from abc import ABC, abstractmethod

class VEHICLE_TYPE(Enum):
    motorcycle = 1
    car = 2
    truck = 3

class SPOT_SIZE(Enum):
    small = 1
    medium = 2
    large = 3

# --- 1. THE PRODUCT INTERFACE & CONCRETE PRODUCTS ---
class Vehicle(ABC):
    def __init__(self, plate_number, vehicle_type):
        self.plate_number = plate_number
        self.vehicle_type = vehicle_type

    @abstractmethod
    def get_allowed_spot_sizes(self):
        pass 

class Motorcycle(Vehicle):
    def __init__(self, plate_number):
        super().__init__(plate_number, VEHICLE_TYPE.motorcycle)

    def get_allowed_spot_sizes(self):
        return [SPOT_SIZE.small, SPOT_SIZE.medium, SPOT_SIZE.large]

class Car(Vehicle):
    def __init__(self, plate_number):
        super().__init__(plate_number, VEHICLE_TYPE.car)

    def get_allowed_spot_sizes(self):
        return [SPOT_SIZE.medium, SPOT_SIZE.large]


# --- 2. THE CREATOR (Base Class) ---
# Declares the factory method that returns a Vehicle product.
class VehicleCreator(ABC):

    @abstractmethod
    def create_vehicle(self, plate_number: str) -> Vehicle:
        pass


# --- 3. THE CONCRETE CREATORS ---
# Subclasses override the factory method to alter the type of object created.
class MotorcycleCreator(VehicleCreator):
    def create_vehicle(self, plate_number: str) -> Vehicle:
        return Motorcycle(plate_number)

class CarCreator(VehicleCreator):
    def create_vehicle(self, plate_number: str) -> Vehicle:
        return Car(plate_number)
    

# --- 4. THE CLIENT ---
if __name__ == '__main__':
    # Instead of passing strings to a massive if/else block, 
    # we use the specific Concrete Creators to instantiate vehicles.
    
    vehicle1 = MotorcycleCreator().create_vehicle('JK123')

    vehicle2 = CarCreator().create_vehicle('JK345')
```