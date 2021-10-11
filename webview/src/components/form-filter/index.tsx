import React from "react";
import {
  Form,
  Input,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";

export const FormInput = () => {
  return (
    <Form.Item label="Input">
      <Input />
    </Form.Item>
  );
};

export const FormDateInputNumber = () => {
  return (
    <Form.Item label="InputNumber">
      <InputNumber />
    </Form.Item>
  );
};

export const FormSelect = () => {
  return (
    <Form.Item label="Select">
      <Select>
        <Select.Option value="demo">Demo</Select.Option>
      </Select>
    </Form.Item>
  );
};

export const FormTreeSelect = () => {
  return (
    <Form.Item label="TreeSelect">
      <TreeSelect
        treeData={[
          {
            title: "Light",
            value: "light",
            children: [{ title: "Bamboo", value: "bamboo" }],
          },
        ]}
      />
    </Form.Item>
  );
};

export const FormCascader = () => {
  return (
    <Form.Item label="Cascader">
      <Cascader
        options={[
          {
            value: "zhejiang",
            label: "Zhejiang",
            children: [
              {
                value: "hangzhou",
                label: "Hangzhou",
              },
            ],
          },
        ]}
      />
    </Form.Item>
  );
};

export const FormDatePicker = () => {
  return (
    <Form.Item label="DatePicker">
      <DatePicker />
    </Form.Item>
  );
};

export const FormDateSwitch = () => {
  return (
    <Form.Item label="Switch" valuePropName="checked">
      <Switch />
    </Form.Item>
  );
};
