import React from 'react'

export function Room() {
  const [on, setOn] = React.useState(false)
  React.useEffect(() => {
    const interval = setInterval(() => setOn((prev) => !prev), 2000)
    return () => clearInterval(interval)
  }, [on])
  return (
    <room name="Office">
      <bulb name="Bulb 1" on={on} temp="coolest" />
    </room>
  )
}
