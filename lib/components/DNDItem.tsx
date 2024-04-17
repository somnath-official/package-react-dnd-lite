import { createElement, useContext, useEffect, useRef, useState } from "react"
import { DNDContainerContext, ElementDropInterface } from "./DNDContainer"

interface DNDItemInterface {
  children: React.ReactElement
  id: string
  isDraggable?: boolean
}

const DNDHandler = 'DNDHandler'
const DNDIndicator = 'DNDIndicator'

export const DNDItem = ({
  children,
  id,
  isDraggable = true,
}: DNDItemInterface) => {
  let tempChildren = children
  const [itemDraggable, setItemDraggable] = useState(isDraggable)
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
    const getChildComponentByName = (children: React.ReactElement, componentName: string): React.ReactElement | undefined => {
      // TODO - Need to define type of nodes
      const nodes = Array.isArray(children) ? children : [children];
      return nodes.reduce((modalContent, node) => {
        if (modalContent) return modalContent;
        if (node) {
          if (node.type && node.type.componentName === componentName) return node;
          if (typeof node.type === 'function') {
            if (node.type.componentName && node.type.componentName === componentName) return node;
            else if (node.type.componentName && node.type.componentName === DNDIndicator) return null;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const nodeItem: any = node.type
            const newNode: React.ReactElement = nodeItem(node.props)
            return getChildComponentByName(newNode, componentName)
          }
          if (node.props && node.props.children) return getChildComponentByName(node.props.children, componentName);
        }
      }, null);
    }
  
    if (isDraggable) {
      const h = getChildComponentByName(children, DNDHandler)
      if(h) {
        setItemDraggable(false)
        setHasDragHandler(true)
      } else {
        setItemDraggable(true)
        setHasDragHandler(false)
      }
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