import React, { useState } from "react";
import axios from "axios";
import Form from "./Form";
import SubTitle from "./SubTitle";
import Options from "./Options";

import SubmitButton from "components/Button/SubmitButton";
import styled from "styled-components";
import BaseButton from "components/Button/BaseButton";
import { theme, mq } from "constants/theme";

const { colors, typography } = theme;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const CancelButton = styled(BaseButton).attrs(({ size, inline }) => {
  return { size, inline };
})`
  width: 8rem;
  height: 3.5rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  span {
    font-family: ${typography.font.family.display};
    font-style: normal;
    font-size: ${typography.size.small};
    line-height: 1.15rem;
    font-weight: 500;
    color: ${colors.royalBlue};
  }
  &:hover,
  &:active,
  &:focus {
    &.am-button {
      border: 1px solid blue;
    }
  }
`;

export const Submit = styled(SubmitButton)`
  width: 8rem;
  height: 3.5rem;
  align-self: flex-end;
  line-height: 1.15rem;
  padding: 14px 24px;

  span {
    font-family: ${typography.font.family.display};
    font-style: normal;
    font-size: ${typography.size.small};
    line-height: 1.15rem;
    font-weight: 500;
  }
`;
const Body = ({ closeModal, postId, onSuccess }) => {
  const [reasonData, setReasonData] = useState([]);
  const [description, setDescription] = useState("");

  const addOption = (option) => (e) => {
    const hasOption = reasonData.findIndex((reason) => reason === option);
    if (hasOption < 0) {
      setReasonData([...reasonData, option]);
    } else {
      const filteredData = reasonData.filter((reason) => reason !== option);
      setReasonData(filteredData);
    }
  };

  const addDescription = () => (e) => {
    setDescription(e.target.value);
  };

  const sendData = async (e) => {
    const reasonString = `${reasonData.join("|")}|${description}`;
    const formData = { reason: reasonString };
    e.preventDefault();
    try {
      const res = await axios.post(`/api/reports/posts/${postId}`, formData);
      onSuccess(true);
    } catch (error) {
      onSuccess(false);
    }
  };
  return (
    <>
      <SubTitle title={"Reason for reporting:"} />
      <Options handleOption={addOption} selectedOptions={reasonData} />

      {reasonData.includes("Other") ? (
        <>
          <SubTitle title={"Additional details (optional)"} />
          <Form onChangeDescription={addDescription} />
        </>
      ) : null}
      <Footer>
        <CancelButton onClick={closeModal}>Cancel</CancelButton>
        <Submit primary="true" onClick={sendData} disabled={!reasonData.length}>
          Report
        </Submit>
      </Footer>
    </>
  );
};
export default Body;
