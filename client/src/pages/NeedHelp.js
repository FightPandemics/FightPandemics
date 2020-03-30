import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import StepWizard from 'react-step-wizard';

import { CheckBoxItem } from '../components/CheckBoxItem';
import { asyncGetGeoLocation } from '../utils/geolocation';

const CONTAINER_STYLES = {
    marginTop: "160px",
    width: "600px",
};
var prevResponse;
// todo: should find or update step wizard to pass data from event instead of mutating this state
const needHelpAnswers = [];

const Step1 = (props) => {
    const onSelectMedical = () => {
        needHelpAnswers.push({ type: 'need medical help' });
        prevResponse = needHelpAnswers[0].type;
        props.nextStep()

    };
    const onSelectOther = () => {
        needHelpAnswers.push({ type: 'other, non medical' });
        prevResponse = needHelpAnswers[0].type;
        props.nextStep()
    };

    return (
        <div>
            <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
            <h2 className="mb-5">What type of help do you need?</h2>
            <CheckBoxItem id="type-medical" label="Medical: I believe I might have symptoms of COVID-19." onSelect={onSelectMedical} />
            <CheckBoxItem id="type-other" label="Other Help: I need assistance getting groceries/medicine/etc." onSelect={onSelectOther} />
        </div>
    );

};

const Step2 = (props) => {

if (prevResponse === 'need medical help'){

  const onSelectEmergencyYes = () => {
      needHelpAnswers.push({two: "medical emergency" });
      prevResponse = needHelpAnswers[1].two;
      props.nextStep()

  };
  const onSelectEmergencyNo = () => {
      needHelpAnswers.push({two: "no medical emergency" });
      prevResponse = needHelpAnswers[1].two;
      props.nextStep()
  };
  const backButton = () => {
    props.previousStep();
  }
  return (
      <div>
          <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
          <h2 className="mb-5">Do you have any of the symptoms listed</h2>
          <ul>
            <li>Constant chest pain or pressure</li>
            <li>Extreme difficulty breathing</li>
            <li>Severe, constant dizziness or lightheadedness</li>
            <li>Slurred speech</li>
            <li>Difficulty waking up</li>
          </ul>
          <CheckBoxItem id="type-medical" label="Yes" onSelect={onSelectEmergencyYes} />
          <CheckBoxItem id="type-other" label="No" onSelect={onSelectEmergencyNo} />
      </div>
  );
}

if(prevResponse === 'other, non medical'){


    const selectLocationDetection = async () => {
        try {
            const location = await asyncGetGeoLocation();
            needHelpAnswers.push({ location });
        } catch {
            needHelpAnswers.push({ location:  'unknown' });
        } finally {
            props.nextStep();
        }
    };
    const rejectLocationDetection = () => {
        needHelpAnswers.push({ location: 'unknown' });
        props.nextStep()
    };

    return (

        <div>
            <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
            <h2 className="mb-5">Where are you located?</h2>
            <CheckBoxItem id="detect" label="Detect my location" onSelect={selectLocationDetection} />
            <CheckBoxItem id="reject" label="Doesn't matter" onSelect={rejectLocationDetection} />
        </div>
    );
  };

return (
  <h2> Something went wrong</h2>
);
}

const Step3 = withRouter((props) => {

if (prevResponse == "medical emergency"){
return(
  <div>
      <img  src={require('../assets/CovidScreener/emergency-stop.svg')} width="50" height="50"></img>


      <h2 className="mb-5">Call emergency services</h2>

      <ul>
        <li>Constant chest pain or pressure</li>
        <li>Extreme difficulty breathing</li>
        <li>Severe, constant dizziness or lightheadedness</li>
        <li>Slurred speech</li>
        <li>Difficulty waking up</li>
      </ul>

  </div>
);
}
if (prevResponse == "no medical emergency"){

    const ageAdult = () => {
        needHelpAnswers.push({three: "adult" });
        prevResponse = needHelpAnswers[1].two;
        props.nextStep()

    };
    const ageMinor = () => {
        needHelpAnswers.push({three: "minor" });
        prevResponse = needHelpAnswers[1].two;
        props.nextStep()
    };
    const ageSenior = () => {
        needHelpAnswers.push({three: "senior" });
        prevResponse = needHelpAnswers[1].two;
        props.nextStep()
    };
  return(
    <div>

      <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
      <h2 className="mb-5">What is your age range?</h2>
      <CheckBoxItem id="detect" label="< 18" onSelect={ageMinor} />
      <CheckBoxItem id="reject" label="18-64" onSelect={ageAdult} />
      <CheckBoxItem id="reject" label="65+" onSelect={ageSenior} />

    </div>
  );
}
if (prevResponse == "locationAllowed"){

      const [email, setEmail] = useState('');
      const onChange = (evt) => setEmail(evt.target.value);
      const onSubmit = () => {
          needHelpAnswers.push({ email });
          console.log("submit", { email, needHelpAnswers });
          localStorage.setItem('needHelpAnswers', needHelpAnswers);
          props.history.push({
              pathname: '/medical',
              data: { needHelpAnswers: needHelpAnswers }
          });
      };
      return (
          <div>
              <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
              <h2 className="mb-5">What is your email address?</h2>
              <div style={{ marginRight: '50px' }}>
                  <Form.Control className="mb-3" placeholder="Type your email" onChange={onChange} />
                  <Button block variant="primary" onClick={onSubmit}>Submit</Button>

              </div>
          </div>
      );
}
if (prevResponse == "locationRejected"){}


});
const Step4 = (props) => {

if (prevResponse == 'need medical help'){
  const onSelectMedical = () => {
      needHelpAnswers.push({ type: 'need medical help' });
      prevResponse = needHelpAnswers[0].type;
      props.nextStep()

  };
  const onSelectOther = () => {
      needHelpAnswers.push({ type: 'other, non medical' });
      props.nextStep()
  };
  const backButton = () => {
    props.previousStep();
  }
  return (
      <div>
          <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
          <h2 className="mb-5">Do you have any of the symptoms listed</h2>
          <ul>
            <li>Constant chest pain or pressure</li>
            <li>Extreme difficulty breathing</li>
            <li>Severe, constant dizziness or lightheadedness</li>
            <li>Slurred speech</li>
            <li>Difficulty waking up</li>
          </ul>
          <CheckBoxItem id="type-medical" label="Yes" onSelect={onSelectMedical} />
          <CheckBoxItem id="type-other" label="No" onSelect={onSelectOther} />
      </div>
  );
}
return (
  <h2> Something went wrong</h2>
);
if(prevResponse == 'other, non medical'){



    const selectLocationDetection = async () => {
        try {
            const location = await asyncGetGeoLocation();
            needHelpAnswers.push({ location });
        } catch {
            needHelpAnswers.push({ location:  'unknown' });
        } finally {
            props.nextStep();
        }
    };
    const rejectLocationDetection = () => {
        needHelpAnswers.push({ location: 'unknown' });
        props.nextStep()
    };

    return (

        <div>
            <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
            <h2 className="mb-5">Where are you located?</h2>
            <CheckBoxItem id="detect" label="Detect my location" onSelect={selectLocationDetection} />
            <CheckBoxItem id="reject" label="Doesn't matter" onSelect={rejectLocationDetection} />
        </div>
    );
};
}

export const NeedHelp = () => {
    return (
        <div className="mx-auto" style={CONTAINER_STYLES}>
            <StepWizard>
                <Step1 />
                <Step2 />
                <Step3 />
                <Step4 />
            </StepWizard>
        </div>
    );
}
