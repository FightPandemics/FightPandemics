import React, { useState } from "react";
import Body from "./Body";
import styled from "styled-components";
import { Modal } from "antd";
import { theme } from "constants/theme";
import ReportFinished from "./ReportFinished";
import { useTranslation } from "react-i18next";

const { colors, typography } = theme;

const CreateReport = ({
  postId,
  currentPost,
  setCallReport,
  callReport,
  fromPage,
  forModerator,
  changeType,
}) => {
  let post;
  if (currentPost) {
    post = currentPost;
  }

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
  const reportTitle = forModerator?.remove
    ? t("moderation.removePostTitle")
    : forModerator?.keep
    ? t("moderation.keepPostTitle")
    : t("moderation.reportPost");

  return (
    <div className="create-report">
      {reportSuccess === null && (
        <ModalWrapper
          footer={null}
          title={reportTitle}
          visible={callReport}
          destroyOnClose={true}
          onCancel={closeModal}
        >
          <Body
            onSuccess={setReportSuccess}
            closeModal={closeModal}
            postId={postId}
            postReportedBy={post?.reportedBy}
            forModerator={forModerator}
          />
        </ModalWrapper>
      )}
      {reportSuccess !== null && (
        <ReportFinished
          postId={postId}
          reportSuccess={reportSuccess}
          setCallReport={setCallReport}
          fromPage={fromPage}
          forModerator={forModerator}
          changeType={changeType}
        />
      )}
    </div>
  );
};

export default CreateReport;
