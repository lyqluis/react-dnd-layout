import { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { currentDragItem, isWithinCell } from "./drag"

interface DragDropAreaProps {
	row: number
	column: number
	gap: number
}

const DragDropArea: React.FC<DragDropAreaProps> = ({ row, column, gap }) => {
	const dropContainer = useRef(null)
	const cellState = useRef({ row, column, gap, width: 0, height: 0 })
	// TODO ? is necessary to set current drag item to reactive state ?
	const [current, setCurrent] = useState(currentDragItem)

	// get container's cells' width, height
	useEffect(() => {
		const target = dropContainer.current! // 目标元素
		const resizeObserver = new ResizeObserver((entries) => {
			if (!entries[0]) return
			const { width, height } = entries[0].contentRect // get target width
			console.log("area width", width)
			const boxWidth = (width - (column - 1) * gap) / column
			const boxHeight = (height - (row - 1) * gap) / row
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
		console.log("click", e, offsetX, offsetY)
		console.log("click cell index", getCellX(offsetX), getCellY(offsetY))
	}

	const onDragEnter = (e) => {
		e.preventDefault()
		// TODO throttle
		// update current drag item's state
		console.log("drag enter", e, e.nativeEvent.offsetX)
		const { offsetX, offsetY } = e.nativeEvent
		const x = getCellX(offsetX)
		const y = getCellY(offsetY)
		currentDragItem.x = x
		currentDragItem.y = y
		currentDragItem.isInArea = true
	}

	const onDragOver = (e) => {
		e.preventDefault()
		// update current drag item's state
		const { offsetX, offsetY } = e.nativeEvent
		const x = getCellX(offsetX)
		const y = getCellY(offsetY)
		currentDragItem.x = x
		currentDragItem.y = y
	}

	const onDragLeave = (e) => {
		e.preventDefault()
		// todo delete current drag item
		currentDragItem.isInArea = false
	}
	const onDrop = (e) => {
		e.preventDefault()

		// todo push current drag item to a list
		const { x, y, row, column } = currentDragItem
		console.log("current drag item", x, y)

		const isInCells = isWithinCell(
			[0, 0, cellState.current.row - 1, cellState.current.column - 1],
			[x, y, x + row - 1, y + column - 1]
		)
		console.log("is in cell", isInCells)
	}

	return (
		<Wrapper
			ref={dropContainer}
			$row={row}
			$column={column}
			$gap={gap}
			onDragEnter={onDragEnter}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			onClick={handleClick}
			$currentX=''
			$currentY=''
		>
			<div className='drag-drop-area__grids'>
				{new Array(row * column).fill(null).map((val, i) => (
					<div
						className='area-cell'
						key={`key-${i}`}
					></div>
				))}
			</div>
			<div className='drag-drop-area__box'></div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100vw;
	height: 500px;
	background: lightblue;
  position: relative;

	.drag-drop-area__box,
	.drag-drop-area__grids {
		width: 100%;
		height: 100%;
		padding: ${(props) => props.$gap}px;
		display: grid;
		gap: ${(props) => props.$gap}px;
		grid-template-columns: repeat(${(props) => props.$row}, auto);
		grid-template-rows: repeat(${(props) => props.$column}, auto);

		.area-cell {
			// todo auto width & height
			/* width: 100px; */
			/* height: 100px; */
			border: 1px solid #000;
			background: #eee;
			pointer-events: none; // !! otherwise offset in event is related to cell not the whole area
		}

		&__filled {
			background: #000;
			grid-area: 1 / 1 / 3 / 3;
		}
	}

	.drag-drop-area__box {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		overflow: hidden;
	}
`

export default DragDropArea
