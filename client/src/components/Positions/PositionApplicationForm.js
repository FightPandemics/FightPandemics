// ORIGINAL VERISION
// //
import React, { useReducer, useState, usePrevious, createContext, useContext, useEffect, useHistory } from "react";
// import { Link } from "react-router-dom";
import { WhiteSpace } from "antd-mobile";
import { Select } from "antd";
import
// ApplyFormInput, 
{ OuterWrapper, InputField, ErrorMsg, InputWrapper, CharCounter } from "components/Positions/ApplyFormInput";
import ApplyFormLabel from "./ApplyFormLabel";
import InputError from "components/Input/InputError";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { Section, Title, HeadWrapper } from "../CreatePost/StyledModal";
import { blockLabelStyles, positionApplyLabelStyles } from "constants/formStyles";
import { theme, mq } from "constants/theme";
import { useTranslation } from "react-i18next";
import Heading from "components/Typography/Heading";
import SubmitButton from "components/Button/SubmitButton";
// import { Footer } from "components/CreatePost/StyledModal";
// Policy Modal present for testing
import PolicyModal from "components/PolicyPages/PolicyModal"
import AutoSize from "components/Input/AutoSize";
import { Button } from "antd";
import PositionSubmitButton from "components/Positions/PositionSubmitButton";

import { ApplyModal, StyledContainer, ButtonsContainer, StyledCancelButton, StyledSubmitButton } from "components/Positions/PositionSubmitButton";
import PositionSubmitModal from "components/Positions/PositionSubmitModal";
import applicationConfirmation from "assets/icons/application-received.svg";
import PositionsButton from "components/Positions/PositionsButton"

// // Icons
// import { ReactComponent as BackIcon } from "assets/icons/back-black.svg";
// // import {
// //   createOrganisationFormReducer,
// //   initialState,
// // } from "hooks/reducers/organisationReducers";
// const { display } = theme.typography.font.family;
// const { colors, typography } = theme;
// const { Option } = Select;

// export const initialState = {
//   error: null,
//   loading: false,
//   formData: null
// };

// export const joinOrgFormReducer = (state, action) => {
//   const { type, ...payload } = action;
//   switch (type) {
//     case "error1":
//       return { ...state, loading: true, error: null };
//     case "error2":
//       return { ...state, loading: false, error: payload.error };
//     default:
//       return state;
//   }
// };

// export const Wrapper = styled(Section)`
//   display: block;
//   width: 80%;
//   font-family: ${display};
//   margin: 0 auto;
//   display: flex;
//   flex-wrap: wrap;
//   align-content: center;
//   font-size: 3rem;
//   .ant-input {
//     font-size: 1.5rem;
//   }
//   span {
//     font-size: 1.5rem;
//     color: blue;
//   }
//   input[type="text"]::placeholder {  
//     text-align: right; 
//     font-size: 1rem;
// } 
// input[type=text] {
//   word-wrap: break-word;
//   word-break: break-all;
//   overflow-wrap: break-word;
// }
// `;
// export const StyledForm = styled.form`
//   font-family: ${display};
//   width: 100%;
// `;

// // styled(Button) was originall styled(SubmitButton)
// export const Submit = styled(Button)`
//   max-width: 25rem;
//   height: 4rem;
//   align-self: center;
//   text-align: center;
//   margin: auto;
//   display: block;
//   line-height: 1.15rem;
//   padding: 14px 24px;
//   background-color: ${(props) =>
//     props.forModerator?.remove ? colors.orangeRed : colors.royalBlue};
//   span {
//     font-family: ${typography.font.family.display};
//     font-style: normal;
//     font-size: ${typography.size.large};
//     line-height: 1.15rem;
//     font-weight: 500;
//     color: white;
//   }
// `;
// //button styles for testing
// const buttonStyles = {
//   backgroundColor: "red",
//   fontWeight: "500",
//   cursor: "pointer",
// };

// const inputStyles = {
//   backgroundColor: "transparent",
//   fontSize: "1.8rem",
//   lineHeight: "2rem",
//   margin: 0,
//   paddingBottom: "0.8rem",
//   // marginBottom: "1.2rem",
//   width: "40rem",
//   textOverflow: 'ellipsis',
// };

