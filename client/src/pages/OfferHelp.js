import React, { useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import { Trans, useTranslation } from "react-i18next";
import InputError from "components/Input/InputError";
import { withRouter } from "react-router-dom";
import LocationInput from "components/Input/LocationInput";
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
import qs from "query-string";
import filterOptions from "assets/data/filterOptions";
const filters = Object.values(filterOptions);

const INITIAL_STATE = {
  postType: "Offering help",
  providers: [],
  location: "",
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
    if (answer === "As a Volunteer") return t("onboarding.offerHelp.volunteer");
    else if (answer === "As a Donor/Investor")
      return t("onboarding.offerHelp.donorInvestor");
    else return t("onboarding.offerHelp.organisation");
  };

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

const OfferHelp = withRouter((props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const [transition, setTransition] = useState(false);
  console.log("filters", filters);
  useEffect(() => {
    setTransition(!transition);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateAnswers = (key, value) => {
    const updatedAnswers = { ...state, [key]: value };
    setState({ ...updatedAnswers });
    if (key === "location") {
      localStorage.setItem("offerHelpAnswers", JSON.stringify(updatedAnswers));
      let query = {
        objective: 1, // indexOf "Requesting Help"
      };
      if (updatedAnswers.location)
        query.location = btoa(JSON.stringify(updatedAnswers.location));
      const selectedFilters = {
        providers: [],
        lookingFor: [filters[3].options[0].value],
      };
      if (updatedAnswers.providers) {
        let organisationFilter = updatedAnswers.providers.filter(
          (option) => option === "As an Organisation",
        );
        if (organisationFilter.length > 0) {
          for (let i = 1; i < filters[1].options.length; ++i) {
            selectedFilters.providers.push(filters[1].options[i].value);
          }
        }
      }
      if (selectedFilters.providers.length)
        query.filters = btoa(JSON.stringify(selectedFilters));
      props.history.push({
        pathname: "/feed",
        search: qs.stringify(query),
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
          </StyledWizard>
        )}
      </Transition>
    </WizardContainer>
  );
});

export default OfferHelp;
