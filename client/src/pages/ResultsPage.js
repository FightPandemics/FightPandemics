import React from "react";

import { AnswerButton } from "../components/StepWizard";
import { GenericMessage } from "./CovidScreening/GenericMessage";

export const ResultsPage = (props) => {
  return (
    <>
      <h2>Practice Social Distancing</h2>
      <h3>Next Steps</h3>
      <GenericMessage msg={props.msg} />
      <h2>Responses</h2>
      {Object.keys(props.val).map((item, i) => (
        <div key={i}>
          <p>{props.val[item]} </p>
        </div>
      ))}
      <AnswerButton>Done</AnswerButton>
    </>
  );
};
