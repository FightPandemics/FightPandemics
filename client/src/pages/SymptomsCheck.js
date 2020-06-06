import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Checkbox, Modal } from "antd-mobile";
import { theme } from "constants/theme";
import styled from "styled-components";
import { DARK_GRAY } from "constants/colors";

import {
  getAnswersMap,
  getCheckedAnswers,
  StyledWizard,
  WizardStep,
  WizardNav,
} from "components/StepWizard";
import Heading from "components/Typography/Heading";
import TextLabel from "components/Typography/TextLabel";

import ResultsPage from "./ResultsPage.js";
import Under18 from "./CovidScreening/Under18";
import Disclaimer from "assets/icons/disclaimer.svg";

const { typography, colors } = theme;

const INITIAL_STATE = {};

const SymptomCheckerStyle = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  text-align: center;
  .h4 {
    line-height: 1.5;
    margin-top: 5rem;
    margin-bottom: 3rem;
    text-align: center;
  }
  .ant-typography.title {
    margin-bottom: 3rem;
    line-height: 3rem;
    padding: 0 1rem;
  }
`;

const ColoredButton = styled.div`
  background-color: ${colors.royalBlue};
  width: 100%;
  color: ${colors.white};
  border-radius 5rem;
  padding: 1.5rem;
  text-align: center;
  font-weight: bold;
  margin: 2.2rem 0 .7rem;
  cursor: pointer;
`;

const TransparentButton = styled.div`
  background-color: ${colors.white};  
  width: 100%;
  color: ${colors.royalBlue};
  border-radius 5rem;
  padding: 1.5rem;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
`;

const ModalStyle = styled(Modal)`
  & .am-modal-body {
    flex-flow: row wrap;
    align-content: flex-start;
    align-items: flex-start;
    margin: 0;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    padding: 2.9rem 2.5rem 2.4rem;
    background: ${colors.white};
    overflow: auto;
    z-index: 1;
    .ant-typography {
      &.block-text {
        margin-bottom: 60px;
      }
    }
    & img.warning-icon {
      height: 4.41rem;
    }
    & > a {
      width: 100%;
    }
    .h4 {
      margin-bottom: 3rem;
      padding: 0 1rem;
      text-align: center;
    }
    h6 {
      font-weight: normal;
      line-height: 1.41;
      margin: 3.3rem 0 6rem;
      text-align: center;
    }
    & > div {
      width: 100%;
    }
    & .close {
      display: flex;
      justify-content: flex-end;
      & button {
        position: relative;
        padding: 0;
        border: none;
        background: transparent;
        cursor: pointer;
      }
    }
    & img {
      height: 4.42rem;
      margin: 1.6rem auto 2.88rem;
    }
  }
`;

const AlertModalStyle = styled(Modal)`
  & .am-modal-content {
    padding-top: 3.9rem !important;
    & .am-modal-body {
      padding: 0 4.4rem 4.4rem !important;
    }
  }
`;

const TitleStyle = styled.div`
  font-weight: bold;
  margin: 1rem 0 1.5rem;
  text-align: left;
`;

const SubtitleStyle = styled.h5`
  margin: 0;
`;

const StyledUl = styled.ul`
  text-align: left;
  padding: 0 0 0 2.5rem;
  margin: 4rem 0;
  color: rgba(0, 0, 0, 0.85);
`;

const AnswerStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.white};
  color: ${colors.black};
  width: 100%;
  font-family: ${typography.font.family.display}, sans-serif;
  font-size: ${typography.size.large};
  border: 0.1rem solid ${colors.royalBlue};
  border-radius: 0.8rem;
  box-sizing: border-box;
  cursor: pointer;
  padding: 2rem 2.5rem;
  margin: 1.5rem 0rem;
  text-align: left;
  &:hover,
  &.selected {
    background-color: ${colors.royalBlue};
    color: ${colors.white};
    span {
      color: ${colors.white};
    }
  }
  strong {
    display: block;
  }
  & .am-checkbox-wrapper {
    margin: 0 0 0 1rem;
  }
  & .am-checkbox-inner {
    border-radius: 0.3rem;
    border-color: transparent;
  }
  & .am-checkbox-checked > .am-checkbox-inner {
    background: ${colors.white};
    &::after {
      border-color: ${colors.royalBlue};
      border-right-width: 0.2rem;
      border-bottom-width: 0.2rem;
      margin: 0.1rem 0.1rem 0 0;
    }
  }
  & h6 {
    color: ${colors.darkGray};
    margin: 0 !important;
    text-align: left !important;
  }
`;

