import React from 'react'

export function Page() {
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1)
    }, 1_000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      <h1>Hello, React Advanced!</h1>
      <h2>{count}</h2>
      <p>I am a paragraph.</p>
      <p>
        <a href="https://reactadvanced.com">Link</a>
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Smith</td>
            <td>Engineering</td>
            <td>42</td>
          </tr>
          <tr>
            <td>Sarah Johnson</td>
            <td>Product Manager</td>
            <td>35</td>
          </tr>
          <tr>
            <td>Michael Chen</td>
            <td>Design</td>
            <td>32</td>
          </tr>
          <tr>
            <td>Emma Wilson</td>
            <td>Marketing</td>
            <td>28</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
