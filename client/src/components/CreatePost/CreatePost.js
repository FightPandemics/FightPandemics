import React, { useState, createContext, useContext } from "react";
import { Row, Col } from "antd";
import {
  ADD_OPTION,
  REMOVE_OPTION,
  REMOVE_ALL_OPTIONS,
  TOGGLE_STATE,
  SET_VALUE,
  SET_POSTS,
} from "hooks/actions/feedActions";
import { theme } from "constants/theme";
import {
  Container,
  Option,
  CloseButton,
  TitleStep,
  Button,
  BackButton,
  CreateOrgLink,
} from "components/CreatePost/StyledPostAs";
import Form from "./Form";
import person from "assets/icons/person.svg";
import organization from "assets/icons/organization.svg";
import back from "assets/icons/back-arrow-gray.svg";

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
              text="Organization"
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
        <TitleStep>Posting as an Organization</TitleStep>
        <BackButton src={back} onClick={() => setCurrentStep(1)} />
        {organizations.map((item) => {
          return (
            <Button
              key={item.id}
              onClick={() => {
                setForm({ organization: item });
                setCurrentStep(3);
              }}
            >
              {item.title}
            </Button>
          );
        })}
        <CreateOrgLink>Create new one</CreateOrgLink>
      </>
    )
  );
};

const Step3 = ({ onCancel }) => {
  const { currentStep, setCurrentStep } = useContext(CreatePostContext);
  if (currentStep !== 3) return null;
  return (
    <Form
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
      title={"Holder"}
      style={{ textAlign: "center" }}
      footer={null}
      visible={visible && currentStep !== 3}
      destroyOnClose={true}
      closeIcon={CloseButton}
      onCancel={onCancel}
    >
      {children}
    </Container>
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
      </Wrapper>
      <Step3 {...props} />
    </CreatePostContext.Provider>
  );
};

export default CreatePost;
