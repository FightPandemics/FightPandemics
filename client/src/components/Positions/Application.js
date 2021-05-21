import applicationConfirmation from "assets/icons/application-received.svg";
import { Footer, Submit } from "components/CreatePost/StyledModal";
import {
  ApplyModal,
  ButtonsContainer,
  StyledCancelButton,
  StyledContainer,
  StyledSubmitButton,
} from "components/Positions/ApplicationModalStyles";
import {
  CharCounter,
  ErrorMsg,
  InputField,
  InputWrapper,
  OuterWrapper,
  ResponseField,
} from "components/Positions/ApplicationStyles";
import PositionsButton from "components/Positions/PositionsButton";
import { PositionSubmitModal } from "components/Positions/PositionSubmitModal";
import { mq, theme } from "constants/theme";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ApplyFormLabel from "./ApplyFormLabel";
import { useHistory, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectActorId } from "reducers/session";
import axios from "axios";
import { formToApplicationMappings } from "assets/data/formToApplicationMappings";
import { applicantsActions, selectApplicants } from "reducers/applicants";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const { colors } = theme;

const LabelContainer = styled.label`
  font-size: 2.2rem;
  font-weight: 400;
  line-height: 3.3rem;

  /* :after {
  content: " *";
} */

  &.asterisk-error {
    :after {
      color: ${colors.red};
    }
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
`;

const Title = styled.h2`
  margin: 7rem auto;
  font-weight: 600;
  font-size: 3.2rem;

  &.application {
    font-size: 2.2rem;
  }

  &.review {
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      font-size: 1.3rem;
      font-weight: 500;
      margin: 2rem 0;
    }
  }
`;

const ApplicationButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 7.2rem;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    gap: 1.3rem;
  }
`;

const ApplyFormSubmit = styled(Submit)`
  text-align: center;
  margin-top: 3rem;
  margin: auto;
  width: 33.4rem;
  height: 5.4rem;
  font-weight: 500;
  line-height: 2.02rem;
  margin-bottom: 40rem;

  span {
    font-size: 1.6rem;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 15.5rem;
    height: 4.8rem;
    margin-top: 2rem;
    margin-bottom: 5rem;

    span {
      font-size: 1.4rem;
    }
  }
`;

const ApplicationReviewButton = styled(ApplyFormSubmit)`
  margin: 0;
