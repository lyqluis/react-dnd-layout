import { useState } from "react"
const Tst = () => {
	const [list, setList] = useState([])
  setList([...list, .'d'])
	return <></>
}

class DragMap1<T extends DragItem> {
	map = new Map<string, T>()
}

class DragMap2<T extends DragItem> {
	constructor() {
		this.map = new Map<string, T>()
	}
}


export default Tst
