---
sidebar_position: 2
title: Vending Machine LLD
sidebar_label: Vending Machine LLD
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Vending Machine LLD</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-14</em></span>
</h1>

## Deep Dive: Vending Machine Problem (State Pattern)

This low-level design models a vending machine with clear state transitions:

- `NoMoneyState`: Waiting for user input and money insertion.
- `HasMoneyState`: User can insert more money, eject money, or select a product.
- `DispenseState`: Machine dispenses a product and updates balance and stock.
- `SoldOutState`: Machine blocks operations when all products are out of stock.

The machine delegates behavior to the active state object, keeping each state focused and avoiding large conditional blocks.

## Full Implementation

```python
from abc import ABC, abstractmethod


class State(ABC):
    @abstractmethod
    def insert_money(self, amount):
        pass

    @abstractmethod
    def eject_money(self):
        pass

    @abstractmethod
    def select_product(self, name):
        pass

    @abstractmethod
    def dispense_product(self, name):
        pass


class SoldOutState(State):
    def __init__(self, machine):
        self.machine = machine

    def insert_money(self, amount):
        print("Machine is sold out.")

    def eject_money(self):
        print("Machine is sold out.")

    def select_product(self, name):
        print("Machine is sold out.")

    def dispense_product(self, name):
        print("Machine is sold out.")


class NoMoneyState(State):
    def __init__(self, machine):
        self.machine = machine

    def insert_money(self, amount):
        self.machine.balance += amount
        print(f"Inserted: {amount}. Current balance: {self.machine.balance}")
        self.machine.set_state(self.machine.has_money_state)

    def eject_money(self):
        print("No money to return.")

    def select_product(self, name):
        print("Insert money first.")

    def dispense_product(self, name):
        print("Select a product first.")


class HasMoneyState(State):
    def __init__(self, machine):
        self.machine = machine

    def insert_money(self, amount):
        self.machine.balance += amount
        print(f"Balance updated: {self.machine.balance}")

    def eject_money(self):
        print(f"Returned: {self.machine.balance}")
        self.machine.balance = 0

        if self.machine.is_out_of_stock():
            self.machine.set_state(self.machine.sold_out_state)
            return

        self.machine.set_state(self.machine.no_money_state)

    def select_product(self, name):
        if name not in self.machine.items:
            print("Invalid product.")
            return

        price, quantity = self.machine.items[name]
        if quantity <= 0:
            print("Product out of stock.")
            return

        if self.machine.balance < price:
            print(f"Insufficient balance. Add {price - self.machine.balance} more.")
            return

        self.machine.set_state(self.machine.dispense_state)
        self.machine.dispense_product(name)

    def dispense_product(self, name):
        print("Select a product before dispensing.")


class DispenseState(State):
    def __init__(self, machine):
        self.machine = machine

    def insert_money(self, amount):
        print("Dispensing in progress. Please wait.")

    def eject_money(self):
        print("Cannot eject money while dispensing.")

    def select_product(self, name):
        print("Already dispensing a product.")

    def dispense_product(self, name):
        price, quantity = self.machine.items[name]
        self.machine.items[name][1] = quantity - 1
        self.machine.balance -= price

        print(f"Dispensed: {name}")
        print(f"Remaining balance: {self.machine.balance}")

        if self.machine.is_out_of_stock():
            self.machine.set_state(self.machine.sold_out_state)
            return

        if self.machine.balance > 0:
            self.machine.set_state(self.machine.has_money_state)
        else:
            self.machine.set_state(self.machine.no_money_state)


class VendingMachine:
    def __init__(self, items):
        self.no_money_state = NoMoneyState(self)
        self.has_money_state = HasMoneyState(self)
        self.dispense_state = DispenseState(self)
        self.sold_out_state = SoldOutState(self)

        self.items = items
        self.balance = 0

        if self.is_out_of_stock():
            self.current_state = self.sold_out_state
        else:
            self.current_state = self.no_money_state

    def set_state(self, state):
        self.current_state = state

    def insert_money(self, amount):
        self.current_state.insert_money(amount)

    def eject_money(self):
        self.current_state.eject_money()

    def select_product(self, name):
        self.current_state.select_product(name)

    def dispense_product(self, name):
        self.current_state.dispense_product(name)

    def is_out_of_stock(self):
        return all(quantity == 0 for _, quantity in self.items.values())


if __name__ == '__main__':
    inventory = {
        'coke': [5, 2],
        'chips': [3, 1],
        'water': [2, 3],
    }

    machine = VendingMachine(inventory)
    machine.insert_money(5)
    machine.select_product('chips')
```