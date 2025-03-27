import React from 'react'
import { render } from './render'
import { Page } from './page'
import fs from 'fs'

function main() {
  const cleanup = render(<Page />, (markdown) => {
    if (markdown) {
      fs.writeFileSync('output.md', markdown + `\n\n`)
    }
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
