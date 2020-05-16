import React from "react";
import styled from "styled-components";
import { mq } from "constants/theme";

export default ({ noPic, initials }) => {
  const InitialDiv = styled.div`
    margin: auto;
    margin-top: 0;
    margin-bottom: 1rem;
    border-radius: 50%;
    border: 0.2rem solid #425af2;
    color: #425af2;
    font-size: 3rem;
    line-height: 6rem;
    width: 7rem;
    text-align: center;
    background-color: rgba(66; 90; 245; 0.04);
    @media screen and (min-width: ${mq.tablet.wide.minWidth}) {
      line-height: 11rem;
      width: 12rem;
    }
  `;
  return <>{noPic ? <InitialDiv>{initials}</InitialDiv> : <div></div>}</>;
};
