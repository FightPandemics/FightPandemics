import React, { useState } from "react";
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
  currentOrgBookPages,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const maxPageNameMessage = t("orgBook.maxPageName");
  const [canSubmit, setCanSubmit] = useState(true);

  const validateForDupName = (rule, value, callback) => {
    if (value) {
      let uniquePageName = true;
      if (currentOrgBookPages) {
        if (currentOrgBookPages.some((item) => item.name === value)) {
          uniquePageName = false;
        }
      }
      if (!uniquePageName) {
        setCanSubmit(false);
        callback(t("orgBook.pageNameAlreadyExists"));
      } else {
        setCanSubmit(true);
        callback();
      }
    } else {
      callback();
    }
  };

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
        okButtonProps={{ disabled: !canSubmit }}
        cancelButtonProps={{ disabled: false }}
        onOk={() => {
          form.validateFields().then((values) => {
            onCreate(values);
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
                  {
                    validator: validateForDupName,
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
