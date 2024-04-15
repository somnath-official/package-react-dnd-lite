import { CSSProperties, useContext, useState } from "react"
import { DNDContainerContext, DropPositionType, ElementDropInterface } from "./DNDContainer"
import './styles.css'

interface DNDIndicatorInterface {
  position: DropPositionType
  style?: CSSProperties
  id: string
  className?: string
}

export const DNDIndicator = ({position, style, id, className = ''}: DNDIndicatorInterface) => {
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

  switch(position) {
    case "left":
      return (
        <div
          className={`${className} dnd-indicator ${dragOverElement?.id === id ? 'dnd-left-indicator' : ''} ${hovered ? 'hovered' : ''}`}
          style={style}
          onDrop={(e: React.DragEvent) => {
            onDrop(e, position)
            setHovered(false)
          }}
          onDragEnter={() => setHovered(true)}
          onDragLeave={() => setHovered(false)}
        ></div>
      )
    case "right":
      return (
        <div
          className={`${className} dnd-indicator ${dragOverElement?.id === id ? 'dnd-right-indicator' : ''} ${hovered ? 'hovered' : ''}`}
          style={style}
          onDrop={(e: React.DragEvent) => {
            onDrop(e, position)
            setHovered(false)
          }}
          onDragEnter={() => setHovered(true)}
          onDragLeave={() => setHovered(false)}
        ></div>
      )
    case "top":
      return (
        <div
          className={`${className} dnd-indicator ${dragOverElement?.id === id ? 'dnd-top-indicator' : ''} ${hovered ? 'hovered' : ''}`}
          style={style}
          onDrop={(e: React.DragEvent) => {
            onDrop(e, position)
            setHovered(false)
          }}
          onDragEnter={() => setHovered(true)}
          onDragLeave={() => setHovered(false)}
        ></div>
      )
    case "bottom":
      return (
        <div
          className={`${className} dnd-indicator ${dragOverElement?.id === id ? 'dnd-bottom-indicator' : ''} ${hovered ? 'hovered' : ''}`}
          style={style}
          onDrop={(e: React.DragEvent) => {
            onDrop(e, position)
            setHovered(false)
          }}
          onDragEnter={() => setHovered(true)}
          onDragLeave={() => setHovered(false)}
        ></div>
      )
  }
}