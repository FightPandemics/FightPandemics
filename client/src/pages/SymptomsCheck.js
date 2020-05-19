import React, { useState} from "react";
import {
  AnswerButton,
  AnswerCheckbox,
  getAnswersMap,
  getCheckedAnswers,
  StyledWizard,
  WizardContainer,
  WizardStep,
  WizardNav,
} from "components/StepWizard";
import ResultsPage from "./ResultsPage.js";
import Under18 from "./CovidScreening/Under18";

const INITIAL_STATE = {};

const Welcome = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("symptoms", answer);
    props.nextStep();
  };

  return (
    <WizardStep>
      <h6 className="text-primary">Before you start</h6>
      <h5 className="mb-5">
        Stop or call your local emergency number 911 if you or anyone else have
        any of these symptoms
      </h5>
      <ol>
        <li>Constant chest pain or pressure</li>
        <li>Extreme difficulty breathing</li>
        <li>Severe, constant dizziness or lightheadedness</li>
        <li>Slurred speech</li>
        <li>Difficulty waking up </li>
      </ol>
      <AnswerButton onSelect={() => onSelectAnswer("yes")}>
        <strong>Medical:</strong> I believe I might have symptoms of COVID-19.
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("yes")}>
        <strong>Medical:</strong> I do not have symptoms.
      </AnswerButton>
    </WizardStep>
  );
};
const Step1 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("age", answer);
    props.nextStep();
  };

  return (
    <WizardStep>
      <h5 className="text-primary">
        Question {props.currentStep - 1} / {props.totalSteps - 2}
      </h5>
      <h2 className="mb-5">How old are you?</h2>
      <AnswerButton onSelect={() => onSelectAnswer("under 18")}>
        under 18
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("18-64")}>
        18-64
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("65+")}>65+</AnswerButton>
    </WizardStep>
  );
};

const STEP_2_ANSWERS = [
  "Sore throat",
  "Aching throughout the body",
  "Vomiting or diarrhea",
  "Fever, chills or sweating",
  "Difficulty breathing",
  "New or worsening cough",
];

const STEP_2_STATE = {
  answers: getAnswersMap(STEP_2_ANSWERS),
  none: false,
};

const Step2 = (props) => {
  const [state, updateState] = useState(STEP_2_STATE);
  const { answers, none } = state;
  const toggleAnswer = (answer) => {
    const updatedAnswers = { ...answers, [answer]: !answers[answer] };
    const checkedAnswers = getCheckedAnswers(updatedAnswers);
    updateState({ ...state, answers: updatedAnswers });
    props.update("symptoms", checkedAnswers);
  };
  const toggleNone = () => {
    const newNone = !none;
    updateState({ ...state, none: newNone });
    props.update("symptoms", newNone ? [] : getCheckedAnswers(answers));
  };

  return (
    <WizardStep>
      <h5 className="text-primary">
        Question {props.currentStep - 1} / {props.totalSteps - 2}
      </h5>
      <h2 className="mb-5">
        Do you have any of these symptoms? Please, select all that apply:
      </h2>
      {Object.entries(answers).map(([answer, checked], i) => (
        <AnswerCheckbox
          key={i}
          text={answer}
          onSelect={() => toggleAnswer(answer)}
          checked={!none && checked}
        />
      ))}
      <AnswerCheckbox
        text={"None of these"}
        onSelect={toggleNone}
        checked={none}
      />
    </WizardStep>
  );
};

const STEP_3_ANSWERS = [
  "Diseases or conditions that make it hard to cough",
  "Kidney failure that needs dialysis",
  "Cirrhosis of the liver",
  "Asthma or chronic lung disease",
  "Diabetes with complications",
  "Extreme obesity",
  "Weakened immune system",
  "Congestive heart failure",
];

const STEP_3_STATE = {
  answers: getAnswersMap(STEP_3_ANSWERS),
  none: false,
};

