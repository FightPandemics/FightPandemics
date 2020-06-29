import React, { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import InputError from "components/Input/InputError";
import { withRouter, Link } from "react-router-dom";
import LocationInput from "components/Input/LocationInput";
import { validateEmail } from "utils/validators";
import {
  StyledWizard,
  WizardContainer,
  WizardStep,
  WizardNav,
  ShowAnywhere,
  StepTitle,
  StepSubtitle,
  SkipLink,
  StyledTextInput,
  WizardProgress,
  WizardFormWrapper,
  WizardFormGroup,
  getAnswersMap,
  getCheckedAnswers,
  WizardCheckboxWrapper,
  WizardCheckboxItem,
  WizardSubmit,
  StyledDiv,
} from "components/StepWizard";

const INITIAL_STATE = {
  postType: "Offering help",
  providers: [],
  location: "",
  email: "",
};

const STEP_1_ANSWERS = [
  "As a Volunteer",
  "As a Donor/Investor",
  "As an Organisation",
];
const STEP_1_STATE = {
  answers: getAnswersMap(STEP_1_ANSWERS),
  none: false,
};

const Step1 = (props) => {
  const [state, updateState] = useState(STEP_1_STATE);
  const { answers, none } = state;

  const toggleAnswer = (answer) => {
    const updatedAnswers = { ...answers, [answer]: !answers[answer] };
    const checkedAnswers = getCheckedAnswers(updatedAnswers);
    console.log(checkedAnswers);
    updateState({ ...state, answers: updatedAnswers });
    props.update("providers", checkedAnswers);
  };

  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        Question {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>How do you want to contribute?</StepTitle>
      <WizardFormWrapper>
        <WizardCheckboxWrapper>
          {Object.entries(answers).map(([answer, checked], i) => (
            <WizardCheckboxItem
              key={i}
              onChange={() => toggleAnswer(answer)}
              checked={!none && checked}
              text={answer}
            />
          ))}
        </WizardCheckboxWrapper>
      </WizardFormWrapper>
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
          <span onClick={onSubmit}>Skip</span>
        </SkipLink>
      </WizardFormWrapper>
    </WizardStep>
  );
};

const OfferHelp = withRouter((props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(!transition);
  }, []);

  const updateAnswers = (key, value) => {
    const updatedAnswers = { ...state, [key]: value };
    setState({ ...updatedAnswers });
    if (key === "email") {
      localStorage.setItem("offerHelpAnswers", JSON.stringify(updatedAnswers));
      props.history.push({
        pathname: "/feed",
        state: updatedAnswers,
      });
    }
  };
  return (
    <WizardContainer className="wizard-container">
      <Transition in={transition} timeout={250}>
        {status=> (
          <StyledWizard isHashEnabled status={status} nav={<WizardNav />}>
            <Step1 hashKey={"Step1"} update={updateAnswers} />
            <Step2 hashKey={"Step2"} update={updateAnswers} />
            <Step3 hashKey={"Step3"} update={updateAnswers} {...props} />
          </StyledWizard>
        )}
      </Transition>
    </WizardContainer>
  );
});

export default OfferHelp;
