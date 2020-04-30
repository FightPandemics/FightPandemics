import styled from "styled-components";

const CustomH1 = styled.h1`
  font-family: "Poppins";
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontsize};
  font-weight: ${(props) => props.fontweight};
  margin: 0.5rem;
`;

export default CustomH1;
