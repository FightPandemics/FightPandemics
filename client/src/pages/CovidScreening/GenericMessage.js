import React from "react";
import styled from "styled-components";
import { theme } from "../../constants/theme";
const { typography, colors } = theme;

const ColoredMessageStyle = styled.div`
  width: 100%;
  margin: 3.3rem 0 2.9rem;
  padding: 1.8rem 2.9rem 2rem 1.8rem;
  border-radius: 0.5rem;
  color: ${colors.white};
  background: ${(props) => props.color};
`;

const SectionTitleStyle = styled.h4`
  font-family: ${typography.heading.font};
  font-weight: bold;
  font-size: ${typography.heading.four};
  font-weight: bold;
  font-size: 2.2rem;
  padding: 0 !important;
  margin: 2.9rem 0 !important;
`;

const GenericMessageStyle = styled.ol`
  padding: 0;
  list-style: none;
  counter-reset: li;
  & li {
    position: relative;
    margin: 0 0 2.7rem;
    padding: 0 0 0 3.8rem;
    counter-increment: li;
    font-size: 1.1rem;
    line-height: 2.4rem;
    font-weight: bold;
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      width: 2.4rem;
      height: 2.4rem;
      content: counter(li);
      color: ${colors.white};
      background: ${colors.royalBlue};
      border-radius: 50%;
      text-align: center;
    }
    & > div {
      & div {
        font-family: ${typography.heading.font};
        font-weight: 500;
        font-size: 1.8rem;
        color: ${colors.darkGray};
      }
      & h6 {
        font-family: ${typography.heading.font};
        font-weight: 500;
        color: ${colors.darkGray};
        margin: 0.9rem 0 0 !important;
      }
    }
  }
`;

const GenericResponseStyle = styled.ul`
  padding: 0 0 0 1.5rem;
  margin: 0 0 4.4rem;
  & li {
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: ${colors.darkGray};
  }
`;

export const ColoredMessage = ({ color, children }) => {
  return <ColoredMessageStyle color={color}>{children}</ColoredMessageStyle>;
};

export const SectionTitle = ({ children }) => {
  return <SectionTitleStyle>{children}</SectionTitleStyle>;
};

export const GenericMessage = ({ msg = [] }) => {
  return (
    <GenericMessageStyle>
      {msg.map((item = [], index) => (
        <li key={index}>
          <div>
            <div>{item[0]}</div>
            <h6>{item[1]}</h6>
          </div>
        </li>
      ))}
    </GenericMessageStyle>
  );
};

export const GenericResponse = ({ response = {} }) => {
  return (
    <GenericResponseStyle>
      {Object.keys(response).map((item, i) => (
        <li key={i}>{response[item]}</li>
      ))}
    </GenericResponseStyle>
  );
};
