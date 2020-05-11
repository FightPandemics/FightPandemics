import React from "react";
import styled from "styled-components";
import { AnswerButton } from "../components/StepWizard";
import GenericMessage from "./CovidScreening/GenericMessage";


const OrderList = styled.h4`
&::before {
  content:"● ";
}
  list-style-type: space-counter;
  display: inline-block;
  font-size: 1em;
  text-indent: -0.75em;
  line-height: 1.5rem;
  margin-left: 1em;
`;
const ResultsPage = (props) => {
  return (
    <>
      <h2>Practice Social Distancing</h2>
      <h3>Next Steps</h3>
      <GenericMessage msg={props.msg} />
      <h2>Their Responses</h2>
      {Object.keys(props.val).map((item, i) => (
        <div key={i}>
          <OrderList>{props.val[item]} </OrderList>
        </div>
      ))}
      <AnswerButton>Done</AnswerButton>
    </>
  );
};

export default ResultsPage;
