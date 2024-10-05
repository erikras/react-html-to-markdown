import React from 'react';

export function htmlToMarkdown(html: string): string {
  // Implement your HTML to Markdown conversion logic here
  return `Converted Markdown: ${html}`;
}

export function HtmlToMarkdown({ html }: { html: string }) {
  const markdown = htmlToMarkdown(html);
  return <pre>{markdown}</pre>;
}