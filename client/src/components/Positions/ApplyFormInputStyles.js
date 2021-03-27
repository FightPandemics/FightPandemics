import { Input } from "antd";
import { mq, theme } from "constants/theme";
import styled from "styled-components";

const { colors } = theme;
const { TextArea } = Input;

export const InputField = styled(TextArea)`
  font-size: 1.4rem;
  resize: none;
  border: none;
  border-radius: none;
  padding: 0;
  overflow: hidden;
  &.ant-input:focus,
  &.ant-input-focused {
    box-shadow: unset;
  }
  
  box-shadow: none;
  color: ${colors.darkishGray};
  flex-grow: 2;
  font-family: 'Work Sans';
  background-color: transparent;
  font-size: 1.4rem;
  line-height: 1.8rem;
  font-weight: 400;
  margin: 0;
  width: 100%;
  flex-basis: 40rem;
  overflow-wrap: break-word;
  

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    font-size: 1.2rem;
    min-height: 1.2rem !important;  
    padding-right: 3rem !important;
    padding-bottom: .7rem;
  }

  

`;

export const OuterWrapper = styled.div`
  margin: 1rem auto;
  position: relative;
  text-align: left;
  width: 100%;

  .has-error {
    color: ${colors.red};
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}){ 
    .hide-mobile{
    display: none;
  }
  }

  
`;

export const InputWrapper = styled.div`
  align-items: center;
  border-bottom: 1px solid ${colors.royalBlue};
  display: flex;
  margin: 0.4rem 0;

  &.has-error {
    border-bottom: 1px solid ${colors.red};
    color: ${colors.red};
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}){ 
    flex-direction: column;
    max-height: 3.2rem;
    
    &.text-present {
      transition: max-height 1s ease;
      max-height: 5rem;

  }
  }
  
`;

const Prefix = styled.span`
  padding-bottom: 0.5rem;
`;

export const CharCounter = styled.p`
  color: ${colors.darkishGray} !important;
  font-size: 1.2rem !important;
  font-weight: 500 !important;
  text-align: right;
  max-width: 40%;
  min-width: 25%;
  margin: 0;
  margin-right: 2rem;

  &.has-error {
  color: ${colors.red} !important;
  }
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      max-width: 100%;
      width: 100%;
  }

`;

export const ErrorMsg = styled.p`
  color: ${colors.red} !important;
  font-family: 'Poppins';
  font-size: 1.4rem;
  position: relative;
  top: 0;
  margin-bottom: 9rem;

  .has-error {
    color: ${colors.red};
    display: block;
  }
  
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin-bottom: 5rem;
  }
  
`;

