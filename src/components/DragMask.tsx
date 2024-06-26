import React, { useMemo } from "react"
import styled from "styled-components"

interface DragMaskProps {
	dragData: DragItemData
	cellData: Cell
	isLegalPosition: boolean
}

const DragMask: React.FC<DragMaskProps> = ({
	dragData,
	cellData,
	isLegalPosition,
}) => {
	// since grid-area doesn't have animation affect
	// use width & height & gap to transform instead
	const { width: cellWidth, height: cellHeight, gap } = cellData
	const { row, column, x, y } = dragData

	const fixedStyle = useMemo(() => {
		const width = column * cellWidth + gap * (column - 1) + "px"
		const height = row * cellHeight + gap * (row - 1) + "px"
		return { width, height }
	}, [dragData.id, dragData.row, dragData.column])

	const transStyle = useMemo(() => {
		// transform
		const translateX = gap + (cellWidth + gap) * x
		const translateY = gap + (cellHeight + gap) * y
		// TODO style
		// const background
		const transform = `translate(${translateX}px, ${translateY}px)`
		return { transform }
	}, [dragData])

	return (
		<Wrapper
			style={{
				...fixedStyle,
				...transStyle,
			}}
		>
			{JSON.stringify(fixedStyle)}
			{JSON.stringify(transStyle)}
			canDrop: {isLegalPosition.toString()}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: absolute;
	width: 200px;
	height: 200px;
	background: lightyellow;
	opacity: 0.5;
	border: #000 solid 1px;
	pointer-events: none;
	transition: all 0.2s;
`

export default DragMask
