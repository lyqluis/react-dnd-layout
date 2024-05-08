- DrafItem 监听 dragstart, dragend 事件
- DragDropArea 中的 cell 需要设置 css `pointer-events: none;` 才能将 drag 事件中的 offset 值显示为针对整个区域的，否则是针对 cell 的 offset 值
- dragenter 触发，将目标 box 的 css 设置`pointer-events: none;`

### bug
- [x] droppedItem 二次拖拽移动重叠到其他 droppedItem 时，会导致坐标更新到其他 droppedItem 内，而不是 area 内的坐标
  - 拖拽时将其他 droppedItem 的 `pointer-events` 设置成 `none`
- [x] 二次拖拽移动重叠到自身原先的位置时发生偏移，情况同上
  - 使用 `transform: translate(-9999999px, -9999999px)` 位移该元素，从而不会碰到改元素
- [x] DragMask 移动位置稍有偏移
- [x] 碰撞检测
  - 列举出所有不相交的情形（box1 在 box2 的上下左右 4 个方向），取反
- [ ] 首次拖拽 currentDragState 总是不能拿到对应的数据
  - ? React 中 setState 中使用 `...` 拓展符无法正确更新属性
  - ? 好像也不是这样
