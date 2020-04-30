import styled from "styled-components";
import { Modal } from "antd-mobile";
import { theme } from "../../constants/theme";

const { royalBlue } = theme.colors;

const ButtonModal = styled(Modal)`
  font-family: ${theme.typography.font.family.display};
  .title {
    font-weight: bold;
    margin-top: 0.5rem;
    margin-bottom: 2.5rem;
  }

  button {
    display: block;
    width: 100%;
    display: block;
    text-align: left;
    padding: 1rem 0;
    padding-left: 3rem;
    border-radius: 1rem;
    margin-bottom: 1.5rem;
    border: 0.1rem solid ${royalBlue};

    a {
      color: unset;
    }
  }

  .primary {
    background-color: ${royalBlue};
    color: #fff;

    &:hover,
    &:active,
    &:focus {
      background-color: #fff;
      color: black;
    }
  }

  .outline {
    background-color: #fff;
    color: black;
    &:hover,
    &:active,
    &:focus {
      background-color: ${royalBlue};
      color: #fff;
    }
  }
`;

export default ButtonModal;
