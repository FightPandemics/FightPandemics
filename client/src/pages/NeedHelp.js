import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Button } from "grommet";

import Title from "../components/Typography/Title";
import { asyncGetGeoLocation } from "../utils/geolocation";
import {
  AnswerButton,
  StyledWizard,
  WizardContainer,
  WizardStep,
  WizardNav,
} from "../components/StepWizard";

const INITIAL_STATE = {
  answers: [],
};

const Step1 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("helpTypeNeeded", answer);
    props.nextStep();
  };
  return (
    <WizardStep>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <Title className="mb-5">What type of help do you need?</Title>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        <strong>Medical:</strong> I believe I might have symptoms of COVID-19.
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("other, non medical")}>
        <strong>Other Help:</strong> I need assistance getting
        groceries/medicine/etc.
      </AnswerButton>
    </WizardStep>
  );
};

const Step2 = (props) => {
  const selectLocationDetection = async () => {
    try {
      const location = await asyncGetGeoLocation();
      props.update("location", location);
    } catch {
      props.update("location", "unknown");
    } finally {
      props.nextStep();
    }
  };
  const rejectLocationDetection = () => {
    props.update("location", "unknown");
    props.nextStep();
  };
  return (
    <WizardStep>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <Title className="mb-5">Where are you located?</Title>
      <AnswerButton onSelect={selectLocationDetection}>
        Detect my location
      </AnswerButton>
      <AnswerButton onSelect={rejectLocationDetection}>
        Doesn't matter
      </AnswerButton>
    </WizardStep>
  );
};

const Step3 = (props) => {
  const [email, setEmail] = useState("");
  const onChange = (evt) => setEmail(evt.target.value);
  const onSubmit = () => {
    props.update("email", email);
  };
  return (
    <WizardStep>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <Title className="mb-5">What is your email address?</Title>
      <div style={{ marginRight: "50px" }}>
        <Form.Control
          className="mb-3"
          placeholder="Type your email"
          onChange={onChange}
        />
        <Button fill primary label="Submit" onClick={onSubmit} />
      </div>
    </WizardStep>
  );
};

export const NeedHelp = withRouter((props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const updateAnswers = (key, value) => {
    const { answers } = state;
    const updatedAnswers = { ...answers, [key]: value };
    setState({ ...state, updatedAnswers });
    if (key === "email") {
      localStorage.setItem("needHelpAnswers", JSON.stringify(updatedAnswers));
      props.history.push({
        pathname: "/medical",
      });
    }
  };
  return (
    <WizardContainer className="mx-auto">
      <StyledWizard isHashEnabled nav={<WizardNav />}>
        <Step1 hashKey={"Step1"} update={updateAnswers} />
        <Step2 hashKey={"Step2"} update={updateAnswers} />
        <Step3 hashKey={"Step3"} update={updateAnswers} />
      </StyledWizard>
    </WizardContainer>
  );
});
