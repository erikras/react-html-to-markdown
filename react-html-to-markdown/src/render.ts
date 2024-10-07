import ReactReconciler from 'react-reconciler'
import { ReactElement } from 'react'

// Define a type for the container
type Container = {
  children: Array<Node>
}

// Define a type for the node
type Node =
  | {
      type: string
      props: Record<string, any>
      children: Array<Node | string>
      parent?: Node
    }
  | string

const MarkdownRenderer = {
  // Configuration options for the reconciler
  now: Date.now,
  supportsMutation: true,
  isPrimaryRenderer: false,

  // Create an internal instance for host components
  createInstance(type: string, props: Record<string, any>): Instance {
    return { type, props, children: [] }
  },

  // Create a text node
  createTextInstance(text: string): TextInstance {
    return { type: 'TEXT_ELEMENT', props: { nodeValue: text }, children: [] }
  },

  appendChildToContainer(container: Container, child: Node) {
    container.children.push(child)
  },

  appendInitialChild(parent: Node, child: Node | string) {
    if (typeof parent !== 'string') {
      if (typeof child === 'string') {
        parent.children.push({
          type: 'TEXT_ELEMENT',
          props: { nodeValue: child },
          children: [],
        })
      } else {
        parent.children.push(child)
      }
      if (typeof child !== 'string') {
        child.parent = parent
      }
    }
  },

  appendChild(parent: Node, child: Node | string) {
    if (typeof parent !== 'string') {
      if (typeof child === 'string') {
        parent.children.push({
          type: 'TEXT_ELEMENT',
          props: { nodeValue: child },
          children: [],
        })
      } else {
        parent.children.push(child)
      }
      if (typeof child !== 'string') {
        child.parent = parent
      }
    }
  },

  removeChild(parent: Node, child: Node | string) {
    if (typeof parent !== 'string') {
      parent.children = parent.children.filter((c) => c !== child)
    }
  },

  removeChildFromContainer(container: Container, child: Node) {
    container.children = container.children.filter((c) => c !== child)
  },

  insertBefore(parent: Node, child: Node | string, beforeChild: Node | string) {
    if (typeof parent !== 'string') {
      const index = parent.children.indexOf(beforeChild)
      if (index >= 0) {
        parent.children.splice(index, 0, child)
      }
    }
  },

  commitTextUpdate(
    _textInstance: TextInstance,
    _oldText: string,
    newText: string
  ): string {
    return newText
  },

  finalizeInitialChildren() {
    return false
  },

  prepareUpdate() {
    return null
  },

  commitUpdate(
    instance: any,
    _updatePayload: any,
    _type: any,
    _oldProps: any,
    newProps: any
  ) {
    instance.props = newProps
  },

  getPublicInstance(instance: any) {
    return instance
  },

  getRootHostContext() {
    return {}
  },

  getChildHostContext() {
    return {}
  },

  prepareForCommit() {},
  resetAfterCommit() {},

  shouldSetTextContent(_type: string) {
    return false
  },
}

// Define the types for your host environment
type Type = string
type Props = Record<string, any>
type SuspenseInstance = Node
type Instance = Node
type TextInstance = Node & {
  type: 'TEXT_ELEMENT'
  props: { nodeValue: string }
  children: []
}
type HydratableInstance = never
type PublicInstance = Instance
type HostContext = {}
type UpdatePayload = never
type ChildSet = never
type TimeoutHandle = ReturnType<typeof setTimeout>
const noTimeout = -1
type EventPriority = number
const DefaultEventPriority: EventPriority = 0
// Extend your existing MarkdownRenderer with missing properties
const ExtendedMarkdownRenderer: ReactReconciler.HostConfig<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  SuspenseInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  typeof noTimeout
> & {
  getCurrentEventPriority: () => number
  getInstanceFromNode: (node: Node) => null | unknown
  beforeActiveInstanceBlur: () => void
  afterActiveInstanceBlur: () => void
  prepareScopeUpdate: (scopeInstance: any, instance: any) => void
  getPublicInstance: (instance: any) => any
  detachDeletedInstance: (node: Node) => void
  getInstanceFromScope: (scopeInstance: any) => null
  clearContainer: (container: Container) => void
} = {
  ...MarkdownRenderer,
  supportsPersistence: false,
  supportsHydration: false,
  preparePortalMount: () => {},
  scheduleTimeout: (
    fn: (...args: unknown[]) => unknown,
    delay?: number | undefined
  ): Timer => setTimeout(fn, delay),
  cancelTimeout: (id: Timer) => clearTimeout(id),
  noTimeout,
  // Add any other missing properties here
  getCurrentEventPriority: () => DefaultEventPriority,
  getInstanceFromNode: () => null,
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {},
  prepareScopeUpdate: () => {},
  getPublicInstance: (instance) => instance,
  detachDeletedInstance: () => {},
  getInstanceFromScope: (_scopeInstance: any) => null,
  clearContainer: (container: Container) => {
    container.children = []
  },
  prepareForCommit: (_containerInfo: Container): Record<string, any> | null => {
    // Implement your logic here if needed
    return null
  },
}

