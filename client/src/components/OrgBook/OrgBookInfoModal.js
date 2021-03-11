import React, { useState } from "react";
import { Modal } from "antd";

const OrgBookInfoModal = ({
  title,
  okText,
  visible,
  infoMsg1,
  infoMsg2,
  infoMsg3,
  infoMsg4,
  onClose,
}) => {
  return (
    <Modal
      width={400}
      visible={visible}
      title={title}
      centered
      okText={okText}
      onOk={() => {
        onClose();
      }}
      onCancel={() => {
        onClose();
      }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <p>{infoMsg1}</p>
      <p>{infoMsg2}</p>
      <p>{infoMsg3}</p>
      <p>{infoMsg4}</p>
    </Modal>
  );
};

export default OrgBookInfoModal;
