import { useState } from "react"

const Tst = () => {
	const [isDragged, setIsDragged] = useState(false)
	const onDragStart = (e) => {
		e.preventDefault()
		console.log("drag start")
		setIsDragged(true)
	}
	const onDragEnd = (e) => {
		e.preventDefault()
		console.log("drag end")

		setIsDragged(false)
	}

	return (
		<div
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<TstComponent
				isDragged={isDragged}
				style={{ transform: isDragged ? `translate(100px, 100px)` : "" }}
			></TstComponent>
		</div>
	)
}

const TstComponent = ({ isDragged, style }) => {
	return (
		<div
			// style={{ transform: isDragged ? `translate(100px, 100px)` : "" }}
			style={{ color: isDragged ? `blue` : "black" }}
			// style={{ ...style }}
		>
			this is tst-component
		</div>
	)
}

export default Tst


const x = getCellX(offsetX) - getCellX(dragMapState?.offsetX ?? 0)
const y = getCellY(offsetY) - getCellY(dragMapState?.offsetY ?? 0)
const isInArea = true
const isDragged = true

console.log("map state", dragMapState)
const newDragState = { ...dragMapState, x, y, isInArea, isDragged }
// setCurrentDragState

