import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

import { postsActions } from "reducers/posts";
import { theme, mq } from "constants/theme";
import { Footer, Submit } from "components/CreateReport/Body";
const { colors, typography } = theme;

const FeedBackModal = ({ setCallReport, isComment, reportSuccess, postId, fromPage }) => {
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();
  const closeModal = () => {
    setShowModal(false);
    setCallReport(false);
    if (fromPage) return window.location = "/feed";
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
      max-width: 564px;
      border-radius: 1rem;
    }

    .ant-modal-header {
      border-radius: 1rem;
    }

    .ant-modal-body {
      padding: 1.5rem;
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
        title={reportSuccess ? "Report Recieved" : "Oops!"}
        visible={showModal}
        destroyOnClose={true}
        onCancel={closeModal}
      >
        <Body>
          {reportSuccess ? (
            <>
              Thank you for your report! This {isComment ? "comment" : "post"}{" "}
              will be submitted for review and you will receive a notification
              when action is taken.
            </>
          ) : (
            <>Oops! something went wrong...</>
          )}
        </Body>
        <Footer>
          <Submit
            onClick={closeModal}
            primary="true"
          >
            Finish
          </Submit>
        </Footer>
      </ModalWrapper>
    </div>
  );
};

export default FeedBackModal;
