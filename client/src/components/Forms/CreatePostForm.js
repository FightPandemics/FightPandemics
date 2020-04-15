import React from "react";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { ROYAL_BLUE, DARK_GRAY } from "../../constants/colors";

const StyledForm = styled(Form)`
  font-family: "Poppins";
  margin-top: 2rem;
`;

const StyledInput = styled(Input)`
  color: ${ROYAL_BLUE};
  font-size: 1.8rem;
  border: none;
  outline: none;
  &.ant-input:hover,
  &.ant-input:focus {
    border-right-width: unset !important;
    border-color: unset;
    box-shadow: unset;
  }
`;

const StyledTextArea = styled(Input.TextArea)`
  color: ${DARK_GRAY};
  font-size: 1.4rem;
  border: none;
  outline: none;
  &.ant-input:hover,
  &.ant-input:focus {
    border-right-width: unset !important;
    border-color: unset;
    box-shadow: unset;
  }
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <StyledForm
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item className="title" name="title">
        <StyledInput placeholder="Title" />
      </Form.Item>
      <Form.Item className="body" name="body">
        <StyledTextArea rows={10} placeholder="Write a post." />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Post
        </Button>
      </Form.Item>
    </StyledForm>
  );
};
