import React from 'react'
import { describe, expect, it, mock } from 'bun:test'
import { containerToMarkdown, render } from './render'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('render', () => {
  it('should render a h1', () => {
    const result = render(<h1>Hello, world!</h1>)
    const expected = '# Hello, world!\n\n'
    expect(result).toBe(expected)
  })

  it('should render a h2', () => {
    const result = render(<h2>Subtitle</h2>)
    const expected = '## Subtitle\n\n'
    expect(result).toBe(expected)
  })

  it('should render a h3', () => {
    const result = render(<h3>Section</h3>)
    const expected = '### Section\n\n'
    expect(result).toBe(expected)
  })

  it('should render a h4', () => {
    const result = render(<h4>Subsection</h4>)
    const expected = '#### Subsection\n\n'
    expect(result).toBe(expected)
  })

  it('should render a h5', () => {
    const result = render(<h5>Minor Section</h5>)
    const expected = '##### Minor Section\n\n'
    expect(result).toBe(expected)
  })

  it('should render a h6', () => {
    const result = render(<h6>Smallest Heading</h6>)
    const expected = '###### Smallest Heading\n\n'
    expect(result).toBe(expected)
  })

  it('should render a paragraph', () => {
    const result = render(<p>This is a paragraph.</p>)
    const expected = 'This is a paragraph.\n\n'
    expect(result).toBe(expected)
  })

  it('should render an unordered list', () => {
    const result = render(
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    )
    const expected = '- Item 1\n- Item 2\n\n'
    expect(result).toBe(expected)
  })

  it('should render an ordered list', () => {
    const result = render(
      <ol>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </ol>
    )
    const expected = '1. First\n2. Second\n3. Third\n\n'
    expect(result).toBe(expected)
  })

  it('should render a blockquote', () => {
    const result = render(<blockquote>Quote text</blockquote>)
    const expected = '> Quote text\n\n'
    expect(result).toBe(expected)
  })

  it('should render a code block', () => {
    const result = render(<pre>console.log('Hello');</pre>)
    const expected = "```\nconsole.log('Hello');\n```\n\n"
    expect(result).toBe(expected)
  })

  it('should render inline code', () => {
    const result = render(<code>inline code</code>)
    const expected = '`inline code`'
    expect(result).toBe(expected)
  })

  it('should render emphasis', () => {
    const result = render(<em>emphasized text</em>)
    const expected = '*emphasized text*'
    expect(result).toBe(expected)
  })

  it('should render strong emphasis', () => {
    const result = render(<strong>bold text</strong>)
    const expected = '**bold text**'
    expect(result).toBe(expected)
  })

  it('should render a link', () => {
    const result = render(<a href="https://example.com">Link text</a>)
    const expected = '[Link text](https://example.com)'
    expect(result).toBe(expected)
  })

  it('should render an image', () => {
    const result = render(<img src="image.jpg" alt="Alt text" />)
    const expected = '![Alt text](image.jpg)'
    expect(result).toBe(expected)
  })

  it('should render a horizontal rule', () => {
    const result = render(<hr />)
    const expected = '---\n\n'
    expect(result).toBe(expected)
  })

  it('should render strikethrough text', () => {
    const result = render(<del>deleted text</del>)
    const expected = '~~deleted text~~'
    expect(result).toBe(expected)
  })

  it('should render a span', () => {
    const result = render(<span>span text</span>)
    const expected = 'span text'
    expect(result).toBe(expected)
  })

  it('should render a div', () => {
    const result = render(<div>div text</div>)
    const expected = 'div text'
    expect(result).toBe(expected)
  })

  it('should render a table', () => {
    const result = render(
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
          </tr>
        </tbody>
      </table>
    )
    const expected =
      '| Header 1 | Header 2 |\n' +
      '| -------- | -------- |\n' +
      '| Row 1, Cell 1 | Row 1, Cell 2 |\n' +
      '| Row 2, Cell 1 | Row 2, Cell 2 |\n'
    expect(result).toBe(expected)
  })

  it('should render a table with no tbody', () => {
    const result = render(
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
        </thead>
        <tr>
          <td>Row 1, Cell 1</td>
          <td>Row 1, Cell 2</td>
        </tr>
        <tr>
          <td>Row 2, Cell 1</td>
          <td>Row 2, Cell 2</td>
        </tr>
      </table>
    )
    const expected =
      '| Header 1 | Header 2 |\n' +
      '| -------- | -------- |\n' +
      '| Row 1, Cell 1 | Row 1, Cell 2 |\n' +
      '| Row 2, Cell 1 | Row 2, Cell 2 |\n'
    expect(result).toBe(expected)
  })

  it('should render a table with a longer header', () => {
    const result = render(
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Longer Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
          </tr>
        </tbody>
      </table>
    )
    const expected =
      '| Header 1 | Longer Header 2 |\n' +
      '| -------- | --------------- |\n' +
      '| Row 1, Cell 1 | Row 1, Cell 2 |\n' +
      '| Row 2, Cell 1 | Row 2, Cell 2 |\n'
    expect(result).toBe(expected)
  })

  it('should render a table with a longer content', () => {
    const result = render(
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Longer Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2 really long content</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
          </tr>
        </tbody>
      </table>
    )
    const expected =
      '| Header 1      | Longer Header 2                   |\n' +
      '| ------------- | --------------------------------- |\n' +
      '| Row 1, Cell 1 | Row 1, Cell 2 really long content |\n' +
      '| Row 2, Cell 1 | Row 2, Cell 2 |\n'
    expect(result).toBe(expected)
  })

  it('should render a combination of various HTML tags', () => {
    const result = render(
      <div>
        <h1>Main Heading</h1>
        <p>
          This is a <strong>bold</strong> and <em>italic</em> text with a{' '}
          <a href="https://example.com">link</a>.
        </p>
        <ul>
          <li>Unordered list item 1</li>
          <li>Unordered list item 2</li>
        </ul>
        <ol>
          <li>Ordered list item 1</li>
          <li>Ordered list item 2</li>
        </ol>
        <blockquote>
          This is a blockquote with <code>inline code</code>.
        </blockquote>
        <pre>
          <code>console.log("This is a code block");</code>
        </pre>
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Cell 1</td>
              <td>Row 1, Cell 2</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
    const expected =
      '# Main Heading\n\n' +
      'This is a **bold** and *italic* text with a [link](https://example.com).\n\n' +
      '- Unordered list item 1\n' +
      '- Unordered list item 2\n\n' +
      '1. Ordered list item 1\n' +
      '2. Ordered list item 2\n\n' +
      '> This is a blockquote with `inline code`.\n\n' +
      '```\n' +
      'console.log("This is a code block");\n' +
      '```\n\n' +
      '| Column 1 | Column 2 |\n' +
      '| -------- | -------- |\n' +
      '| Row 1, Cell 1 | Row 1, Cell 2 |\n'
    expect(result).toBe(expected)
  })

  it('should not care about props', () => {
    const result = render(<p style="color: blue;">p text</p>)
    const expected = 'p text\n\n'
    expect(result).toBe(expected)
  })

  it('should handle useEffect updates', async () => {
    const updates: string[] = []
    const Page = () => {
      const [count, setCount] = React.useState(0)
      React.useEffect(() => {
        const interval = setInterval(() => {
          setCount((prev) => prev + 1)
        }, 10)
        return () => clearInterval(interval)
      }, [])
      return <div>{count.toString()}</div>
    }

    const cleanup = render(<Page />, (markdown) => {
      updates.push(markdown)
    })

    try {
      // Check initial render
      expect(updates[0]).toEqual('0')

      // Wait for updates
      for (let i = 1; i < 4; i++) {
        await sleep(20) // Slightly longer than the interval
        expect(updates[i]).toEqual(i.toString())
      }
    } finally {
      cleanup()
    }
  })

  it('should handle useEffect updates when text is nested', async () => {
    const updates: string[] = []
    const Page = () => {
      const [count, setCount] = React.useState(0)
      React.useEffect(() => {
        const interval = setInterval(() => {
          setCount((prev) => prev + 1)
        }, 10)
        return () => clearInterval(interval)
      }, [])
      return (
        <div>
          <h1>{count.toString()}</h1>
        </div>
      )
    }

    const cleanup = render(<Page />, (markdown) => {
      updates.push(markdown)
    })

    try {
      // Wait for initial render
      expect(updates[0]).toEqual('# 0\n\n')

      // Wait for each update
      for (let i = 1; i < 4; i++) {
        await sleep(20) // Slightly longer than the interval
        expect(updates[i]).toEqual(`# ${i}\n\n`)
      }
    } finally {
      cleanup()
    }
  })

  it('should handle empty tables', () => {
    const result = render(
      <table>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
    )
    expect(result).toBe('')
  })

  it('should handle tables with missing cells', () => {
    const result = render(
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
            {/* Missing the third cell */}
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            {/* Missing the second cell */}
            <td>Row 2, Cell 3</td>
          </tr>
        </tbody>
      </table>
    )

    // The output should still have 3 columns for each row
    expect(result).toContain('| Header 1')
    expect(result).toContain('| Header 2')
    expect(result).toContain('| Header 3')
    expect(result.split('\n').length).toBeGreaterThanOrEqual(4) // Header, separator, 2 data rows
  })

  it('should handle tables with uneven column counts', () => {
    const result = render(
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
            <td>Row 1, Cell 3</td> {/* Extra cell */}
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
          </tr>
        </tbody>
      </table>
    )

    // The table should have 3 columns (maximum found in any row)
    const lines = result.split('\n')
    expect(lines[0].split('|').length).toBe(5) // 3 columns = 4 pipe chars + 1 extra for split
  })

  it('should handle tables with very long content', () => {
    const longText =
      'This is an extremely long piece of text that should cause the column to be very wide to accommodate it properly'
    const result = render(
      <table>
        <thead>
          <tr>
            <th>Header</th>
            <th>Long Content</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1</td>
            <td>{longText}</td>
          </tr>
        </tbody>
      </table>
    )

    // The second column should be at least as wide as the long text
    expect(result).toContain(longText)

    // The separator line should match the width of the content
    const lines = result.split('\n')
    const separatorLine = lines[1]
    const contentLength = longText.length
    expect(separatorLine.length).toBeGreaterThanOrEqual(contentLength)
  })

  it('should handle tables without headers', () => {
    const result = render(
      <table>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
          </tr>
        </tbody>
      </table>
    )

    // The first row should be used as headers
    const lines = result.split('\n')
    expect(lines[0]).toContain('Row 1, Cell 1')
    expect(lines[0]).toContain('Row 1, Cell 2')
    expect(lines[2]).toContain('Row 2, Cell 1')
    expect(lines[2]).toContain('Row 2, Cell 2')
  })

  it('should handle tables with mixed content types', () => {
    const result = render(
      <table>
        <thead>
          <tr>
            <th>Format</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bold</td>
            <td>
              <strong>Bold text</strong>
            </td>
          </tr>
          <tr>
            <td>Italic</td>
            <td>
              <em>Italic text</em>
            </td>
          </tr>
          <tr>
            <td>Link</td>
            <td>
              <a href="https://example.com">Link</a>
            </td>
          </tr>
          <tr>
            <td>Code</td>
            <td>
              <code>console.log('code')</code>
            </td>
          </tr>
        </tbody>
      </table>
    )

    // The result should contain properly formatted markdown in cells
    expect(result).toContain('| Bold')
    expect(result).toContain('**Bold text**')
    expect(result).toContain('*Italic text*')
    expect(result).toContain('[Link](https://example.com)')
    expect(result).toContain("`console.log('code')`")
  })

  it('should handle nested tables', () => {
    const result = render(
      <div>
        <h1>Outer Content</h1>
        <table>
          <thead>
            <tr>
              <th>Outer Header</th>
              <th>Nested Table</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Outer Cell</td>
              <td>
                <table>
                  <thead>
                    <tr>
                      <th>Inner Header 1</th>
                      <th>Inner Header 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Inner Cell 1</td>
                      <td>Inner Cell 2</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )

    // Should contain both outer and inner table markdown
    expect(result).toContain('Outer Header')
    expect(result).toContain('Inner Header')
    expect(result).toContain('Inner Cell')
  })

  it('should handle tables with special characters', () => {
    const result = render(
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>|</td>
            <td>Pipe character (escaped in markdown)</td>
          </tr>
          <tr>
            <td>\\</td>
            <td>Backslash (might need escaping)</td>
          </tr>
          <tr>
            <td>*_~`</td>
            <td>Markdown formatting chars</td>
          </tr>
        </tbody>
      </table>
    )

    // The result should handle the special characters
    expect(result).toContain('Symbol')
    expect(result).toContain('Pipe character')
    expect(result).toContain('Backslash')
    expect(result).toContain('Markdown formatting chars')
  })

  it('should escape pipe characters in table cells', () => {
    const result = render(
      <table>
        <thead>
          <tr>
            <th>Header|With|Pipes</th>
            <th>Normal Header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Normal Cell</td>
            <td>Cell|With|Pipes</td>
          </tr>
        </tbody>
      </table>
    )

    // The pipes should be escaped with backslashes
    expect(result).toContain('Header\\|With\\|Pipes')
    expect(result).toContain('Cell\\|With\\|Pipes')
  })

  it('should right-align columns with numeric data', () => {
    const result = render(
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Widget A</td>
            <td>5</td>
            <td>10.00</td>
            <td>50.00</td>
          </tr>
          <tr>
            <td>Widget B</td>
            <td>3</td>
            <td>15.50</td>
            <td>46.50</td>
          </tr>
          <tr>
            <td>Widget C</td>
            <td>7</td>
            <td>8.25</td>
            <td>57.75</td>
          </tr>
        </tbody>
      </table>
    )

    // The result should have right-aligned columns for the numeric data
    const lines = result.split('\n')

    // Check for right alignment markers in the separator line
    expect(lines[1]).toContain('---:') // At least one right-aligned column

    // The 2nd, 3rd and 4th columns should be right-aligned (---:)
    const separatorLine = lines[1]
    const alignmentMarkers = separatorLine.match(/---:/g)
    expect(alignmentMarkers?.length).toBeGreaterThanOrEqual(3)

    // Make sure numbers appear right-aligned in the output
    // We can check this by ensuring that a space appears directly after a pipe for numeric cells
    expect(lines[2]).toMatch(/\| +5/)
    expect(lines[2]).toMatch(/\| +10\.00/)
    expect(lines[2]).toMatch(/\| +50\.00/)
  })
})
