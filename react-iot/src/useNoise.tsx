import React from 'react'
import mic from 'mic'

export function useNoise() {
  const [noiseLevel, setNoiseLevel] = React.useState(0)

  React.useEffect(() => {
    const micInstance = mic({
      rate: '16000',
      channels: '1',
      debug: false,
      exitOnSilence: 6,
    })

    const micInputStream = micInstance.getAudioStream()

    micInputStream.on('data', (data: Buffer) => {
      const values = Array.from(data)

      // Compute average amplitude
      const average =
        values.reduce((sum, value) => sum + Math.abs(value - 128), 0) /
        values.length

      // Normalize to a 0-1 range
      const normalized = Math.min(average / 128, 1)
      setNoiseLevel(normalized)
    })

    micInputStream.on('error', (err: Error) => {
      console.error('Error:', err)
    })

    micInstance.start()

    return () => {
      micInstance.stop()
    }
  }, [])

  return noiseLevel
}
