import React, { FC } from "react";
import { useDrag } from "react-dnd";
import "./index.less";

type DragObject = {
  name: string;
  dragId: number;
};
type DropResult = {
  name: string;
  dragId: number;
};
type CollectedProps = {
  isDragging: boolean;
};
export type IOnDropParam = { draggedItem: DragObject; droppedItem: DropResult };

interface IProps {
  name?: string;
  dragId: number;
  onDrop?: (drag: IOnDropParam) => void;
}

const MovableItem: FC<IProps> = ({ name, dragId, onDrop, children }) => {
  const [{ isDragging }, drag] = useDrag<
    DragObject,
    DropResult,
    CollectedProps
  >({
    type: "AntdDragDND",
    item: { name: "MovableItemName", dragId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      const droppedItem = monitor.getDropResult();
      if (
        droppedItem &&
        droppedItem.name === "DroppableItemName" &&
        draggedItem.dragId !== droppedItem.dragId
      ) {
        onDrop &&
          onDrop({
            draggedItem,
            droppedItem,
          });
      }
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div className="movable-item" ref={drag} style={{ opacity }}>
      {name}
      {children}
    </div>
  );
};

export default MovableItem;
