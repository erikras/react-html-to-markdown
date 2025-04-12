import mqtt, { MqttClient } from 'mqtt'
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

const buttonPayloadSchema = z.object({
  action: z.string(),
  battery: z.number(),
  linkquality: z.number(),
  voltage: z.number(),
})
type ButtonPayload = z.infer<typeof buttonPayloadSchema>

export function createZigbeeClient(): { api: IotApi, cleanup: () => void } {
  const client: MqttClient = mqtt.connect('mqtt://localhost')

  // Map to store button callbacks keyed by device name
  const buttonCallbacks: Record<string, (data: ButtonPayload) => void> = {}

  client.on('connect', () => {
    console.log('Connected to MQTT broker')
    // You can add initial subscriptions here if needed
  })

  client.on('message', (topic, message) => {
    // Iterate over all button callbacks to find matching topics
    Object.keys(buttonCallbacks).forEach((deviceName) => {
      const expectedTopic = `zigbee2mqtt/${deviceName}`
      if (topic === expectedTopic) {
        try {
          const payload = JSON.parse(message.toString())
          const parsed = buttonPayloadSchema.parse(payload)
          buttonCallbacks[deviceName](parsed)
        } catch (error) {
          console.error(`Error parsing payload for ${deviceName}:`, error)
        }
      }
    })
  })

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
            state.brightness = Math.round(Math.max(0, Math.min(1, device.brightness ?? 1)) * 254)
            client.publish(`zigbee2mqtt/${device.name}/set`, Buffer.from(JSON.stringify(state)))
            break

          case 'button':
            // Subscribe to the button's topic if not already subscribed
            if (!buttonCallbacks[device.name]) {
              client.subscribe(`zigbee2mqtt/${device.name}`, (err) => {
                if (err) {
                  console.error(`Subscription error for ${device.name}:`, err)
                }
              })
            }

            // Assign the callback for this button
            buttonCallbacks[device.name] = device.onPress
            break

          case 'room':
            api.update(device.devices)
            break

          default:
            // Ensure exhaustive checking
            const _exhaustiveCheck: never = device
            return _exhaustiveCheck
        }
      })
    }
  }

  const cleanup = () => {
    client.end()
  }

  return { api, cleanup }
}
