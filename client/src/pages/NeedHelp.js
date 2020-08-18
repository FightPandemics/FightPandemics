import React, { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import { withRouter, Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        {t("common.question")} {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>{t("onboarding.needHelp.whatHelp")}</StepTitle>
      <AnswerButton
        id={
          GTM.requestHelp.prefix +
          GTM.wizardNav.step +
          props.currentStep +
          GTM.requestHelp.medical
        }
        onSelect={() => onSelectAnswer("medical")}
      >
        <strong>{t("onboarding.needHelp.medical")}:</strong> {t("onboarding.needHelp.haveCovidSymptoms")}
      </AnswerButton>
      <AnswerButton
        id={
          GTM.requestHelp.prefix +
          GTM.wizardNav.step +
          props.currentStep +
          GTM.requestHelp.other
        }
        onSelect={() => onSelectAnswer("other")}
      >
        <strong>{t("onboarding.needHelp.other")}:</strong> {t("onboarding.needHelp.otherDesc")}
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
  const rejectLocationDetection = (e) => {
    e.nativeEvent.stopImmediatePropagation(); // click event bubbling causing GTM tag misfiring
    props.update("location", null);
    props.nextStep();
  };
  const { t } = useTranslation();
  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        {t("common.question")} {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>{t("onboarding.common.whereLocated")}</StepTitle>
      <StepSubtitle>{t("onboarding.common.relevantResults")}</StepSubtitle>
      <WizardFormWrapper>
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <LocationInput
            gtmPrefix={
              GTM.requestHelp.prefix + GTM.wizardNav.step + props.currentStep
            }
            location={props.location}
            onLocationChange={selectLocationDetection}
            includeNavigator={true}
          />
        </div>
        <ShowAnywhere
          id={
            GTM.requestHelp.prefix +
            GTM.wizardNav.step +
            props.currentStep +
            GTM.wizardNav.showAnywhere
          }
          tertiary="true"
          onClick={rejectLocationDetection}
        >
          {t("onboarding.common.showAnywhere")}
        </ShowAnywhere>
      </WizardFormWrapper>
    </WizardStep>
  );
};

const Step3 = (props) => {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const { t } = useTranslation();

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
        {t("common.question")} {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>{t("onboarding.common.whatEmail")}</StepTitle>
      <StyledDiv>
        <Trans i18nKey="onboarding.common.respectPrivacy" components={[<Link to="/privacy-policy"/>, <Link to="/terms-conditions"/>]}></Trans>
      </StyledDiv>
      <WizardFormWrapper>
        <WizardFormGroup controlId="userEmailGroup">
          <StyledTextInput
            id={
              GTM.requestHelp.prefix +
              GTM.wizardNav.step +
              props.currentStep +
              GTM.wizardNav.enterEmail
            }
            type="email"
            name="email"
            label={t("auth.email")}
            className={!valid && "has-error"}
            placeholder={t("onboarding.common.enterEmail")}
            onChange={onChange}
            value={email}
            required
          />
          {!valid && <InputError>{t("profile.org.invalidEmail")}</InputError>}
        </WizardFormGroup>
        <WizardSubmit
          id={
            GTM.requestHelp.prefix +
            GTM.wizardNav.step +
            props.currentStep +
            GTM.wizardNav.submit
          }
          disabled={email === "" || !valid}
          primary="true"
          onClick={onSubmit}
        >
          {t("onboarding.common.submit")}
        </WizardSubmit>
        <SkipLink
          id={
            GTM.requestHelp.prefix +
            GTM.wizardNav.step +
            props.currentStep +
            GTM.wizardNav.skip
          }
          onClick={onSubmit}
        >
          {t("onboarding.common.skip")}
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
