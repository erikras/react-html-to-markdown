import ReactReconciler from 'react-reconciler'
import { ReactElement } from 'react'

// Define a type for the container
type Container = {
  children: Array<Node>
  onCommit: (markdown: string) => void
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

const MarkdownRenderer: ReactReconciler.HostConfig<
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
  /**
   * Returns the priority level of the current event being handled
   * Used by React to determine the priority of updates
   */
  getCurrentEventPriority: () => number

  /**
   * Given a DOM node, returns the corresponding React instance
   * Used internally by React for event handling
   */
  getInstanceFromNode: (node: Node) => null | unknown

  /**
   * Called before the active instance loses focus
   * Used for managing focus states in React
   */
  beforeActiveInstanceBlur: () => void

  /**
   * Called after the active instance loses focus
   * Used for managing focus states in React
   */
  afterActiveInstanceBlur: () => void

  /**
   * Used to update scope information for React's event system
   * Part of React's internal event delegation system
   */
  prepareScopeUpdate: (scopeInstance: any, instance: any) => void

  /**
   * Returns the public instance for a given internal instance
   * Used to expose the correct instance type to React refs
   */
  getPublicInstance: (instance: any) => any

  /**
   * Called when a node is being removed from the tree
   * Allows cleanup of any instance-specific resources
   */
  detachDeletedInstance: (node: Node) => void

  /**
   * Returns the instance associated with a given scope
   * Used for React's scope-based event handling
   */
  getInstanceFromScope: (scopeInstance: any) => null

  /**
   * Removes all children from a container
   * Used during unmount and update operations
   */
  clearContainer: (container: Container) => void
} = {
  // Configuration options for the reconciler
  supportsMutation: true,
  isPrimaryRenderer: true,

  /** No cleanup needed for our markdown renderer */
  detachDeletedInstance() { },

  /** Creates a new instance of a host component (like div, p, etc) */
  createInstance(type: string, props: Record<string, any>): Instance {
    return { type, props, children: [] }
  },

  /** Creates a text node instance */
  createTextInstance(text: string): TextInstance {
    return { type: 'TEXT_ELEMENT', props: { nodeValue: text }, children: [] }
  },

  /** Adds a child to the container's root level */
  appendChildToContainer(container: Container, child: Node) {
    container.children.push(child)
  },

  /** Adds a child during initial render */
  appendInitialChild(parent: Node, child: Node | string) {
    if (typeof parent === 'string') return
    if (typeof child === 'string') {
      parent.children.push({
        type: 'TEXT_ELEMENT',
        props: { nodeValue: child },
        children: [],
      })
    } else {
      parent.children.push(child)
      child.parent = parent
    }
  },

  /** Adds a child during updates */
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
    if (typeof parent === 'string') return
    parent.children = parent.children.filter((c) => c !== child)
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
    textInstance: TextInstance,
    oldText: string,
    newText: string
  ): string {
    textInstance.props.nodeValue = newText
    return newText
  },

  finalizeInitialChildren() {
    return false
  },

  prepareUpdate(
    instance: Instance,
    type: Type,
    oldProps: Props,
    newProps: Props
  ): UpdatePayload {
    return true
  },

  commitUpdate(
    instance: Instance,
    updatePayload: UpdatePayload,
    type: Type,
    oldProps: Props,
    newProps: Props
  ): void {
    if (typeof instance === 'string') return
    instance.props = newProps

    if (typeof newProps.children === 'string') {
      if (instance.children.length === 0) {
        instance.children.push({
          type: 'TEXT_ELEMENT',
          props: { nodeValue: newProps.children },
          children: [],
        })
      } else if (typeof instance.children[0] === 'string') {
        instance.children[0] = {
          type: 'TEXT_ELEMENT',
          props: { nodeValue: instance.children[0] },
          children: []
        }
      } else if (instance.children[0]?.type === 'TEXT_ELEMENT') {
        instance.children[0].props.nodeValue = newProps.children
      } else {
        instance.children[0] = {
          type: 'TEXT_ELEMENT',
          props: { nodeValue: newProps.children },
          children: []
        }
      }
    }
  },

  getPublicInstance(instance: any) {
    return instance
  },

  getRootHostContext() {
    return null
  },

  getChildHostContext(value: any) {
    return value
  },

  prepareForCommit() {
    return null
  },
  resetAfterCommit(container: Container) {
    container.onCommit(containerToMarkdown(container))
  },

  shouldSetTextContent(_type: string) {
    return false
  },

  // Add these missing methods for effects
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,

  getCurrentEventPriority() {
    return 99 // DefaultEventPriority
  },

  clearContainer(container: Container) {
    container.children = []
  },

  supportsPersistence: false,
  supportsHydration: false,
  preparePortalMount: () => { },
  getInstanceFromNode: () => null,
  beforeActiveInstanceBlur: () => { },
  afterActiveInstanceBlur: () => { },
  prepareScopeUpdate: () => { },
  getInstanceFromScope: (_scopeInstance: any) => null,
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
type UpdatePayload = boolean
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
  getCurrentEventPriority: () => DefaultEventPriority,
  getInstanceFromNode: () => null,
  beforeActiveInstanceBlur: () => { },
  afterActiveInstanceBlur: () => { },
  prepareScopeUpdate: () => { },
  getPublicInstance: (instance) => instance,
  detachDeletedInstance: () => { },
  getInstanceFromScope: (_scopeInstance: any) => null,
  clearContainer: (container: Container) => {
    container.children = []
  },
}

const reconciler = ReactReconciler(ExtendedMarkdownRenderer)

// Function overloads
export function render(element: ReactElement): string
export function render(
  element: ReactElement,
  onCommit: (markdown: string) => void
): () => void
export function render(
  element: ReactElement,
  onCommit?: (markdown: string) => void
): string | (() => void) {
  const container: Container = {
    children: [],
    onCommit: onCommit || (() => { }),
  }
  const root = reconciler.createContainer(
    container,
    0,
    null,
    true,
    null,
    '',
    (error) => console.error(error),
    null
  )

  // Do initial render synchronously
  reconciler.updateContainer(element, root, null, () => { })

  // If there's no onCommit callback, return the initial markdown
  if (!onCommit) {
    return containerToMarkdown(container)
  }

  // Return cleanup function
  return () => {
    reconciler.updateContainer(null, root, null, () => { })
  }
}

export function containerToMarkdown(container: Container): string {
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
