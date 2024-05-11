- [x] 可拖动 box
  - DrafItem 监听 dragstart, dragend 事件
  - DragDropArea 中的 cell 需要设置 css `pointer-events: none;` 才能将 drag 事件中的 offset 值显示为针对整个区域的，否则是针对 cell 的 offset 值
  - dragenter 触发，将目标 box 的 css 设置`pointer-events: none;`
- [x] 碰撞检测
  - 列举出所有不相交的情形（box1 在 box2 的上下左右 4 个方向），取反
- [x] 可调整 box 大小
  - 为 DroppedItem 添加 `onMouseDown`、`onMouseUp`、`onMouseMove` 事件
  - 设置 DroppedItem 的 CSS 为 `resize: both;`（`overflow: visible;` 时无法触发 resize），会自动添加右下角的 resize 图标
  - 调整大小时元素默认会以中点为中心对称缩放，设置 `position: abosolute;` 和宽高，则可以固定左上角
  - 当拖动元素右下角 resize 图标时，浏览器会默认行为为调整大小，而不会触发 drag 事件
  - 调整大小时，CSS 会为元素添加一个实时宽高的行内元素，如果需要显示拖动后的预期大小，需要在拖动结束后用 `element.styled.width=100%` 覆盖掉
- [x] resize 和 drag 的事件有冲突
  - `onMouseDown` 中添加判断，判断当前鼠标点击是否在调整图标的边缘内
  ```js
  const rect = e.target.getBoundingClientRect()
	const isInResizeEdge = 
		Math.abs(rect.right - e.clientX) < resizeEdge ||
		Math.abs(rect.bottom - e.clientY) < resizeEdge
  ```
- [ ] DragMask 的显示
  - [ ] 

### bug
- [x] droppedItem 二次拖拽移动重叠到其他 droppedItem 时，会导致坐标更新到其他 droppedItem 内，而不是 area 内的坐标
  - 拖拽时将其他 droppedItem 的 `pointer-events` 设置成 `none`
- [x] 二次拖拽移动重叠到自身原先的位置时发生偏移，情况同上
  - 使用 `transform: translate(-9999999px, -9999999px)` 位移该元素，从而不会碰到改元素
- [x] DragMask 移动位置稍有偏移
- [x] 首次拖拽 currentDragState 总是不能拿到对应的数据
  - ? React 中 setState 中使用 `...` 拓展符无法正确更新属性
  - ? 好像也不是这样，不知道怎么就没了这个 bug

