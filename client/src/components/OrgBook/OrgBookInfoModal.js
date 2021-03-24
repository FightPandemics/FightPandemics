import React, { useState } from "react";
import { OrgBookStyledModalContainer } from "./OrgBookStyledModal";

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
    <OrgBookStyledModalContainer
      MaxModalBodyHeight={"49.6rem"}
      MinModalBodyHeight={"25.7rem"}
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
    </OrgBookStyledModalContainer>
  );
};

export default OrgBookInfoModal;
