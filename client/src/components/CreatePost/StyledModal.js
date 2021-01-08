import styled from "styled-components";
import { Modal } from "antd";
import { theme, mq } from "constants/theme";
import BaseSelector from "components/Selector/Selector";
import SubmitButton from "components/Button/SubmitButton";
const { colors, typography } = theme;

export const Divider = styled.span`
  position: absolute;
  width: 100%;
  background-color: ${colors.lightGray};
  height: 0.1rem;
  top: 5.5rem;
  left: 0;
`;

export const Section = styled.section`
  display: block;
  width: 100%;
  margin-bottom: 3rem;

  .ant-input {
    border-color: ${colors.lightGray};
    color: ${colors.darkGray};
    box-shadow: none;
    font-family: ${typography.font.family.display};
    font-size: ${typography.size.xsmall};
    font-weight: 600;
  }

  textarea.ant-input {
    font-family: ${typography.font.family.body};
    font-weight: normal;
  }

  .ant-input::placeholder {
    color: ${colors.darkGray};
  }

  .visibility-post--selector {
    margin-right: -0.5rem;
    margin-left: -0.5rem;

    .ant-select > span:first-child {
      display: none !important;
    }
  }

  @media screen and (min-width: ${mq.phone.wide.minWidth}) {
    .visibility-post {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .visibility-post--info {
      margin-bottom: 0;
    }
    .visibility-post--selector {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
`;

export const HeadWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1.2rem;
`;

export const Badge = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 0.8rem;
  background-color: ${colors.royalBlue};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;

  span {
    font-family: ${typography.font.family.body};
    font-size: ${typography.size.xxsmall};
    line-height: 2.2rem;
    color: ${colors.white};
  }
`;

export const Title = styled.span`
  font-family: ${typography.font.family.display};
  font-style: normal;
  font-weight: normal;
  font-size: ${typography.size.xsmall};
  line-height: 140%;
  color: ${colors.darkerGray};
`;

export const ModalWrapper = styled(Modal)`
  width: 52rem !important;

  .ant-modal-content {
    max-width: 56.4rem;
    border-radius: 1rem;
  }

  .ant-modal-header {
    border-radius: 1rem 1rem 0 0;
  }

  .ant-modal-body {
    padding: 2.2rem 3.3rem;
  }

  .ant-col > div > p {
    position: absolute;
    top: 9.7rem;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .ant-col:hover > div {
    background-color: ${colors.royalBlue};
    color: ${colors.white};

    .icon {
      filter: brightness(4);
    }
  }

  .icon {
    position: absolute;
    top: 4.6rem;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .ant-tabs-nav {
    font-size: 1.4rem;

    .ant-tabs-tab {
      padding: 0 0 1.2rem 0;
      color: ${colors.darkerGray};
    }

    .ant-tabs-tab.ant-tabs-tab-active {
      color: ${colors.royalBlue};
    }

    .ant-tabs-ink-bar {
      width: 11.4rem;
      height: 0.3rem;
      background-color: ${colors.royalBlue};
    }

    .ant-tabs-bar {
      position: relative;
      border-bottom: none;
    }

    .ant-tabs-tabpane {
      margin-top: 2rem;
    }
  }
`;

export const SubTitle = styled.p`
  font-size: 1.1rem;
  line-height: 140%;
`;

export const Selector = styled(BaseSelector)``;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Submit = styled(SubmitButton)`
  width: 13.5rem;
  height: 4.3rem;
  align-self: flex-end;
  line-height: 4rem;

  span {
    font-family: ${typography.font.family.display};
    font-style: medium;
    font-size: ${typography.size.medium};
    line-height: 2rem;
  }
`;
