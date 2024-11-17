import React from 'react'
import { createZigbeeClient } from './zigbee'
import { render } from './render'
import { Room } from './room'

function main() {
  const { api, cleanup } = createZigbeeClient()

  render(<Room />, api)

  process.on('exit', cleanup)
}

main()
