import { createElement } from "react"

interface DNDHandlerInterface {
  children: React.ReactElement
  id: string
  readonly dndType?: 'DNDHandler'
}

export const DNDHandler = ({children, id, dndType = 'DNDHandler'}: DNDHandlerInterface) => {
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
      'dnd-type': dndType
    }
  )

  return newEle
}