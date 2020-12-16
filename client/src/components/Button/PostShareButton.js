import styled from "styled-components";
import BaseButton from "./BaseButton";
import { theme } from "constants/theme";
const { royalBlue, white } = theme.colors;
const { display } = theme.typography.font.family;

const PostShareButton = styled(BaseButton)`
  padding: 1rem 2rem;
  margin-left: 0.5rem;
  border-radius: 4.6rem;
  border: 1px solid ${white} !important;
  font-family: ${display};
  font-size: 1.3rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${white};
  background-color: ${royalBlue};
  display: inline;

  &:hover {
    background-color: ${white};
    color: ${royalBlue};
    border: 1px solid ${royalBlue} !important;
    transition: 0.3s all;
  }
`;

export default PostShareButton;
