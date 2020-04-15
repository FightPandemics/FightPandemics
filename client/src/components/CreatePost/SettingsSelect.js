import React from "react";
import { Modal } from "antd-mobile";

export default ({ onClose, modal }) => {
  return (
    <Modal
      onClose={onClose}
      visible={modal}
      maskClosable={true}
      closable={true}
      transparent
    >
      <h1 style={{ color: "black" }}>Link Copied!</h1>
    </Modal>
  );
};
