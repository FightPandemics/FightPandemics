import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import StepWizard from 'react-step-wizard';
import { Button, Form } from 'react-bootstrap';


import { CheckBoxItem } from "../components/CheckBoxItem";
import { asyncGetGeoLocation } from "../utils/geolocation";
import ProgressBar33 from '../assets/ProgressBar33.png'
import ProgressBar66 from '../assets/ProgressBar66.png'
import ProgressBar99 from '../assets/ProgressBar99.png'
import Step3 from "../pages/Step3";

const CONTAINER_STYLES = {
    marginTop: '160px',
    width: '600px',
};

// todo: should find or update step wizard to pass data from event instead of mutating this state
const needHelpAnswers = [];


const Step1 = props => {
    const onSelectMedical = () => {
        needHelpAnswers.push({ type: 'need medical help' });
        props.nextStep();
    };
    const onSelectOther = () => {
        needHelpAnswers.push({ type: 'other, non medical' });
        props.nextStep();
    };

    return (
        <div>
      
      
            <div className="progress-bar">
            <img src ={ProgressBar33} alt="progress-bar-33%"/>   
            </div>
            <br/>
            <h5 className="text-primary">
                Question {props.currentStep} / {props.totalSteps}
            </h5>
            <h2 className="mb-5">What type of help do you need?</h2>
            <CheckBoxItem
                id="type-medical"
                label="Medical: I believe I might have symptoms of COVID-19."
                onSelect={onSelectMedical}
            />
            <CheckBoxItem
                id="type-other"
                label="Other Help: I need assistance getting groceries/medicine/etc."
                onSelect={onSelectOther}
            />
        </div>
    );
};


const Step2 = (props) => {
    return (
        <div>

            <div className="progress-bar">
            <img src ={ProgressBar66} alt="progress-bar-66%"/>   
            </div>
            <br/>


            <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
            <h2 className="mb-5">Where are you located?</h2>
            <Form.Check style={CHECKBOX_STYLES} type="radio" id="detect">
                <Form.Check.Input style={CHECKBOX_INPUT_STYLES} type="radio" onChange={async () => {
                    try {
                        const location = await getGeoLocation();
                        WIZARD_STATE.answers.push({ location });
                    } catch {
                        WIZARD_STATE.answers.push({ location:  'unknown' });
                    } finally {
                        props.nextStep()
                    }
                }} />
                <Form.Check.Label style={CHECKBOX_LABEL_STYLES}>
                    Detect my location
                </Form.Check.Label>
            </Form.Check>
            <Form.Check style={CHECKBOX_STYLES} type="radio" id="location-unkonwn">
                <Form.Check.Input style={CHECKBOX_INPUT_STYLES} type="radio" onChange={() => {
                    WIZARD_STATE.answers.push({ location: 'unknown' });
                    props.nextStep()
                }}/>
                <Form.Check.Label style={CHECKBOX_LABEL_STYLES}>
                    Doesn't matter
                </Form.Check.Label>
            </Form.Check>
        </div>
    );
};


export const NeedHelp = () => {
    return (
        <div className="mx-auto" style={CONTAINER_STYLES}>
            <StepWizard>
                <Step1/>
                <Step2/>
                <Step3/>
            </StepWizard>
        </div>
    );
};
