import React, { useState } from "react";
import { Modal } from "antd";
import LinkButton from "./LinkButton";
import styled from "styled-components";
import { mq, theme } from "constants/theme";
const { lighterBlack } = theme.colors;
const { display, body } = theme.typography.font.family;

const StyledContainer = styled.section`
  padding-bottom: 2.5rem;
  padding-top: 2.5rem;
  h4 {
    font-family: ${display};
    font-size: 2.4rem;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    color: ${lighterBlack};
  }
  p {
    width: 25rem;
    font-family: ${body};
    font-size: 2rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    margin: 0 auto;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    color: ${lighterBlack};
  }
`;

const GetInvolvedButton = () => {
  const [visible, setVisible] = useState(false);

  const handleCancel = async e => {
    setVisible(false);
  };

  const showPopUp = async e => {
    setVisible(true);
  };

  return (
    <>
      <LinkButton type="primary" shape="round" onClick={showPopUp}>
        Get Involved
      </LinkButton>
      <Modal
        visible={visible}
        width={564}
        footer={null}
        centered={true}
        onCancel={handleCancel}
      >
        <StyledContainer>
          <h4>Get Involved</h4>
          <LinkButton
            type="primary"
            shape="round"
            style={{ "margin-top": "4rem" }}
            href="https://apply.workable.com/fightpandemics"
            target="_blank"
          >
            Join as Volunteer
          </LinkButton>
          <LinkButton
            type="primary"
            shape="round"
            style={{ "margin-top": "4rem" }}
            href="https://apply.workable.com/fightpandemics/j/46D6EF3B44/"
            target="_blank"
          >
            Join as Ambassador
          </LinkButton>
          <h4 style={{ "margin-top": "6rem" }}>Student Summer Program</h4>
          <p>For Students ages 14-18.</p>
          <LinkButton
            type="primary"
            shape="round"
            style={{ "margin-top": "4rem" }}
            href="https://apply.workable.com/fightpandemics/j/58B157AAB2/"
            target="_blank"
          >
            Join Student Program
          </LinkButton>
        </StyledContainer>
      </Modal>
    </>
  );
};

export default GetInvolvedButton;
