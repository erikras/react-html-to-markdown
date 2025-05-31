# react-iot

A React renderer for IOT devices.

## Installation

```bash
npm install react-iot
```

## Requirements

You'll need to be running a [Zigbee2MQTT](https://www.zigbee2mqtt.io/) server to use this library.

## Usage

```tsx
import { render } from 'react-iot'

const iot = (
  <room name="Office">
    <bulb name="Bulb 1" on temp="coolest" />
  </room>
)

render(iot, api)
```
