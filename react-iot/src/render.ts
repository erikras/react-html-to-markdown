import ReactReconciler from 'react-reconciler'
import { ReactElement } from 'react'
import { IotDevice, IotApi, BulbDevice } from './iot'
import { convertToHsxY } from './colors'

// Define a type for the container
type Container = {
  children: Array<Node>
  api: IotApi
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
    const newProps = type === 'bulb' && props.name
      ? { ...props, key: props.name }
      : props;
    return { type, props: newProps, children: [] }
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
    textInstance: TextInstance,
    _oldText: string,
    newText: string
  ): string {
    textInstance.props.nodeValue = newText
    return newText
  },

  finalizeInitialChildren() {
    return false
  },

  prepareUpdate() {
    return true
  },

  commitUpdate(
    instance: any,
    _updatePayload: any,
    _type: string,
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

  prepareForCommit() { },
  resetAfterCommit(container: Container) {
    container.api.update(containerToIOT(container));
  },

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
  supportsPersistence: false,
  supportsHydration: false,
  preparePortalMount: () => { },
  scheduleTimeout: (
    fn: (...args: unknown[]) => unknown,
    delay?: number | undefined
  ): Timer => setTimeout(fn, delay),
  cancelTimeout: (id: Timer) => clearTimeout(id),
  noTimeout,
  // Add any other missing properties here
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
  prepareForCommit: (_containerInfo: Container): Record<string, any> | null => {
    // Implement your logic here if needed
    return null
  },
}

const reconciler = ReactReconciler(ExtendedMarkdownRenderer)



// Update the render function signature
export function render(element: ReactElement): IotDevice[]
export function render(element: ReactElement, api: IotApi): () => void
export function render(
  element: ReactElement,
  api?: IotApi
): IotDevice[] | (() => void) {
  const container: Container = {
    children: [],
    api: api || { update: () => { } }
  }
  const root = reconciler.createContainer(
    container,
    0,
    null,
    false,
    null,
    '',
    (error) => console.error(error),
    null
  )

  // Do initial render
  reconciler.updateContainer(element, root, null, null)

  // If there's no onCommit callback, return the initial IOT devices
  if (!api) {
    return containerToIOT(container)
  }

  // Return cleanup function
  return () => {
    reconciler.updateContainer(null, root, null, null)
  }
}

function containerToIOT(container: Container): IotDevice[] {
  const convertNode = (node: Node | string, parentOff: boolean = false, isInsideRoom: boolean = false): IotDevice | null => {
    if (typeof node === 'string') {
      return null
    }

    const { type, props, children } = node

    switch (type) {
      case 'bulb':
        return {
          type: 'bulb',
          name: props.name,
          on: parentOff ? false : props.on,
          temperature: props.temp,
          color: props.color ? convertToHsxY(props.color) : undefined
        }
      case 'room':
        if (isInsideRoom) {
          throw new Error('Rooms cannot be nested within other rooms')
        }
        return {
          type: 'room',
          name: props.name,
          off: Boolean(props.off),
          devices: children
            .map(child => convertNode(child, props.off, true))
            .filter((node): node is BulbDevice => node !== null && node.type === 'bulb')
        }
      case 'button':
        return {
          type: 'button',
          name: props.name,
          onPress: props.onPress,
          onDoublePress: props.onDoublePress,
        }
      case 'TEXT_ELEMENT':
        return null
      default:
        console.warn(`Unhandled IOT element type: ${type}`)
        return null
    }
  }

  return container.children
    .map(node => convertNode(node, false, false))
    .filter((node): node is IotDevice => node !== null)
}