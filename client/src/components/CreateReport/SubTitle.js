import React from "react";
import styled from "styled-components";
import { theme } from "constants/theme";
const { colors, typography } = theme;

export const Title = styled.p`
  font-family: ${typography.font.family.body};
  font-style: normal;
  font-weight: normal;
  font-size: ${typography.size.medium};
  line-height: 130%;
  color: ${colors.darkerGray};
`;

export const Container = styled.div`
  position: relative;
  flex: none;
  align-self: center;
  flex-grow: 0;
  margin: 0 0.75rem;
`;
const SubTitle = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

export default SubTitle;
