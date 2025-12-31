import React from 'react'
import { useNoise } from './useNoise'

export function Room() {
  const noise = useNoise()
  return (
    <room name="React Advanced Stage">
      <bulb name="Bulb 1" on brightness={noise} />
      <bulb name="Bulb 2" on brightness={noise} />
    </room>
  )
}
