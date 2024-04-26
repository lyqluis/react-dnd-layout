const currentDragItem: CurrentDragItem = {
	id: 0,
	x: 0,
	y: 0,
	row: 1,
	column: 1,
	isInArea: false,
	isDragged: false,
}
const resetCurrentDragItem = () => {
	currentDragItem.id = 0
	currentDragItem.x = 0
	currentDragItem.y = 0
	currentDragItem.row = 1
	currentDragItem.column = 1
	currentDragItem.isInArea = false
	currentDragItem.isDragged = false
}

type CellPosition = [number, number, number, number] // item 占据的左上 cell 坐标和右下 cell 坐标
/**
 * @func: 判断 child box 是否在 parent box 内
 * @param {CellPosition} parent
 * @param {CellPosition} child
 * @return {boolean}
 * 如果 2*2 的 child，那么其 child 为 [0,0,1,1], (0,0)-(1,1)
 */
const isWithinCell = (parent: CellPosition, child: CellPosition) => {
	console.log("parent", parent, "child", child)

	return (
		parent[0] <= child[0] &&
		parent[1] <= child[1] &&
		parent[2] >= child[2] &&
		parent[3] >= child[3]
	)
}

// TODO use a map to store dropped dragItem

export { currentDragItem, isWithinCell, resetCurrentDragItem }
