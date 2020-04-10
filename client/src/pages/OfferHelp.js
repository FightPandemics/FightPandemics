import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import Title from "../components/Typography/Title";
import { asyncGetGeoLocation } from "../utils/geolocation";
import {
  AnswerButton,
  StyledWizard,
  WizardContainer,
  WizardStep,
  WizardNav,
} from "../components/StepWizard";
import TextInput from "../components/Input/TextInput";
import SubmitButton from "../components/Button/SubmitButton";

const INITIAL_STATE = {
  answers: [],
};

const Step1 = (props) => {
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

const Step2 = (props) => {
  const onSelectAnswer = () => {
    props.update("noMedicalProviderUnderstood", true);
    props.nextStep();
  };
  return (
    <WizardStep>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <h5 className="mb-4">We are not a provider of healthcare services.</h5>
      <h6 className="mb-5">
        This service is provided in good faith as a last resort for those who
        are otherwise unable to obtain help and resource during the
        unprecedented public health emergency.
      </h6>
      <strong>
        <h4 className="mb-4">
          Please consult a medical professional for advice.
        </h4>
      </strong>
      <AnswerButton onSelect={() => onSelectAnswer()}>
        I Understand.
      </AnswerButton>
    </WizardStep>
  );
};

const Step3 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("helpTypeOffered", answer);
    props.nextStep();
  };
  return (
    <WizardStep>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <Title className="mb-5">How do you want to contribute?</Title>
      <AnswerButton onSelect={() => onSelectAnswer("volunteer")}>
        As a volunteer
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("doctor investor")}>
        As a Doctor / Investor
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("organisation")}>
        As a Organisation
      </AnswerButton>
    </WizardStep>
  );
};

const Step4 = (props) => {
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
        <TextInput
          placeholder="Type your email"
          style={{ marginBottom: "20px" }}
          onChange={onChange}
        />
        <SubmitButton title="Submit" onClick={onSubmit} />
      </div>
    </WizardStep>
  );
};

export const OfferHelp = withRouter((props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const updateAnswers = (key, value) => {
    const { answers } = state;
    const updatedAnswers = { ...answers, [key]: value };
    setState({ ...state, updatedAnswers });
    if (key === "email") {
      localStorage.setItem("offerHelpAnswers", JSON.stringify(updatedAnswers));
      props.history.push({
        pathname: "/medical",
      });
    }
  };
  return (
    <WizardContainer>
      <StyledWizard isHashEnabled nav={<WizardNav />}>
        <Step1 hashKey={"Step1"} update={updateAnswers} />
        <Step2 hashKey={"Step2"} update={updateAnswers} />
        <Step3 hashKey={"Step3"} update={updateAnswers} />
        <Step4 hashKey={"Step3"} update={updateAnswers} />
      </StyledWizard>
    </WizardContainer>
  );
});
