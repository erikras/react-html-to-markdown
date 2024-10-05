# react-html-to-markdown

A React renderer for rendering HTML to Markdown.

## Installation

```bash
npm install react-html-to-markdown
```

## Usage

```tsx
import { render } from 'react-html-to-markdown'

const html = <h1>Hello, world!</h1> // no quotes!
const markdown = render(html)

console.log(markdown)
```
