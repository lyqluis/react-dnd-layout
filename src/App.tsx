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
				<DragItem
					row={1}
					column={1}
					id={1}
					title=''
				>
					1*1
				</DragItem>
				<DragItem
					row={2}
					column={3}
					id={2}
					title=''
				>
					2*3
				</DragItem>
				<DragItem
					row={2}
					column={6}
					id={3}
					title=''
				>
					2*6
				</DragItem>
			</div>
		</>
	)
}

export default App
