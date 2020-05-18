import React from "react";
import styled from "styled-components";
import { mq } from "constants/theme";

export default ({ noPic, initials }) => {
  const InitialDiv = styled.div`
    margin-bottom: 1rem;
    border-radius: 50%;
    border: 0.2rem solid #425af2;
    color: #425af2;
    font-size: 3rem;
    line-height: 6rem;
    width: 7rem;
    text-align: center;
    background-color: #f3f4fe;
    @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
      line-height: 10rem;
      width: 11rem;
    }
  `;
  return <>{noPic ? <InitialDiv>{initials}</InitialDiv> : <div></div>}</>;
};
