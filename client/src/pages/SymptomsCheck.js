import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import StepWizard from "react-step-wizard";
import { withRouter } from "react-router-dom";

import { CheckBoxItem } from "../components/CheckBoxItem";
import { asyncGetGeoLocation } from "../utils/geolocation";

// import Step3 from "../pages/Step3";

const CONTAINER_STYLES = {
  marginTop: "160px",
  width: "600px"
};

// todo: should find or update step wizard to pass data from event instead of mutating this state
const Welcome = props => {
  const onSelectLessThanEigthen = () => {
    symptomsCheckAnswer.push({ type: "need medical help" });
    props.nextStep();
  };
  const onSelectOther = () => {
    symptomsCheckAnswer.push({ type: "other, non medical" });
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <h2 className="mb-5">
        Welcome !!! <br /> BEFORE YOU BEGIN
      </h2>
      <CheckBoxItem
        id="type-medical"
        label="If you have ANY of the following symptoms, CALL YOUR LOCAL 
        EMERGENCY NUMBER IMMEDIATELY 
        (911 IF YOU ARE IN THE US, CLICK HERE FOR A COMPLETE LIST OF 
          EMERGENCY NUMBERS BY COUNTRY )"
        onSelect={onSelectLessThanEigthen}
      />
      <CheckBoxItem
        id="type-other"
        label="Constant chest pain or pressure
        Extreme difficulty breathing
        Severe, constant dizziness or lightheadedness
        Slurred speech
        Difficulty waking up "
        onSelect={onSelectOther}
      />
    </div>
  );
};

const symptomsCheckAnswer = [];

const Step1 = props => {
  const onSelectLessThanEigthen = () => {
    symptomsCheckAnswer.push({ type: "need medical help" });
    props.nextStep();
  };
  const onSelectOther = () => {
    symptomsCheckAnswer.push({ type: "other, non medical" });
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <h2 className="mb-5">
        Do you have any of these symptoms? Please, select all that apply?
      </h2>
      <CheckBoxItem
        id="type-medical"
        label="< 18: I am less than 18"
        onSelect={onSelectLessThanEigthen}
      />
      <CheckBoxItem
        id="type-other"
        label="18 - 64: I am between 18 and 64."
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-other"
        label="65+: I am above 65."
        onSelect={onSelectOther}
      />
    </div>
  );
};

const Step2 = props => {
  const onSelectLessThanEigthen = () => {
    symptomsCheckAnswer.push({ type: "need medical help" });
    props.nextStep();
  };
  const onSelectOther = () => {
    symptomsCheckAnswer.push({ type: "other, non medical" });
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <h2 className="mb-5">
        Do you have any of these symptoms? Please, select all that apply?
      </h2>
      <CheckBoxItem
        id="type-medical"
        label="Sore throat"
        onSelect={onSelectLessThanEigthen}
      />
      <CheckBoxItem
        id="type-other"
        label="Aching throughout the body"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-other"
        label="Vomiting or diarrhea"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-medical"
        label="Fever, chills or sweating"
        onSelect={onSelectLessThanEigthen}
      />
      <CheckBoxItem
        id="type-other"
        label="Difficulty breathing"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-other"
        label="New or worsening cough"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-other"
        label="None of these"
        onSelect={onSelectOther}
      />
    </div>
  );
};

const Step3 = props => {
  const onSelectLessThanEigthen = () => {
    symptomsCheckAnswer.push({ type: "need medical help" });
    props.nextStep();
  };
  const onSelectOther = () => {
    symptomsCheckAnswer.push({ type: "other, non medical" });
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <h2 className="mb-5">
        Do you have any of these pre-existing medical conditions? Please, select
        all that apply?
      </h2>
      <CheckBoxItem
        id="type-medical"
        label="Diseases or conditions that make it hard to cough"
        onSelect={onSelectLessThanEigthen}
      />
      <CheckBoxItem
        id="type-other"
        label="Kidney failure that needs dialysis"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-other"
        label="Cirrhosis of the liver"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-medical"
        label="Asthma or chronic lung disease"
        onSelect={onSelectLessThanEigthen}
      />
      <CheckBoxItem
        id="type-other"
        label="Pregnancy"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-other"
        label="Diabetes with complications"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-other"
        label="Extreme obesity"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-other"
        label="Weakened immune system"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-other"
        label="Congestive heart failure"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-other"
        label="None of these"
        onSelect={onSelectOther}
      />
    </div>
  );
};

