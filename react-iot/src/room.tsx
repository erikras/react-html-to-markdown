import React from 'react'

export function Room() {
  const [on, setOn] = React.useState(false)
  return (
    <room name="Office">
      <bulb name="Bulb 1" on={on} color="#ffffff" />
      <button name="Button" onPress={() => setOn((prev) => !prev)} />
    </room>
  )
}