// const errorStyles = {
//   color: colors.Red,
//   fontSize: "1.2rem",
//   marginTop: "0px",
//   alignSelf: "",
// };


// // const Form = ({ onChangeDescription }) => {
// const PositionApplicationForm = ({ orgName }) => {
//   const { errors, register, handleSubmit } = useForm({
//     mode: "change",
//   });

//   const [formData, setFormData] = useState(initialState.formData);

//   const [
//     createOrganisationFormState,
//     createOrganisationFormDispatch,
//   ] = useReducer(joinOrgFormReducer, initialState);
//   const { t } = useTranslation();
//   const { firstQ, secondQ, thirdQ } = {};



//   // onSubmit doesn't appear to be adding functionality
//   const onSubmit = async (formData) => {
//     // if (!firstQ.value.length) {
//     //   //should probably use setError / useState to set class
//     //   alert("firstQ blank!")
//     // } else if (!secondQ) {

//     // } else if (!thirdQ) {
//     // }
//     // console.log(formData);
//     alert(formData);
//   };

//   const handleChange = (e) => alert(this)
//   const [textPresent, setTextPresent] = useState(false);
//   const [visible, setVisible] = useState(false);

//   return (
//     <Wrapper>
//       {/* <AutoSize
//         placeholder={t("comment.writeAComment")}
//       /> */}

//       {/* <PolicyModal
//         visible={visible}
//       // onCancel={handleHide}
//       // onClick={handleHide}
//       /> */}

//       <Heading level={3} style={{ marginBottom: "5rem" }}>
//         {t("orgJoinQ.application")}
//       </Heading>
//       <StyledForm
//       // onSubmit={alert(firstQ)}

//       >
//         <ApplyFormLabel
//           // style={positionApplyLabelStyles}
//           label={t("orgJoinQ.question1") + ` ${orgName}` + "?" + " *"}

//         />
//         <input
//           name="testinput"
//           id="yo"
//           required={true}
//           name="firstQ"
//           // type="text"
//           rules={[{ required: true }]}
//           value={firstQ}
//           defaultValue="{firstQ}"
//           error="{errors.firstQ}"
//           style={inputStyles}
//         >

//         </input>
//         <ApplyFormInput
//           required={true}
//           name="firstQ"
//           // type="text"
//           rules={[{ required: true }]}
//           value={firstQ}
//           defaultValue="{firstQ}"
//           error={errors.firstQ}
//           style={inputStyles}
//           // placeholder={t("orgJoinQ.maxnum")}
//           ref={register({
//             required: t("orgJoinQ.required"),
//             minLength: 1,
//             maxLength: {
//               value: 2,
//               message: t("profile.common.maxCharacters", { maxNum: 2 },),
//             },
//           })}
//           textPresent={textPresent}
//           formData={formData}


//         />
//         <input type="submit" />
//         {errors.firstQ && (
//           <InputError style={errorStyles}>{errors.firstQ.message}</InputError>

//         )}
//         <WhiteSpace />
//         <ApplyFormLabel
//           style={positionApplyLabelStyles}
//           label={t("orgJoinQ.question2") + ` ${orgName}` + "?" + " *"}
//         />
//         <ApplyFormInput
//           name="secondQ"
//           type="text"
//           rules={[{ required: true }]}
//           defaultValue={firstQ}
//           error={errors.firstQ}
//           style={inputStyles}
//           placeholder={t("orgJoinQ.maxnum")}
//           // ref={register({
//           //   required: t("orgJoinQ.required"),
//           //   maxLength: {
//           //     value: 250,
//           //     message: t("profile.common.maxCharacters", { maxNum: 250 }),
//           //   },
//           // })}
//           onChange={(event) => event.target.value}
//         />
//         {errors.secondQ && (
//           <InputError style={errorStyles}>{errors.secondQ.message}</InputError>
//         )}
//         <WhiteSpace />
//         <ApplyFormLabel
//           style={positionApplyLabelStyles}
//           label={t("orgJoinQ.question3") + " *"}
//         />

