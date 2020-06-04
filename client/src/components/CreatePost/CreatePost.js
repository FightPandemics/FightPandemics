import React, { useState, createContext, useContext } from "react";
import { Row, Col } from "antd";
import {
  Container,
  Option,
  TitleStep,
  OptionButton,
  BackButton,
  CreateProfileButton,
  CreateOrgLink,
} from "components/CreatePost/StyledPostAs";
import SubmitButton from "components/Button/SubmitButton";
import Form from "./Form/Form";
import SvgIcon from "components/Icon/SvgIcon";
import person from "assets/icons/person.svg";
import organization from "assets/icons/organization.svg";
import back from "assets/icons/back-arrow-gray.svg";
import closeButton from "assets/icons/close-btn.svg";
import { theme } from "constants/theme";

const { typography } = theme;

const CreatePostContext = createContext();

const organizations = [
  { id: 1, title: "Notion" },
  { id: 2, title: "Notion" },
];

const Step1 = () => {
  const createPostContext = useContext(CreatePostContext);
  const { currentStep, setCurrentStep } = createPostContext;
  return (
    currentStep === 1 && (
      <>
        <TitleStep>Continue Posting As</TitleStep>
        <Row gutter={14} justify="center">
          <Col span={12}>
            <Option
              img={person}
              text="Individual"
              onClick={() => setCurrentStep(3)}
            />
          </Col>
          <Col span={12}>
            <Option
              img={organization}
              text="Organisation"
              onClick={() => setCurrentStep(2)}
            />
          </Col>
        </Row>
      </>
    )
  );
};

const Step2 = () => {
  const createPostContext = useContext(CreatePostContext);
  const { setForm, currentStep, setCurrentStep } = createPostContext;
  return (
    currentStep === 2 && (
      <>
        <TitleStep>Posting as an Organisation</TitleStep>
        <BackButton src={back} onClick={() => setCurrentStep(1)} />
        {organizations.map((item) => {
          return (
            <OptionButton
              key={item.id}
              onClick={() => {
                setForm({ organization: item });
                setCurrentStep(3);
              }}
            >
              {item.title}
            </OptionButton>
          );
        })}
        <CreateOrgLink to={""}>Create new one</CreateOrgLink>
      </>
    )
  );
};

const Step3 = ({ onCancel }) => {
  const { currentStep, setCurrentStep } = useContext(CreatePostContext);
  if (currentStep !== 3) return null;
  return (
    <Form
      setCurrentStep={setCurrentStep}
      onClose={() => {
        setCurrentStep(1);
        onCancel();
      }}
    />
  );
};

const Wrapper = ({ onCancel, visible, children }) => {
  const { currentStep } = useContext(CreatePostContext);
  return (
    <Container
      title={" "}
      style={{ textAlign: "center", overflowY: "hidden" }}
      footer={null}
      visible={visible && currentStep !== 3}
      destroyOnClose={true}
      closeIcon={
        <SvgIcon
          src={closeButton}
          style={{
            position: "absolute",
            right: "4.0rem",
            top: "1.7rem",
            filter: currentStep === 4 ? "" : "brightness(0.6)",
          }}
        />
      }
      onCancel={onCancel}
      currentStep={currentStep}
    >
      {children}
    </Container>
  );
};

const Step4 = () => {
  const createPostContext = useContext(CreatePostContext);
  const { setForm, currentStep, setCurrentStep } = createPostContext;
  return (
    currentStep === 4 && (
      <>
        <TitleStep fontSize={typography.size.xlarge} currentStep={currentStep}>
          Success
        </TitleStep>
        <CreateProfileButton primary>Create Profile</CreateProfileButton>
        <CreateOrgLink to={""}>Skip</CreateOrgLink>
      </>
    )
  );
};

const CreatePost = (props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({});

  return (
    <CreatePostContext.Provider
      value={{ form, setForm, currentStep, setCurrentStep }}
    >
      <Wrapper {...props}>
        <Step1 />
        <Step2 />
        <Step4 />
      </Wrapper>
      <Step3 {...props} />
    </CreatePostContext.Provider>
  );
};

export default CreatePost;
