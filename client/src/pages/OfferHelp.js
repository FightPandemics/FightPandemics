import React, { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import { Trans, useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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

  const getAnswer = (answer) => {
    if (answer === "As a Volunteer")
      return t("onboarding.offerHelp.volunteer");
    else if (answer === "As a Donor/Investor")
      return t("onboarding.offerHelp.donorInvestor");
    else
      return t("onboarding.offerHelp.organisation");
  }

  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        {t("onboarding.common.question")} {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>{t("onboarding.offerHelp.howContribute")}</StepTitle>
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
              text={getAnswer(answer)}
            />
          ))}
        </WizardCheckboxWrapper>
      </WizardFormWrapper>
    </WizardStep>
  );
};

const Step2 = (props) => {
  const { t } = useTranslation();

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

  return (
    <WizardStep>
      <WizardProgress className="text-primary">
        {t("onboarding.common.question")} {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>{t("onboarding.common.whereLocated")}</StepTitle>
      <StepSubtitle>{t("onboarding.common.relevantResults")}</StepSubtitle>
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
        {t("onboarding.common.question")} {props.currentStep}/{props.totalSteps}
      </WizardProgress>
      <StepTitle>{t("onboarding.common.whatEmail")}</StepTitle>
      <StyledDiv>
        <Trans i18nKey="onboarding.common.respectPrivacy" components={[<Link to="/privacy-policy"/>, <Link to="/terms-conditions"/>]}></Trans>
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
            label={t("profile.individual.eamil")}
            className={!valid && "has-error"}
            placeholder={t("onboarding.common.enterEmail")}
            onChange={onChange}
            value={email}
            required
          />
          {!valid && <InputError>{t("profile.org.invalidEmail")}</InputError>}
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
          {t("onboarding.common.submit")}
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
            {t("onboarding.common.skip")}
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
