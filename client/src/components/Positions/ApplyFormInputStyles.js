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
    height: 5.6rem;
  }

  &.text-present {
    height: 10rem !important;
  }

`;

export const OuterWrapper = styled.div`
  margin: 1rem auto;
  position: relative;
  text-align: left;
  width: 100%;

  .has-error {
    color: red;
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
 
  &.has-error {
  color: ${colors.red} !important;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {

  }
}
`;

export const ErrorMsg = styled.p`
  color: ${colors.red} !important;
  font-family: 'Poppins';
  font-size: 1.4rem;
  /* display: none; */
  position: relative;
  top: 0;
  .has-error {
    color: red;
    display: block;
  }
`;
