import { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { defaultDragState, dragMap, isOverlapping, isWithinCell } from "./drag"
import DroppedItem from "./DroppedItem"
import DragMask from "./DragMask"

interface DragDropAreaProps {
	row: number
	column: number
	gap: number
}

const DragDropArea: React.FC<DragDropAreaProps> = ({ row, column, gap }) => {
	const dropContainer = useRef(null)
	const cellState = useRef<Cell>({ row, column, gap, width: 0, height: 0 })
	const [currentDragState, setCurrentDragState] =
		useState<DragItemData>(defaultDragState)
	const [droppedList, setDroppedList] = useState<DragItemData[]>([])
	const removeDroppedItem = (id: number | string) =>
		setDroppedList((list) => list.filter((item) => item.id !== id))
	const showDragMask =
		(currentDragState?.isInArea && currentDragState?.isDragged) ||
		currentDragState?.isResizing

	// get container's cells' width, height
	useEffect(() => {
		const target = dropContainer.current! // 目标元素
		const resizeObserver = new ResizeObserver((entries) => {
			if (!entries[0]) return
			const { width, height } = entries[0].contentRect // get area width
			console.log("area width", width)
			const boxWidth = (width - (column + 1) * gap) / column
			const boxHeight = (height - (row + 1) * gap) / row
			cellState.current.width = boxWidth
			cellState.current.height = boxHeight
		})
		resizeObserver.observe(target)

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	const getCellX = (offset: number): number =>
		Math.min(Math.floor(offset / (cellState.current.width + gap)), row - 1)
	const getCellY = (offset: number): number =>
		Math.min(Math.floor(offset / (cellState.current.height + gap)), column - 1)

	const handleClick = (e) => {
		const { offsetX, offsetY } = e.nativeEvent
		const x = getCellX(offsetX)
		const y = getCellY(offsetY)
		const id = 2
		console.log("click cell index", x, getCellY(offsetY))
		const isNotOverlapWithDroppedItem = !droppedList
			.filter((box) => box.id !== id)
			.some((box) =>
				isOverlapping(
					[box.x, box.y, box.x + box.row - 1, box.y + box.column - 1],
					[x, y, x + 1, y + 2]
				)
			)
		console.log("pos is legal", isNotOverlapWithDroppedItem)
	}

	const isLegalPostion = useMemo(() => {
		const { x, y, row, column, id } = currentDragState
		const currentCellPosition = [x, y, x + column - 1, y + row - 1]
		const isInCells = isWithinCell(
			[0, 0, cellState.current.row - 1, cellState.current.column - 1],
			currentCellPosition
		)
		const isNotOverlapWithDroppedItem = !droppedList
			.filter((box) => box.id !== id)
			.some((box) =>
				isOverlapping(
					[box.x, box.y, box.x + box.column - 1, box.y + box.row - 1],
					currentCellPosition
				)
			)
		// console.log("memo is legal", isInCells, isNotOverlapWithDroppedItem)
		return isInCells && isNotOverlapWithDroppedItem
	}, [currentDragState])

	// drag event
	const onDragEnter = (e) => {
		e.preventDefault()
		// update current drag item's state
		const dragMapState = dragMap.get("current")
		console.log("drag enter", currentDragState, dragMapState)
		const { offsetX, offsetY } = e.nativeEvent
		const x = getCellX(offsetX) - getCellX(dragMapState?.offsetX ?? 0)
		const y = getCellY(offsetY) - getCellY(dragMapState?.offsetY ?? 0)
		const isInArea = true
		const newDragState = Object.assign({}, dragMapState, { x, y, isInArea })
		setCurrentDragState(newDragState)
	}

	const onDragOver = (e) => {
		e.preventDefault()
		// TODO throttle
		// update current drag item's state
		// console.log("drag over", currentDragState)
		const { offsetX, offsetY } = e.nativeEvent
		const x = getCellX(offsetX) - getCellX(currentDragState?.offsetX ?? 0)
		const y = getCellY(offsetY) - getCellY(currentDragState?.offsetY ?? 0)
		const isInArea = true
		setCurrentDragState((preState) => ({ ...preState, x, y, isInArea }))
	}

	const onDragLeave = (e) => {
		e.preventDefault()
		console.log("on drag leave", Date.now())
		const isInArea = false
		setCurrentDragState((preState) => ({ ...preState, isInArea }))
	}

	const onDrop = (e) => {
		e.preventDefault()
		console.log("on drop")

		if (isLegalPostion) {
			const restDroppedItemList = droppedList.filter(
				(item) => item.id !== currentDragState.id
			)
			// push current drag item to a list
			setDroppedList([
				...restDroppedItemList,
				{ ...currentDragState, isDragged: false },
			])
		}
		// reset current drag item
		setCurrentDragState(defaultDragState)
	}

	// resize event
	const clamp = (val: number, min: number, max: number) =>
		Math.min(Math.max(val, min), max)
	const getRowOrColumn = (
		offsetXOrY: number,
		widthOrHeight: number,
		gap: number,
		max: number
	) => {
		const num = Math.ceil(offsetXOrY / (gap + widthOrHeight))
		return clamp(num, 1, max)
	}

	const onResizeStart = (e) => {
		// set current drag state to isResizing
		const dragMapState = dragMap.get("current")
		const newDragState = Object.assign({}, dragMapState, { isResizing: true })
		// console.log(newDragState)
		// setCurrentDragState(newDragState)
		setCurrentDragState((preState) => ({
			...dragMapState,
			isResizing: true,
		}))
	}

	const onResize = (e: React.MouseEvent) => {
		console.log("on resize", e.nativeEvent)
		const { offsetX, offsetY } = e.nativeEvent
		const row = getRowOrColumn(
			offsetY,
			cellState.current.height,
			cellState.current.gap,
			cellState.current.row
		)
		const column = getRowOrColumn(
			offsetX,
			cellState.current.width,
			cellState.current.gap,
			cellState.current.column
		)
		setCurrentDragState((preState) => ({
			...preState,
			row,
			column,
		}))
	}
	const onResizeEnd = (e) => {
		// set new row & col
		if (isLegalPostion) {
			const restDroppedItemList = droppedList.filter(
				(item) => item.id !== currentDragState.id
			)
			// push current drag item to a list
			setDroppedList([
				...restDroppedItemList,
				{ ...currentDragState, isResizing: false },
			])
		}
		// reset current drag state
		setCurrentDragState((preState) => ({
			...defaultDragState,
			isResizing: false,
		}))
	}
	// TODO how to know real resize state
	// mouse down => mouse move =>
	// drag start => drag enter => drag over => drop => drag leave => drag end =>
	// mouse up
	return (
		<>
			<Wrapper
				ref={dropContainer}
				$row={row}
				$column={column}
				$gap={gap}
				onDragEnter={onDragEnter}
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				onDrop={onDrop}
				// onClick={handleClick}
			>
				<div className='drag-drop-area__grids'>
					{new Array(row * column).fill(null).map((_, i) => (
						<div
							className='area-cell'
							key={`key-${i}`}
						></div>
					))}
				</div>
				<div className='drag-drop-area__box'>
					{droppedList.map((box) => (
						<DroppedItem
							className='area-cell__dropped'
							key={`dropped-${box.id}`}
							data={box}
							current={currentDragState}
							onRemove={removeDroppedItem}
							onResizeStart={onResizeStart}
							onResize={onResize}
							onResizeEnd={onResizeEnd}
						></DroppedItem>
					))}
					{/* // TODO Drag Mask, maybe use display condition */}
					{showDragMask && (
						<DragMask
							dragData={currentDragState}
							cellData={cellState.current}
							isLegalPosition={isLegalPostion}
						></DragMask>
					)}
				</div>
			</Wrapper>
			<div>
				current drag item:
				{JSON.stringify(currentDragState)}
				current drag mask:
				{JSON.stringify(
					currentDragState?.isInArea && currentDragState?.isDragged
				)}
			</div>
		</>
	)
}

const Wrapper = styled.div`
	width: 100vw;
	height: 500px;
	background: lightblue;
	position: relative;
	box-sizing: border-box;

	.drag-drop-area__box,
	.drag-drop-area__grids {
		width: 100%;
		height: 100%;
		padding: ${(props) => props.$gap}px;
		display: grid;
		gap: ${(props) => props.$gap}px;
		grid-template-columns: repeat(
			${(props) => props.$row},
			1fr
		); /* // !! use 'auto' will cause grid expanded if it has children */
		grid-template-rows: repeat(${(props) => props.$column}, 1fr);

		.area-cell {
			border: 1px solid #000;
			background: #eee;
			pointer-events: none; /* // !! otherwise offset in event is related to cell not the whole area */

			&__dropped {
				background: #aaa;
			}
		}
	}

	.drag-drop-area__box {
		position: absolute;
		top: 0;
		left: 0;
		/* pointer-events: none; */
		overflow: hidden;
	}
`

export default DragDropArea
