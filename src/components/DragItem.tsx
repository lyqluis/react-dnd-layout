import styled from "styled-components"
import { currentDragItem } from "./drag"

const DragItem: React.FC<DragItemProps> = ({
	id,
	title,
	row,
	column,
	children,
}) => {
	// TODO set event to store
	const onDrageStart = (e) => {
		console.log("drag start", e)
		// store currnt drag item
		currentDragItem.id = id
		currentDragItem.title = title
		currentDragItem.row = row
		currentDragItem.column = column
	}
	const onDragEnd = (e) => {
		console.log("drag end", e)
		// currentDragItem.rawData = null
	}

	return (
		<Wrapper
			draggable='true'
			onDragStart={onDrageStart}
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
