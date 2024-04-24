import styled from "styled-components"

interface DragItem {
	id: string | number
	title: string
	row: number // number of rows occupied
	column: number // number of columns occupied
}

interface DragItemProps extends DragItem {
	children?: React.ReactNode
}

const DragItem: React.FC<DragItemProps> = ({ children }) => {
  // TODO set event to store
	const onDrageStart = (e) => console.log("drag start", e)
	const onDragEnd = (e) => console.log("drag end", e)

	return (
		<Wrapper
			draggable='true'
			onDragStart={onDrageStart}
			onDragEnd={onDragEnd}
		>
			<p>this is a dragable item</p>
			{children}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100px;
	height: 60px;
	border-radius: 4px;
	border: 1px solid #ddd;
`

export default DragItem
