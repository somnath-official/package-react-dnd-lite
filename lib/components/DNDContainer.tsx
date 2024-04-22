import { createContext, useState} from "react"

export interface DraggingElementInterface {
  id: string | null
  element: Element | null
}

export interface DragOverElementInterface {
  id: string | null
  element: Element | null
}

export interface IElementDrop {
  draggedElementId: string | number | null
  droppedElementId: string | number | null
  droppingPosition: DropPositionType
}

export type DropPositionType = 'left' | 'right' | 'top' | 'bottom' | 'element'

interface DNDContextInterface {
  // Dragging status
  updateDraggingStatus: (status: boolean) => void,
  getDraggingStatus: () => boolean,

  // Dragging element state
  getDraggingElementData: () => DraggingElementInterface
  updateDraggingElement: (data: DraggingElementInterface) => void
  clearDraggingElement: ()=> void

  // Dragover element state
  getDragOverElementData: () => DragOverElementInterface
  updateDragOverElement: (data: DragOverElementInterface) => void
  clearDragOverElement: () => void

  // On Drop state
  getOnDropInfo: () => IElementDrop | null
  updateOnDropInfo: (data: IElementDrop) => void
  clearOnDropInfo: () => void
}

interface DNDContainerInterface {
  children: React.ReactNode
  onDrop?: (data: IElementDrop) => void
  onDragStart?: (data: DraggingElementInterface) => void
  onDragOver?: (data: DragOverElementInterface) => void
}

export const DNDContainerContext = createContext<DNDContextInterface | null>(null)

export const DNDContainer = ({children, onDrop, onDragStart, onDragOver}: DNDContainerInterface) => {
  const [isDragging, setIsDragging] = useState(false)
  const [draggingElement, setDraggingElement] = useState<DraggingElementInterface>({id: null, element: null})
  const [dragOverElement, setDragOverElement] = useState<DragOverElementInterface>({id: null, element: null})
  const [onDropInfo, setOnDropInfo] = useState<IElementDrop | null>(null)

  // Dragging status
  const updateDraggingStatus = (status: boolean) => {
    setIsDragging(status)
  }

  const getDraggingStatus = (): boolean => {
    return isDragging
  }

  // Dragging element state
  const getDraggingElementData = () => {
    return draggingElement
  }

  const updateDraggingElement = (data: DraggingElementInterface) => {
    if (onDragStart) onDragStart(data)
    setDraggingElement({...data})
    return
  }

  const clearDraggingElement = () => {
    setDraggingElement({id: null, element: null})
    return
  }

  // Dragover element state
  const getDragOverElementData = () => {
    return dragOverElement
  }

  const updateDragOverElement = (data: DragOverElementInterface) => {
    if (onDragOver) onDragOver(data)
    setDragOverElement({...data})
    return
  }

  const clearDragOverElement = () => {
    setDragOverElement({id: null, element: null})
    return
  }

  // On Drop info

  const getOnDropInfo = () => {
    return onDropInfo
  }

  const updateOnDropInfo = (data: IElementDrop) => {
    if (onDrop) onDrop(data)
    setOnDropInfo({...data})
    return
  }

  const clearOnDropInfo = () => {
    setOnDropInfo(null)
    return
  }

  const value = {
    // Dragging status
    updateDraggingStatus,
    getDraggingStatus,

    // Dragging element
    getDraggingElementData,
    updateDraggingElement,
    clearDraggingElement,

    // Darg Over Element
    getDragOverElementData,
    updateDragOverElement,
    clearDragOverElement,

    // Ondrop info
    getOnDropInfo,
    updateOnDropInfo,
    clearOnDropInfo,
  }

  return (
    <DNDContainerContext.Provider value={value}>
      {children}
    </DNDContainerContext.Provider>
  )
}