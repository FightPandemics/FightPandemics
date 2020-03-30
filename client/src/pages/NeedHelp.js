import React from 'react';
import { Button, Form } from 'react-bootstrap';
import StepWizard from 'react-step-wizard';
import ProgressBar33 from '../assets/ProgressBar33.png'
import ProgressBar66 from '../assets/ProgressBar66.png'
import ProgressBar99 from '../assets/ProgressBar99.png'
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

// todo: should find or update step wizard to pass data from event instead of mutating this state
const WIZARD_STATE = {
    answers: [],
    currentStep: 0,
};

const Step1 = (props) => {
    return (
        <div>

            <div className="progress-bar">
            <img src ={ProgressBar33} alt="progress-bar-33%"/>   
            </div>
            <br/>

            <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
            <h2 className="mb-5">What type of help do you need?</h2>
            <Form.Check style={CHECKBOX_STYLES} type="radio" id="type-medical">
                <Form.Check.Input style={CHECKBOX_INPUT_STYLES} type="radio" onChange={() => {
                    WIZARD_STATE.answers.push({ type: 'need medical help' });
                    props.nextStep()
                }} />
                <Form.Check.Label style={CHECKBOX_LABEL_STYLES}>
                    Medical: I believe I might have symptoms of COVID-19.
                </Form.Check.Label>
            </Form.Check>
            <Form.Check style={CHECKBOX_STYLES} type="radio" id="type-other">
                <Form.Check.Input style={CHECKBOX_INPUT_STYLES} type="radio" onChange={() => {
                    WIZARD_STATE.answers.push({ type: 'other, non medical' });
                    props.nextStep()
                }}/>
                <Form.Check.Label style={CHECKBOX_LABEL_STYLES}>
                    Other Help: I need assistance getting groceries/medicine/etc.
                </Form.Check.Label>
            </Form.Check>
        </div>
    );
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

const Step3 = (props) => {
    return (
        <div>

<div className="progress-bar">
            <img src ={ProgressBar99} alt="progress-bar-99%"/>   
            </div>
            <br/>
            <h5 className="text-primary">Question {props.currentStep} / {props.totalSteps}</h5>
            <h2 className="mb-5">What is your email address?</h2>
            <div style={{ marginRight: '50px' }}>
                <Form.Control className="mb-3" placeholder="Type your email" />
                <Button block variant="primary" onClick={() => {}}>Submit</Button>
            </div>
        </div>
    );
};

export const NeedHelp = () => {
    // const [state, setState] = useState(INITIAL_STATE);
    return (
        <div className="mx-auto" style={CONTAINER_STYLES}>
            <StepWizard onStepChange={(step, answer) => {
                console.log({ step, answer })
                /*setState({
                    answers: [...state.answers, answer],
                    currentStep: state.currentStep +1,
                });*/
            }}>
                <Step1 />
                <Step2 />
                <Step3 />
            </StepWizard>
        </div>
    );
}
