import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { postsActions } from "reducers/posts";
import { theme } from "constants/theme";
import { Footer, Submit } from "components/CreateReport/Body";
const { colors, typography } = theme;

const ReportFinished = ({
  setCallReport,
  isComment,
  reportSuccess,
  postId,
  fromPage,
  forModerator,
  changeType,
}) => {
  const [showModal, setShowModal] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const closeModal = () => {
    setShowModal(false);
    setCallReport(false);
    if (forModerator?.remove) return changeType("ACCEPTED");
    if (forModerator?.keep) return changeType("REJECTED");
    if (fromPage && !forModerator) return (window.location = "/feed");
    dispatch(postsActions.setReported({ postId }));
  };
  const ModalWrapper = styled(Modal)`
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
      p {
        font-size: ${typography.size.medium};
      }
    }
  `;

  const Body = styled.p`
    font-family: ${typography.font.family.body};
    font-style: normal;
    font-weight: normal;
    font-size: ${typography.size.xxsmall};
    display: flex;
    align-items: center;
  `;

  const modalTitle = forModerator?.remove
    ? t("moderation.reportAcceptedTitle")
    : forModerator?.keep
    ? t("moderation.reportRejectedTitle")
    : t("moderation.reportPostSuccessTitle");

  const modalBodyText = forModerator?.remove
    ? t("moderation.reportAcceptedBody")
    : forModerator?.keep
    ? t("moderation.reportRejectedBody")
    : t("moderation.reportPostSuccess");

  return (
    <div className="create-report">
      <ModalWrapper
        footer={null}
        title={
          reportSuccess ? modalTitle : t("moderation.reportPostErrorTitle")
        }
        visible={showModal}
        destroyOnClose={true}
        onCancel={closeModal}
      >
        <Body>
          {reportSuccess ? (
            <>{modalBodyText}</>
          ) : (
            <>{t("moderation.reportPostError")}</>
          )}
        </Body>
        <Footer>
          <Submit onClick={closeModal} primary="true">
            {t("moderation.finish")}
          </Submit>
        </Footer>
      </ModalWrapper>
    </div>
  );
};

export default ReportFinished;
