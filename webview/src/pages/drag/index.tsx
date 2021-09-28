import React, { useState, useCallback } from "react";
import { Row, Col } from "antd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DroppableItem from "./components/droppable-item";
import MovableItem, { IOnDropParam } from "./components/movable-item";
import "./index.less";

const MOVABLE_ITEM_LIST = [
  {
    id: 1,
    name: "钢铁侠",
    cover: "https://img0.baidu.com/it/u=753742779,3443252252&fm=26&fmt=auto",
  },
  {
    id: 2,
    name: "小贱贱",
    cover:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F56fd5b2a072b62677951d8ca8a4bebbf07a8969d.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635392830&t=256734966e83e6553eef01ddb0c0a5e8",
  },
  {
    id: 3,
    name: "蜘蛛侠",
    cover:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.mrshuhua.net%2FtushuJDEwLmFsaWNkbi5jb20vaTMvMjA4NTg5NzM4My9UQjJQVlZtbkhzVE1lSmpTc3ppWFhjZHdYWGFfISEyMDg1ODk3MzgzJDk.jpg&refer=http%3A%2F%2Fwww.mrshuhua.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635392830&t=18e2917ce8c9294aec2b5f65b0c5d523",
  },
  {
    id: 4,
    name: "幻视",
    cover:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F7af1be7c4ab2cee47f519fe5ff7124a76a98708639d93-f1eL1C_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635392830&t=4e37df8ac57d84b17c3b5cbcddc2581a",
  },
];

const Drag = () => {
  const [list, setList] = useState(MOVABLE_ITEM_LIST);

  const onDrop = useCallback(
    ({ draggedItem, droppedItem }: IOnDropParam) => {
      const dragged = list.find((item) => item.id === draggedItem.dragId);
      const dropped = list.find((item) => item.id === droppedItem.dragId);
      if (!dragged || !dropped) return;

      const swapList = [...list].map((item) => {
        if (item.id === draggedItem.dragId) {
          return dropped;
        } else if (item.id === droppedItem.dragId) {
          return dragged;
        } else {
          return item;
        }
      });
      setList(swapList);
    },
    [list]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Col>
        {list.map((item) => (
          <Row key={item.id}>
            <DroppableItem
              dragId={item.id}
              hoverable
              style={{ width: 200 }}
              cover={<img alt="example" src={item.cover} />}
            >
              <MovableItem dragId={item.id} name={item.name} onDrop={onDrop} />
            </DroppableItem>
          </Row>
        ))}
      </Col>
    </DndProvider>
  );
};

export default Drag;
