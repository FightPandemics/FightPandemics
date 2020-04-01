import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import StepWizard from "react-step-wizard";
import { withRouter } from "react-router-dom";

import CheckBoxItem from "../components/CheckBoxItem";
import { asyncGetGeoLocation } from "../utils/geolocation";

// import Step3 from "../pages/Step3";

const CONTAINER_STYLES = {
  marginTop: "160px",
  width: "600px",
};

// todo: should find or update step wizard to pass data from event instead of mutating this state
const needHelpAnswers = [];

const Step1 = (props) => {
  const onSelectMedical = () => {
    needHelpAnswers.push({ type: "need medical help" });
    props.nextStep();
  };
  const onSelectOther = () => {
    needHelpAnswers.push({ type: "other, non medical" });
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <h2 className="mb-5">What type of help do you need?</h2>
      <CheckBoxItem
        id="type-medical"
        label="Medical: I believe I might have symptoms of COVID-19."
        onSelect={onSelectMedical}
      />
      <CheckBoxItem
        id="type-other"
        label="Other Help: I need assistance getting groceries/medicine/etc."
        onSelect={onSelectOther}
      />
    </div>
  );
};

const Step2 = (props) => {
  const selectLocationDetection = async () => {
    try {
      const location = await asyncGetGeoLocation();
      needHelpAnswers.push({ location });
    } catch {
      needHelpAnswers.push({ location: "unknown" });
    } finally {
      props.nextStep();
    }
  };
  const rejectLocationDetection = () => {
    needHelpAnswers.push({ location: "unknown" });
    props.nextStep();
  };
  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <h2 className="mb-5">Where are you located?</h2>
      <CheckBoxItem
        id="detect"
        label="Detect my location"
        onSelect={selectLocationDetection}
      />
      <CheckBoxItem
        id="reject"
        label="Doesn't matter"
        onSelect={rejectLocationDetection}
      />
    </div>
  );
};

const Step3 = withRouter((props) => {
  const [email, setEmail] = useState("");
  const onChange = (evt) => setEmail(evt.target.value);
  const onSubmit = () => {
    needHelpAnswers.push({ email });
    console.log("submit", { needHelpAnswers });
    localStorage.setItem("needHelpAnswers", JSON.stringify(needHelpAnswers));
    props.history.push({
      pathname: "/medical",
    });
  };
  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <h2 className="mb-5">What is your email address?</h2>
      <div style={{ marginRight: "50px" }}>
        <Form.Control
          className="mb-3"
          placeholder="Type your email"
          onChange={onChange}
        />
        <Button block variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
});

export const NeedHelp = () => {
  return (
    <div className="mx-auto" style={CONTAINER_STYLES}>
      <StepWizard>
        <Step1 />
        <Step2 />
        <Step3 />
      </StepWizard>
    </div>
  );
};
