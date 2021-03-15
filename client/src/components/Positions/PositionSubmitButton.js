import React, { useState } from "react";
import { Modal } from "antd";
import LinkButtonNarrow from "components/Button/LinkButtonNarrow";
import styled from "styled-components";
import { mq, theme } from "constants/theme";
import { Column } from "react-virtualized";
import PositionSubmitModal from "components/Positions/PositionSubmitModal";
import PositionsButton from "components/Positions/PositionsButton"
import applicationConfirmation from "assets/icons/application-received.svg";
const { colors, typography } = theme;
const { display, body } = theme.typography.font.family;

const StyledContainer = styled.section`
  padding: 0;
  display: flex;
  flex-direction: column;
  text-align: left;
  

  h2 {
    font-family: ${display};
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2rem;
    text-align: left !important;
    margin-bottom: 2.7rem;
    color: ${colors.black};
    
  }
  p {
    width: 100%;
    font-family: ${body};
    font-size: 1.4rem;
    font-weight: light;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.8rem;
    letter-spacing: normal;
    margin: 0 auto;
    margin-top: -1.4rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    color: ${colors.darkGray};
  }
  
`;

const StyledCancelButton = styled.button`
  font-family: 'Poppins';
  font-size: 1.6rem;
  padding: 0;
  letter-spacing: .035rem;
  /* position:absolute; */
  border: none;
  background: none;
  button:focus { outline: none; };
  cursor: pointer;
  bottom: 1rem;
  right: 10rem;
  color: Blue;
`;

const StyledSubmitButton = styled.button`
  font-family: 'Poppins';
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: .035rem;
  padding: 0;
  /* position:absolute; */
  border: none;
  background: none;
  button:focus { outline: none; };
  cursor: pointer;
  bottom: 1rem;
  right: 2rem;
  color: Blue;
  justify-self: flex-start;
`;

const ConfirmationButton = styled.button`
  font-size: 1.6rem;
  padding: 0;
  position:absolute;
  border: none;
  background: none;
  button:focus { outline: none; };
  cursor: pointer;
  bottom: 1rem;
  right: 5rem;
  color: Blue;
`;

const ApplyModal = styled(Modal)`
  margin-bottom: 20rem;
  border-radius: 10rem !important;
`;

const ButtonsContainer = styled.div`
display: flex;
justify-content: flex-end;
gap: 1.8rem;
`;

const PositionSubmitButton = ({ getGTM, t, props }) => {

  // 't' comes from 'AboutUs' scope for translation
  const [visible, setVisible] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);

  const handleCancel = async (e) => {
    setVisible(false);
  };

  const showPopUp = async (e) => {

    setVisible(true);
  };

  const handleClick = (e) => {
    console.log("submit")
  };
  const handleCancelTwo = async (e) => {

    setVisibleTwo(false);
  };

  const showPopUpTwo = async (e) => {
    handleCancel()
    setVisibleTwo(true);
  };
  return (
    <>
      <LinkButtonNarrow
        id={getGTM("Submit1")}
        type="primary"
        shape="round"
        onClick={showPopUp}
      >
        {t("positions.submitButton")}
      </LinkButtonNarrow>
      <ApplyModal
        style={{ border: "3rem" }}
        //set to true for testing, normally handled by {visible}
        visible={visible}
        width={564}
        footer={null}
        centered={true}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
      >
        <StyledContainer>
          <h2>{t("positions.submitApplication")}</h2>
          <p>Once confirmed, this action cannot be undone. Your application will be forwarded to the organization.</p>
          <ButtonsContainer>
            <StyledCancelButton onClick={handleCancel}>
              {t("positions.cancelModal")}
            </StyledCancelButton>
            <StyledSubmitButton onClick={showPopUpTwo}>
              {t("positions.submitModal")}
            </StyledSubmitButton>
          </ButtonsContainer>
        </StyledContainer>
      </ApplyModal>
      {/* <LinkButton
        id={getGTM("getInvolved")}
        type="primary"
        shape="round"
        onClick={showPopUpTwo}
      >
        {"Application Submitted"}
      </LinkButton> */}
      {/* <Modal
        style={{ border: "3rem" }}
        visible={visibletwo}
        width={564}
        footer={null}
        centered={true}
        onCancel={handleCancelTwo}
      >
        <StyledContainer>
          <h2>Application Submitted</h2>
          <br></br>
          <p>Thank you for your interest in orgName. We have received your application and we’ll be in touch with you as soon as possible.</p>
          <LinkButton>Okay</LinkButton>
        </StyledContainer>
      </Modal> */}

      {/* Seperate Modal Component */}


      <ApplyModal
        style={{ border: "3rem" }}
        // visibility set to true for testing, logic to be based on previous submit button on modal
        visible={visibleTwo}
        // width={"3rem"}
        footer={null}
        centered={true}
        onCancel={handleCancelTwo}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
      >
        <PositionSubmitModal>
          <img src={applicationConfirmation} alt="" />
          <h2>{t("positions.applicationSubmitted")}</h2>
          <p>{t("positions.applicationReceived")}</p>
          <PositionsButton>{t("positions.okay")}</PositionsButton>
        </PositionSubmitModal>
      </ApplyModal>
    </>
  );
};

export default PositionSubmitButton;
