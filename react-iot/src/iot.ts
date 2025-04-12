import { HsxY } from "./colors"

export type Temperature = "coolest" | "cool" | "neutral" | "warmest"

export type BulbDevice = {
  type: 'bulb'
  name: string
  on: boolean
  temperature?: Temperature
  color?: HsxY
  brightness?: number
}

export type RoomDevice = {
  type: 'room'
  name: string
  off: boolean
  devices: Array<IotDevice>
}

export type ButtonDevice = {
  type: 'button'
  name: string
  onPress: () => void
  onDoublePress?: () => void
}

export type IotDevice = BulbDevice | RoomDevice | ButtonDevice

export type IotApi = {
  update: (devices: IotDevice[]) => void
}
