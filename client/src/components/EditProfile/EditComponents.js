import styled from "styled-components";
import Heading from "../Typography/Heading";
import { Form } from "antd";
import { mq, theme } from "../../constants/theme";
import SubmitButton from "../Button/SubmitButton";
const { colors } = theme;

export const Background = styled.div`
  width: 95%;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    padding: 3rem 0;
    /* background-color: ${colors.lighterGray}; */
    @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
      margin: auto;
      padding: 0 5%;
      margin: 0 -2.5rem;
    }
  }
`;

export const EditLayout = styled.div`
  flex-direction: row;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    margin: auto;
    padding: 0 5%;
  }
`;

export const TitlePictureWrapper = styled.div`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    flex-direction: row;
  }
`;

export const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    border: 0.1rem solid ${colors.lightGray};
    padding: 3rem 4rem;
    background-color: ${colors.white};
  }
  @media screen and (min-width: ${mq.desktop.small.minWidth}) {
    border: 0.1rem solid ${colors.lightGray};
    padding: 3rem 4rem;
    min-width: 62rem;
    background-color: ${colors.white};
  }
`;

export const CustomLink = styled.div`
  color: ${colors.black};
  border: 0.1rem solid ${colors.lightGray};
  border-radius: 0.3rem;
  padding: 2rem 3rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  white-space: nowrap;
  font-weight: bold;
  border-left-style: ${(props) => (props.isSelected ? "solid" : "")};
  border-left-color: ${(props) => (props.isSelected ? colors.royalBlue : "")};
  border-left-width: ${(props) => (props.isSelected ? "0.6rem" : "")};
  a[href] {
    color: ${colors.black};
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
  color: ${colors.royalBlue};
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
    width: 100%;
  }
`;

export const FillEmptySpace = styled.div`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    flex: 1;
  }
`;

export const Label = styled.label`
  color: ${(props) => props.inputColor || colors.royalBlue};
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

export const MobilePicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.3rem;
  width: 30%;
  margin: 0 auto;
  margin-top: 3rem;
  img {
    align-self: center;
  }
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: none;
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

export const ProfileImage = styled.img`
  width: 70%;
  align-self: end;
`;

export const Eclipse = styled.div`
  width: 7rem;
  height: 6.5rem;
  background-color: ${theme.colors.selago};
  position: relative;
  border: 2px solid ${theme.colors.royalBlue};
  border-radius: 100%;
  align-self: center;
`;

export const PlusIcon = styled.img`
  width: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;
export const CustomContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    border: 0.1rem solid ${colors.lightGray};
    padding: 3rem 4rem;
    background-color: ${colors.white};
  }
  @media screen and (min-width: ${mq.desktop.small.minWidth}) {
    border: 0.1rem solid ${colors.lightGray};
    padding: 3rem 4rem;
    min-width: 62rem;
    background-color: ${colors.white};
  }
`;

export const StyledForm = styled(Form)`
.ant-form-item-required {
  color: ${colors.royalBlue};
  font-size: 1.6rem;
  font-weight: 500;
}
`
