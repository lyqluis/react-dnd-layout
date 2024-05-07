import styled from "styled-components"
import { dragMap } from "./drag"

const DragItem: React.FC<DragItemProps> = ({
	id,
	title,
	row,
	column,
	children,
}) => {
	// TODO set event to store
	const onDragStart = (e) => {
		console.log("drag start", e)
		// store currnt drag item
		const isDragged = true
		const dragItem = { id, title, row, column, isDragged }
		dragMap.set("current", dragItem)
	}
	const onDragEnd = (e) => {
		console.log("drag end", e)
		// currentDragItem.rawData = null
		const isDragged = false
		dragMap.remove("current")
	}

	return (
		<Wrapper
			draggable='true'
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<p>dragable item</p>
			{children}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	width: 100px;
	height: 60px;
	border-radius: 4px;
	border: 1px solid #ddd;
`

export default DragItem
