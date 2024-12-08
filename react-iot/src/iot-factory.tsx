import React from 'react'
import { Temperature } from './iot'
import { RGB, HexColor, HsxY } from './colors'

type IntrinsicElements = JSX.IntrinsicElements

export namespace IoT {
  export function createElement<
    K extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
  >(
    type: K,
    props: K extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[K]
      : React.ComponentProps<K> | null,
    ...children: React.ReactNode[]
  ): React.ReactElement {
    return React.createElement(type, props, ...children)
  }
}