const AnswerButton = ({ children, onSelect }) => {
  return <AnswerStyles onClick={onSelect}>{children}</AnswerStyles>;
};

const AnswerCheckbox = ({ text, content, checked, onSelect }) => {
  return (
    <AnswerStyles onClick={onSelect} className={checked && "selected"}>
      <div>
        <TextLabel size={theme.typography.size.mediun} block="true">
          {text}
        </TextLabel>
        {content && (
          <TextLabel
            size={theme.typography.size.small}
            color={DARK_GRAY}
            block="true"
            weight="500"
          >
            {content}
          </TextLabel>
        )}
      </div>
      <Checkbox checked={checked} />
    </AnswerStyles>
  );
};

const Welcome = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const onSelectAnswer = (answer) => {
    props.update("symptoms", answer);
    props.nextStep();
  };

  return (
    <WizardStep alignItems="flex-start">
      <h5>Is this an emergency?</h5>
      <h3>
        <TitleStyle>
          Stop or call your local emergency number 911 if you or anyone else
          have any of these symptoms
        </TitleStyle>
      </h3>
      <StyledUl>
        <li>Severe, constant chest pain or pressure</li>
        <li>Extreme difficulty breathing</li>
        <li>Severe, constant light headedness</li>
        <li>Serious disorientation or unresponsiveness</li>
      </StyledUl>
      <AnswerButton onSelect={() => setOpenModal(true)}>
        Yes, they are experiencing at least one of these symptoms
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("yes")}>
        No, they do not have any of these symptoms
      </AnswerButton>
      <AlertModalStyle basic transparent visible={openModal}>
        <h4>
          Based on your reported symptoms, you should seek care immediately.
          <br />
          Call the emergency number!
        </h4>
        <ColoredButton onClick={() => setOpenModal(false)}>Close</ColoredButton>
      </AlertModalStyle>
    </WizardStep>
  );
};

const Step1 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("age", answer);
    props.nextStep();
  };

  return (
    <WizardStep alignItems="flex-start">
      <h5>
        Question {props.currentStep - 1} / {props.totalSteps - 1}
      </h5>
      <Heading level={3} className="h2" textAlign="left">
        How old are you?
      </Heading>
      <AnswerButton onSelect={() => onSelectAnswer("Under 18")}>
        Under 18
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("Between 18 and 64")}>
        Between 18 and 64
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("65 or older")}>
        65 or older
      </AnswerButton>
    </WizardStep>
  );
};

const STEP_2_ANSWERS = [
  "Fever, chills, or sweating",
  "Difficulty breathing (not severe)",
  "New or worsening cough",
  "Sore throat",
  "Aching throughout the body",
  "Vomiting or diarrhea",
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
    <WizardStep alignItems="flex-start">
      <h5>
        Question {props.currentStep - 1} / {props.totalSteps - 1}
      </h5>
      <Heading level={3} className="h2" textAlign="left">
        Are they experiencing any of these symptoms?
      </Heading>
      <SubtitleStyle>Multiple options can be selected.</SubtitleStyle>
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
  "Moderate to severe asthma or chronic lung disease",
  "Cancer treatment or medicines causing immune suppression",
  "Inherited immune system definicies or HIV",
  "Serious heart conditions, such as heart failure or prior heart attack",
  "Diabetes with complications",
  "Kidney failure that needs dialysis",
  "Cirrhosis of the liver",
  "Diseases or conditions that make it harder to cough",
  "Extreme obesity",
  "Pregnancy",
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
    <WizardStep alignItems="flex-start">
      <h5>
        Question {props.currentStep - 1} / {props.totalSteps - 1}
      </h5>
      <Heading level={3} className="h2" textAlign="left">
        Do any of these apply to them?
      </Heading>
      <SubtitleStyle>Multiple options can be selected.</SubtitleStyle>
      {Object.entries(answers).map(([answer, checked], i) => (
        <AnswerCheckbox
          key={i}
          text={answer}
          onSelect={() => toggleAnswer(answer)}
          checked={checked}
        />
      ))}
      <AnswerCheckbox
        text={"None of the above"}
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
    <WizardStep alignItems="flex-start">
      <h5>
        Question {props.currentStep - 1} / {props.totalSteps - 1}
      </h5>
      <Heading level={3} className="h2" textAlign="left">
        Have they traveled internationally in the last 14 days?
      </Heading>
      <AnswerButton onSelect={() => onSelectAnswer("yes")}>
        They have travelled internationally
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("no")}>
        <span>
          They have <b>not</b> travelled internationally
        </span>
      </AnswerButton>
    </WizardStep>
  );
};

