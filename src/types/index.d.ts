interface DragItem {
	id: string | number | undefined
	title?: string
	row: number // number of rows occupied
	column: number // number of columns occupied
	isDragged?: boolean
}

interface DragItemProps extends DragItem {
	children?: React.ReactNode
}

interface DragItemData extends DragItem {
	x: number // cell's x index
	y: numer // cell's y index
	offsetX?: number // item 内的偏移量
	offsetY?: number
	isInArea: boolean
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
