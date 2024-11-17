# react-iot

A React renderer for IOT devices.

## Installation

```bash
npm install react-iot
```

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
