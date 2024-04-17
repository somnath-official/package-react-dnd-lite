import { CSSProperties, useContext, useState } from "react"
import {
  DNDContainerContext,
  DropPositionType,
  ElementDropInterface
} from "./DNDContainer"
import './styles.css'

interface DNDIndicatorInterface {
  position: DropPositionType
  style?: CSSProperties
  id: string
  className?: string
  hoveredStyle?: CSSProperties
}

export const DNDIndicator = ({position, style = {}, id, className = '', hoveredStyle = {}}: DNDIndicatorInterface) => {
  const dndContext = useContext(DNDContainerContext)
  const dragOverElement = dndContext?.getDragOverElementData()
  const draggingElement = dndContext?.getDraggingElementData()
  const [hovered, setHovered] = useState(false)

  const onDrop = (e: React.DragEvent, position: DropPositionType) => {
    e.stopPropagation()
    
    const data: ElementDropInterface = {
      draggedElementId: draggingElement?.id as string,
      droppedElementId: dragOverElement?.id as string,
      droppingPosition: position
    }

    dndContext?.updateOnDropInfo(data)
  }

  if (position) {
    return (
      <div
        className={`${className} dnd-indicator ${dragOverElement?.id === id ? `dnd-${position}-indicator` : ''} ${hovered ? 'hovered' : ''}`}
        style={hovered ? {...style, ...hoveredStyle} : style}
        onDrop={(e: React.DragEvent) => {
          onDrop(e, position)
          setHovered(false)
        }}
        onDragEnter={() => setHovered(true)}
        onDragLeave={() => setHovered(false)}
      ></div>
    )
  }
  
  return <></>
}

DNDIndicator.componentName = 'DNDIndicator'