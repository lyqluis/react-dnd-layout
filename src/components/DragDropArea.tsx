import { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"

interface DragDropAreaProps {
	row: number
	column: number
	gap: number
}

const DragDropArea: React.FC<DragDropAreaProps> = ({ row, column, gap }) => {
	const dropContainer = useRef(null)
	const cellState = useRef({ row, column, gap, width: 0, height: 0 })
	const [currentDraggedBox, setCurrentDraggedBox] = useState({
		row,
		column,
		gap,
	})

	// get container's cells' width, height
	useEffect(() => {
		const target = dropContainer.current! // 目标元素
		const resizeObserver = new ResizeObserver((entries) => {
			if (!entries[0]) return
			const { width, height } = entries[0].contentRect // get target width
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

	// TODO ?
	const getX = (offset) => parseInt(offset / (cellState.current.width + gap))
	const handleClick = (e) => {
		console.log("click", e)
	}

	const onDragEnter = (e) => {
		e.preventDefault()
		// update current dragged box's state
		// TODO throttle
	}
	const onDragOver = (e) => e.preventDefault()
	const onDragLeave = (e) => e.preventDefault()

	return (
		<Wrapper
			ref={dropContainer}
			row={row}
			column={column}
			gap={gap}
			onDragEnter={onDragEnter}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onClick={handleClick}
		>
			{/* <div className='drag-drop-area'></div> */}
			{new Array(row * column).fill(null).map((val, i) => (
				<div
					className='area-cell'
					key={`key-${i}`}
				></div>
			))}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100vw;
	height: 500px;
	background: lightblue;
	padding: ${(props) => props.gap}px;
	display: grid;
	gap: ${(props) => props.gap}px;
	grid-template-columns: repeat(${(props) => props.row}, auto);
	grid-template-rows: repeat(${(props) => props.column}, auto);

	.area-cell {
		// todo auto width & height
		/* width: 100px; */
		/* height: 100px; */
		border: 1px solid #000;
	}
`

export default DragDropArea
