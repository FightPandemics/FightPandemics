import React, { useState } from "react";
import { Modal, Form, Row, Col, Input } from "antd";
import { useTranslation } from "react-i18next";

const OrgBookConfirmModal = ({
  action,
  selectedPage,
  visible,
  onConfirm,
  onCancelConfirm,
  UPDATE_ACTION_TYPES,
}) => {
  const { t } = useTranslation();
  let title = "";
  let okText = "";
  let confirmPrompt = "";
  let pageName = selectedPage.name;

  switch (action) {
    case UPDATE_ACTION_TYPES.saveProgressType:
      title = t("orgBook.confirmSaveProgressTitle");
      okText = t("orgBook.confirmSaveProgressOkText");
      confirmPrompt = t("orgBook.confirmSaveProgressPrompt", { pageName });
      break;

    default:
      break;
  }

  return (
    selectedPage && (
      <Modal
        width={300}
        visible={visible}
        title={title}
        centered
        okText={okText}
        cancelText={t("orgBook.cancel")}
        onCancel={onCancelConfirm}
        cancelButtonProps={{ disabled: false }}
        onOk={() => {
          onConfirm(action);
        }}
      >
        <p>{confirmPrompt}</p>
      </Modal>
    )
  );
};

export default OrgBookConfirmModal;
