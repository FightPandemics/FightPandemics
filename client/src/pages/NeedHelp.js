import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import InputError from "components/Input/InputError";
import LocationInput from "components/Input/LocationInput";
import { validateEmail } from "utils/validators";
import axios from "axios";
import {
  AnswerButton,
  ShowAnywhere,
  StepSubtitle,
  StyledWizard,
  WizardContainer,
  WizardStep,
  WizardNav,
  StepTitle,
  StyledTextInput,
  WizardProgress,
  WizardFormWrapper,
  WizardFormGroup,
  WizardSubmit,
  SkipLink,
  StyledDiv,
} from "components/StepWizard";

const INITIAL_STATE = {
  answers: [],
};

// for now just creating an object to collect the data that I need
let stepsData = {};

const Step1 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("helpTypeNeeded", answer);
    props.nextStep();
  };
  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        Question {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>What type of help do you need?</StepTitle>
      <AnswerButton onSelect={() => onSelectAnswer("medical")}>
        <strong>Medical:</strong> I have symptoms of COVID-19.
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("other, non medical")}>
        <strong>Other Help:</strong> I need assistance getting
        groceries/medicine/etc.
      </AnswerButton>
    </WizardStep>
  );
};

const Step2 = (props) => {
  const selectLocationDetection = (location) => {
    try {
      // assigning the object to hold the steps2 data -> might conver this to useContext instead
      stepsData.location = location;
      props.update("location", location);
    } catch {
      props.update("location", null);
    } finally {
      props.nextStep();
    }
  };
  const rejectLocationDetection = () => {
    props.update("location", null);
    props.nextStep();
  };
  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        Question {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>Where are you located?</StepTitle>
      <StepSubtitle>We want to show you the most relevant results</StepSubtitle>
      <WizardFormWrapper>
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <LocationInput
            location={props.location}
            onLocationChange={selectLocationDetection}
            includeNavigator={true}
          />
        </div>
        <Link to="/feed">
          <ShowAnywhere tertiary="true" onSelect={rejectLocationDetection}>
            Show me postings from anywhere
          </ShowAnywhere>
        </Link>
      </WizardFormWrapper>
    </WizardStep>
  );
};

const Step3 = (props) => {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const validated = !email || validateEmail(email);
    setValid(validated);
  }, [email]);

  const onChange = (event) => {
    let email = event.target.value;
    stepsData.email = email;
    setEmail(email);
  };

  const onSubmit = async () => {
    // ideally I want to create a contact on submit and redirect to the feed :)
    try {
      const res = await axios.put(`/api/sendgrid/create-contact`, stepsData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WizardStep className="wizard-step">
      <WizardProgress className="text-primary">
        Question {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>What is your email address?</StepTitle>
      <StyledDiv>
        We respect your privacy. Please read our{" "}
        <Link to="/terms-conditions">Terms and Conditions</Link>
      </StyledDiv>
      <WizardFormWrapper>
        <WizardFormGroup controlId="userEmailGroup">
          <StyledTextInput
            type="email"
            name="email"
            label="Email"
            className={!valid && "has-error"}
            placeholder="Enter your email address..."
            onChange={onChange}
            value={email}
            required
          />
          {!valid && <InputError>Email is invalid</InputError>}
        </WizardFormGroup>
        <WizardSubmit
          disabled={email === "" || !valid}
          primary="true"
          onClick={onSubmit}
        >
          Submit
        </WizardSubmit>
        <SkipLink>
          <Link to="/feed">
            {/* By clicking on “skip”, users can skip the landing questions to see the information directly */}
            Skip
          </Link>
        </SkipLink>
      </WizardFormWrapper>
    </WizardStep>
  );
};

const NeedHelp = withRouter((props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const updateAnswers = (key, value) => {
    const { answers } = state;
    const updatedAnswers = { ...answers, [key]: value };
    setState({ ...state, updatedAnswers });
    if (key === "email") {
      localStorage.setItem("needHelpAnswers", JSON.stringify(updatedAnswers));
      props.history.push({
        pathname: "/feed",
      });
    }
  };
  return (
    <WizardContainer className="wizard-container">
      <StyledWizard isHashEnabled nav={<WizardNav />}>
        <Step1 hashKey={"Step1"} update={updateAnswers} />
        <Step2 hashKey={"Step2"} update={updateAnswers} />
        <Step3 hashKey={"Step3"} update={updateAnswers} />
      </StyledWizard>
    </WizardContainer>
  );
});

export default NeedHelp;
