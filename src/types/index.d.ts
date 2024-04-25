interface DragItem {
	id: string | number
	title?: string
	row: number // number of rows occupied
	column: number // number of columns occupied
}

interface DragItemProps extends DragItem {
	children?: React.ReactNode
}

interface currentDragItem extends DragItem {
	x: number // cell's x index
	y: numer  // cell's y index
	isInArea: boolean
}
