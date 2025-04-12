import { Temperature } from './iot'
import { RGB, HexColor, HsxY, ColorName } from './colors'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      bulb: {
        /** Name of the bulb */
        name: string
        /** Whether the bulb is on */
        on: boolean
        color?: RGB | HexColor | HsxY | ColorName
        temp?: Temperature
        /** Brightness of the bulb, from 0 to 1 */
        brightness?: number
      }
      room: {
        /** Name of the room */
        name: string
        /** Whether the room is off. This overrides the bulbs' on property. */
        off?: boolean
        /** The devices in the room */
        children: React.ReactNode
      }
      button: {
        name: string
        onPress: () => void
        onDoublePress?: () => void
      }
    }
  }
}

export { }