const Step4 = props => {
  const onSelectLessThanEigthen = () => {
    symptomsCheckAnswer.push({ type: "need medical help" });
    props.nextStep();
  };
  const onSelectOther = () => {
    symptomsCheckAnswer.push({ type: "other, non medical" });
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <h2 className="mb-5">
        Have you traveled internationally during the last 2 weeks?
      </h2>
      <CheckBoxItem
        id="type-medical"
        label="Yes"
        onSelect={onSelectLessThanEigthen}
      />
      <CheckBoxItem id="type-other" label="No" onSelect={onSelectOther} />
    </div>
  );
};

const Step5 = props => {
  const onSelectLessThanEigthen = () => {
    symptomsCheckAnswer.push({ type: "need medical help" });
    props.nextStep();
  };
  const onSelectOther = () => {
    symptomsCheckAnswer.push({ type: "other, non medical" });
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <h2 className="mb-5">
        If so, have you traveled to an area severely affected by the COVID-19
        outbreak?
      </h2>
      <CheckBoxItem
        id="type-medical"
        label="I live in an area severely affected by the COVID-19 outbreak"
        onSelect={onSelectLessThanEigthen}
      />
      <CheckBoxItem
        id="type-other"
        label="I have visited an area severely affected by the COVID-19 outbreak"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-other"
        label="I am sure."
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-medical"
        label="None of these apply"
        onSelect={onSelectLessThanEigthen}
      />
    </div>
  );
};

const Step6 = props => {
  const onSelectLessThanEigthen = () => {
    symptomsCheckAnswer.push({ type: "need medical help" });
    props.nextStep();
  };
  const onSelectOther = () => {
    symptomsCheckAnswer.push({ type: "other, non medical" });
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <h2 className="mb-5">
        Accordingly to what you know, have you been exposed to others who are
        known to have COVID-19 during the last 2 weeks? Please, select all that
        apply.
      </h2>
      <CheckBoxItem
        id="type-medical"
        label="I live with someone who has COVID-19"
        onSelect={onSelectLessThanEigthen}
      />
      <CheckBoxItem
        id="type-other"
        label="I had close contact with someone with COVID-19 (10 minutes or more spent together within 6 feet from each other or were exposed to their sneeze or cough)S"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-other"
        label="I was near someone with COVID-19 (at least 6-feet away and not exposed to their cough or sneeze)"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-medical"
        label="No exposure"
        onSelect={onSelectLessThanEigthen}
      />
    </div>
  );
};

const Step7 = props => {
  const onSelectLessThanEigthen = () => {
    symptomsCheckAnswer.push({ type: "need medical help" });
    props.nextStep();
  };
  const onSelectOther = () => {
    symptomsCheckAnswer.push({ type: "other, non medical" });
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep} / {props.totalSteps}
      </h5>
      <h2 className="mb-5">
        In your day-to-day life, do you work or live in a care facility? This
        may include hospitals, care homes, emergency rooms, and other medical
        settings?
      </h2>
      <CheckBoxItem
        id="type-medical"
        label="< 18: I am less than 18"
        onSelect={onSelectLessThanEigthen}
      />
      <CheckBoxItem
        id="type-other"
        label="They live in a care facility (This includes nursing homes and assisted living)"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-other"
        label="Worked in a care facility in the last 14 days (This includes hospitals, assisted living facilities, etc. This includes part-time jobs and volunteering)"
        onSelect={onSelectOther}
      />
      <CheckBoxItem
        id="type-medical"
        label="Plan to work in care facility in the next 14 days (This includes hospitals, assisted living facilities, etc. This includes part-time jobs and volunteering)"
        onSelect={onSelectLessThanEigthen}
      />
      <CheckBoxItem
        id="type-other"
        label="No (They do not live or work in a long-term care facility)"
        onSelect={onSelectOther}
      />
    </div>
  );
};

export const SymptomsCheck = () => {
  return (
    <div className="mx-auto" style={CONTAINER_STYLES}>
      <StepWizard>
        <Welcome />
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
        <Step5 />
        <Step6 />
        <Step7 />
      </StepWizard>
    </div>
  );
};
