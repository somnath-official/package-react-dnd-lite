import { createElement, useContext, useEffect, useRef, useState } from "react"
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
  const [itemDraggable, setItemDraggable] = useState(false)
  const [hasDragHandler, setHasDragHandler] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const dndContext = useContext(DNDContainerContext)

  useEffect(() => {
    if (!isDraggable) {
      setHasDragHandler(false)
      setItemDraggable(false)
    }
    else {
      /**
       * Checking if children contains DNDHandler component or not.
       * 
       * If children contains DNDHandler component then apply setItemDraggable(false)
       * as user will only be able to drag element by handler.
       */
      const getChildComponentByName = (children: React.ReactElement, componentName: string): React.ReactElement | undefined => {
        const nodes = Array.isArray(children) ? children : [children];
        return nodes.reduce((modalContent, node) => {
          if (modalContent) return modalContent;
          if (node) {
            if (node.type && node.type.name === componentName) return node;
            if (node.props) return getChildComponentByName(node.props.children, componentName);
          }
        }, null);
      }
      
      const h = getChildComponentByName(children, DNDHandler)
      
      if(h) {
        setItemDraggable(false)
        setHasDragHandler(true)
      } else {
        setItemDraggable(true)
        setHasDragHandler(false)
      }
    }
  }, [children, id, isDraggable])

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
    let className = children.props.className
    const dragOverElement = dndContext?.getDragOverElementData()

    if (dragOverElement?.id === id) className += ' dragging-over'

    return className
  }

  const getStyles = () => {
    return {...children.props.style, position: 'relative'}
  }

  const newEle = createElement(
    children.type,
    {
      ...children.props,
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