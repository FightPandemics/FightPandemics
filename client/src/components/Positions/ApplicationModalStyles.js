import { Modal } from "antd";
import { mq, theme } from "constants/theme";
import styled from "styled-components";

const { colors } = theme;
const { display, body } = theme.typography.font.family;

export const StyledContainer = styled.section`
  padding: 0 !important;
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
    margin: 0 auto;
    margin-top: -1.4rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    color: ${colors.darkGray};
  }
  
`;

export const StyledCancelButton = styled.button`
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

export const StyledSubmitButton = styled.button`
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

export const ConfirmationButton = styled.button`
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

export const ApplyModal = styled(Modal)`
  margin-bottom: 20rem;
  margin: 0 !important;
  height: fit-content;
  
  .ant-modal-content {
    display: flex;
    align-items: center;
    border-radius: 1rem;
    max-height: 30.5rem;
   
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) { 
      max-height: 30.6rem;
      margin: 0 4rem;
    }
  }
`;

export const ButtonsContainer = styled.div`
display: flex;
justify-content: flex-end;
gap: 1.8rem;
`;