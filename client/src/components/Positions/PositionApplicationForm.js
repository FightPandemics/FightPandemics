import applicationConfirmation from "assets/icons/application-received.svg";
import { Footer, Submit } from "components/CreatePost/StyledModal";
import { ApplyModal, ButtonsContainer, StyledCancelButton, StyledContainer, StyledSubmitButton } from "components/Positions/ApplicationModalStyles";
import { CharCounter, ErrorMsg, InputField, InputWrapper, OuterWrapper } from "components/Positions/ApplyFormInputStyles";
import PositionsButton from "components/Positions/PositionsButton";
import { PositionSubmitModal } from "components/Positions/PositionSubmitModal";
import { mq } from "constants/theme";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ApplyFormLabel from "./ApplyFormLabel";

const LabelContainer = styled.label`
font-size: 2.2rem;
  font-weight: 400;
  line-height: 3.3rem;

&.asterisk {
:after {
  content: " *";
  color: red;
}
}
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
`;

const initialState = {
  formData: {
    question1: "",
    question2: "",
    question3: "",
  },
  errors: [],
};

const PositionApplicationForm = ({ orgName }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialState.formData);
  const [errors, setErrors] = useState(initialState.errors);

  const errorMsg = {
    title: t("post.title"),
    description: t("orgJoinQ.required"),
    question1: t("orgJoinQ.required"),
    question2: t("orgJoinQ.required"),
    question3: t("orgJoinQ.required"),
    question1count: "",
    asterisk: "*",
  };
  const handleFormData = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });

    if (errors.includes(field) && formData[field]) {
      const newErrors = errors.filter((error) => error !== field);
      setErrors(newErrors);
    }
  };

  // cleanform will be used
  const cleanForm = () => setFormData(initialState.formData);

  const renderError = (field) => {
    if (errors.includes(field) && (!formData[field] || !formData[field].length))
      return errorMsg[field];
  };

  const populateErrors = () => {
    const newErrors = [];
    for (let field in errorMsg) {
      if (!errors.includes(field)) {
        newErrors.push(field);
      }
    }
    setErrors([...errors, ...newErrors]);
  };

  const handleSubmit = () => {
    if (!formData.props) {
      populateErrors()
    };
    if (formData.question1 && formData.question2 && formData.question3) {
      showPopUp()
    };
  };

  const [visible, setVisible] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);

  const handleCancel = async (e) => {
    setVisible(false);
  };

  const showPopUp = async (e) => {

    setVisible(true);
  };

  const handleCancelTwo = async (e) => {

    setVisibleTwo(false);
  };

  const showPopUpTwo = async (e) => {
    handleCancel()
    setVisibleTwo(true);
  };

  const applicationReceived = t("positions.applicationReceived").replace("{orgName}", orgName);

  return (
    <>
      <h2 style={{ "color": "red", }}>TEST FORM & BUTTON</h2>
      <OuterWrapper>
        <LabelContainer
          className={renderError("question1") ? "asterisk" : ""}
        >
          <ApplyFormLabel
            label={t("orgJoinQ.question1") + ` ${orgName}` + "?"}
          />
        </LabelContainer>
        <InputWrapper className={
          formData.question1.length > 250 ? "has-error" : ""}
        >
          <InputField
            id="question1"
            name="question1"
            onChange={handleFormData("question1")}
            renderError={renderError}
            formData={formData}
          />
          <CharCounter
            className={
              formData.question1.length > 250 ? "has-error" : ""}
          >
            {formData.question1.length} / {250}
          </CharCounter>
        </InputWrapper>
        <ErrorMsg
          className="has-error"
        >{renderError("question1")}</ErrorMsg>

        <LabelContainer
          className={renderError("question2") ? "asterisk" : ""}
        >
          <ApplyFormLabel
            label={t("orgJoinQ.question2") + ` ${orgName}` + "?"}
          />
        </LabelContainer>
        <InputWrapper
          className={
            formData.question2.length > 250 ? "has-error" : ""}
        >
          <InputField
            id="question2"
            name="question2"
            onChange={handleFormData("question2")}
            value={formData.question2}
            renderError={renderError}
            formData={formData}
          />
          <CharCounter
            className={formData.question2.length > 250 ? "has-error" : ""}
          >
            {formData.question2.length} / {250}
          </CharCounter>
        </InputWrapper>
        <ErrorMsg className="has-error">{renderError("question2")}</ErrorMsg>

        <LabelContainer
          className={renderError("question3") ? "asterisk" : ""}
        >
          <ApplyFormLabel
            label={t("orgJoinQ.question3") + "?"}
          />
        </LabelContainer>
        <InputWrapper
          className={
            formData.question3.length > 250 ? "has-error" : ""}
        >
          <InputField
            id="question3"
            name="question3"
            onChange={handleFormData("question3")}
            value={formData.question3}
            renderError={renderError}
            formData={formData}
          />
          <CharCounter
            className={formData.question3.length > 250 ? "has-error" : ""}
          >
            {formData.question3.length} / {250}
          </CharCounter>
        </InputWrapper>
        <ErrorMsg className="has-error">{renderError("question3")}</ErrorMsg>
      </OuterWrapper>

      <ApplyModal
        visible={visible}
        width={564}
        footer={null}
        centered={true}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
      >
        <StyledContainer>
          <h2>{t("positions.submitApplication")}</h2>
          <p>Once confirmed, this action cannot be undone. Your application will be forwarded to the organization.</p>
          <ButtonsContainer>
            <StyledCancelButton onClick={handleCancel}>
              {t("positions.cancelModal")}
            </StyledCancelButton>
            <StyledSubmitButton
              onClick={showPopUpTwo}
            >
              {t("positions.submitModal")}
            </StyledSubmitButton>
          </ButtonsContainer>
        </StyledContainer>
      </ApplyModal>

      <ApplyModal
        visible={visibleTwo}
        footer={null}
        centered={true}
        onCancel={handleCancelTwo}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
        className="submitted"
      >
        <PositionSubmitModal>
          <img src={applicationConfirmation} alt="" />
          <h2>{t("positions.applicationSubmitted")}</h2>
          <p>{applicationReceived}</p>
          <PositionsButton
            onClick={handleCancelTwo}
          >
            {t("positions.okay")}
          </PositionsButton>
        </PositionSubmitModal>
      </ApplyModal>

      <Footer>
        <Submit
          style={{ "background-color": "red" }}
          primary="true"
          onClick={handleSubmit}
        >
          TEST SUBMIT
        </Submit>
      </Footer>
    </>
  );
};

export default PositionApplicationForm;