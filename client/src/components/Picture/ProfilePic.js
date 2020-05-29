import React from "react";
import styled from "styled-components";
import { mq } from "constants/theme";

const InitialDiv = styled.div`
  margin: auto;
  margin-bottom: 1rem;
  border-radius: 50%;
  border: 0.2rem solid #425af2;
  color: #425af2;
  font-size: 3rem;
  line-height: 6rem;
  width: 7rem;
  text-align: center;
  font-weight: 500;
  background-color: #f3f4fe;
  @media screen and (min-width: ${(props) =>
      props.resolution ? props.resolution : mq.tablet.narrow.minWidth}) {
    margin: 0;
    height: 80%;
    line-height: 11rem;
    width: 12rem;
    margin-right: 3rem;
    font-size: 5rem;
  }
`;
export default ({ noPic, initials, resolution }) => {
  return (
    <>
      {noPic ? (
        <InitialDiv resolution={resolution}>{initials}</InitialDiv>
      ) : (
        <div></div>
      )}
    </>
  );
};
