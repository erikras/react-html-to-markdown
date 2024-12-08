import mqtt from 'mqtt'
import { IotApi, Temperature } from "./iot";
import { z } from 'zod'

const temperatures: Record<Temperature, number> = {
  coolest: 153,
  cool: 240,
  neutral: 260,
  warmest: 370,
}

const bulbStateSchema = z.object({
  brightness: z.number(),
  color: z.object({
    hue: z.number(),
    saturation: z.number(),
    x: z.number(),
    y: z.number(),
  }),
  color_mode: z.string(),
  color_temp: z.number(),
  color_temp_startup: z.number(),
  linkquality: z.number(),
  power_on_behavior: z.union([z.literal('off'), z.literal('on'), z.literal('previous'), z.literal('toggle')]),
  state: z.union([z.literal('ON'), z.literal('OFF')]),
})
type BulbState = z.infer<typeof bulbStateSchema>

export function createZigbeeClient(): { api: IotApi, cleanup: () => void } {
  const client = mqtt.connect('mqtt://localhost')

  const api: IotApi = {
    update: (devices) => {
      devices.forEach((device) => {
        switch (device.type) {
          case 'bulb':
            const state: Partial<BulbState> = {
              state: device.on ? 'ON' : 'OFF',
            }
            if (device.color) {
              state.color = device.color
            }
            if (device.temperature) {
              state.color_temp = temperatures[device.temperature]
            }
            client.publish(`zigbee2mqtt/${device.name}/set`, Buffer.from(JSON.stringify(state)))
            break
          case 'button':
            client.publish(`zigbee2mqtt/${device.name}/set`, Buffer.from(JSON.stringify({ on_press: device.onPress })))
            break
          case 'room':
            api.update(device.devices)
            break
          default:
            return device satisfies never
        }
      })
    }
  }
  const cleanup = () => {
    client.end()
  }

  return { api, cleanup }
}
