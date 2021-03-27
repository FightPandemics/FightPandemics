import React, { useState } from "react";
import { Modal } from "antd";
import LinkButtonNarrow from "components/Button/LinkButtonNarrow";
import styled from "styled-components";
import { mq, theme } from "constants/theme";
import { Column } from "react-virtualized";
import PositionSubmitModal from "components/Positions/PositionSubmitModal";
import PositionsButton from "components/Positions/PositionsButton"
import applicationConfirmation from "assets/icons/application-received.svg";
import { useTranslation } from "react-i18next";
const { colors, typography } = theme;
const { display, body } = theme.typography.font.family;

const StyledContainer = styled.section`
  padding: 0;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  align-items: stretch;

  h2 {
    font-family: ${display};
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2rem;
    text-align: center !important;
    margin-bottom: 3.1rem;
    color: ${colors.black};
    
    
    :after {
      content: "";
      border-bottom: .1rem solid ${colors.lightGray};
      display: block;
      width: 100%;
      margin: 1.1rem auto;
      position: absolute;
      left: 0;
    }
    
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
    margin-top: -.4rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    color: ${colors.black};
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) { 
    h2 {
      text-align: left !important;
      :after {
        border-bottom: none;
      }
    }  

    p {
      margin-top: -1.4rem;
    }
    
  }
`;

const StyledCancelButton = styled.button`
  font-family: 'Poppins';
  font-size: 1.6rem;
  font-weight: 600;
  padding: 0;
  letter-spacing: .035rem;
  border: none;
  background: none;
  button:focus { outline: none; };
  cursor: pointer;
  bottom: 1rem;
  right: 10rem;
  color: ${colors.royalBlue};
`;

const StyledExitButton = styled.button`
  font-family: 'Poppins';
  font-size: 1.6rem;
  letter-spacing: .035rem;
  padding: 0;
  border: none;
  background: none;
  button:focus { outline: none; };
  cursor: pointer;
  bottom: 1rem;
  right: 2rem;
  color: ${colors.royalBlue};
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
  color: ${colors.royalBlue};
`;

const CancelModal = styled(Modal)`
  margin-bottom: 20rem;
  
  .ant-modal-body {
    padding: 1.8rem;
  }

  .ant-modal-content {
    display: flex;
    align-items: center;
    margin: auto;
    border-radius: 1rem;
    justify-self: center;
    height: 15.6rem;
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) { 
    .ant-modal-content {
      width: 28.2rem;
      height: 19.2rem;
      
    }
    .ant-modal-body {
    padding: 1.7rem;
  }
  }

`;

const ButtonsContainer = styled.div`
display: flex;
justify-content: flex-end;
gap: 1.8rem;
`;

const ExitModal = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <CancelModal
        visible={props.visible}
        width={564}
        footer={null}
        centered={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
      >
        <StyledContainer>
          <h2>{t('positions.cancelModalTitle')}</h2>
          <p>{t('positions.cancelModalDescription')}</p>
          <ButtonsContainer>
            <StyledExitButton
              onClick={props.handleExit}
            >
              {t('positions.cancelModalExit')}

            </StyledExitButton>
            <StyledCancelButton onClick={props.handleCancel}>
              {t('positions.cancelModal')}
            </StyledCancelButton>

          </ButtonsContainer>
        </StyledContainer>
      </CancelModal>
    </>
  )
}

export default ExitModal;