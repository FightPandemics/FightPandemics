import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { postsActions } from "reducers/posts";
import { theme } from "constants/theme";
import { Footer, Submit } from "components/CreateReport/Body";
const { colors, typography } = theme;

const FeedBackModal = ({
  setCallReport,
  isComment,
  reportSuccess,
  postId,
  fromPage,
}) => {
  const [showModal, setShowModal] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const closeModal = () => {
    setShowModal(false);
    setCallReport(false);
    if (fromPage) return (window.location = "/feed");
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
  return (
    <div className="create-report">
      <ModalWrapper
        footer={null}
        title={
          reportSuccess
            ? t("moderation.reportPostSuccessTitle")
            : t("moderation.reportPostErrorTitle")
        }
        visible={showModal}
        destroyOnClose={true}
        onCancel={closeModal}
      >
        <Body>
          {reportSuccess ? (
            <>{t("moderation.reportPostSuccess")}</>
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

export default FeedBackModal;
