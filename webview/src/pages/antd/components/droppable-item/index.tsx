import React, { FC } from "react";
import { useDrop } from "react-dnd";
import cn from "classnames";
import "./index.less";

interface IProps {
  dragId: number;
}

const DroppableItem: FC<IProps> = ({ dragId, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "AntdDragDND",
    drop: () => ({ name: "DroppableItemName", dragId }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={cn("droppable-item", {
        dashed: isOver,
      })}
    >
      {children}
    </div>
  );
};

export default DroppableItem;
