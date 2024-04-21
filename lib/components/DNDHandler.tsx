import { cloneElement } from "react"
import { DND_HANDLER_ID, DND_ITEM_ID } from "../constants"

interface DNDHandlerInterface {
  children: React.ReactElement
  id: string
}

export const DNDHandler = ({children, id}: DNDHandlerInterface) => {
  const onMouseDown = () => {
    const dndItem = document.querySelector(`[${DND_ITEM_ID}="${id}"]`) as Element
    if (dndItem) dndItem.setAttribute('draggable', 'true')
  }

  const checkChildren = () => {
    if (typeof children === 'string') {
      throw new Error('String is provided as childern to DNDHandler. Please provide a valid React.ReactElement.')
    }

    if (Array.isArray(children)) {
      throw new Error(`
        Using a React Fragment (<>...</>) directly as a wrapper for multiple children within a 
        DNDHandler component may not be supported in certain contexts. Instead, you should wrap the 
        children with a regular HTML element such as div, span, or p.
      `)
    }

    switch(typeof children.type) {
      case 'function':
        throw new Error('You are providing React.Component as children to DNDHandler. Please use a regular HTML element such as div, span, or p as children')
      case 'symbol':
        throw new Error('You are providing React.Fragment as children to DNDHandler. Please use a regular HTML element such as div, span, or p as children')
    }
    return
  }

  checkChildren()

  const newEle = cloneElement(
    children,
    {
      ...children.props,
      onMouseDown,
      draggable: false,
      [DND_HANDLER_ID]: id
    }
  )

  return newEle
}

DNDHandler.componentName = 'DNDHandler'