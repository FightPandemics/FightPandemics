import IconButton from "components/Button/IconButton";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { royalBlue } = theme.colors;
const { large } = theme.typography.size;

const ShareLocation = styled(IconButton)`
  font-size: ${large};
  font-weight: normal;
  line-height: 2.2rem;
  margin: 4rem auto 1rem;

  :hover {
    background-color: transparent;
    color: ${royalBlue};
  }

  & span {
    color: ${royalBlue};
  }

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    margin-top: 0.5rem;

    & .am-button.icon {
      justify-content: flex-start !important;
      padding-left: 4rem;
    }
  }
`;

export default ShareLocation;
