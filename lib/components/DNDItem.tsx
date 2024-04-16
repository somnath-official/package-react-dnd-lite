import { Children, createElement, useContext, useEffect, useRef, useState } from "react"
import { DNDContainerContext, ElementDropInterface } from "./DNDContainer"

interface DNDItemInterface {
  children: React.ReactElement
  id: string
  isDraggable?: boolean
}

const DNDHandler = 'DNDHandler'

export const DNDItem = ({
  children,
  id,
  isDraggable = true,
}: DNDItemInterface) => {
  let tempChildren = children
  const [itemDraggable, setItemDraggable] = useState(false)
  const [hasDragHandler, setHasDragHandler] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const dndContext = useContext(DNDContainerContext)

  const onDragStart = (e: React.DragEvent) => {
    dndContext?.updateDraggingStatus(true)

    const dndId = e.currentTarget.getAttribute('data-dnd-id')
    if (dndId) dndContext?.updateDraggingElement({id: dndId, element: e.currentTarget})
}

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const onDragEnter = (e: React.DragEvent) => {
    const dndId = e.currentTarget.getAttribute('data-dnd-id')
    const draggingElement = dndContext?.getDraggingElementData()
    if (dndId && draggingElement?.id !== dndId)
      dndContext?.updateDragOverElement({id: dndId, element: e.currentTarget})
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dndId = e.currentTarget.getAttribute('data-dnd-id')
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

  const onDragEnd = () => {
    if (hasDragHandler && elementRef.current) {
      setItemDraggable(false)
      elementRef.current.setAttribute("draggable", "false")
    }
    
    dndContext?.clearDraggingElement()
    dndContext?.clearDragOverElement()
    dndContext?.updateDraggingStatus(false)
  }

  const getClassName = () => {
    let className = tempChildren.props.className ?? ''
    const dragOverElement = dndContext?.getDragOverElementData()

    if (dragOverElement?.id === id) className += ' dragging-over'

    return className
  }

  const getStyles = () => {
    return {...tempChildren.props.style, position: 'relative'}
  }

  const getCorrectNode = (children: React.ReactElement | string) => {
    if (typeof children === 'string') {
      tempChildren = createElement('div', {}, children)
      return
    }

    const childrenType = typeof children.type
    
    if (childrenType === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodeItem: any = children.type
      getCorrectNode(nodeItem(children.props))
    }
    else if (childrenType === 'symbol') getCorrectNode(children.props.children)
    else if (childrenType === 'string') {
      tempChildren = children
      return
    } else if (Array.isArray(children)) {
      throw new Error(`
        Using a React Fragment (<>...</>) directly as a wrapper for multiple children within a 
        DNDItem component may not be supported in certain contexts. Instead, you should wrap the 
        children with a regular HTML element such as div, span, or p.
      `)
    }
    return
  }

  getCorrectNode(children)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkHandlerExists = (children: any, componentName: string): React.ReactElement | null => {
      if (typeof children === 'string') return null
  
      const childrenType = typeof children.type
      
      if (childrenType === 'function') {
        const funcDef: string = children.type.toString()
        if (funcDef.includes(componentName)) {
          setItemDraggable(false)
          setHasDragHandler(true)
          return children
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const nodeItem: any = children.type
          checkHandlerExists(nodeItem(children.props), componentName)
        }
      }
      else if (childrenType === 'symbol' && children.props.children) checkHandlerExists(children.props.children, componentName)
      else if (Array.isArray(children)) Children.map(children, (child) => checkHandlerExists(child, componentName))
      
      return null
    }
  
    if (isDraggable) {
      setItemDraggable(true)
      checkHandlerExists(children, DNDHandler)
    }
  }, [children, isDraggable])

  const newEle = createElement(
    tempChildren.type,
    {
      ...tempChildren.props,
      ref: elementRef,
      className: getClassName(),
      style: getStyles(),
      draggable: itemDraggable,
      'data-dnd-id': id,
      onDragStart,
      onDragOver,
      onDragEnter,
      onDrop,
      onDragEnd,
    }
  )

  return newEle
}