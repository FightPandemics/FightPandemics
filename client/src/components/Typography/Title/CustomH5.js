import styled from "styled-components";
import { DARK_GRAY } from "../../../constants/colors";

export default styled.h5`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontsize};
  margin: 0.5rem;
`;
