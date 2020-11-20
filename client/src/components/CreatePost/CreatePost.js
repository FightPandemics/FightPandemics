import React, { useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Container,
  TitleStep,
  ViewPostButton,
} from "components/CreatePost/StyledPostAs";
import TabForms from "./Form/TabForms";
import SvgIcon from "components/Icon/SvgIcon";
import closeButton from "assets/icons/close-btn.svg";
import { theme } from "constants/theme";
import GTM from "constants/gtm-tags";
import { useSelector } from "react-redux";
import { selectOrganisationId } from "reducers/session";

const { typography } = theme;

export const CreatePostContext = createContext();

const Step3 = ({ onCancel, visible, gtmPrefix }) => {
  const { currentStep, setCurrentStep, setPostId } = useContext(
    CreatePostContext,
  );
  if (!visible || currentStep !== 3) return null;
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
  const organisationId = useSelector(selectOrganisationId);
  const [currentStep, setCurrentStep] = useState(3);
  const [form, setForm] = useState({ organisationId: organisationId });
  const [postId, setPostId] = useState("");

  const clearState = () => {
    onCancel();
    if (currentStep === 4) {
      loadPosts();
    }
    // delay for modal close effect to complete before re-render
    setTimeout(() => {
      setCurrentStep(3);
      setPostId("");
    }, 200);
  };

  return (
    <CreatePostContext.Provider
      value={{ form, setForm, currentStep, setCurrentStep, postId, setPostId }}
    >
      <Wrapper onCancel={clearState} {...props}>
        <Step4 gtmPrefix={props.gtmPrefix} />
      </Wrapper>
      <Step3 onCancel={clearState} {...props} gtmPrefix={props.gtmPrefix} />
    </CreatePostContext.Provider>
  );
};
export default CreatePost;
