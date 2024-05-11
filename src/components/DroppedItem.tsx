import { useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { dragMap } from "./drag"

const DroppedItem: React.FC<{
	className: string
	data: DragItemData
	style?: React.CSSProperties
	current: DragItemData
	children?: React.ReactNode
	onRemove: (id: number | string) => void
	onResizeStart: (e?: React.MouseEvent) => void
	onResize: (e?: React.MouseEvent) => void
	onResizeEnd: (e?: React.MouseEvent) => void
	resizeEdge: number
}> = ({
	className,
	style,
	data,
	children,
	onRemove,
	current,
	onResizeStart,
	onResize,
	onResizeEnd,
	resizeEdge = 10,
}) => {
	const [isDragged, setIsDragged] = useState<boolean>(data.isDragged)
	const isResizing = useRef(false)
	const memoStyle = useMemo(() => {
		const { x, y, row, column } = data
		const gridX = x + 1
		const gridY = y + 1
		// const gridArea = `${gridX}/${gridY}/${gridX + row}/${gridY + column}`
		const gridArea = `${gridY}/${gridX}/${gridY + row}/${gridX + column}`
		return { gridArea }
	}, [data])
	const dynamicStyle = useMemo(() => {
		const opacity = isDragged || isResizing.current ? 0.5 : 1
		const pointerEvents =
			current.id === 0 || current.id === undefined || current.isResizing
				? "all"
				: isDragged && data.id === current.id
				? "all"
				: "none"
		const transform =
			isDragged && data.id === current.id
				? `translate(-999999999px, -9999999999px)`
				: ""
		// console.log("memo dynamic style", opacity, pointerEvents, transform)

		return {
			opacity,
			pointerEvents,
			transform,
		}
	}, [isDragged, current])

	const handleRemove = () => onRemove(data.id)
	const onDragStart = (e) => {
		// since drag start is fired, it's not a resize event
		isResizing.current = false

		// store current dragged data
		const isDragged = true
		setIsDragged(isDragged)
		const { id, title, row, column } = data
		const { offsetX, offsetY } = e.nativeEvent
		const dragItem = { id, title, row, column, offsetX, offsetY, isDragged }
		dragMap.set("current", dragItem)
		console.log("dropped drag start", dragMap.get("current"))
	}
	const onDragEnd = (e) => {
		console.log("drag end", e, isDragged)
		dragMap.remove("current")
		setIsDragged(false)
	}

	// resizing
	const onMouseDown = (e) => {
		console.log("on mouse down", e, isResizing)
		const rect = e.target.getBoundingClientRect()
		const isInResizeEdge = (isResizing.current =
			Math.abs(rect.right - e.clientX) < resizeEdge ||
			Math.abs(rect.bottom - e.clientY) < resizeEdge)
		if (isResizing.current) {
			// set current item to drag map
			const dragItem = { ...data, isResizing: isResizing.current }
			dragMap.set("current", dragItem)
			onResizeStart(e)
		}
	}
	const onMouseMove = (e) => {
		if (isResizing.current) {
			console.log("on mouse move")
			onResize(e)
		}
	}
	const onMouseUp = (e) => {
		console.log("on mouse up")
		// set new row & col
		if (isResizing.current) {
			isResizing.current = false
			onResizeEnd(e)
			// set width & height of target item to '100%', since CSS resize will add a real-time inline style of width and height
			e.target.style.width = "100%"
			e.target.style.height = "100%"
		}
	}

	return (
		<Wrapper
			className={className}
			style={{
				...style,
				...memoStyle,
				...dynamicStyle,
			}}
			draggable='true'
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
		>
			<p onClick={handleRemove}>[x]</p>
			{children}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	pointer-events: all;
	position: absolute;
	resize: both;
	overflow: auto;

	.resize-label {
		content: "";
		position: absolute;
		bottom: 0;
		right: 0;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 0 0 20px 20px; /* 上 右 下 左 */
		border-color: transparent transparent red transparent; /* 上 右 下 左 */
		&:hover {
			cursor: se-resize;
			border-color: transparent transparent blue transparent; /* // todo delete */
		}
	}
`

export default DroppedItem
