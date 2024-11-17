import { Temperature } from './iot'
import { RGB, HexColor, HsxY } from './colors'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      bulb: {
        /** Name of the bulb */
        name: string
        /** Whether the bulb is on */
        on: boolean
      } & (
        | {
          /** The temperature of the bulb */
          temp: Temperature
          /** The color of the bulb */
          color?: never
        }
        | {
          /** The temperature of the bulb */
          temp?: never
          /** The color of the bulb */
          color: RGB | HexColor | HsxY
        }
        | {
          temp?: never
          color?: never
        }
      )
      room: {
        /** Name of the room */
        name: string
        /** Whether the room is off. This overrides the bulbs' on property. */
        off?: boolean
        /** The devices in the room */
        children: React.ReactNode
      }
    }
  }
}