const Step3 = (props) => {
  const [state, updateState] = useState(STEP_3_STATE);
  const { answers, none } = state;
  const toggleAnswer = (answer) => {
    const updatedAnswers = { ...answers, [answer]: !answers[answer] };
    const checkedAnswers = getCheckedAnswers(updatedAnswers);
    updateState({ ...state, answers: updatedAnswers });
    props.update("conditions", checkedAnswers);
  };
  const toggleNone = () => {
    const newNone = !none;
    updateState({ ...state, none: newNone });
    props.update("conditions", newNone ? [] : getCheckedAnswers(answers));
  };

  return (
    <WizardStep>
      <h5 className="text-primary">
        Question {props.currentStep - 1} / {props.totalSteps - 2}
      </h5>
      <h2 className="mb-5">
        Do you have any of these pre-existing medical conditions? Please, select
        all that apply.
      </h2>
      {Object.entries(answers).map(([answer, checked], i) => (
        <AnswerCheckbox
          key={i}
          text={answer}
          onSelect={() => toggleAnswer(answer)}
          checked={!none && checked}
        />
      ))}
      <AnswerCheckbox
        text={"None of these"}
        onSelect={toggleNone}
        checked={none}
      />
    </WizardStep>
  );
};

const Step4 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("traveledLast14Days", answer);
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep - 1} / {props.totalSteps - 2}
      </h5>
      <h2 className="mb-5">
        Have you traveled internationally during the last 2 weeks?
      </h2>
      <AnswerButton onSelect={() => onSelectAnswer("yes")}>Yes</AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("no")}>No</AnswerButton>
    </div>
  );
};

const Step5 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("exposureAreaLast2Weeks", answer);
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep - 1} / {props.totalSteps - 2}
      </h5>
      <h2 className="mb-5">
        If so, have you traveled to an area severely affected by the COVID-19
        outbreak?
      </h2>
      <AnswerButton onSelect={() => onSelectAnswer("live")}>
        I live in an area severely affected by the COVID-19 outbreak
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("visited")}>
        I have visited an area severely affected by the COVID-19 outbreak
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("none")}>
        None of these apply
      </AnswerButton>
    </div>
  );
};

const Step6 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("exposureLast14Days", answer);
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep - 1} / {props.totalSteps - 2}
      </h5>
      <h2 className="mb-5">
        Accordingly to what you know, have you been exposed to others who are
        known to have COVID-19 during the last 2 weeks? Please, select all that
        apply.
      </h2>
      <AnswerButton onSelect={() => onSelectAnswer("live with")}>
        I live with someone who has COVID-19
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("close contact")}>
        I had close contact with someone with COVID-19 (10 minutes or more spent
        together within 6 feet from each other or were exposed to their sneeze
        or cough)
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("near someone 6ft")}>
        I was near someone with COVID-19 (at least 6-feet away and not exposed
        to their cough or sneeze)
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("no exposure")}>
        No exposure
      </AnswerButton>
    </div>
  );
};

const Step7 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("careFacility", answer);
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep -1 } / {props.totalSteps - 2 }
      </h5>
      <h2 className="mb-5">
        Do you live in a care facility? This includes nursing homes or assisted
        living facilities.
      </h2>
      <AnswerButton onSelect={() => onSelectAnswer("currently living")}>
        I live in a long-term care facility
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("no")}>
        No, I don't live in a long-term care facility
      </AnswerButton>
    </div>
  );
};

const Step8 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("medicalFacility", answer);
    props.nextStep();
  };

  return (
    <div>
      <h5 className="text-primary">
        Question {props.currentStep -1} / {props.totalSteps -2}
      </h5>
      <h2 className="mb-5">
        Do you live in a medical facility? This includes a hospital, emergency
        room, other medical setting, or long-term care facility. Select all that
        apply.
      </h2>
      <AnswerButton onSelect={() => onSelectAnswer("worked")}>
        I have worked in a hospital, or other care facility in the past 14 days
        This includes volunteering.
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("plan to work")}>
        I plan to work in hospital, or other care facility in the next 14 days
        This includes volunteering.
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("no")}>
        No, I don't work or plan to work in a care facility
      </AnswerButton>
    </div>
  );
};

