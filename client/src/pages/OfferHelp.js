import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";

import { asyncGetGeoLocation } from "../utils/geolocation";
import {
  AnswerButton,
  StyledWizard,
  WizardContainer,
  WizardStep,
  WizardNav,
  WizardButtonGroup,
  StepTitle,
  SkipLink,
  StyledTextInput,
  WizardProgress,
  WizardFormWrapper,
  WizardFormGroup,
} from "../components/StepWizard";
import { IconButton, SubmitButton, CustomButton } from "../components/Button";
import { ShareMyLocationIcon } from "../components/Icon";

import { theme } from "../constants/theme";
const { button } = theme;

const INITIAL_STATE = {
  answers: [],
};

const Step1 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("helpTypeOffered", answer);
    props.nextStep();
  };

  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </WizardProgress>
      <StepTitle>How do you want to contribute?</StepTitle>
      <WizardFormWrapper>
        <AnswerButton onSelect={() => onSelectAnswer("volunteer")}>
          As a volunteer
        </AnswerButton>
        <AnswerButton onSelect={() => onSelectAnswer("doctor investor")}>
          As a Doctor / Investor
        </AnswerButton>
        <AnswerButton onSelect={() => onSelectAnswer("organisation")}>
          As a Organisation
        </AnswerButton>
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

  const manualLocation = (evt) => setLocationSearch(evt.target.value); // I am not sure how best to perform the search at the moment.
  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </WizardProgress>
      <StepTitle>Where are you located?</StepTitle>
      <p>So we can show postings near you.</p>
      <WizardFormWrapper>
        <WizardFormGroup>
          <StyledTextInput
            type="text"
            name="manualLocation"
            label="Location search"
            placeholder="Enter address, Zip Code or City"
            onChange={manualLocation}
            value={locationSearch}
          />
        </WizardFormGroup>
        <IconButton
          icon={<ShareMyLocationIcon />}
          title="Share my location"
          onSelect={selectLocationDetection}
        />
        <SkipLink>
          <CustomButton
            textOnly
            width="50%"
            display="inline-flex"
            onSelect={rejectLocationDetection}
          >
            Show me postings from anywhere
          </CustomButton>
        </SkipLink>
      </WizardFormWrapper>
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
    <WizardStep className="wizard-step">
      <WizardProgress className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </WizardProgress>
      <StepTitle>What is your email address?</StepTitle>
      <WizardFormWrapper>
        <WizardFormGroup controlId="userEmailGroup">
          <StyledTextInput
            type="email"
            name="userEmail"
            label="Email"
            placeholder="Type your email"
            onChange={onChange}
            value={email}
          />
        </WizardFormGroup>
        <WizardButtonGroup>
          <SubmitButton fill type="primary" title="Submit" onClick={onSubmit} />
          <SkipLink>
            <Link to="/AirTableCOVID">
              {/* By clicking on “skip”, users can skip the landing questions to see the information directly */}
              Skip
            </Link>
          </SkipLink>
        </WizardButtonGroup>
      </WizardFormWrapper>
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
    <WizardContainer className="wizard-container">
      <StyledWizard isHashEnabled nav={<WizardNav />}>
        <Step1 hashKey={"Step1"} update={updateAnswers} />
        <Step2 hashKey={"Step2"} update={updateAnswers} />
        <Step3 hashKey={"Step3"} update={updateAnswers} />
      </StyledWizard>
    </WizardContainer>
  );
});
