import SubmitButton from "components/Button/SubmitButton";
import styled from "styled-components";
import { theme, mq } from "constants/theme";

const { royalBlue } = theme.colors;
const { xlarge } = theme.typography.size;

const ShowAnywhere = styled(SubmitButton)`
  :hover {
    background-color: transparent;
    color: ${royalBlue};
  }

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    background-color: transparent;
    color: ${royalBlue};
    font-size: ${xlarge};
    font-weight: 600;
    line-height: 2.4rem;

    :hover {
      background-color: transparent;
      color: ${royalBlue};
    }
  }
`;

export default ShowAnywhere;
