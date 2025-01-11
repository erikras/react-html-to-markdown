import React from 'react'
import { useNoise } from './useNoise'

export function Room() {
  const [on, setOn] = React.useState(false)
  const noiseLevel = useNoise()
  return (
    <room name="Office">
      <bulb name="Bulb 1" on={on} color="#ffffff" />
      <button name="Button" onPress={() => setOn((prev) => !prev)} />
    </room>
  )
}
