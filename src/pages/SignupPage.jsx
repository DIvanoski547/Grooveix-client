import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const SignupPage = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        rules={[
          {
            required: true,
            message: "Please input your Firstname!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Firstname"
        />
      </Form.Item>

      <Form.Item
        name="lastName"
        rules={[
          {
            required: true,
            message: "Please input your Lastname!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Lastname"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="*********"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Signup
        </Button>
      </Form.Item>
      {/* <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item> */}
    </Form>
  );
};
export default SignupPage;
