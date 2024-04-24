import { useState } from "react"
import "./App.css"
import DragItem from "./components/DragItem"
import DragDropArea from "./components/DragDropArea"

function App() {
	return (
		<>
			<DragDropArea
				row={5}
				column={5}
				gap={15}
			></DragDropArea>
			<div>
				drag items wrapper
				<DragItem></DragItem>
			</div>
		</>
	)
}

export default App