//         <ApplyFormInput
//           name="thirdQ"
//           type="text"
//           rules={[{ required: true }]}
//           defaultValue={firstQ}
//           error={errors.firstQ}
//           style={inputStyles}
//           placeholder={t("orgJoinQ.maxnum")}
//           ref={register({
//             required: t("orgJoinQ.required"),
//             maxLength: {
//               value: 250,
//               message: t("profile.common.maxCharacters", { maxNum: 250 }),
//             },
//           })}
//           onChange={(event) => event.target.value}
//         />
//         <textarea>something</textarea>
//         {errors.thirdQ && (
//           <InputError style={errorStyles}>{errors.thirdQ.message}</InputError>
//         )}
//         <WhiteSpace />
//         <Footer>
//           <Link
//             to={{
//               // pathname: `/nearest-hospital`,
//               state: { from: window.location.href },
//             }}
//           >

//             <Submit
//               style={buttonStyles}
//               onClick={handleSubmit(onSubmit)}
//             // onClick={alert("Button clicked")}
//             >
//               TEST SUBMIT BUTTON
//             </Submit>
//           </Link>
//         </Footer>
//       </StyledForm>
//     </Wrapper>
//   );
// };

// ****NEW VERSION FROM Form.js******

// import React, { useContext, useState } from "react";
// import { useTranslation } from "react-i18next";

import First from "components/CreatePost/Form/FirstSection";
import Second from "components/CreatePost/Form/SecondSection";
import Third from "components/CreatePost/Form/ThirdSection";
import Fourth from "components/CreatePost/Form/FourthSection";
import { CreatePostContext } from "components/CreatePost/CreatePost";
import { Footer, Submit } from "components/CreatePost/StyledModal";
import createPostSettings from "assets/data/createPostSettings";
import axios from "axios";
import { formDataToPost } from "assets/data/formToPostMappings";
import GTM from "constants/gtm-tags";

const { colors } = theme
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

const { shareWith, expires, helpTypes, workMode } = createPostSettings;

const initialState = {
  formData: {
    title: "",
    description: "",
    question1: "",
    question2: "",
    question3: "",
    tags: [],
    // count: { question1: "" },

    // shareWith: shareWith.default.value,
    // expires: expires.default.value,
    // help: helpTypes.default.value,
    // workMode: workMode.default.value,
  },
  errors: [],
};



