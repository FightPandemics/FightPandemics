import React from "react";
import { Link } from "react-router-dom";

import { AnswerButton } from "components/StepWizard";
import GenericMessage from "./CovidScreening/GenericMessage";

const ResultsPage = (props) => {
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
      <Link to="/feed">
        <AnswerButton>Done</AnswerButton>
      </Link>
    </>
  );
};

export default ResultsPage;
