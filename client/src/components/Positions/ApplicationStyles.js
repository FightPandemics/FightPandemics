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
  margin: 0;
  margin-top: 2rem;
  overflow: hidden;
  box-shadow: none;
  color: ${colors.darkishGray};
  flex-grow: 2;
  font-family: "Work Sans";
  background-color: transparent;
  font-size: 1.4rem;
  line-height: 1.8rem;
  font-weight: 400;
  width: 100%;
  flex-basis: 40rem;
  overflow-wrap: break-word;

  &.ant-input[disabled] {
    cursor: default;
    /* color: magenta; */
    font-size: 1.4rem;
    resize: none;
    border: none;
    border-radius: none;
    padding: 0;
    margin: 0;
    margin-top: 2.1rem;
    margin-bottom: 2.8rem;
    /* margin-top: 2rem; */
    overflow: hidden;
    box-shadow: none;
    color: ${colors.darkishGray};
    flex-grow: 2;
    font-family: "Work Sans";
    background-color: transparent;
    font-size: 1.4rem;
    line-height: 1.8rem;
    font-weight: 400;
    width: 100%;
    flex-basis: 40rem;
    overflow-wrap: break-word;
    align-self: center;
  }
  &.ant-input {
    min-height: 0 !important;
    max-height: 1.8rem !important;
  }

  &.ant-input:focus,
  &.ant-input-focused {
    box-shadow: unset;
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    font-size: 1.2rem;
    margin: 0;
    min-height: 1.2rem !important;
    max-height: 10rem !important;

    /* padding-right: 3rem !important;
    padding-bottom: .7rem; */

    &.ant-input {
      min-height: 1.2rem !important;
      max-height: 10rem !important;
    }
  }
`;

export const ResponseField = styled.p`
  font-size: 1.8rem;
  margin-top: 2.1rem;
  margin-bottom: 3rem;
  padding-bottom: 2.8rem;
  border-bottom: solid 1px ${colors.royalBlue};
  width: 100%;
  line-height: normal;
  /* color: ${colors.darkishGray} !important; */
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    font-size: 1.2rem;
    color: ${colors.darkishGray} !important;
    padding-bottom: 0.5rem;
    margin-bottom: 2.2rem;
    margin-top: 1rem;
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

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    .hide-mobile {
      display: none;

      &.review {
        margin-top: 0;
      }
    }
  }
`;

export const InputWrapper = styled.div`
  align-items: center;
  border-bottom: 1px solid ${colors.royalBlue};
  display: flex;
  flex-direction: column;
  max-height: 7rem;
  margin: 0;

  &.application-input {
    margin-bottom: 10rem;
  }

  &.has-error {
    border-bottom: 1px solid ${colors.red};
    color: ${colors.red};
  }

  &.review {
    border: none;
    margin-bottom: 0;
    max-height: 100%;
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin: 0.4rem 0;
    flex-direction: column;
    max-height: 3.2rem;

    &.review {
      max-height: 100%;
      height: auto;
      margin: 0 0;
    }

    &.text-present {
      transition: max-height 1s ease;
      max-height: 6rem;
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
  line-height: 1.8rem;
  text-align: right;
  margin: auto;
  margin-right: 2rem;
  margin-bottom: 1rem;
  justify-self: flex-end !important;

  &.has-error {
    color: ${colors.red} !important;
  }
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    font-size: 0.8rem !important;
    max-width: 100%;
    width: 100%;
    margin-bottom: 0 !important;
  }
`;

export const ErrorMsg = styled.p`
  color: ${colors.red} !important;
  font-family: "Poppins";
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

// export const QuestionAnswer = styled()
