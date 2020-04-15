import React from "react";
import { Modal } from "antd-mobile";

export default ({ content, onClose, visible, closable }) => {
  return (
    <Modal
      popup
      onClose={onClose}
      visible={visible}
      maskClosable={true}
      closable={closable}
      transparent
      animationType="slide-up"
    >
      {content}
    </Modal>
  );
};
