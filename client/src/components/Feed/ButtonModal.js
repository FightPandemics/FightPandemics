import styled from "styled-components";
import { Modal } from "antd-mobile";
import { theme } from "../../constants/theme";

export default styled(Modal)`
  font-family: "Poppins";
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
    border: 0.1rem solid ${theme.colors.royalBlue};

    a {
      color: unset;
    }
  }

  .primary {
    background-color: ${theme.colors.royalBlue};
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
      background-color: ${theme.colors.royalBlue};
      color: #fff;
    }
  }
`;
