import { Temperature } from './iot'
import { RGB, HexColor, HsxY } from './colors'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      bulb: {
        /** Name of the bulb */
        name: string
        /** Whether the bulb is on */
        on: boolean
        color?: RGB | HexColor | HsxY
        temp?: Temperature
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
