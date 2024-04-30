- DrafItem 监听 dragstart, dragend 事件
- DragDropArea 中的 cell 需要设置 css `pointer-events: none;` 才能将 drag 事件中的 offset 值显示为针对整个区域的，否则是针对 cell 的 offset 值
- dragenter 触发，将目标 box 的 css 设置`pointer-events: none;`

### bug
- [x] droppedItem 二次拖拽移动重叠到其他 droppedItem 时，会导致坐标更新到其他 droppedItem 内，而不是 area 内的坐标
  - 拖拽时将其他 droppedItem 的 `pointer-events` 设置成 `none`
- [ ] 二次拖拽移动重叠到自身原先的位置时发生偏移，情况同上
- [ ] DragMask 移动位置稍有偏移
