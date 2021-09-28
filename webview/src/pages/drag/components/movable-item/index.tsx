import React, { FC } from "react";
import { Card, Avatar } from "antd";
import { useDrag } from "react-dnd";

const { Meta } = Card;

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
  name: string;
  dragId: number;
  onDrop?: (drag: IOnDropParam) => void;
}

const MovableItem: FC<IProps> = ({ dragId, name, onDrop }) => {
  const [{ isDragging }, drag] = useDrag<
    DragObject,
    DropResult,
    CollectedProps
  >({
    type: "DragDND",
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
    <div ref={drag} style={{ opacity }}>
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={name}
        description={name}
      />
    </div>
  );
};

export default MovableItem;
