import React from 'react';
import StepWizard from 'react-step-wizard';

const CONTAINER_STYLES = {
    marginTop: "160px",
    width: "600px",
};

// todo: should find or update step wizard to pass data from event instead of mutating this state
const WIZARD_STATE = {
    answers: [],
    currentStep: 0,
};

const Step1 = (props) => {
    return (
        <div>
            <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
            <h2 className="mb-5">What type of help can you give?</h2>
        </div>
    );
};

const Step2 = (props) => {
    return (
        <div>
            <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
            <h2 className="mb-5">Where are you located?</h2>
        </div>
    );
};

const Step3 = (props) => {
    return (
        <div>
            <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
            <h2 className="mb-5">What is your email address?</h2>
        </div>
    );
};

export const OfferHelp = () => {
    return (
        <div className="mx-auto" style={CONTAINER_STYLES}>
            <StepWizard>
                <Step1 />
                <Step2 />
                <Step3 />
            </StepWizard>
        </div>
    );
}
