import styled from "styled-components";
import { mq } from "constants/theme";

import SvgIcon from "components/Icon/SvgIcon";

export const ExternalLinkIcon = styled(SvgIcon)`
  align-self: flex-end;
  width: 2rem;
  font-size: 0.9rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    width: 2.5rem;
    margin: 0 1rem 0.5rem 0;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    justify-content: initial;
  }
`;
