interface DragItem {
	id: string | number
	title?: string
	row: number // number of rows occupied
	column: number // number of columns occupied
}

interface DragItemProps extends DragItem {
	children?: React.ReactNode
}

interface CurrentDragItem extends DragItem {
	x: number // cell's x index
	y: numer // cell's y index
	offsetX?: number // item 内的偏移量
	offsetY?: number
	isInArea: boolean
	isDragged: boolean
}

interface DroppedItem extends CurrentDragItem {}
