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
      // Convert buffer to Int16Array for proper audio data handling
      const int16Array = new Int16Array(
        data.buffer,
        data.byteOffset,
        data.byteLength / 2
      )

      // Calculate the maximum absolute value in the buffer
      let max = 0
      for (let i = 0; i < int16Array.length; i++) {
        const absValue = Math.abs(int16Array[i])
        if (absValue > max) max = absValue
      }

      // Normalize to 0-1 range (16-bit audio has range -32768 to 32767)
      const normalized = Math.min(max / 32767, 1)

      // Only update if there's a significant change
      if (Math.abs(noiseLevel - normalized) > 0.01) {
        setNoiseLevel(normalized)
      }
    })

    micInputStream.on('error', (err: Error) => {
      console.error('Error:', err)
    })

    micInstance.start()

    return () => {
      micInstance.stop()
    }
  }, [noiseLevel])

  return noiseLevel
}
