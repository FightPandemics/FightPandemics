import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { mq } from "constants/theme";
import { asyncGetGeoLocation } from "utils/geolocation";
import {
  StyledWizard,
  WizardContainer,
  WizardStep,
  WizardNav,
  WizardButtonGroup,
  ShowAnywhere,
  ShareLocation,
  StepTitle,
  StepSubtitle,
  SkipLink,
  StyledTextInput,
  StyledSearchInput,
  WizardProgress,
  WizardFormWrapper,
  WizardFormGroup,
  getAnswersMap,
  getCheckedAnswers,
  WizardCheckboxWrapper,
  WizardCheckboxItem,
} from "components/StepWizard";
import { SubmitButton } from "components/Button";

// ICONS
import SvgIcon from "components/Icon/SvgIcon";
import shareMyLocation from "assets/icons/share-my-location.svg";

const INITIAL_STATE = {
  answers: [],
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
    props.update("helpTypeOffered", checkedAnswers);
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
  const [locationSearch, setLocationSearch] = useState("");

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

  const manualLocation = (evt) => setLocationSearch(evt); // I am not sure how best to perform the search at the moment.
  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        Question {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>Where are you located?</StepTitle>
      <StepSubtitle>We want to show you the most relevant results</StepSubtitle>
      <WizardFormWrapper>
        <WizardFormGroup>
          <StyledSearchInput
            type="text"
            name="manualLocation"
            label="Location search"
            placeholder="Enter Address, Zip Code, or City"
            onChange={manualLocation}
            value={locationSearch}
          />
        </WizardFormGroup>
        <ShareLocation
          tertiary="true"
          icon={<SvgIcon className="share-location-icon" src={shareMyLocation} />}
          onSelect={selectLocationDetection}
        >
          Share my location
        </ShareLocation>
        <Link to="/feed">
          <ShowAnywhere tertiary="true" onSelect={rejectLocationDetection}>
            Show me postings from anywhere
          </ShowAnywhere>
        </Link>
      </WizardFormWrapper>
    </WizardStep>
  );
};
const WizardButton = styled(SubmitButton)`
  width: 70%;
  margin-top: 5rem;
  margin-left:8rem;
`;
const Step3 = (props) => {
  const [email, setEmail] = useState("");
  const onChange = (evt) => {
    setEmail(evt);
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
      <StepSubtitle>
        We respect your privacy. Please read our{" "}
        <Link to={"/terms-conditions"}>Terms and Conditions</Link>.
      </StepSubtitle>
      <WizardFormWrapper>
        <WizardFormGroup controlId="userEmailGroup">
          <StyledTextInput
            type="email"
            name="userEmail"
            label="Email"
            placeholder="Enter your email address"
            onChange={onChange}
            value={email && email}
          />
        </WizardFormGroup>
        <WizardButton primary="true" onClick={onSubmit}>
          Submit
          </WizardButton>
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

const OfferHelp = withRouter((props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const updateAnswers = (key, value) => {
    const { answers } = state;
    const updatedAnswers = { ...answers, [key]: value };
    setState({ ...state, updatedAnswers });
    if (key === "email") {
      localStorage.setItem("offerHelpAnswers", JSON.stringify(updatedAnswers));
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

export default OfferHelp;
