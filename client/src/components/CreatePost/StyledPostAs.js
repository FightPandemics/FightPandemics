import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Modal, Button as AntDButton } from "antd";
import BaseButton from "components/Button/BaseButton";
import { theme, mq } from "constants/theme";
import SvgIcon from "components/Icon/SvgIcon";

const { colors, typography } = theme;

const Container = styled(Modal)`
  font-family: ${typography.font.family.display};
  font-size: ${typography.size.medium};
  font-weight: 600;
  line-height: 2.2rem;
  width: 52rem !important;

  .ant-modal-content {
    width: 100%;
    max-width: 56.4rem;
    max-height: 55.4rem;
    border-radius: 1rem;
  }

  .ant-modal-header {
    height: 5.8rem;
    border-radius: 1rem 1rem 0 0;
    background-color: ${(props) =>
      props.currentStep === 4 ? colors.green : colors.white};

    .ant-modal-title {
      font-size: ${typography.size.xlarge};
      font-weight: bold;
      line-height: 116.8%;
    }
  }

  .ant-modal-body {
    display: flex;
    max-height: 49.6rem;
    overflow-y: auto;
    padding: 3.8rem 4rem 4.7rem 4rem;
    min-height: 25.7rem;
    flex-direction: column;
    justify-content: center;
    ${(props) =>
      props.currentStep === 2 || props.currentStep === 4
        ? "align-items: center"
        : ""};
  }

  .ant-col {
    flex: 0 0 90%;
    max-width: 100%;
    margin: 2rem 0;

    img {
      display: none;
    }

    &:hover > div {
      background-color: ${colors.royalBlue};
      p {
        color: ${colors.white};
      }

      img {
        filter: brightness(4);
      }
    }
    p {
      color: ${colors.royalBlue};
    }

    @media screen and (min-width: ${mq.phone.wide.minWidth}) {
      flex: 0 0 50%;
      img {
        display: block;
      }
    }
  }
`;

const TitleStep = styled.p`
  font-family: ${typography.font.family.display};
  font-size: ${(props) => props.fontSize || typography.size.medium};
  font-weight: bold;
  line-height: 116.8%;
  position: absolute;
  top: 1.7rem;
  left: 50%;
  transform: translate(-50%, 0);
  color: ${(props) => (props.currentStep === 4 ? colors.white : colors.black)};
  background-color: ${(props) =>
    props.currentStep === 4 ? colors.green : colors.white};
`;

const BackButton = styled(SvgIcon)`
  position: absolute;
  top: 1.7rem;
  left: 4rem;
  cursor: pointer;
`;

const OptionButton = styled(AntDButton)`
  &.ant-btn {
    color: ${colors.royalBlue};
    width: 100%;
    min-width: 17rem;
    max-width: 26.4rem;
    height: 4.5rem;
    border: 0.1rem solid ${colors.royalBlue};
    border-radius: 0.8rem;
    margin-bottom: 1.5rem;
    text-align: left;
    padding-left: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.ant-btn:hover {
    color: ${colors.white};
    border: none;
    background-color: ${colors.royalBlue};
  }
`;

const CreateOrgLink = styled(Link)`
  display: block;
  color: ${colors.royalBlue};
  &:hover {
    color: ${colors.royalBlue};
  }
`;

const ViewPostButton = styled(BaseButton)`
  width: 30rem;
  font-size: 1.3rem;
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 0.2rem solid ${colors.royalBlue};
  border-radius: 0.8rem;
  cursor: pointer;
  font-size: 1.4rem;

  p {
    margin-top: 1.4rem;
    pointer-events: none;
  }

  @media screen and (min-width: ${mq.phone.wide.minWidth}) {
    height: 17.2rem;
    margin-top: 0.5rem;
  }
`;

const StyledSvgIcon = styled(SvgIcon)`
  margin-bottom: 1.5rem;
  width: 4rem;
  height: auto;
  pointer-events: none;
`;

const Option = ({ img, text, onClick, type, gtmTag }) => (
  <OptionWrapper
    id={gtmTag}
    onClick={() => onClick(text)}
    style={{
      backgroundColor: type === text.toLowerCase() && `${colors.lightGray}`,
    }}
  >
    <StyledSvgIcon src={img} />
    <p>{text}</p>
  </OptionWrapper>
);

export {
  Container,
  Option,
  CreateOrgLink,
  TitleStep,
  OptionButton,
  BackButton,
  ViewPostButton,
};
