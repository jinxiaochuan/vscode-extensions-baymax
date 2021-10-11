import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Radio } from "antd";
import channel, {
  IActionType,
  ICodeMessage,
} from "@/components/signal-channel";
import "../../index.less";
import "./index.less";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 8 },
};

const Code = () => {
  const [form] = Form.useForm();

  const onFinish = useCallback((values: ICodeMessage) => {
    channel.postMessage({
      type: IActionType.GENERATE_CODE,
      data: values,
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      project: "baymax-manager",
      nodeDir: "app",
      clientDir: "client/js/pages",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="vscode-code">
      <Form {...layout} form={form} name="vscode-code" onFinish={onFinish}>
        <Form.Item label="前端项目" name="project">
          <Radio.Group>
            <Radio.Button value="baymax-manager">baymax-manager</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="node目录"
          name="nodeDir"
          rules={[
            { required: true, message: "请输入项目node目录" },
            { pattern: /^[/A-Za-z0-9_-]+$/, message: "目录名称不合法" },
          ]}
        >
          <Input disabled placeholder="请输入项目node目录" />
        </Form.Item>
        <Form.Item
          label="client目录"
          name="clientDir"
          rules={[
            { required: true, message: "请输入项目client目录" },
            { pattern: /^[/A-Za-z0-9_-]+$/, message: "目录名称不合法" },
          ]}
        >
          <Input disabled placeholder="请输入项目client目录" />
        </Form.Item>
        <Form.Item
          label="目录名称"
          name="dirname"
          rules={[
            { required: true, message: "请输入创建的目录名称" },
            { pattern: /^[A-Za-z0-9_-]+$/, message: "目录名称不合法" },
          ]}
        >
          <Input placeholder="请输入创建的目录名称" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            模板代码生成
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Code;

ReactDOM.render(<Code />, document.getElementById("root"));
