import styled from "styled-components";
import { theme, mq } from "constants/theme";
import SearchInput from "components/Input/SearchInput";

const { darkGray, royalBlue } = theme.colors;

const StyledSearchInput = styled(SearchInput)`
  border: none;
  border-bottom: 0.1rem solid ${royalBlue} !important;
  color: ${darkGray};
  font-family: "Poppins";
  font-size: 1.6rem;
  height: 5rem;
  line-height: 2.2rem;
  width: 100%;

  @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
    border: 0.2rem solid ${royalBlue} !important;
    width: 40.8rem;
  }
`;

export default StyledSearchInput;
