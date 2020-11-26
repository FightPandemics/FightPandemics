import React, { useState } from "react";
import Body from "./Body";
import styled from "styled-components";
import { Modal } from "antd";
import { theme, mq } from "constants/theme";
import FeedBackModal from "./FeedBackModal";

const { colors, typography } = theme;

const CreateReport = ({ postId, setCallReport }) => {
  const [showModal, setShowModal] = useState(true);
  const [reportSuccess, setReportSuccess] = useState(null);
  const closeModal = () => setShowModal(false);

  const ModalWrapper = styled(Modal)`
    width: 564px !important;
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

  return (
    <div className="create-report">
      <ModalWrapper
        footer={null}
        title={"Report Post"}
        visible={showModal}
        destroyOnClose={true}
        onCancel={closeModal}
      >
        <Body
          onSuccess={setReportSuccess}
          closeModal={closeModal}
          postId={postId}
        />
      </ModalWrapper>
      {!showModal && reportSuccess !== null && (
        <FeedBackModal
          reportSuccess={reportSuccess}
          setCallReport={setCallReport}
        />
      )}
    </div>
  );
};

export default CreateReport;