`;

const Application = ({
  orgName,
  application,
  // organisationId,
}) => {
  const actorId = useSelector(selectActorId);
  const { organisationId } = useParams();
  const { applicantId } = useParams();
  // const organisationId = organisationId
  const initialState = {
    //combine questions into "answers" for backend
    formData: {
      // question1: "",
      // question2: "",
      // question3: "",
      // organisationId: organisationId,
      // actorId: actorId,
      status: "applied",
    },
    errors: [],
  };

  const { t } = useTranslation();

  const [formData, setFormData] = useState(initialState.formData);
  const [errors, setErrors] = useState(initialState.errors);

  // const errorMsg = {
  //     title: t("post.title"),
  //     description: t("orgJoinQ.required"),
  //     question1: t("orgJoinQ.required"),
  //     question2: t("orgJoinQ.required"),
  //     question3: t("orgJoinQ.required"),
  //     // question1count: "",
  //     // asterisk: "*",
  // };

  const handleFormData = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });

    if (errors.includes(field) && formData[field]) {
      const newErrors = errors.filter((error) => error !== field);
      setErrors(newErrors);
    }
  };

  // const renderError = (field) => {
  //     if (errors.includes(field) && (!formData[field] || !formData[field].length))
  //         return errorMsg[field];
  // };

  // const populateErrors = () => {
  //     const newErrors = [];
  //     for (let field in errorMsg) {
  //         if (!errors.includes(field)) {
  //             newErrors.push(field);
  //         }
  //     }
  //     setErrors([...errors, ...newErrors]);
  // };

  const handleReject = async (e) => {
    e.preventDefault();
    // if (!formData.props) {
    //     populateErrors()
    // };
    // if (formData.question1 && formData.question2 && formData.question3) {
    //     showPopUp()
    // };
    // console.log("PRE API CALL" + formData)
    setFormData({ formData, status: "rejected" });
    showRejectModal();

    // api call goes inside of function for submit modal
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    // if (!formData.props) {
    //     populateErrors()
    // };
    // if (formData.question1 && formData.question2 && formData.question3) {
    //     showPopUp()
    // };
    // console.log("PRE API CALL" + formData)
    setFormData({ formData, status: "accepted" });
    showAcceptModal();

    // api call goes inside of function for submit modal
  };

  const [rejectVisible, setRejectVisible] = useState(false);
  const [acceptVisible, setAcceptVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const handleCancel = async (e) => {
    setFormData({ formData, status: "accepted" });
    setRejectVisible(false);
    setAcceptVisible(false);
  };

  const showRejectModal = async (e) => {
    setRejectVisible(true);
  };

  const showAcceptModal = async (e) => {
    setAcceptVisible(true);
  };

  const handleConfirmation = async (e) => {
    setSuccessVisible(false);
  };

  const endPoint = `/api/applicants/${applicantId}`;

  const handleRejectSuccess = async () => {
    setRejectVisible(false);
    try {
      await axios.patch(endPoint, { status: "rejected" });
    } catch (error) {
      return error;
    }
    setSuccessVisible(true);
  };

  const handleAcceptSuccess = async () => {
    setAcceptVisible(false);
    try {
      await axios.patch(endPoint, { status: "accepted" });
      console.log({ formdata: formData.status });
    } catch (error) {
      return error;
    }
    setSuccessVisible(true);
  };

  const applicants = useSelector(selectApplicants);

  const [applicantName, setApplicantName] = useState();

  const applicationReceived = t("positions.applicationReceived").replace(
    "{orgName}",
    orgName,
  );
  const history = useHistory();

  // GET APPLICANT FROM BACKEND

  // const loadApplicant = async (e) => {
  //     const endPoint = `/api/applicants?applicantId=${userId}&organisationId=${organisationId}`
  //     try {
  //         res = await axios.get(endPoint)
  //     }
  //     catch (error) {
  //         console.log({ error });
  //         dispatchPostAction(RESET_LOADING);
  //       }
  // }

  // USE EFFECT > loadApplicants

  // useEffect(() => {
  //     loadApplicants()
  //     return () => {
  //         cleanup
  //     }
  // }, [input])

  return (
    <>
      <OuterWrapper className="review">
        <Title className="application review">Application</Title>
        <LabelContainer>
          <ApplyFormLabel
            label={t("orgJoinQ.question1") + ` ${orgName}` + "?"}
          />
        </LabelContainer>
        <InputWrapper className="application-input review">
          {/* <InputField
                        disabled={true}
                        // value={res.answers.q1}
                        value="odio felis cras risus. Sodales integer tempus elementum, arcu elit rutrum pharetra, tortor dolor. odio feortor dolor."
                    /> */}

          <ResponseField> {application.answers.q1} </ResponseField>
        </InputWrapper>
        <LabelContainer>
          <ApplyFormLabel
            label={t("orgJoinQ.question2") + ` ${orgName}` + "?"}
          />
        </LabelContainer>
        <InputWrapper className="application-input review">
          {/* <InputField
                        disabled={true}
                        // value={res.answers.q2}
                        value="odio felis cras risus. Sodales integer tempus elementum, arcu elit rutrum pharetra."
                    /> */}
          <ResponseField>{application.answers.q2}</ResponseField>
        </InputWrapper>
        <LabelContainer>
          <ApplyFormLabel label={t("orgJoinQ.question3") + "?"} />
        </LabelContainer>
        <InputWrapper className="application-input review">
          {/* <InputField
                        disabled={true}
                        // value={res.answers.q3}
                        value="odio felis cras risus. Sodales integer tempus elementum, arcu elit rutrum pharetra."
                    /> */}
          <ResponseField>{application.answers.q3}</ResponseField>
        </InputWrapper>
      </OuterWrapper>

      <ApplyModal
        visible={rejectVisible}
        width={564}
        footer={null}
        centered={true}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        closable={false}
      >
        <StyledContainer>
          <h2>Are you sure you want to rejcet this applicant?</h2>
          <p>
            Once confirmed, this action cannot be undone. We will notify the
            applicant as soon as possible.
          </p>
          <ButtonsContainer>
            <StyledCancelButton onClick={handleCancel}>
              {t("positions.cancelModal")}
            </StyledCancelButton>
            <StyledSubmitButton
              // submit form to backend onClick
              onClick={handleRejectSuccess}
            >
              {t("positions.submitModal")}
            </StyledSubmitButton>
          </ButtonsContainer>
        </StyledContainer>
      </ApplyModal>

      <ApplyModal
        visible={acceptVisible}
        width={564}
        footer={null}
        centered={true}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        closable={false}
      >
        <StyledContainer>
          <h2>Are you sure you want to rejcet this applicant?</h2>
          <p>
            Once confirmed, this action cannot be undone. We will notify the
            applicant as soon as possible.
          </p>
          <ButtonsContainer>
            <StyledCancelButton onClick={handleCancel}>
              {t("positions.cancelModal")}
            </StyledCancelButton>
            <StyledSubmitButton
              // submit form to backend onClick
              onClick={handleAcceptSuccess}
            >
              {t("positions.submitModal")}
            </StyledSubmitButton>
          </ButtonsContainer>
        </StyledContainer>
      </ApplyModal>

      <ApplyModal
        visible={successVisible}
        footer={null}
        centered={true}
        cancelButtonProps={{ style: { display: "none" } }}
        closable={false}
        className="submitted"
      >
        <PositionSubmitModal>
          <img src={applicationConfirmation} alt="" />
          <h2>Successfully Reviewed!</h2>
          <p>
            Your decision has successfully been submitted and the candidate has
            been notified via email.
          </p>
          <Link
            onClick={handleConfirmation}
            // TODO Send to applicants page
            // to={}
          >
            <PositionsButton>{t("positions.okay")}</PositionsButton>
          </Link>
        </PositionSubmitModal>
      </ApplyModal>

      <Footer>
        <ApplicationButtonsContainer>
          <ApplicationReviewButton primary="true" onClick={handleReject}>
            Reject
          </ApplicationReviewButton>
          <ApplicationReviewButton primary="true" onClick={handleAccept}>
            Accept
          </ApplicationReviewButton>
        </ApplicationButtonsContainer>
      </Footer>
    </>
  );
};

export default Application;
