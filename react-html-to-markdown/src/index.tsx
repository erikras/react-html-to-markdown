import React from 'react'
import { render } from './render'
import { Page } from './page'
import fs from 'fs'

function main() {
  let i = 0
  const cleanup = render(<Page />, (markdown) => {
    fs.writeFileSync('output.md', markdown + `\n\n${i++}`)
  })

  // Clean up when process exits
  process.on('SIGINT', () => {
    cleanup()
    process.exit()
  })
  process.on('SIGTERM', () => {
    cleanup()
    process.exit()
  })
}

main()
