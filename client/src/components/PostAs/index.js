import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Row, Col } from "antd";
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
} from "components/PostAs/style";
import person from "assets/icons/person.svg";
import organization from "assets/icons/organization.svg";
import back from "assets/icons/back-arrow-gray.svg";

const organizations = [
  { id: 1, title: 'Notion' },
  { id: 2, title: 'Notion' },
];

const Step1 = ({ active, setStep }) => {
  return active && (
    <>
      <TitleStep>Continue Posting As</TitleStep>
      <Row gutter={14} justify="center">
        <Col span={12}>
          <Option img={person} text="Individual" path={'/create-post'} />
        </Col>
        <Col span={12}>
          <Option img={organization} text="Organization" onClick={() => setStep(2)} />
        </Col>
      </Row>
    </>
  )
};

const Step2 = ({ active, setStep }) => {
  return active && (
    <>
      <TitleStep>Posting as an Organization</TitleStep>
      <BackButton src={back} onClick={() => setStep(1)} />
      {
        organizations.map((item) => {
          return (
            <Link to={{ pathname: "/create-post", state: { organization: item } }}>
              <Button key={item.id} >{item.title}</Button>
            </Link>
          )
        })
      }
      <CreateOrgLink>Create new one</CreateOrgLink>
    </>
  )
};

const Wrapper = ({ onClose, visible, maskClosable, closable, title, children }) => {
  return (
    <Container
      title={"Holder"}
      style={{ textAlign: 'center' }}
      footer={null}
      visible={visible}
      onCancel={onClose}
      mask={true}
      maskClosable={maskClosable}
      closable={closable}
      transparent
      closeIcon={CloseButton}
    >
      {children}
    </Container>
  )
};

const PostAs = (props) => {
  const [currentStep, setCurrentStep] = useState(1);

  const setStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <Wrapper {...props}>
      <Step1 active={currentStep === 1} setStep={setStep} />
      <Step2 active={currentStep === 2} setStep={setStep} />
    </Wrapper>
  );
};

export default PostAs;



































