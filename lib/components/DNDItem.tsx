import { cloneElement, useContext, useEffect, useRef, useState } from "react"
import { DNDContainerContext, ElementDropInterface } from "./DNDContainer"
import { DND_HANDLER_ID, DND_ITEM_ID } from "../constants"

interface DNDItemInterface {
  children: React.ReactElement
  id: string
  isDraggable?: boolean
}

export const DNDItem = ({
  children,
  id,
  isDraggable = true,
}: DNDItemInterface) => {
  const [itemDraggable, setItemDraggable] = useState(isDraggable)
  const [hasDragHandler, setHasDragHandler] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const dndContext = useContext(DNDContainerContext)

  const onDragStart = (e: React.DragEvent) => {
    e.currentTarget.classList.add('dragging')
    const dndId = e.currentTarget.getAttribute(DND_ITEM_ID)
    if (dndId) {
      dndContext?.updateDraggingStatus(true)
      dndContext?.updateDraggingElement({id: dndId, element: e.currentTarget})
    }
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const onDragEnter = (e: React.DragEvent) => {
    const dndId = e.currentTarget.getAttribute(DND_ITEM_ID)
    const draggingElement = dndContext?.getDraggingElementData()
    if (dndId && draggingElement?.id !== dndId)
      dndContext?.updateDragOverElement({id: dndId, element: e.currentTarget})
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dndId = e.currentTarget.getAttribute(DND_ITEM_ID)
    const draggingElement = dndContext?.getDraggingElementData()

    if (dndId && draggingElement?.id !== dndId) {
      const data: ElementDropInterface = {
        draggedElementId: draggingElement?.id as string,
        droppedElementId: dndId,
        droppingPosition: 'element'
      }

      dndContext?.updateOnDropInfo(data)     
    }
  }

  const onDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('dragging')
    dndContext?.updateDraggingStatus(false)
    if (hasDragHandler && elementRef.current) {
      setItemDraggable(false)
      elementRef.current.setAttribute("draggable", "false")
    }
    
    dndContext?.clearDraggingElement()
    dndContext?.clearDragOverElement()
    dndContext?.updateDraggingStatus(false)
  }

  const getClassName = () => {
    let className = children.props.className ?? ''
    const dragOverElement = dndContext?.getDragOverElementData()

    if (dragOverElement?.id === id) className += ' dragging-over'

    return className
  }

  const getStyles = () => {
    return children.props.style ? {...children.props.style, position: 'relative'} : { position: 'relative' }
  }

  const checkChildren = () => {
    if (typeof children === 'string') {
      throw new Error('String is provided as childern to DNDItem. Please provide a valid React.ReactElement.')
    }

    if (Array.isArray(children)) {
      throw new Error(`
        Using a React Fragment (<>...</>) directly as a wrapper for multiple children within a 
        DNDItem component may not be supported in certain contexts. Instead, you should wrap the 
        children with a regular HTML element such as div, span, or p.
      `)
    }

    switch(typeof children.type) {
      case 'function':
        throw new Error('You are providing React.Component as children to DNDItem. Please use a regular HTML element such as div, span, or p as children')
      case 'symbol':
        throw new Error('You are providing React.Fragment as children to DNDItem. Please use a regular HTML element such as div, span, or p as children')
    }
    return
  }

  checkChildren()

  useEffect(() => {
    if (isDraggable) {
      const handler = document.querySelector(`[${DND_HANDLER_ID}="${id}"]`)

      if(handler) {
        setItemDraggable(false)
        setHasDragHandler(true)
      } else {
        setItemDraggable(true)
        setHasDragHandler(false)
      }
    }
  }, [children, id, isDraggable])

  const newEle = cloneElement(
    children,
    {
      ...children.props,
      ref: elementRef,
      className: getClassName(),
      style: getStyles(),
      draggable: itemDraggable,
      [DND_ITEM_ID]: id,
      onDragStart,
      onDragOver,
      onDragEnter,
      onDrop,
      onDragEnd,
    }
  )

  return newEle
}