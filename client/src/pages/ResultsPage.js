import React from "react";

import { AnswerButton } from "../components/StepWizard";
import { GenericMessage } from "./CovidScreening/GenericMessage";

export const ResultsPage = (props) => {
  return (
    <>
      <h2>Practice Social Distancing</h2>
      <h3>Next Steps</h3>
      <GenericMessage msg={props.msg} />
      1. Maintain Social Distancing
      <p>
        Small but important steps can slow the spread of COVID-19. Avoid groups
        of people and keep six feet apart from anyone who is not part of the
        household.Especially avoid those showing symptoms.
      </p>
      2. Ask about their medications
      <p>
        If they are currently taking prescription medication, they should
        contact their doctor's office about getting a 30-day supply.
      </p>
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
