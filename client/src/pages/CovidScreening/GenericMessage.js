import React from "react";
import styled from "styled-components";
import { theme } from "../../constants/theme";
const { typography, colors } = theme;

const ColoredMessageStyle = styled.div`
  width: 100%;
  margin: 33px 0 29px;
  padding: 18px 29px 20px 18px;
  border-radius: 5px;
  color: #fff;
  background: ${(props) => props.color};
`;

const SectionTitleStyle = styled.h4`
  font-family: ${typography.heading.font};
  font-weight: bold;
  font-size: ${typography.heading.four};
  font-weight: bold;
  font-size: 22px;
  padding: 0 !important;
  margin: 2.9rem 0 !important;
`;

const GenericMessageStyle = styled.ol`
  padding: 0;
  list-style: none;
  counter-reset: li;
  & li {
    position: relative;
    margin: 0 0 27px;
    padding: 0 0 0 38px;
    counter-increment: li;
    font-size: 11px;
    line-height: 24px;
    font-weight: bold;
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      width: 24px;
      height: 24px;
      content: counter(li);
      color: #fff;
      background: ${colors.royalBlue};
      border-radius: 50%;
      text-align: center;
    }
    & > div {
      & div {
        font-family: ${typography.heading.font};
        font-weight: 500;
        font-size: 18px;
        color: #282828;
      }
      & h6 {
        font-family: ${typography.heading.font};
        font-weight: 500;
        color: #939393;
        margin: 9px 0 0 !important;
      }
    }
  }
`;

const GenericResponseStyle = styled.ul`
  padding: 0 0 0 15px;
  margin: 0 0 44px;
  & li {
    font-size: 16px;
    line-height: 24px;
    color: #282828;
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
