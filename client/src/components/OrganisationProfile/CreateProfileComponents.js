import styled from "styled-components";
import { theme, mq } from "constants/theme";

export const Main = styled.div`
  display: flex;
  background-color: ${theme.colors.offWhite};
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block;
    padding: 0 2rem;
  }
`;

export const SvgContainer = styled.div`
  flex-basis: 40%;
  background-color: ${theme.colors.selago};
  display: block;
  padding: 4rem;
  padding-top: 30vh;
  img {
    width: 90%;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

export const FormContainer = styled.div`
  padding-top: 10vh;
  padding-left: 20rem;
  padding-right: 20rem;
  flex: 1;
  min-height: 100vh;
  @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
    padding-left: 5rem;
    padding-right: 5rem;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const ServicesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  @media screen and (max-width: ${mq.tablet.wide.minWidth}) {
    flex-direction: column;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

export const CheckboxContainer = styled.div`
  --xsmall: ${theme.typography.size.xsmall};

  display: flex;
  align-items: "flex-start";
  margin: 1.5rem 0;
  .ant-checkbox-wrapper {
    margin-right: ${theme.typography.size.large};
  }
  span {
    color: ${theme.colors.darkGray};
    font-size: var(--xsmall);
    font-family: ${(props) => props.font};
  }
`;

export const InputGroup = styled.div`
  --py: ${theme.typography.size.xxsmall};
  --my: ${theme.typography.size.xxxlarge};

  margin: var(--my) 0 var(--my) 0;

  .underline {
    color: ${theme.colors.green};
    font-size: ${theme.typography.size.xsmall};
    font-family: ${theme.typography.font.family.body};
    margin-top: ${theme.typography.size.xsmall};
  }
`;

export const styleLabel = {
  textAlign: "left",
  color: "#425af2",
};

export const styleInput = {
  width: "100%",
  height: "3rem",
  backgroundColor: "transparent",
};

export const buttons = {
  display: "flex",
  margin: "1rem 0",
};

export const globalText = {
  marginLeft: "1rem",
  fontSize: "1.2rem",
};

export const errorStyles = {
  color: "#FF5656",
  fontSize: "1.2rem",
  alignSelf: "",
};
