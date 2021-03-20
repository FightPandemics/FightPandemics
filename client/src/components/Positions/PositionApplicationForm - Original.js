import React, { useReducer, useState, createContext, useContext, useEffect, useHistory } from "react";
import { Link } from "react-router-dom";
import { WhiteSpace } from "antd-mobile";
import { Select } from "antd";
import ApplyFormInput from "components/Positions/ApplyFormInput";
import ApplyFormLabel from "./ApplyFormLabel";
import InputError from "components/Input/InputError";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { Section, Title, HeadWrapper } from "../CreatePost/StyledModal";
import { blockLabelStyles, positionApplyLabelStyles } from "constants/formStyles";
import { theme } from "constants/theme";
import { useTranslation } from "react-i18next";
import Heading from "components/Typography/Heading";
import SubmitButton from "components/Button/SubmitButton";
import { Footer } from "components/CreatePost/StyledModal";
// Policy Modal present for testing
import PolicyModal from "components/PolicyPages/PolicyModal"
import AutoSize from "components/Input/AutoSize";
import { Button } from "antd";

// Icons
import { ReactComponent as BackIcon } from "assets/icons/back-black.svg";
// import {
//   createOrganisationFormReducer,
//   initialState,
// } from "hooks/reducers/organisationReducers";
const { display } = theme.typography.font.family;
const { colors, typography } = theme;
const { Option } = Select;

export const initialState = {
  error: null,
  loading: false,
};

export const joinOrgFormReducer = (state, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case "error1":
      return { ...state, loading: true, error: null };
    case "error2":
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

export const Wrapper = styled(Section)`
  display: block;
  width: 80%;
  font-family: ${display};
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  font-size: 3rem;
  .ant-input {
    font-size: 1.5rem;
  }
  span {
    font-size: 1.5rem;
    color: blue;
  }
  input[type="text"]::placeholder {  
    text-align: right; 
    font-size: 1rem;
} 
input[type=text] {
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;
}
`;
export const StyledForm = styled.form`
  font-family: ${display};
  width: 100%;
`;

// styled(Button) was originall styled(SubmitButton)
export const Submit = styled(Button)`
  max-width: 25rem;
  height: 4rem;
  align-self: center;
  text-align: center;
  margin: auto;
  display: block;
  line-height: 1.15rem;
  padding: 14px 24px;
  background-color: ${(props) =>
    props.forModerator?.remove ? colors.orangeRed : colors.royalBlue};
  span {
    font-family: ${typography.font.family.display};
    font-style: normal;
    font-size: ${typography.size.large};
    line-height: 1.15rem;
    font-weight: 500;
    color: white;
  }
`;
//button styles for testing
const buttonStyles = {
  backgroundColor: "red",
  fontWeight: "500",
  cursor: "pointer",
};

const inputStyles = {
  backgroundColor: "transparent",
  fontSize: "1.8rem",
  lineHeight: "2rem",
  margin: 0,
  paddingBottom: "0.8rem",
  // marginBottom: "1.2rem",
  width: "40rem",
  textOverflow: 'ellipsis',
};

const errorStyles = {
  color: colors.Red,
  fontSize: "1.2rem",
  marginTop: "0px",
  alignSelf: "",
};

// const Form = ({ onChangeDescription }) => {
const PositionApplicationForm = ({ orgName }) => {
  const { errors, register, handleSubmit } = useForm({
    mode: "change",
  });


  const [
    createOrganisationFormState,
    createOrganisationFormDispatch,
  ] = useReducer(joinOrgFormReducer, initialState);
  const { t } = useTranslation();
  const { firstQ, secondQ, thirdQ } = {};

  // onSubmit doesn't appear to be adding functionality
  const onSubmit = async (formData) => {
    // if (!firstQ) {
    //   //should probably use setError / useState to set class
    // } else if (!secondQ) {

    // } else if (!thirdQ) {
    // }

    console.log(formData)
  };

  const [visible, setVisible] = useState(false);

  return (
    <Wrapper>
      {/* <AutoSize
        placeholder={t("comment.writeAComment")}
      /> */}

      {/* <PolicyModal
        visible={visible}
      // onCancel={handleHide}
      // onClick={handleHide}
      /> */}

      <form action="">
        <ApplyFormInput />
        <input type="submit" />
      </form>
      <Heading level={3} style={{ marginBottom: "5rem" }}>
        {t("orgJoinQ.application")}
      </Heading>
      <StyledForm>
        <ApplyFormLabel
          // style={positionApplyLabelStyles}
          label={t("orgJoinQ.question1") + ` ${orgName}` + "?" + " *"}

        />
        <ApplyFormInput
          required={true}
          name="firstQ"
          // type="text"
          rules={[{ required: true }]}
          defaultValue={firstQ}
          error={errors.firstQ}
          style={inputStyles}
          // placeholder={t("orgJoinQ.maxnum")}
          ref={register({
            required: t("orgJoinQ.required"),
            minLength: 1,
            maxLength: {
              value: 1,
              message: t("profile.common.maxCharacters", { maxNum: 1 },),
            },
          })}
        />
        {errors.firstQ && (
          <InputError style={errorStyles}>{errors.firstQ.message}</InputError>

        )}
        <WhiteSpace />
        <ApplyFormLabel
          style={positionApplyLabelStyles}
          label={t("orgJoinQ.question2") + ` ${orgName}` + "?" + " *"}
        />
        <ApplyFormInput
          name="secondQ"
          type="text"
          rules={[{ required: true }]}
          defaultValue={firstQ}
          error={errors.firstQ}
          style={inputStyles}
          placeholder={t("orgJoinQ.maxnum")}
          ref={register({
            required: t("orgJoinQ.required"),
            maxLength: {
              value: 250,
              message: t("profile.common.maxCharacters", { maxNum: 250 }),
            },
          })}
          onChange={(event) => event.target.value}
        />
        {errors.secondQ && (
          <InputError style={errorStyles}>{errors.secondQ.message}</InputError>
        )}
        <WhiteSpace />
        <ApplyFormLabel
          style={positionApplyLabelStyles}
          label={t("orgJoinQ.question3") + " *"}
        />

        <ApplyFormInput
          name="thirdQ"
          type="text"
          rules={[{ required: true }]}
          defaultValue={firstQ}
          error={errors.firstQ}
          style={inputStyles}
          placeholder={t("orgJoinQ.maxnum")}
          ref={register({
            required: t("orgJoinQ.required"),
            maxLength: {
              value: 250,
              message: t("profile.common.maxCharacters", { maxNum: 250 }),
            },
          })}
          onChange={(event) => event.target.value}
        />
        {errors.thirdQ && (
          <InputError style={errorStyles}>{errors.thirdQ.message}</InputError>
        )}
        <WhiteSpace />
        <Footer>
          <Link
            to={{
              // pathname: `/nearest-hospital`,
              // state: { from: window.location.href },
            }}
          >
            <input type="submit" />
            <Submit style={buttonStyles}
              onClick={handleSubmit(onSubmit)}
            // onClick={alert("Button clicked")}
            >
              TEST SUBMIT BUTTON
            </Submit>
          </Link>
        </Footer>
      </StyledForm>
    </Wrapper>
  );
};

export default PositionApplicationForm;