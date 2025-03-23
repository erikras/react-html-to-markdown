import React from 'react'

export function Page() {
  const [count, setCount] = React.useState(0)
  // increment count every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <h1>Hello</h1>
      <p>
        My name is <span>John</span>
      </p>
      <p>Count: {count}</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Count</td>
            <td>{count}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
