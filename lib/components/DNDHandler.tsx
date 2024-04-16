import { createElement } from "react"

interface DNDHandlerInterface {
  children: React.ReactElement
  id: string
}

export const DNDHandler = ({children, id}: DNDHandlerInterface) => {
  const onMouseDown = () => {
    const dndItem = document.querySelector(`[data-dnd-id="${id}"]`) as Element
    if (dndItem) dndItem.setAttribute('draggable', 'true')
  }

  const newEle = createElement(
    children.type,
    {
      ...children.props,
      onMouseDown,
      draggable: false,
    }
  )

  return newEle
}

DNDHandler.componentName = 'DNDHandler'