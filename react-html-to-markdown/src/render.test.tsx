import React from 'react'
import { describe, expect, it } from 'bun:test'
import { render } from './render'

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
})
