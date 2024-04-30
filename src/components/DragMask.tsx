import { useMemo } from "react"
import styled from "styled-components"

const DragMask = ({ dragData, cellData }) => {
	// TODO since grid-area doesn't have animation affect
	// use width & height & gap to transform instead
	const isShow = dragData.isInArea && dragData.isDragged
	const { width: cellWidth, height: cellHeight, gap } = cellData
	const { row, column, x, y } = dragData

	const fixedStyle = useMemo(() => {
		const width = row * cellWidth + gap * (row - 1) + "px"
		const height = column * cellHeight + gap * (column - 1) + "px"
		return { width, height }
	}, [dragData.id])

	const transStyle = useMemo(() => {
		// transform
		const translateX = (cellWidth + gap) * x
		const translateY = (cellHeight + gap) * y
		// todo
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
