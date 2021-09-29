import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { Form } from "antd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {
  FormInput,
  FormDateInputNumber,
  FormSelect,
  FormTreeSelect,
  FormCascader,
  FormDatePicker,
  FormDateSwitch,
} from "@/components/form-filter";
import FormTable from "@/components/form-table";
import channel, { IActionType } from "@/components/signal-channel";
import DroppableItem from "./components/droppable-item";
import MovableItem, { IOnDropParam } from "./components/movable-item";
import "../../index.less";

const MOVABLE_ITEM_LIST = [
  {
    id: 1,
    type: "FormInput",
    component: FormInput,
  },
  {
    id: 2,
    type: "FormDateInputNumber",
    component: FormDateInputNumber,
  },
  {
    id: 3,
    type: "FormSelect",
    component: FormSelect,
  },
  {
    id: 4,
    type: "FormTreeSelect",
    component: FormTreeSelect,
  },
  {
    id: 5,
    type: "FormCascader",
    component: FormCascader,
  },
  {
    id: 6,
    type: "FormDatePicker",
    component: FormDatePicker,
  },
  {
    id: 7,
    type: "FormDateSwitch",
    component: FormDateSwitch,
  },
];

const Antd = () => {
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

      channel.postMessage({
        type: IActionType.GENERATE_SNIPPETS,
        data: swapList.map(({ component, ...res }) => res),
      });
    },
    [list]
  );

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Form {...formItemLayout} layout="inline">
        {list.map((item) => (
          <DroppableItem key={item.id} dragId={item.id}>
            <MovableItem dragId={item.id} onDrop={onDrop}>
              {React.createElement(item.component)}
            </MovableItem>
          </DroppableItem>
        ))}
      </Form>
      <FormTable />
    </DndProvider>
  );
};

export default Antd;

ReactDOM.render(<Antd />, document.getElementById("root"));
