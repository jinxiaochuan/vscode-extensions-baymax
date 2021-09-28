import React, { FC } from "react";
import { Card } from "antd";
import { CardProps } from "antd/lib/card";
import { useDrop } from "react-dnd";
import cn from "classnames";
import "./index.less";

interface IProps extends CardProps {
  dragId: number;
}

const DroppableItem: FC<IProps> = ({ dragId, ...cardProps }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "DragDND",
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
      <Card {...cardProps}></Card>
    </div>
  );
};

export default DroppableItem;
