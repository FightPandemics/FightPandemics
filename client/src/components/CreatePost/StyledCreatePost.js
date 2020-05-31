import styled from "styled-components";
import { Input } from "antd";
import { theme } from "constants/theme";

const { display } = theme.typography.font.family;
const { medium, xlarge } = theme.typography.size;
const { royalBlue, darkerGray } = theme.colors;

export const CreatePostWrapper = styled.div`
  font-family: ${display};
  margin-top: 2rem;

  .title {
    margin: 0;
    margin-bottom: 0.5rem;
  }
  .settings {
    margin-bottom: 1rem;
    .buttons {
      margin-bottom: 0.5rem;
      a {
        margin-top: 0;
        margin-right: 1.8rem;
      }
    }
    .inline {
      margin-left: 0.2rem;
    }
  }
  .post-modal {
    border-radius: 0;
  }
  .error-box {
    color: red;
  }
  .submit-btn {
    margin-bottom: 3rem;
  }
`;

export const StyledForm = styled.form`
  font-family: ${display};
`;

export const StyledInput = styled(Input)`
  color: ${royalBlue};
  font-size: ${xlarge};
  border: none;
  outline: none;
  padding: 0;
  &.ant-input:hover,
  &.ant-input:focus {
    border-right-width: unset !important;
    border-color: unset;
    box-shadow: unset;
  }
`;

export const StyledTextArea = styled(Input.TextArea)`
  color: ${darkerGray};
  font-size: ${medium};
  resize: none;
  border: none;
  outline: none;
  padding: 0;
  &.ant-input:hover,
  &.ant-input:focus {
    border-right-width: unset !important;
    border-color: unset;
    box-shadow: unset;
  }
`;
