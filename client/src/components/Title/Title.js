import React from "react";
import styled from "styled-components";

const Title = styled.div`
  font-size: 2rem;
  color: #000000;
  text-align: center;
`;

export default ({ title, ...props }) => {
    return <Title {...props}>{title}</Title>;
};
