import React, { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
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
import GTM from "constants/gtm-tags";

const INITIAL_STATE = {
  postType: "Requesting help",
  helpType: "",
  location: "",
  email: "",
};

const Step1 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("helpType", answer);
    props.nextStep();
  };
  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        Question {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>What type of help do you need?</StepTitle>
      <AnswerButton
        id={
          GTM.requestHelp.prefix + props.currentStep + GTM.requestHelp.medical
        }
        onSelect={() => onSelectAnswer("medical")}
      >
        <strong>Medical:</strong> I have symptoms of COVID-19.
      </AnswerButton>
      <AnswerButton
        id={GTM.requestHelp.prefix + props.currentStep + GTM.requestHelp.other}
        onSelect={() => onSelectAnswer("other")}
      >
        <strong>Other Help:</strong> I need assistance getting
        groceries/medicine/etc.
      </AnswerButton>
    </WizardStep>
  );
};

const Step2 = (props) => {
  const selectLocationDetection = (location) => {
    try {
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
            gtmPrefix={GTM.requestHelp.prefix + props.currentStep}
            location={props.location}
            onLocationChange={selectLocationDetection}
            includeNavigator={true}
          />
        </div>
        <Link to="/feed">
          <ShowAnywhere
            id={
              GTM.requestHelp.prefix +
              props.currentStep +
              GTM.wizardNav.showAnywhere
            }
            tertiary="true"
            onSelect={rejectLocationDetection}
          >
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
    setEmail(event.target.value);
  };

  const onSubmit = () => {
    props.update("email", email);
  };

  return (
    <WizardStep className="wizard-step">
      <WizardProgress className="text-primary">
        Question {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>What is your email address?</StepTitle>
      <StyledDiv>
        We respect your privacy. Please read our{" "}
        <Link to="/privacy-policy">Privacy Policy</Link> and{" "}
        <Link to="/terms-conditions">Terms & Conditions.</Link>
      </StyledDiv>
      <WizardFormWrapper>
        <WizardFormGroup controlId="userEmailGroup">
          <StyledTextInput
            id={
              GTM.requestHelp.prefix +
              props.currentStep +
              GTM.wizardNav.enterEmail
            }
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
          id={GTM.requestHelp.prefix + props.currentStep + GTM.wizardNav.submit}
          disabled={email === "" || !valid}
          primary="true"
          onClick={onSubmit}
        >
          Submit
        </WizardSubmit>
        <SkipLink
          id={GTM.requestHelp.prefix + props.currentStep + GTM.wizardNav.skip}
        >
          <span onClick={onSubmit}>Skip</span>
        </SkipLink>
      </WizardFormWrapper>
    </WizardStep>
  );
};

const NeedHelp = withRouter((props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(!transition);
  }, []);

  const updateAnswers = (key, value) => {
    const updatedAnswers = { ...state, [key]: value };
    setState({ ...updatedAnswers });
    if (key === "email") {
      localStorage.setItem("needHelpAnswers", JSON.stringify(updatedAnswers));
      if (value) {
        try {
          axios.put(`/api/sendgrid/create-contact`, updatedAnswers);
        } catch (err) {
          console.log(err);
        }
      }
      props.history.push({
        pathname: "/feed",
        state: updatedAnswers,
      });
    }
  };
  return (
    <WizardContainer className="wizard-container">
      <Transition in={transition} timeout={250}>
        {(status) => (
          <StyledWizard
            isHashEnabled
            status={status}
            nav={<WizardNav gtmPrefix={GTM.requestHelp.prefix} />}
          >
            <Step1 hashKey={"Step1"} update={updateAnswers} />
            <Step2 hashKey={"Step2"} update={updateAnswers} />
            <Step3 hashKey={"Step3"} update={updateAnswers} {...props} />
          </StyledWizard>
        )}
      </Transition>
    </WizardContainer>
  );
});

export default NeedHelp;