const PositionApplicationForm = ({ orgName, setCurrentStep, textData, type, setPostId, gtmPrefix }) => {
  const { t } = useTranslation();
  // const { form } = useContext(CreatePostContext);
  // const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(initialState.formData);

  const [errors, setErrors] = useState(initialState.errors);
  // formData.help = type;

  const errorMsg = {
    title: t("post.title"),
    description: t("orgJoinQ.required"),
    question1: t("orgJoinQ.required"),
    question2: t("orgJoinQ.required"),
    question3: t("orgJoinQ.required"),
    question1count: "",
    asterisk: "*",
    // help: t("post.help"),
    // tags: t("post.tags"),
  };
  // const [count, setCount] = useState(initialState.formData);
  const handleFormData = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });

    if (errors.includes(field) && formData[field]) {
      const newErrors = errors.filter((error) => error !== field);
      setErrors(newErrors);
    }
    // setFormData({ ...formData, count: { [field]: 0 + e.target.value } });

    // if (!errors) {
    //   alert(errors)

    // }


    // if (errors.includes(field) && formData[field]) {
    //   const newErrors = errors.filter((error) => error !== field);
    //   setErrors(newErrors);
    // }
  };

  // const handleSelectorChange = (field, val) => {
  //   setFormData({ ...formData, [field]: val });
  // };

  const cleanForm = () => setFormData(initialState.formData);

  const renderError = (field) => {
    if (errors.includes(field) && (!formData[field] || !formData[field].length))
      return errorMsg[field];
  };

  const renderRequiredMsg = field => {
    if (!formData[field]) {
      return ("THERE IS AN ERROR")
    }
  }

  // const addTag = (tag) => (e) => {
  //   const hasTag = formData.tags.includes(tag);
  //   if (hasTag) {
  //     const tags = formData.tags.filter((t) => t !== tag);
  //     setFormData({ ...formData, tags });
  //   } else {
  //     setFormData({ ...formData, tags: [...formData.tags, tag] });
  //   }
  // };

  const populateErrors = () => {
    const newErrors = [];
    for (let field in errorMsg) {
      if (!errors.includes(field)) {
        newErrors.push(field);
      }
    }
    setErrors([...errors, ...newErrors]);

  };

  //handleSubmit was an ASYNC functin

  const handleSubmit = (field) => {
    // setCurrentStep(2);
    const formErrors = errors
    // if (errors.includes(field) && formData[field]) {
    //   const newErrors = errors.filter((error) => error !== field);
    //   setErrors(newErrors);
    // }

    // field.preventDefault();
    if (!formData.props) { populateErrors(); }
    if (formData.question1 && formData.question2) { showPopUp(); }





    // { setErrors(initialState.errors); showPopUp() }


    // else {showPopUp()}
    // return

    // const payload = formDataToPost(formData);
    // if (form.organisationId) payload.actorId = form.organisationId;

    // if (!errors.length) {
    //   try {
    //     const res = await axios.post("/api/posts", payload);
    //     setPostId(res.data._id);
    //     cleanForm();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  // const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);

  const handleCancel = async (e) => {
    setVisible(false);
  };

  const showPopUp = async (e) => {

    setVisible(true);
  };

  const handleClick = (e) => {
    console.log("submit")
  };
  const handleCancelTwo = async (e) => {

    setVisibleTwo(false);
  };

  const showPopUpTwo = async (e) => {
    handleCancel()
    setVisibleTwo(true);
  };
  return (
    <>
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
            // value={formData.question1}
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
            value={formData.question2}
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
      {/* <Second
        addTag={addTag}
        selectedTags={formData.tags}
        renderError={renderError}
        title="{textData.question}"
      />
      <Third
        formData={formData}
        onShareWithChange={(val) => handleSelectorChange("shareWith", val)}
        onExpirationChange={(val) => handleSelectorChange("expires", val)}
      />
      <Fourth
        formData={formData}
        onWorkModeChange={(val) => handleSelectorChange("workMode", val)}
      /> */}
      <ApplyModal
        style={{ border: "3rem" }}
        //set to true for testing, normally handled by {visible}
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
            // onClick={onClick}
            >
              {t("positions.submitModal")}
            </StyledSubmitButton>
          </ButtonsContainer>
        </StyledContainer>
      </ApplyModal>
      {/* <LinkButton
        id={getGTM("getInvolved")}
        type="primary"
        shape="round"
        onClick={showPopUpTwo}
      >
        {"Application Submitted"}
      </LinkButton> */}
      {/* <Modal
        style={{ border: "3rem" }}
        visible={visibletwo}
        width={564}
        footer={null}
        centered={true}
        onCancel={handleCancelTwo}
      >
        <StyledContainer>
          <h2>Application Submitted</h2>
          <br></br>
          <p>Thank you for your interest in orgName. We have received your application and we’ll be in touch with you as soon as possible.</p>
          <LinkButton>Okay</LinkButton>
        </StyledContainer>
      </Modal> */}

      {/* Seperate Modal Component */}


      <ApplyModal
        style={{ border: "3rem" }}
        // visibility set to true for testing, logic to be based on previous submit button on modal
        visible={visibleTwo}
        // width={"3rem"}
        footer={null}
        centered={true}
        onCancel={handleCancelTwo}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
      >
        <PositionSubmitModal>
          <img src={applicationConfirmation} alt="" />
          <h2>{t("positions.applicationSubmitted")}</h2>
          <p>{t("positions.applicationReceived")}</p>
          <PositionsButton
            onClick={handleCancelTwo}
          >
            {t("positions.okay")}
          </PositionsButton>
        </PositionSubmitModal>
      </ApplyModal>



      <Footer>
        <PositionSubmitButton></PositionSubmitButton>
        <Submit
          primary="true"
          onClick={handleSubmit}
        // disabled={
        //   !formData.title ||
        //   !formData.description ||
        //   formData.tags.length === 0 ||
        //   formData.workMode === workMode.default.value
        // }

        // disabled={
        //   !formData.question1
        // }

        // id={gtmPrefix + GTM.post.button}
        >
          {t("positions.submitButton")}
        </Submit>
      </Footer>
    </>
  );
};











export default PositionApplicationForm;
