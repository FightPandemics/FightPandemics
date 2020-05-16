import React from "react";
import { Modal, Row, Col } from "antd";
import {
  ADD_OPTION,
  REMOVE_OPTION,
  REMOVE_ALL_OPTIONS,
  TOGGLE_STATE,
  SET_VALUE,
  SET_POSTS,
} from "hooks/actions/feedActions";
import { Container, Option, CloseButton } from 'components/PostAs/style';
import person from "assets/icons/person.svg";
import organization from "assets/icons/organization.svg";


const PostAs = ({ onClose, visible, maskClosable, closable }) => {

  return (
    <Container
      footer={null}
      style={{ textAlign: "center" }}
      title="Continue Posting As"
      visible={visible}
      onOk={() => {}}
      onCancel={onClose}
      maskClosable={maskClosable}
      closable={closable}
      transparent
      closeIcon={CloseButton}
    >
      <Row gutter={14} justify="center">
        <Col span={12}>
          <Option img={person} text="Individual" path={'/create-post'} />
        </Col>
        <Col span={12}>
          <Option img={organization} text="Organization" path={'/create-post'} />
        </Col>
      </Row>
    </Container>
  );
};

export default PostAs;

