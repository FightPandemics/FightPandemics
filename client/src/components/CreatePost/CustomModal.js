import React from "react";
import { Modal } from "antd-mobile";
import styled from "styled-components";
import SubmitButton from "../Button/SubmitButton";
import SearchInput from "../Input/SearchInput";

import { theme } from "constants/theme.js";
const { xxlarge } = theme.typography.size;
const { display } = theme.typography.font.family;

const StyledModal = styled(Modal)`
  font-family: ${display};
  .am-modal-content {
    border-radius: 0;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  .am-modal-header {
    padding: 0;
    padding-left: 2rem;
    margin-bottom: 2rem;
    margin-top: 4rem;
    .am-modal-title {
      font-size: ${xxlarge};
      font-weight: bold;
      text-align: left;
      margin-right: 5rem;
    }
  }
  .am-modal-content {
    padding-bottom: 4rem;
  }

  }
`;

const buttonStyles = {
  backgroundColor: "#F3F4FE",
  color: "#425AF2",
  fontWeight: "500",
};

const CustomModal = ({
  title,
  content,
  onClose,
  visible,
  closable,
  closeButtonName,
  selectCloseButton,
  closeButton,
  onSearch,
  searchBar,
}) => {
  return (
    <StyledModal
      popup
      title={title}
      onClose={onClose}
      visible={visible}
      closable={closable}
      maskClosable={true}
      transparent
      animationType="slide-up"
    >
      {searchBar ? <SearchInput onChange={onSearch} /> : null}
      {content}
      {closeButton ? (
        <SubmitButton style={buttonStyles} onClick={selectCloseButton}>
          {closeButtonName}
        </SubmitButton>
      ) : null}
    </StyledModal>
  );
};

export default CustomModal;
