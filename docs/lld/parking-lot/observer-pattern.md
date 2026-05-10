---
sidebar_position: 4
title: Observer Pattern
sidebar_label: Observer Pattern
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
    <span>Observer Pattern</span>
    <span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-10</em></span>
</h1>

The observer pattern is a behavioral design pattern that lets us define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing.

We create a subscription infrastructure inside a publisher class (the Subject) so other objects can subscribe to or unsubscribe from a stream of events.
This way, whenever a critical state changes in the publisher, it goes over its list of subscribers and calls their notification method.

All the subscribers should implement a common interface (Observer) that declares the notification method (like an update method). The publisher communicates with them only via this interface.

We also have Concrete Observer subclasses which implement the Observer interface and perform specific actions when the publisher notifies them of a state change.

```python
from enum import Enum
from abc import ABC, abstractmethod

class SPOT_SIZE(Enum):
    small = 1
    medium = 2
    large = 3

# --- THE OBSERVER INTERFACE ---
class Observer(ABC):
    @abstractmethod
    def update(self, spots_available, revenue):
        pass 

# --- THE CONCRETE OBSERVERS ---
class SpotsAvailableObserver(Observer):
    def update(self, spots_available, revenue):
        print("\n[Display Board]")
        for size, spots in spots_available.items():
            print(f"  - {size.name.capitalize()}: {len(spots)}")
        print("-" * 30)

class RevenueTracker(Observer):
    def update(self, spots_available, revenue):
        print(f"[Admin Dashboard] Total Revenue Updated: ${revenue}\n")


# --- THE SUBJECT (Publisher) ---
class ParkingLot:
    def __init__(self, revenue, spots_available, parked_vehicles):
        self.revenue = revenue
        self.spots_available = spots_available
        self.parked_vehicles = parked_vehicles
        
        # Subscription infrastructure
        self.observers = []

    def add_observer(self, observer: Observer):
        self.observers.append(observer)

    def remove_observer(self, observer: Observer):
        self.observers.remove(observer)

    def notify_observers(self):
        # Goes over the list and calls the notification method
        for observer in self.observers:
            observer.update(self.spots_available, self.revenue)

    def park_vehicle(self, plate_number, spot_size, price):
        if self.spots_available[spot_size]:
            park_spot = self.spots_available[spot_size].pop()
            self.parked_vehicles[plate_number] = [park_spot, spot_size]
            self.revenue += price

            # Notify all subscribers that the state has changed
            self.notify_observers()
            return f"Parked vehicle: {plate_number} at: {park_spot}"
        
    def unpark_vehicle(self, plate_number: str):
        park_spot, spot_size = self.parked_vehicles[plate_number]
        del self.parked_vehicles[plate_number]
        self.spots_available[spot_size].append(park_spot)

        # Notify all subscribers that the state has changed
        self.notify_observers()


# --- THE CLIENT ---
if __name__ == '__main__':
    parking_lot = ParkingLot(
        revenue=0,
        spots_available={
            SPOT_SIZE.small: ['1a', '2a'],
            SPOT_SIZE.medium: ['3a', '4a'],
            SPOT_SIZE.large: ['6a', '7a']
        },
        parked_vehicles={}
    )
    
    # Instantiate and subscribe the observers
    parking_lot.add_observer(SpotsAvailableObserver())
    parking_lot.add_observer(RevenueTracker())

    print(">>> Parking Vehicle...")
    parking_lot.park_vehicle('JK123', SPOT_SIZE.small, 10)

    print(">>> Unparking Vehicle...")
    parking_lot.unpark_vehicle('JK123')
```
