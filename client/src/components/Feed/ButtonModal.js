import { Modal } from "antd-mobile";
import styled from "styled-components";
import { theme } from "../../constants/theme";

const { button } = theme;
const { royalBlue } = theme.colors;

const ButtonModal = styled(Modal)`
  font-family: ${theme.typography.font.family.display};
  .title {
    font-weight: bold;
    margin-top: 0.5rem;
    margin-bottom: 2.5rem;
  }

  .primary,
  .outline {
    display: block;
    width: 100%;
    display: block;
    text-align: left;
    padding: 1rem 0;
    padding-left: 3rem;
    border-radius: 1rem;
    margin-bottom: 1.5rem;
    border: 0.1rem solid ${royalBlue};
    color: unset;
  }

  .primary {
    ${button.primary}

    &:hover,
    &:active,
    &:focus {
      ${button.secondary}
    }
  }

  .outline {
    ${button.secondary}

    &:hover,
    &:active,
    &:focus {
      ${button.primary}
    }
  }
`;

export default ButtonModal;
