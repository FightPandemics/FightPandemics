import { theme } from "constants/theme";
import { Button } from "antd";
import styled from "styled-components";

const { darkGray, lightGray, royalBlue, white } = theme.colors;

export const StyledCommentButton = styled(Button)`
  color: ${darkGray};
  border-color: transparent;
  border-radius: 1rem;
  :hover{
    color: ${royalBlue};
    border: 1px solid ${white};
  }
`;

export const StyledLoadMoreButton = styled(Button)`
    color: ${darkGray};
    border-color: ${lightGray};
    border-radius: 1rem;
    :hover{
    color: ${royalBlue};
    border: 1px solid ${white};
    }
`;
