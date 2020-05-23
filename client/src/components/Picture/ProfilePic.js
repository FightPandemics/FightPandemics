import React from "react";
import styled from "styled-components";
import { theme } from "constants/theme";

const { royalBlue } = theme.colors;

export default ({ noPic, initials }) => {
  return <>{noPic ? <NoPic>{initials}</NoPic> : <div></div>}</>;
};

const NoPic = styled.div`
  margin: auto,
  margin-top: 0,
  margin-bottom: 1rem,
  border-radius: 50%,
  border: 0.2rem solid ${royalBlue},
  color: ${royalBlue},
  font-size: 3rem,
  line-height: 6rem,
  width: 7rem,
  text-align: center,
  background-color: rgba(66, 90, 245, 0.04),
`;
