---
sidebar_position: 7
title: Parking Lot LLD
sidebar_label: Parking Lot LLD
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Parking Lot LLD</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-06</em></span>
</h1>

## Deep Dive: Parking Lot LLD (Factory + Strategy + Decorator + Observer + Singleton)

This design combines multiple design patterns into one realistic parking lot example:

- Factory Method: Creates vehicles without large if/else construction blocks.
- Strategy: Keeps base pricing logic pluggable by spot size.
- Decorator: Adds optional services (car wash, EV charging) dynamically.
- Observer: Notifies display and admin components on state change.
- Singleton: Guarantees one shared `ParkingLot` instance.

## Full Implementation

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


class Truck(Vehicle):
    def __init__(self, plate_number):
        super().__init__(plate_number, VEHICLE_TYPE.truck)

    def get_allowed_spot_sizes(self):
        return [SPOT_SIZE.large]


class VehicleCreator(ABC):
    @abstractmethod
    def create_vehicle(self, plate_number: str) -> Vehicle:
        pass


class MotorcycleCreator(VehicleCreator):
    def create_vehicle(self, plate_number: str) -> Vehicle:
        return Motorcycle(plate_number)


class CarCreator(VehicleCreator):
    def create_vehicle(self, plate_number: str) -> Vehicle:
        return Car(plate_number)


class TruckCreator(VehicleCreator):
    def create_vehicle(self, plate_number: str) -> Vehicle:
        return Truck(plate_number)


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


class PricingDecorator(PricingStrategy):
    def __init__(self, pricing_strategy: PricingStrategy):
        self.wrapped_strategy = pricing_strategy

    def calculate_price(self):
        return self.wrapped_strategy.calculate_price()


class CarWashDecorator(PricingDecorator):
    def calculate_price(self):
        return super().calculate_price() + 5


class EvChargingDecorator(PricingDecorator):
    def calculate_price(self):
        return super().calculate_price() + 7


class Observer(ABC):
    @abstractmethod
    def update(self, spots_available, revenue):
        pass


class SpotsAvailableObserver(Observer):
    def update(self, spots_available, revenue):
        print("\nDisplay Board")
        for size, spots in spots_available.items():
            print(f"  - {size.name.capitalize()}: {len(spots)}")

        print("-" * 30)


class RevenueTracker(Observer):
    def update(self, spots_available, revenue):
        print(f"Total Revenue Updated: {revenue}\n")


class ParkingLot:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(ParkingLot, cls).__new__(cls)

        return cls._instance

    def __init__(self, revenue, spots_available, parked_vehicles, pricing_strategies):
        if not hasattr(self, '_initialized'):
            self.revenue = revenue
            self.spots_available = spots_available
            self.parked_vehicles = parked_vehicles
            self.pricing_strategies = pricing_strategies

            self.observers = []
            self._initialized = True

    def add_observers(self, observer: Observer):
        self.observers.append(observer)

    def remove_observers(self, observer: Observer):
        self.observers.remove(observer)

    def notify_observers(self):
        for observer in self.observers:
            observer.update(self.spots_available, self.revenue)

    def park_vehicle(self, vehicle: Vehicle, services=None):
        services = services or []
        plate_number = vehicle.plate_number
        allowed_spots = vehicle.get_allowed_spot_sizes()

        for spot_size in allowed_spots:
            if self.spots_available[spot_size]:
                park_spot = self.spots_available[spot_size].pop()
                self.parked_vehicles[plate_number] = [park_spot, spot_size]

                strategy = self.pricing_strategies[spot_size]

                for service in services:
                    strategy = service(strategy)

                self.revenue += strategy.calculate_price()

                self.notify_observers()

                return f"Parked vehicle: {plate_number} at: {park_spot}"

    def unpark_vehicle(self, plate_number: str):
        park_spot, spot_size = self.parked_vehicles[plate_number]
        del self.parked_vehicles[plate_number]

        self.spots_available[spot_size].append(park_spot)

        self.notify_observers()


if __name__ == '__main__':
    pricing_strategies = {
        SPOT_SIZE.small: SmallSpotPrice(),
        SPOT_SIZE.medium: MediumSpotPrice(),
        SPOT_SIZE.large: LargeSpotPrice(),
    }

    parking_lot = ParkingLot(
        revenue=0,
        spots_available={
            SPOT_SIZE.small: ['1a', '2a', '1b', '2b', '1c', '2c'],
            SPOT_SIZE.medium: ['3a', '4a', '5a', '3b', '4b', '5b', '3c', '4c', '5c'],
            SPOT_SIZE.large: ['6a', '7a', '8a', '9a', '10a', '6b', '7b', '8b', '9b', '10b', '6c', '7c', '8c', '9c', '10c'],
        },
        parked_vehicles={},
        pricing_strategies=pricing_strategies,
    )

    parking_lot.add_observers(SpotsAvailableObserver())
    parking_lot.add_observers(RevenueTracker())

    vehicle1 = MotorcycleCreator().create_vehicle('JK123')
    vehicle2 = CarCreator().create_vehicle('JK345')
    vehicle3 = TruckCreator().create_vehicle('JK567')

    print('>>> Parking Motorcycle...')
    parking_lot.park_vehicle(vehicle1, services=[EvChargingDecorator])

    print('>>> Parking Car...')
    parking_lot.park_vehicle(vehicle2, services=[CarWashDecorator])

    print('>>> Parking Truck...')
    parking_lot.park_vehicle(vehicle3)

    print('>>> Unparking Motorcycle...')
    parking_lot.unpark_vehicle(vehicle1.plate_number)
```

## Singleton Internals Explained

### What `__new__` does

- `__new__` runs before `__init__` and is responsible for creating the object instance.
- In a Singleton, we override it to control whether a new instance should be created.

### What `cls` means

- `cls` is the class object itself (here, `ParkingLot`), similar to how `self` is the object instance.
- Using `cls._instance` stores singleton state at the class level.

### Breaking down `cls._instance = super(ParkingLot, cls).__new__(cls)`

- `super(ParkingLot, cls)` gets the parent of `ParkingLot` in the MRO for class-level dispatch.
- `.__new__(cls)` calls the parent class allocator to actually create a fresh `ParkingLot` object.
- The result is assigned to `cls._instance` so future constructor calls return the same object.

### Why `__init__` has `_initialized`

Even when `__new__` returns the same object, Python still calls `__init__` on each `ParkingLot(...)` call.
The `_initialized` guard prevents re-running initialization and accidentally resetting shared state.