const SymptomsCheck = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const updateAnswers = (key, value) => {
    setState({ ...state, [key]: value });
  };
  localStorage.setItem("symptomsCheckAnswers", JSON.stringify(state));
  console.log(state, " state++++");
  let displayMessage = [];
  if (state.age === "under 18") {
    return <Under18 />;
  }
  const {
    age,
    traveledLast14Days,
    exposureAreaLast2Weeks,
    exposureLast14Days,
    conditions,
    symptoms,
    careFacility,
    medicalFacility,
  } = state;

  //message 1
  let condition1 =
    age === "18-64" &&
    (traveledLast14Days === "yes" ||
      exposureLast14Days === "live with" ||
      exposureLast14Days === "near someone 6ft" ||
      exposureLast14Days === "close contact" ||
      exposureAreaLast2Weeks === "live" ||
      exposureAreaLast2Weeks === "visited") &&
    conditions !== undefined &&
    conditions.length === 0 &&
    symptoms !== undefined &&
    symptoms.length >= 0 &&
    careFacility === "no" &&
    medicalFacility === "no";

  let condition2 =
    age === "18-64" &&
    traveledLast14Days === "no" &&
    exposureLast14Days === "no exposure" &&
    exposureAreaLast2Weeks === "none" &&
    careFacility === "no" &&
    medicalFacility === "no" &&
    conditions !== undefined &&
    conditions.length === 0 &&
    symptoms !== undefined &&
    symptoms.length >= 0;

  let condition3 =
    age === "65+" &&
    traveledLast14Days === "no" &&
    exposureLast14Days === "no exposure" &&
    exposureAreaLast2Weeks === "none" &&
    careFacility === "no" &&
    medicalFacility === "no" &&
    conditions !== undefined &&
    conditions.length === 0 &&
    symptoms !== undefined &&
    symptoms.length >= 0;

  let condition4 =
    (age === "18-64" && symptoms !== undefined && symptoms.length === 0) ||
    (age === "65+" && symptoms !== undefined && symptoms.length === 0);

  if (condition1 || condition2 || condition3 || condition4) {
    displayMessage.push(
      "No test needed at this time",
      "As of now your answers suggest you do not need to get tested. If anything changes, take the questionnaire again.",
    );
  }

  //message 2
  if (
    (age === "65+" || age === "18-64") &&
    symptoms !== undefined &&
    symptoms.length >= 0
  ) {
    displayMessage.push(
      "Monitor Symptoms",
      "Watch for COVID-19 symptoms such as cough, fever and difficulty breathing. If your symptoms get worse contact your doctor's office.",
    );
  }

  //message 3
  let condition5 =
    (age === "18-64" || age === "65+") &&
    symptoms !== undefined &&
    symptoms.length >= 0 &&
    (traveledLast14Days === "yes" ||
      exposureLast14Days === "live with" ||
      exposureLast14Days === "near someone 6ft" ||
      exposureLast14Days === "close contact" ||
      exposureAreaLast2Weeks === "live" ||
      exposureAreaLast2Weeks === "visited") &&
    careFacility === "no" &&
    (medicalFacility === "worked" || medicalFacility === "plan to work");

  let condition6 =
    (age === "18-64" || age === "65+") &&
    symptoms !== undefined &&
    symptoms.length >= 0 &&
    conditions !== undefined &&
    conditions.length >= 0 &&
    (traveledLast14Days === "yes" ||
      exposureLast14Days === "live with" ||
      exposureLast14Days === "near someone 6ft" ||
      exposureLast14Days === "close contact" ||
      exposureAreaLast2Weeks === "live" ||
      exposureAreaLast2Weeks === "visited") &&
    careFacility === "no" &&
    medicalFacility === "no";

  let condition7 =
    age === "65+" &&
    symptoms !== undefined &&
    symptoms.length >= 0 &&
    (traveledLast14Days === "yes" ||
      exposureLast14Days === "live with" ||
      exposureLast14Days === "near someone 6ft" ||
      exposureLast14Days === "close contact" ||
      exposureAreaLast2Weeks === "live" ||
      exposureAreaLast2Weeks === "visited") &&
    careFacility === "no" &&
    medicalFacility === "no";

  let condition8 =
    (age === "18-64" || age === "65+") &&
    symptoms !== undefined &&
    symptoms.length >= 0 &&
    conditions !== undefined &&
    conditions.length >= 0 &&
    traveledLast14Days === "no" &&
    exposureLast14Days === "no exposure" &&
    exposureAreaLast2Weeks === "none" &&
    careFacility === "no";

  if (condition5 || condition6 || condition7 || condition8) {
    displayMessage.push(
      "Talk to someone about Testing",
      "Your answers suggest you may need to get tested for COVID-19. You should get in touch with your doctor's office or your state or local health department for more information. Testing access may vary by location and provider.",
    );
  }

  //message 4
  let condition9 =
    (age === "18-64" || age === "65+") &&
    symptoms !== undefined &&
    symptoms.length >= 0 &&
    (medicalFacility === "plan to work" || medicalFacility === "worked");

  if (condition9) {
    displayMessage.push(
      "Call your Work Health Provider",
      "You should notify your work place of your current symptoms as quickly as you can. This is vital to slowing the spread of COVID-19.",
    );
  }

  //message 5
  let condition10 =
    (age === "18-64" || age === "65+") &&
    symptoms !== undefined &&
    symptoms.length >= 0 &&
    careFacility === "yes";
  if (condition10) {
    displayMessage.push(
      "Call your Doctor or Care Team",
      "You should discuss your symptoms with the doctors or care team that look after your facility. Your doctor's response time may vary depending on number of cases in your region",
    );
  }

  //message 6
  if (
    (age === "18-64" || age === "65+") &&
    symptoms !== undefined &&
    symptoms.length >= 0
  ) {
    displayMessage.push(
      "Isolate from others",
      "You should try to stay away from others for at least 7 days from when the symptoms first appeared. Your isolation can end if your symptoms improve significantly and if you have had no fever for at least 72 hours without the use of medicine. By isolating yourself, you can slow the spread of COVID-19 and protect others.",
    );
  }

  //message 7
  let condition11 =
    (age === "18-64" || age === "65+") &&
    symptoms !== undefined &&
    symptoms.length === 0 &&
    (traveledLast14Days === "yes" ||
      exposureLast14Days === "live with" ||
      exposureLast14Days === "near someone 6ft" ||
      exposureLast14Days === "close contact" ||
      exposureAreaLast2Weeks === "live" ||
      exposureAreaLast2Weeks === "visited") &&
    medicalFacility === "no";

  if (condition11) {
    displayMessage.push(
      "Quarantine at Home",
      "You have been exposed. You should stay Home for the next 14 days and see if any symptoms appear",
      "You should also try and limit your contact with others outside the home",
    );
  }

  //message 8
  let condition12 =
    (age === "18-64" || age === "65+") &&
    symptoms !== undefined &&
    symptoms.length === 0 &&
    traveledLast14Days === "no" &&
    exposureLast14Days === "no exposure" &&
    exposureAreaLast2Weeks === "none" &&
    medicalFacility === "no";

  let condition13 =
    (age === "18-64" || age === "65+") &&
    symptoms !== undefined &&
    symptoms.length === 0 &&
    (medicalFacility === "plan to work" || medicalFacility === "worked");

  if (condition12 || condition13) {
    displayMessage.push(
      "Maintain Social Distance",
      "Small but important steps can slow the spread of COVID-19. Avoid groups of people and keep six feet apart from anyone who's not part of the household. Especially avoid those showing symptoms.",
    );
  }

  //message 9
  let condition14 =
    (age === "18-64" || age === "65+") &&
    symptoms !== undefined &&
    symptoms.length === 0 &&
    conditions !== undefined &&
    conditions.length >= 0 &&
    (traveledLast14Days === "yes" ||
      exposureLast14Days === "live with" ||
      exposureLast14Days === "near someone 6ft" ||
      exposureLast14Days === "close contact" ||
      exposureAreaLast2Weeks === "live" ||
      exposureAreaLast2Weeks === "visited") &&
    medicalFacility === "no";

  let condition15 =
    (age === "18-64" || age === "65+") &&
    symptoms !== undefined &&
    symptoms.length === 0 &&
    traveledLast14Days === "yes" &&
    (exposureLast14Days === "live with" ||
      exposureLast14Days === "near someone 6ft" ||
      exposureLast14Days === "close contact" ||
      exposureAreaLast2Weeks === "live" ||
      exposureAreaLast2Weeks === "visited") &&
    careFacility === "no" &&
    medicalFacility === "no";

  if (condition14 || condition15) {
    displayMessage.push(
      "Monitor Symptoms",
      "Watch for COVID-19 symptoms such as cough, fever, difficulty breathing. Also check your temperature twice a day for two weeks. If symptoms get worse, call your doctor.",
    );
  }

  /**
   * 1: how old are you state.age
   * 2: Are you experiencing any of these symptoms state.symptoms
   * 3:pre-existing  medical conditions (Do any of these apply to you) state.conditions
   * 4: last 14 days travel state.traveledLast14Days==="yes"
   * 5: last 14 days exposure  state.exposureLast14Days==="live with" state.exposureLast14Days: "near someone 6ft" state.exposureLast14Days: "close contact"
   * 6:last 14 days area state.exposureAreaLast2Weeks === "live"
   * 7: live in a care facility state.careFacility === "no"
   * 8: work in a medical facility same as 8 on our platform
   */

  //message 10
  let condition16 =
    age === "65+" &&
    symptoms !== undefined &&
    symptoms.length === 0 &&
    conditions !== undefined &&
    conditions.length >= 0 &&
    traveledLast14Days === "no" &&
    exposureLast14Days === "no exposure" &&
    exposureAreaLast2Weeks === "none" &&
    medicalFacility === "no";

  if (condition16) {
    displayMessage.push(
      "Ask about your Medications",
      "If you are currently taking prescription medication, you should contact your doctor's office about getting a 30-day supply.",
    );
  }

  //message 11
  let condition17 =
    (age === "18-64" || age === "65+") &&
    symptoms !== undefined &&
    symptoms.length === 0 &&
    traveledLast14Days === "yes" &&
    (exposureLast14Days === "live with" ||
      exposureLast14Days === "near someone 6ft" ||
      exposureLast14Days === "close contact" ||
      exposureAreaLast2Weeks === "live" ||
      exposureAreaLast2Weeks === "visited") &&
    careFacility === "no" &&
    medicalFacility === "no";

  if (condition17) {
    displayMessage.push(
      "Take Precautions to Protect Others",
      "You may need to wear a mask to help protect yourself and those around you.",
    );
  }

  //message 12
  let condition18 =
    (age === "18-64" || age === "65+") &&
    symptoms !== undefined &&
    symptoms.length > 0;

  if (condition18) {
    displayMessage.push(
      "Rest and Take care",
      "Eat well, drink fluids, and get plenty of rest.",
    );
  }

  return (
    <WizardContainer className="mx-auto">
      <StyledWizard isHashEnabled nav={<WizardNav />}>
        <Welcome update={updateAnswers} />
        <Step1 hashKey={"Step1"} update={updateAnswers} />
        <Step2 hashKey={"Step2"} update={updateAnswers} />
        <Step3 hashKey={"Step3"} update={updateAnswers} />
        <Step4 hashKey={"Step4"} update={updateAnswers} />
        <Step5 hashKey={"Step5"} update={updateAnswers} />
        <Step6 hashKey={"Step6"} update={updateAnswers} />
        <Step7 hashKey={"Step7"} update={updateAnswers} />
        <Step8 hashKey={"Step8"} update={updateAnswers} />
        <ResultsPage val={state} msg={displayMessage} />
      </StyledWizard>
    </WizardContainer>
  );
};

export default SymptomsCheck;