const reconciler = ReactReconciler(ExtendedMarkdownRenderer)

function render(element: ReactElement): string {
  const container: Container = { children: [] }
  const root = reconciler.createContainer(
    container, // The DOM element to render into
    0, // Lane: Used for prioritizing updates (0 is the default lane)
    null, // Hydration callbacks: Used for server-side rendering (null if not used)
    true, // Is this a strict mode container?
    null, // Concurrent updates by default override (null uses default behavior)
    '', // Identifier prefix for debugging
    (error) => console.error(error), // Error callback for logging render errors
    null // Callback for recoverable errors (null uses default behavior)
  )

  reconciler.updateContainer(element, root, null, () => {})

  const result = containerToMarkdown(container)
  return result
}

function containerToMarkdown(container: Container): string {
  let listCounter = 0

  const convertNode = (node: Node | string): string => {
    if (typeof node === 'string') {
      return node
    }

    const { type, props, children } = node

    const processChildren = () => {
      return children.map(convertNode).join('')
    }

    switch (type) {
      case 'TEXT_ELEMENT':
        return props.nodeValue
      case 'h1':
        return `# ${processChildren()}\n\n`
      case 'h2':
        return `## ${processChildren()}\n\n`
      case 'h3':
        return `### ${processChildren()}\n\n`
      case 'h4':
        return `#### ${processChildren()}\n\n`
      case 'h5':
        return `##### ${processChildren()}\n\n`
      case 'h6':
        return `###### ${processChildren()}\n\n`
      case 'p':
        return `${processChildren()}\n\n`
      case 'ul':
        return (
          children.map((child) => `- ${convertNode(child)}`).join('\n') + '\n\n'
        )
      case 'ol':
        listCounter = 0
        return (
          children
            .map((child) => `${++listCounter}. ${convertNode(child)}`)
            .join('\n') + '\n\n'
        )
      case 'li':
        return processChildren()
      case 'blockquote':
        return `> ${processChildren()}\n\n`
      case 'pre':
        return `\`\`\`\n${processChildren()}\n\`\`\`\n\n`
      case 'code':
        const parent = isElement(node.parent) ? node.parent : null
        if (parent && parent.type === 'pre') {
          return processChildren()
        } else {
          return `\`${processChildren()}\``
        }
      case 'em':
        return `*${processChildren()}*`
      case 'strong':
        return `**${processChildren()}**`
      case 'a':
        return `[${processChildren()}](${props.href})`
      case 'img':
        return `![${props.alt || ''}](${props.src})`
      case 'hr':
        return '---\n\n'
      case 'del':
        return `~~${processChildren()}~~`
      case 'span':
      case 'th':
      case 'td':
      case 'div':
        return processChildren()

      case 'table':
        return renderTable(node)

      default:
        console.warn(`Unhandled element type: ${type}`)
        return processChildren()
    }
  }

  function renderTable(tableNode: Node): string {
    let headers: string[] = []
    let rows: string[][] = []

    if (
      typeof tableNode === 'object' &&
      'children' in tableNode &&
      Array.isArray(tableNode.children)
    ) {
      tableNode.children.forEach((child: Node) => {
        if (
          typeof child === 'object' &&
          'type' in child &&
          'children' in child
        ) {
          if (child.type === 'thead') {
            const headerRow = child.children.find(
              (row): row is Node & { type: 'tr' } =>
                typeof row === 'object' && 'type' in row && row.type === 'tr'
            )
            if (headerRow && 'children' in headerRow) {
              headers = headerRow.children
                .filter(
                  (th): th is Node =>
                    typeof th === 'object' && 'type' in th && th.type === 'th'
                )
                .map((th) => convertNode(th).trim())
            }
          } else if (child.type === 'tbody' || child.type === 'tr') {
            const tableRows = child.type === 'tbody' ? child.children : [child]
            tableRows.forEach((row: Node) => {
              if (
                typeof row === 'object' &&
                'type' in row &&
                row.type === 'tr' &&
                'children' in row
              ) {
                const cells = row.children
                  .filter(
                    (td): td is Node =>
                      typeof td === 'object' && 'type' in td && td.type === 'td'
                  )
                  .map((td) => convertNode(td).trim())
                rows.push(cells)
              }
            })
          }
        }
      })
    }

    // If no headers were found in thead, use the first row as headers
    if (headers.length === 0 && rows.length > 0) {
      headers = rows.shift() || []
    }

    // Generate the markdown table
    let markdown = `| ${headers.join(' | ')} |\n`
    markdown += `| ${headers
      .map((header) => '-'.repeat(header.length))
      .join(' | ')} |\n`
    rows.forEach((row) => {
      markdown += `| ${row.join(' | ')} |\n`
    })

    // Return the markdown table with a single newline at the end
    return markdown
  }

  return container.children.map(convertNode).join('')
}

function isElement(node: Node | undefined): node is Node & { type: string } {
  return node !== undefined && typeof node === 'object' && 'type' in node
}

// ... rest of the file
// Export the render function
export { render }
