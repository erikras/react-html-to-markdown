import React from 'react'
import { describe, expect, it } from 'bun:test'
import { render } from './render'
import { IotDevice } from './iot'

describe('render', () => {
  it('should render a single bulb', () => {
    const result = render(<bulb name="my-bulb" on={true} temp="neutral" />)
    expect(result).toEqual([
      {
        type: 'bulb',
        name: 'my-bulb',
        on: true,
        temperature: 'neutral',
      },
    ])
  })

  it('should render a room with bulbs', () => {
    const result = render(
      <room name="Living Room">
        <bulb name="bulb-1" on={true} temp="warmest" />
        <bulb name="bulb-2" on={false} temp="cool" />
      </room>
    )
    expect(result).toEqual([
      {
        type: 'room',
        name: 'Living Room',
        off: false,
        devices: [
          {
            type: 'bulb',
            name: 'bulb-1',
            on: true,
            temperature: 'warmest',
          },
          {
            type: 'bulb',
            name: 'bulb-2',
            on: false,
            temperature: 'cool',
          },
        ],
      },
    ])
  })

  it('should handle room with off state affecting bulbs', () => {
    const result = render(
      <room name="Bedroom" off={true}>
        <bulb name="bulb-1" on={true} temp="coolest" />
      </room>
    )
    expect(result).toEqual([
      {
        type: 'room',
        name: 'Bedroom',
        off: true,
        devices: [
          {
            type: 'bulb',
            name: 'bulb-1',
            on: false, // Should be false because room is off
            temperature: 'coolest',
          },
        ],
      },
    ])
  })

  it('should ignore text nodes', () => {
    const result = render(
      <room name="Kitchen" off={false}>
        Some text
        <bulb name="bulb-1" on={true} temp="neutral" />
      </room>
    )
    expect(result).toEqual([
      {
        type: 'room',
        name: 'Kitchen',
        off: false,
        devices: [
          {
            type: 'bulb',
            name: 'bulb-1',
            on: true,
            temperature: 'neutral',
          },
        ],
      },
    ])
  })
})

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('render with effects', () => {
  it('should handle useEffect updates', async () => {
    const updates: IotDevice[][] = []
    const Page = () => {
      const [on, setOn] = React.useState(false)
      React.useEffect(() => {
        const interval = setInterval(() => {
          setOn((prev) => !prev)
        }, 100)
        return () => clearInterval(interval)
      }, [])
      return <bulb name="counter-bulb" on={on} temp="neutral" />
    }

    const cleanup = render(<Page />, {
      update: (devices) => {
        updates.push(devices)
      },
    })

    try {
      // Check initial render
      expect(updates[0]).toEqual([
        {
          type: 'bulb',
          name: 'counter-bulb',
          on: false,
          temperature: 'neutral',
        },
      ])

      await sleep(1000) // Slightly longer than the interval
      // Wait for updates
      for (let i = 1; i < 4; i++) {
        expect(updates[i]).toEqual([
          {
            type: 'bulb',
            name: 'counter-bulb',
            on: i % 2 === 1,
            temperature: 'neutral',
          },
        ])
      }
    } finally {
      cleanup()
    }
  })

  it('should handle useEffect updates when bulb is in a room', async () => {
    const updates: IotDevice[][] = []
    const Page = () => {
      const [on, setOn] = React.useState(false)
      React.useEffect(() => {
        const interval = setInterval(() => {
          setOn((prev) => !prev)
        }, 100)
        return () => clearInterval(interval)
      }, [])
      return (
        <room name="Bedroom">
          <bulb name="counter-bulb" on={on} temp="neutral" />
        </room>
      )
    }

    const cleanup = render(<Page />, {
      update: (devices) => {
        updates.push(devices)
      },
    })

    try {
      // Check initial render
      expect(updates[0]).toEqual([
        {
          type: 'room',
          name: 'Bedroom',
          off: false,
          devices: [
            {
              type: 'bulb',
              name: 'counter-bulb',
              on: false,
              temperature: 'neutral',
            },
          ],
        },
      ])

      await sleep(1000) // Slightly longer than the interval
      // Wait for updates
      for (let i = 1; i < 4; i++) {
        expect(updates[i]).toEqual([
          {
            type: 'room',
            name: 'Bedroom',
            off: false,
            devices: [
              {
                type: 'bulb',
                name: 'counter-bulb',
                on: i % 2 === 1,
                temperature: 'neutral',
              },
            ],
          },
        ])
      }
    } finally {
      cleanup()
    }
  })
})
