import styled from "styled-components";

const UnderLineDescription = styled.div`
  margin-left: ${(props) => props.marginLeft || ""};
  margin-top: ${(props) => props.marginTop || ""};
  color: #939393;
  font-size: 1rem;
  height: auto;
`;

export default UnderLineDescription;
