import React from 'react';
import { Button, Form } from 'react-bootstrap';
import StepWizard from 'react-step-wizard';
import ProgressBar25 from '../assets/ProgressBar25.png'
import ProgressBar33 from '../assets/ProgressBar33.png'
import ProgressBar50 from '../assets/ProgressBar50.png'
import ProgressBar66 from '../assets/ProgressBar66.png'
import ProgressBar75 from '../assets/ProgressBar75.png'

const CONTAINER_STYLES = {
    marginTop: "160px",
    width: "600px",
};

const CHECKBOX_STYLES = {
    display: 'flex',
    border: '1px solid #bbb',
    borderRadius: '3px',
    padding: '15px',
    margin: '15px 50px 15px 0',
};

const CHECKBOX_INPUT_STYLES = {
    cursor: 'pointer',
    margin: '15px',
    position: 'relative',
};

const CHECKBOX_LABEL_STYLES = {
    cursor: 'pointer',
    display: 'block',
    margin: '15px',
};

const getGeoLocation = () => {
    return new Promise((resolve, reject) => {
        const onGeoSuccess = (pos) => {
            const { coords } = pos;
            console.log('got pos:', { pos });
            resolve(coords);
        };
        const onGeoError = () => {
            reject(new Error('failed getting location'));
        };
        navigator.geolocation.getCurrentPosition(onGeoSuccess,onGeoError);
    })
};

// todo: should find or update step wizard to pass data from event instead of mutating this state
const WIZARD_STATE = {
    answers: [],
    currentStep: 0,
};

/*const Step1 = (props) => {
    return (
        <div>
            <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
            <h2 className="mb-5">What type of help can you give?</h2>
        </div>
    );
};*/

const Step1 = (props) => {
    return (
        <div>

            <div className="progress-bar">
            <img src ={ProgressBar25} alt="progress-bar-25%"/>   
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
                    Do not detect my location
                </Form.Check.Label>
            </Form.Check>
        </div>
    );
};

const Step2 = (props) => {
    return (
        <div>

<           div className="progress-bar">
            <img src ={ProgressBar50} alt="progress-bar-50%/"/>   
            </div>
            <br/>

            <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
            <h5 className="mb-4">We are not a provider of healthcare services.</h5>
            <h6 className="mb-5">This service is provided in good faith as a last resort for those who are otherwise unable
              to obtain help and resource during the unprecedented public health emergency.</h6>
            <strong><h4 className="mb-4">Please consult a medical professional for advice.</h4></strong>
            <div style={{ marginRight: '50px' }}>
                <Button block variant="primary" onClick={() => {
                  WIZARD_STATE.answers.push({ type: 'i understand' });
                  props.nextStep()
                }}>I Understand</Button>
            </div>
        </div>
    );
};

const Step3 = (props) => {
    return (
        <div>

            <div className="progress-bar">
            <img src ={ProgressBar75} alt="progress-bar-75%"/>   
            </div>
            <br/>



            <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
            <h2 className="mb-5">How do you want to contribute?</h2>
            <Form.Check style={CHECKBOX_STYLES} type="radio" id="type-vol">
                <Form.Check.Input style={CHECKBOX_INPUT_STYLES} type="radio" onChange={() => {
                    WIZARD_STATE.answers.push({ type: 'as a volunteer' });
                    props.nextStep()
                }} />
                <Form.Check.Label style={CHECKBOX_LABEL_STYLES}>
                    As a volunteer
                </Form.Check.Label>
            </Form.Check>
            <Form.Check style={CHECKBOX_STYLES} type="radio" id="type-doc-inv">
                <Form.Check.Input style={CHECKBOX_INPUT_STYLES} type="radio" onChange={() => {
                    WIZARD_STATE.answers.push({ type: 'as a doctor investor' });
                    props.nextStep()
                }}/>
                <Form.Check.Label style={CHECKBOX_LABEL_STYLES}>
                    As a Doctor / Investor
                </Form.Check.Label>
            </Form.Check>
            <Form.Check style={CHECKBOX_STYLES} type="radio" id="type-org">
                <Form.Check.Input style={CHECKBOX_INPUT_STYLES} type="radio" onChange={() => {
                    WIZARD_STATE.answers.push({ type: 'as a organisation' });
                    props.nextStep()
                }}/>
                <Form.Check.Label style={CHECKBOX_LABEL_STYLES}>
                    As a Organisation
                </Form.Check.Label>
            </Form.Check>
        </div>
    );
};

const Step4 = (props) => {
    return (
        <div>
            <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
            <h2 className="mb-5">What is your email address?</h2>
            <div style={{ marginRight: '50px' }}>
                <Form.Control className="mb-3" placeholder="Type your email" />
                <Button block variant="primary" onClick={() => {}}>Submit</Button>
            </div>
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
                <Step4 />
            </StepWizard>
        </div>
    );
}