const STEP_5_ANSWERS = [
  ["They live with someone who has COVID-19"],
  [
    "They’ve had close contact with someone who has COVID-19",
    "They were within 6 feet or 1.5 meteres of someone who’s sick, or were exposed to a cough or sneeze.",
  ],
  [
    "They’ve been near someone who has COVID-19",
    "They were at least 6 feet or 1.5 meters away and were not exposed to a sneeze or cough.",
  ],
  [
    "They’ve had no exposure",
    "They have not been in contact with anyone who has COVID-19.",
  ],
];

const STEP_5_STATE = {
  answers: getAnswersMap(STEP_5_ANSWERS),
  none: false,
};

const Step5 = (props) => {
  const [state, updateState] = useState(STEP_5_STATE);
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
    <WizardStep alignItems="flex-start">
      <h5>
        Question {props.currentStep - 1} / {props.totalSteps - 1}
      </h5>
      <Heading level={3} className="h2" textAlign="left">
        In the last 14 days, what was their exposure to others who are known to
        have COVID‑19?
      </Heading>
      <SubtitleStyle>Multiple options can be selected.</SubtitleStyle>
      {Object.entries(answers).map(([answer, checked], i) => (
        <AnswerCheckbox
          key={i}
          text={STEP_5_ANSWERS[i][0]}
          content={STEP_5_ANSWERS[i][1]}
          onSelect={() => toggleAnswer(answer)}
          checked={!none && checked}
        />
      ))}
    </WizardStep>
  );
};

const STEP_6_ANSWERS = [
  "They live in an area where COVID-19 is widespread",
  "They have visited an area where COVID-19 is widespread",
  "I’m not sure",
];

const STEP_6_STATE = {
  answers: getAnswersMap(STEP_6_ANSWERS),
  none: false,
};

const Step6 = (props) => {
  const [state, updateState] = useState(STEP_6_STATE);
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
    <WizardStep alignItems="flex-start">
      <h5>
        Question {props.currentStep - 1} / {props.totalSteps - 1}
      </h5>
      <Heading level={3} className="h2" textAlign="left">
        In the last 14 days, have they been in an area where COVID‑19 is
        widespread?
      </Heading>
      <SubtitleStyle>Multiple options can be selected.</SubtitleStyle>
      {Object.entries(answers).map(([answer, checked], i) => (
        <AnswerCheckbox
          key={i}
          text={STEP_6_ANSWERS[i]}
          onSelect={() => toggleAnswer(answer)}
          checked={!none && checked}
        />
      ))}
    </WizardStep>
  );
};

const Step7 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("careFacility", answer);
    props.nextStep();
  };

  return (
    <WizardStep alignItems="flex-start">
      <h5>
        Question {props.currentStep - 1} / {props.totalSteps - 1}
      </h5>
      <Heading level={3} className="h2" textAlign="left">
        Do they live in a care facility?
      </Heading>
      <SubtitleStyle>
        This includes a hospital, emergency room, other medical setting, or
        long-term care facility. Select all that apply.
      </SubtitleStyle>
      <AnswerButton onSelect={() => onSelectAnswer("currently living")}>
        I live in a long-term care facility
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("no")}>
        No, I don't live in a long-term care facility
      </AnswerButton>
    </WizardStep>
  );
};

