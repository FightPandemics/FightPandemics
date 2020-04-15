import React from "react";
import { Modal } from "antd-mobile";

export default ({ content, onClose, visible }) => {
  return (
    <Modal
      popup
      onClose={onClose}
      visible={visible}
      maskClosable={true}
      closable={true}
      transparent
      animationType="slide-up"
    >
      {content}
    </Modal>
  );
};
