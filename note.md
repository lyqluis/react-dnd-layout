- DragDropArea 中的 cell 需要设置 css `pointer-events: none;` 才能将 drag 事件中的 offset 值显示为针对整个区域的，否则是针对 cell 的 offset 值