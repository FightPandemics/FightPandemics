import styled from "styled-components";
import Heading from "../Typography/Heading";
import { mq } from "../../constants/theme";
import SubmitButton from "../Button/SubmitButton";
import {
  ROYAL_BLUE,
  LIGHTER_GRAY,
  LIGHT_GRAY,
  BLACK,
  WHITE,
} from "../../constants/colors";

export const EditLayout = styled.div`
  flex-direction: row;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    padding: 3rem 15%;
    margin: 0 -25px;
    background-color: ${LIGHTER_GRAY};
  }
`;

export const TitlePictureWrapper = styled.div`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    flex-direction: row;
  }
`;

export const CustomLink = styled.div`
  color: ${BLACK};
  border: 0.1rem solid ${LIGHT_GRAY};
  border-radius: 0.3rem;
  padding: 2rem 3rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  white-space: nowrap;
  font-weight: bold;
  border-left-style: ${(props) => (props.isSelected ? "solid" : "")};
  border-left-color: ${(props) => (props.isSelected ? ROYAL_BLUE : "")};
  border-left-width: ${(props) => (props.isSelected ? "0.6rem" : "")};
  a[href] {
    color: ${BLACK};
  }
`;

export const CustomForm = styled.form`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    width: 100%;
    border: 0.1rem solid ${LIGHT_GRAY};
    padding: 3rem 4rem;
    background-color: ${WHITE};
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
  color: ${ROYAL_BLUE};
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
  margin: 2rem;
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

export const Label = styled.label`
  color: ${(props) => props.inputColor || ROYAL_BLUE};
  padding-left: ${(props) => props.paddingLeft || ""};
  margin-top: ${(props) => props.marginTop || "1.5rem"};
  font-size: ${(props) => props.size || ""};
  font-weight: ${(props) => props.weight || ""};
  white-space: nowrap;
`;

export const ProfilePicWrapper = styled.div`
  display: none;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    flex-direction: column;
    margin-top: 1.3rem;
  }
`;

export const HelpWrapper = styled.div`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    justify-content: space-between;
  }
`;

export const CheckBoxWrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
`;
export const CustomEditAccountHeader = styled.h4`
  display: none;
  margin-top: 1.7rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: initial;
    font-size: 3.5rem;
    font-weight: bold;
  }
`;
export const ToggleHeading = styled.div`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
  }
`;

const LocationIconWrapper = styled.div``;
