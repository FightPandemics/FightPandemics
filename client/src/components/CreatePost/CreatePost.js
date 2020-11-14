import React, { useState, createContext, useContext } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Container,
  Option,
  TitleStep,
  OptionButton,
  OptionButtonWrapper,
  BackButton,
  CreateOrgLink,
  ViewPostButton,
} from "components/CreatePost/StyledPostAs";
import TabForms from "./Form/TabForms";
import SvgIcon from "components/Icon/SvgIcon";
import person from "assets/icons/person.svg";
import organisation from "assets/icons/organisation.svg";
import back from "assets/icons/back-arrow-gray.svg";
import closeButton from "assets/icons/close-btn.svg";
import { theme } from "constants/theme";
import GTM from "constants/gtm-tags";

const { typography } = theme;

export const CreatePostContext = createContext();

const Step1 = ({ gtmPrefix }) => {
  const { t } = useTranslation();
  const createPostContext = useContext(CreatePostContext);
  const { currentStep, setCurrentStep } = createPostContext;
  return (
    currentStep === 1 && (
      <>
        <TitleStep>{t("post.continueAs")}</TitleStep>
        <Row gutter={14} justify="center">
          <Col span={12}>
            <Option
              gtmTag={
                gtmPrefix +
                GTM.post.createPost +
                currentStep +
                GTM.post.individualBtn
              }
              img={person}
              text={t("post.individual")}
              onClick={() => setCurrentStep(3)}
            />
          </Col>
          <Col span={12}>
            <Option
              gtmTag={
                gtmPrefix + GTM.post.createPost + currentStep + GTM.post.orgBtn
              }
              img={organisation}
              text={t("post.organisation")}
              onClick={() => setCurrentStep(2)}
            />
          </Col>
        </Row>
      </>
    )
  );
};

const Step2 = ({ user, gtmPrefix }) => {
  const { t } = useTranslation();
  const createPostContext = useContext(CreatePostContext);
  const { setForm, currentStep, setCurrentStep } = createPostContext;

  return (
    currentStep === 2 && (
      <>
        <TitleStep>{t("post.postAsOrg")}</TitleStep>
        <BackButton
          id={
            gtmPrefix +
            GTM.post.createPost +
            (currentStep - 1) +
            GTM.post.orgBtn +
            GTM.wizardNav.back
          }
          src={back}
          onClick={() => setCurrentStep(1)}
        />
        <OptionButtonWrapper>
          {user.organisations?.map((item) => {
            const { _id: organisationId } = item;
            return (
              <OptionButton
                key={organisationId}
                onClick={() => {
                  setForm({ organisationId });
                  setCurrentStep(3);
                }}
              >
                {item.name}
              </OptionButton>
            );
          })}
        </OptionButtonWrapper>
        <CreateOrgLink
          to={"/create-organisation-profile"}
          id={
            gtmPrefix +
            GTM.post.createPost +
            (currentStep - 1) +
            GTM.post.orgBtn +
            GTM.organisation.createNew
          }
        >
          {t("post.createNew")}
        </CreateOrgLink>
      </>
    )
  );
};

const Step3 = ({ onCancel, gtmPrefix }) => {
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
      gtmTagPrefix={gtmPrefix + GTM.post.createPost + (currentStep - 1)}
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
  const { t } = useTranslation();
  const createPostContext = useContext(CreatePostContext);
  const { currentStep, postId } = createPostContext;

  return (
    currentStep === 4 && (
      <>
        <TitleStep fontSize={typography.size.xlarge} currentStep={currentStep}>
          {t("post.success")}
        </TitleStep>
        <Link
          to={{
            pathname: `/post/${postId}`,
            state: { from: window.location.href },
          }}
        >
          <ViewPostButton primary>{t("post.viewPost")}</ViewPostButton>
        </Link>
      </>
    )
  );
};

const CreatePost = ({ onCancel, loadPosts, ...props }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({});
  const [postId, setPostId] = useState("");

  const clearState = () => {
    onCancel();
    if (currentStep === 4) {
      loadPosts();
    }
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
        <Step1 gtmPrefix={props.gtmPrefix} />
        <Step2 user={props.user} gtmPrefix={props.gtmPrefix} />
        <Step4 gtmPrefix={props.gtmPrefix} />
      </Wrapper>
      <Step3 onCancel={clearState} {...props} gtmPrefix={props.gtmPrefix} />
    </CreatePostContext.Provider>
  );
};
export default CreatePost;