const Step8 = (props) => {
  const onSelectAnswer = (answer) => {
    props.update("medicalFacility", answer);
    props.nextStep();
  };

  return (
    <WizardStep alignItems="flex-start">
      <h5>
        Question {props.currentStep - 1} / {props.totalSteps - 1}
      </h5>
      <Heading level={3} className="h2" textAlign="left">
        Do they work in a medical facility?
      </Heading>
      <SubtitleStyle>
        This includes a hospital, emergency room, other medical setting, or
        long-term care facility. Select all that apply.
      </SubtitleStyle>
      <AnswerButton onSelect={() => onSelectAnswer("worked")}>
        <div>
          They have worked in a hospital or other care facility in the past 14
          days
          <h6>This includes volunteering.</h6>
        </div>
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("plan to work")}>
        <div>
          They plan to work in a hospital or other care facility in the next 14
          days
          <h6>This includes volunteering.</h6>
        </div>
      </AnswerButton>
      <AnswerButton onSelect={() => onSelectAnswer("no")}>
        No, they don’t work or plan to work in a care facility
      </AnswerButton>
    </WizardStep>
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
  if (state.age === "Under 18") {
    return (
      <ModalStyle visible={true}>
        <div className="close">
          <button onClick={() => updateAnswers("age", null)}>
            <Icon type="cross" size="lg" />
          </button>
        </div>
        <img className="warning-icon" src={Disclaimer} />
        <Under18 />
        <Link to="/feed">
          <ColoredButton>Done</ColoredButton>
        </Link>
        <TransparentButton onClick={() => updateAnswers("age", null)}>
          Retake the Test
        </TransparentButton>
      </ModalStyle>
    );
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
  const forWho = (answer) => updateAnswers("forWho", answer);
  const confirmToStart = () => updateAnswers("confirmedStart", true);
  return (
    <SymptomCheckerStyle>
      <Heading level={4} className="h4">
        COVID-19 Screening Tool
      </Heading>
      <TextLabel
        block="true"
        textAlign="center"
        size={theme.typography.size.xlarge}
        className="title"
      >
        We will ask you a few questions about your symptoms, travels and
        contacts with others
      </TextLabel>
      <TextLabel
        className="block-text"
        block="true"
        size={theme.typography.size.xsmall}
        color={DARK_GRAY}
        textAlign="center"
      >
        Your answers will not be stored or shared. This is just a tool to help
        the world.
      </TextLabel>
      <ColoredButton onClick={() => forWho("myself")}>For Myself</ColoredButton>
      <TransparentButton onClick={() => forWho("someone")}>
        For Someone Else
      </TransparentButton>
      <ModalStyle visible={state.confirmedStart}>
        <div className="close">
          <button onClick={() => setState({})}>
            <Icon type="cross" size="lg" />
          </button>
        </div>
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
      </ModalStyle>
      <ModalStyle visible={state.forWho && !state.confirmedStart}>
        <div className="close">
          <button onClick={() => setState({})}>
            <Icon type="cross" size="lg" />
          </button>
        </div>
        <img className="warning-icon" src={Disclaimer} />
        <Heading level={4} className="h4">
          We are not a provider of healthcare services
        </Heading>
        <TextLabel
          className="block-text"
          block="true"
          size={theme.typography.size.medium}
        >
          This service is provided in good faith for those who are otherwise
          unable to obtain help and resources during this unprecedented public
          health emergency.
        </TextLabel>
        <TextLabel
          weight="bold"
          block="true"
          className="block-text"
          size={theme.typography.size.large}
          textAlign="center"
        >
          Please consult your healthcare provider for medical advice
        </TextLabel>
        <ColoredButton onClick={confirmToStart}>I understand</ColoredButton>
      </ModalStyle>
    </SymptomCheckerStyle>
  );
};

export default SymptomsCheck;
