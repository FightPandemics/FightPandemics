import React from "react";
import { Modal } from "antd";

const PolicyModal = ({ title, children, handleHideModal, visible }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleHideModal}
      onCancel={handleHideModal}
      cancelButtonProps={{ style: { display: "none" } }}
      width="90vw"
    >
      {children}
    </Modal>
  );
};

export default PolicyModal;
