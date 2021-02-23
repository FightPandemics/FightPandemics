import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Row, Col, Input } from "antd";
import { useTranslation } from "react-i18next";

const OrgBookModal = ({
  title,
  okText,
  requiredPageNameMessage,
  defaultPageName,
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const maxPageNameMessage = t("orgBook.maxPageName");
  const prevRef = useRef();

  return (
    defaultPageName && (
      <Modal
        width={300}
        visible={visible}
        title={title}
        centered
        okText={okText}
        cancelText={t("orgBook.cancel")}
        onCancel={onCancel}
        okButtonProps={{ disabled: false }}
        cancelButtonProps={{ disabled: false }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              //console.log("firing onCreate in modal with values: " + JSON.stringify(values));
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="orgbook_modal"
          initialValues={{ pagename: defaultPageName }}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="pagename"
                label={t("orgBook.pageName")}
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: requiredPageNameMessage,
                  },
                  {
                    max: 25,
                    message: maxPageNameMessage,
                  },
                ]}
              >
                <Input style={{ width: "225px" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  );
};

export default OrgBookModal;
