interface Cell {
	row: number
	column: number
	gap: number
	width: number
	height: nubmer
}

interface DragItem {
	id: string | number
	title?: string
	row: number // number of rows occupied
	column: number // number of columns occupied
	isDragged?: boolean
}

interface DragItemData extends DragItem {
	x: number // cell's x index
	y: numer // cell's y index
	offsetX?: number // item 内的偏移量
	offsetY?: number
	isInArea: boolean
}
