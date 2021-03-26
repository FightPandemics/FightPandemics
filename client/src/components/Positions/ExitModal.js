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

const StyledExitButton = styled.button`
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

const CancelModal = styled(Modal)`
  margin-bottom: 20rem;
  border-radius: 10rem !important;
`;

const ButtonsContainer = styled.div`
display: flex;
justify-content: flex-end;
gap: 1.8rem;
`;

const ExitModal = (props, handleBackRequest) => {
    const { t } = useTranslation();
    return (
        <>
            <CancelModal
                style={{ border: "3rem" }}
                //set to true for testing, normally handled by {visible}
                // visible={true}
                visible={props.visible}
                width={564}
                footer={null}
                centered={true}
                onCancel="{handleCancel}"
                cancelButtonProps={{ style: { display: 'none' } }}
                closable={false}
            >
                <StyledContainer>
                    <h2>Exit Application</h2>
                    <p>Once confirmed, this action cannot be undone and your progress will be lost.</p>
                    <ButtonsContainer>
                        <StyledExitButton
                            onClick={props.handleExit}
                        >
                            Exit
                        </StyledExitButton>
                        <StyledCancelButton onClick={props.handleCancel}>
                            Cancel
                        </StyledCancelButton>

                    </ButtonsContainer>
                </StyledContainer>
            </CancelModal>
        </>
    )
}

export default ExitModal;