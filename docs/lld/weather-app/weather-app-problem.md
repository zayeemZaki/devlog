---
sidebar_position: 2
title: Weather App LLD
sidebar_label: Weather App LLD
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Weather App LLD</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-05-13</em></span>
</h1>

## Deep Dive: Weather Dashboard Problem (Adapter Pattern)

This low-level design keeps the internal dashboard focused on one clean contract:

- `Target`: The interface the client expects.
- `WeatherAdaptee`: A legacy or third-party service that returns data in a different format.
- `Adapter`: Converts Fahrenheit to Celsius and miles per hour to kilometers per hour.
- `Client`: Consumes the normalized weather data without knowing anything about the external service.

The adapter isolates all translation logic so the dashboard does not depend on the legacy API shape.

## Full Implementation

```python
from abc import ABC, abstractmethod


class Target(ABC):
    @abstractmethod
    def get_weather(self):
        pass


class WeatherAdaptee:
    def get_raw_weather(self):
        # Simulates a third-party API returning Fahrenheit and miles per hour.
        return 72.0, 18.0


class Adapter(Target):
    def __init__(self, adaptee: WeatherAdaptee):
        self.adaptee = adaptee

    def get_weather(self):
        raw_temp_f, raw_speed_mph = self.adaptee.get_raw_weather()
        temp_c = (raw_temp_f - 32) * 5 / 9
        speed_kmh = raw_speed_mph * 1.60934
        return temp_c, speed_kmh


class Client:
    def __init__(self, provider: Target):
        self.provider = provider

    def display_dashboard(self):
        temp_c, speed_kmh = self.provider.get_weather()

        print("=== Toledo Weather Dashboard ===")
        print(f"Temperature: {temp_c:.2f} C")
        print(f"Wind Speed: {speed_kmh:.2f} km/h")
        print("==============================")


if __name__ == '__main__':
    legacy_api = WeatherAdaptee()
    weather_adapter = Adapter(legacy_api)

    app = Client(weather_adapter)
    app.display_dashboard()
```