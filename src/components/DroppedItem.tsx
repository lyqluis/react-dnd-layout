import { useMemo, useState } from "react"
import styled from "styled-components"
import { currentDragItem } from "./drag"

const DroppedItem: React.FC<{
	className: string
	data: DroppedItem
	style: React.CSSProperties
	children?: React.ReactNode
}> = ({ className, style, data, children }) => {
	const [isDragged, setIsDragged] = useState<boolean>(data.isDragged)
	const memoStyle = useMemo(() => {
		const { x, y, row, column } = data
		const gridX = x + 1
		const gridY = y + 1
		const gridArea = `${gridY}/${gridX}/${gridY + column}/${gridX + row}`
		// ?? const transform = isDragged ? `translate(-999999999px, -9999999999px)` : ""
		const opacity = isDragged ? 0.5 : 1
		return { gridArea, opacity }
	}, [data, isDragged])

	const onDragStart = (e) => {
		console.log("drag start", e)
		// store currnt drag item
		const { id, title, row, column } = data
		currentDragItem.id = id
		currentDragItem.title = title
		currentDragItem.row = row
		currentDragItem.column = column
		// update offset in the drag item
		const { offsetX, offsetY } = e.nativeEvent
		currentDragItem.offsetX = offsetX
		currentDragItem.offsetY = offsetY
		currentDragItem.isDragged = true
		setIsDragged(true)
	}
	const onDragEnd = (e) => {
		console.log("drag end", e)
		currentDragItem.isDragged = false
		setIsDragged(false)
	}

	return (
		<Wrapper
			className={className}
			style={{ ...memoStyle, ...style }}
			draggable='true'
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			{children}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	pointer-events: all;
`

export default DroppedItem
