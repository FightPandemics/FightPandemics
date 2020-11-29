import React, { useState } from "react";
import Body from "./Body";
import styled from "styled-components";
import { Modal } from "antd";
import { theme, mq } from "constants/theme";
import FeedBackModal from "./FeedBackModal";
import { useTranslation } from "react-i18next";

const { colors, typography } = theme;

const CreateReport = ({ postId, setCallReport, callReport, fromPage }) => {
  const [reportSuccess, setReportSuccess] = useState(null);
  const closeModal = () => setCallReport(false);
  const { t } = useTranslation();

  const ModalWrapper = styled(Modal)`
    width: 60rem !important;
    height: 318px !important;
    .ant-modal-title {
      font-family: ${typography.font.family.display};
      font-style: normal;
      font-weight: bold;
      font-size: ${typography.size.large};
      line-height: 115%;
      color: ${colors.darkerGray};
      text-align: center;
    }
    .ant-modal-content {
      max-width: 60rem;
      border-radius: 1rem;
    }

    .ant-modal-header {
      border-radius: 1rem;
    }

    .ant-modal-body {
      padding: 1.5rem;
    }
  `;

  return (
    <div className="create-report">
      {reportSuccess === null &&<ModalWrapper
        footer={null}
        title={t("moderation.reportPost")}
        visible={callReport}
        destroyOnClose={true}
        onCancel={closeModal}
      >
        <Body
          onSuccess={setReportSuccess}
          closeModal={closeModal}
          postId={postId}
        />
      </ModalWrapper>}
      {reportSuccess !== null && (
        <FeedBackModal
          postId={postId}
          reportSuccess={reportSuccess}
          setCallReport={setCallReport}
          fromPage={fromPage}
        />
      )}
    </div>
  );
};

export default CreateReport;
