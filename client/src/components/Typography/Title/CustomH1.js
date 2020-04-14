import styled from "styled-components";
import { DARK_GRAY } from "../../../constants/colors";

export default styled.h1`
  font-family: "Poppins";
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontsize};
  font-weight: ${(props) => props.fontweight};
  margin: 0.5rem;
`;
