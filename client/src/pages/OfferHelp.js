import React, { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import InputError from "components/Input/InputError";
import { withRouter, Link } from "react-router-dom";
import LocationInput from "components/Input/LocationInput";
import { validateEmail } from "utils/validators";
import axios from "axios";
import GTM from "constants/gtm-tags";
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
    updateState({ ...state, answers: updatedAnswers });
    props.update("providers", checkedAnswers);
  };

  const gtmSwitcher = (key) => {
    switch (key) {
      case 0:
        return GTM.offerHelp.volunteer;
      case 1:
        return GTM.offerHelp.donor;
      case 2:
        return GTM.offerHelp.orgbtn;
      default:
        return;
    }
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
              id={
                GTM.offerHelp.prefix +
                GTM.wizardNav.step +
                props.currentStep +
                gtmSwitcher(i)
              }
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
            gtmPrefix={
              GTM.offerHelp.prefix + GTM.wizardNav.step + props.currentStep
            }
            onLocationChange={selectLocationDetection}
            includeNavigator={true}
          />
        </div>
        <ShowAnywhere
          tertiary="true"
          onClick={rejectLocationDetection}
          id={
            GTM.offerHelp.prefix +
            GTM.wizardNav.step +
            props.currentStep +
            GTM.wizardNav.showAnywhere
          }
        >
          Show me postings from anywhere
        </ShowAnywhere>
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
            id={
              GTM.offerHelp.prefix +
              GTM.wizardNav.step +
              props.currentStep +
              GTM.wizardNav.enterEmail
            }
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
          id={
            GTM.offerHelp.prefix +
            GTM.wizardNav.step +
            props.currentStep +
            GTM.wizardNav.submit
          }
          primary="true"
          onClick={onSubmit}
        >
          Submit
        </WizardSubmit>
        <SkipLink
          id={
            GTM.offerHelp.prefix +
            GTM.wizardNav.step +
            props.currentStep +
            GTM.wizardNav.skip
          }
        >
          <span
            id={
              GTM.offerHelp.prefix +
              GTM.wizardNav.step +
              props.currentStep +
              GTM.wizardNav.skip
            }
            onClick={onSubmit}
          >
            Skip
          </span>
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateAnswers = (key, value) => {
    const updatedAnswers = { ...state, [key]: value };
    setState({ ...updatedAnswers });
    if (key === "email") {
      localStorage.setItem("offerHelpAnswers", JSON.stringify(updatedAnswers));
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
            nav={<WizardNav gtmPrefix={GTM.offerHelp.prefix} />}
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

export default OfferHelp;
