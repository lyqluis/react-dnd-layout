import { useMemo, useState } from "react"
import styled from "styled-components"
import { dragMap } from "./drag"

const DroppedItem: React.FC<{
	className: string
	data: DroppedItem
	style?: React.CSSProperties
	current: DragItemData
	children?: React.ReactNode
	onRemove: (id: number | string) => void
}> = ({ className, style, data, children, onRemove, current }) => {
	const [isDragged, setIsDragged] = useState<boolean>(data.isDragged)
	const memoStyle = useMemo(() => {
		const { x, y, row, column } = data
		const gridX = x + 1
		const gridY = y + 1
		const gridArea = `${gridY}/${gridX}/${gridY + column}/${gridX + row}`
		return { gridArea }
	}, [data])
	const dynamicStyle = useMemo(() => {
		const opacity = isDragged ? 0.5 : 1
		const pointerEvents =
			current.id === 0
				? "all"
				: isDragged && data.id === current.id
				? "all"
				: "none"
		const transform =
			isDragged && current.id !== 0 && data.id === current.id
				? `translate(-999999999px, -9999999999px)`
				: ""
		return { opacity, pointerEvents, transform }
	}, [isDragged, current.id])

	const handleRemove = () => data.id && onRemove(data.id)
	const onDragStart = (e) => {
		console.log("drag start", e)
		const isDragged = true
		setIsDragged(isDragged)
		// store current dragged data
		const { id, title, row, column } = data
		const { offsetX, offsetY } = e.nativeEvent
		const dragItem = { id, title, row, column, offsetX, offsetY, isDragged }
		dragMap.set("current", dragItem)
	}
	const onDragEnd = (e) => {
		console.log("drag end", e, isDragged)
		dragMap.remove("current")
		setIsDragged(false)
	}

	return (
		<Wrapper
			className={className}
			style={{ ...style, ...memoStyle, ...dynamicStyle }}
			// style={{ gridArea, opacity, pointerEvents, transform }}
			draggable='true'
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<p onClick={handleRemove}>[x]</p>
			{children}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	pointer-events: all;
`

export default DroppedItem
