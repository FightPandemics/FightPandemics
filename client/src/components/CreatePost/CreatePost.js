import React, { useState, createContext, useContext } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import {
  Container,
  Option,
  TitleStep,
  OptionButton,
  BackButton,
  CreateOrgLink,
  ViewPostButton,
} from "components/CreatePost/StyledPostAs";
import TabForms from "./Form/TabForms";
import SvgIcon from "components/Icon/SvgIcon";
import person from "assets/icons/person.svg";
import organization from "assets/icons/organization.svg";
import back from "assets/icons/back-arrow-gray.svg";
import closeButton from "assets/icons/close-btn.svg";
import { theme } from "constants/theme";

const { typography } = theme;

export const CreatePostContext = createContext();

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

const Step2 = ({ user }) => {
  const createPostContext = useContext(CreatePostContext);
  const { setForm, currentStep, setCurrentStep } = createPostContext;

  return (
    currentStep === 2 && (
      <>
        <TitleStep>Posting as an Organisation</TitleStep>
        <BackButton src={back} onClick={() => setCurrentStep(1)} />
        {user.organizations?.map((item) => {
          const { _id: organizationId } = item;
          return (
            <OptionButton
              key={organizationId}
              onClick={() => {
                setForm({ organizationId });
                setCurrentStep(3);
              }}
            >
              {item.name}
            </OptionButton>
          );
        })}
        <CreateOrgLink to={"/create-organization-profile"}>
          Create new one
        </CreateOrgLink>
      </>
    )
  );
};

const Step3 = ({ onCancel }) => {
  const { currentStep, setCurrentStep, setPostId } = useContext(
    CreatePostContext,
  );
  if (currentStep !== 3) return null;
  return (
    <TabForms
      setCurrentStep={setCurrentStep}
      onClose={() => {
        setCurrentStep(1);
        onCancel();
      }}
      setPostId={setPostId}
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
  const { currentStep, postId } = createPostContext;

  return (
    currentStep === 4 && (
      <>
        <TitleStep fontSize={typography.size.xlarge} currentStep={currentStep}>
          Success
        </TitleStep>
        <Link
          to={{
            pathname: `/post/${postId}`,
            state: { from: window.location.href },
          }}
        >
          <ViewPostButton primary>View Your Post</ViewPostButton>
        </Link>
      </>
    )
  );
};

const CreatePost = ({ onCancel, ...props }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({});
  const [postId, setPostId] = useState("");

  const clearState = () => {
    onCancel();
    // delay for modal close effect to complete before re-render
    setTimeout(() => {
      setCurrentStep(1);
      setPostId("");
    }, 200);
  };

  return (
    <CreatePostContext.Provider
      value={{ form, setForm, currentStep, setCurrentStep, postId, setPostId }}
    >
      <Wrapper onCancel={clearState} {...props}>
        <Step1 />
        <Step2 user={props.user} />
        <Step4 />
      </Wrapper>
      <Step3 onCancel={clearState} {...props} />
    </CreatePostContext.Provider>
  );
};
export default CreatePost;
