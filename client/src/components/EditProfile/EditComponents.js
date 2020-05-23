import styled from "styled-components";
import Heading from "../Typography/Heading";
import { mq } from "../../constants/theme";
import SubmitButton from "../Button/SubmitButton";
import {
  DARK_GRAY,
  ROYAL_BLUE,
  TROPICAL_BLUE,
  LIGHTER_GRAY,
  LIGHT_GRAY,
  DARKER_GRAY,
} from "../../constants/colors";

export const EditLayout = styled.div`
  flex-direction: row;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    padding: 0 15%;
    margin: 0 -25px;
    background-color: #f9f9f9;
  }
`;

export const TitlePictureWrapper = styled.div`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    flex-direction: row;
  }
`;

export const CustomLink = styled.div`
  color: #000000;
  border: 0.1rem solid ${LIGHT_GRAY};
  border-radius: 0.3rem;
  padding: 2rem 3rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  white-space: nowrap;
  font-weight: bold;
  border-left-style: ${(props) => (props.isSelected ? "solid" : "")};
  border-left-color: ${(props) => (props.isSelected ? "#425AF2" : "")};
  border-left-width: ${(props) => (props.isSelected ? "0.6rem" : "")};
  a[href] {
    color: #000000;
  }
`;

export const CustomForm = styled.form`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    width: 100%;
    border: 0.1rem solid ${LIGHT_GRAY};
    padding: 3rem 4rem;
    background-color: #ffffff;
  }
`;

export const CustomHeading = styled(Heading)`
  margin-bottom: 3rem;
  margin-top: 2rem;
  text-align: center;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    &.ant-typography {
      font-size: 3.5rem;
    }
  }
`;

export const ChangePicButton = styled.div`
  color: #425af2;
  margin-bottom: 3rem;
  text-align: center;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    text-align: right;
    font-weight: 600;
    margin-right: 0.7rem;
    font-size: 1.3rem;
  }
`;

export const CustomSubmitButton = styled(SubmitButton)`
  margin-top: 1 rem;
  margin-bottom: 3 rem;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    width: 30rem;
    align-self: center;
  }
`;

export const OptionDiv = styled.div`
  display: none;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    flex-direction: column;
  }
`;

export const FormLayout = styled.div`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    flex-direction: row;
    margin-bottom: 10rem;
  }
`;

export const FillEmptySpace = styled.div`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    flex: 1;
  }
`;
