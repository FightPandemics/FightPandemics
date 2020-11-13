import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorAlert from "components/Alert/ErrorAlert";
import SuccessAlert from "components/Alert/SuccessAlert";
import Heading from "components/Typography/Heading";
import { useQuery } from "utils/hooks.js";
import { useTranslation } from "react-i18next";
import isEqual from "lodash/isEqual";
import NotifyPreferenceInput from "components/Input/NotifyPreferenceInput";
import { CustomSubmitButton } from "components/EditProfile/EditComponents";
import { mq, theme } from "constants/theme";
import { WhiteSpace } from "antd-mobile";
import styled from "styled-components";
// ICONS
import socialmedia2 from "assets/social-media2.svg";

const { colors } = theme;
const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fbfbfd;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    padding-top: 6vh;
  }
`;

const LoginLeftContainer = styled.div`
  flex-basis: 45%;
  background-color: #f3f4fe;
  height: 100vh;
  position: relative;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }

  @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
    flex-basis: 30%;
  }
`;

const LoginRightContainer = styled.div`
  flex: 1;
`;

const SocialImageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 80%;
  margin: 0 auto;
  @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
    .SocialImageSVG {
      width: 100%;
    }
  }
  img {
    width: 36.4rem;
  }
`;

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    border: 0.1rem solid ${colors.lightGray};
    padding: 0.3rem 0.4rem;
    background-color: ${colors.white};
  }
  @media screen and (min-width: ${mq.desktop.small.minWidth}) {
    border: 0.1rem solid ${colors.lightGray};
    padding: 3rem 2rem;
    min-width: 62rem;
    margin: 4rem 6rem;
    background-color: ${colors.white};
  }
`;

const SubmitButtonLeft = styled(CustomSubmitButton).attrs(
  ({ size, inline }) => {
    return { size, inline };
  },
)`
  align-items: left;
  max-width: 18rem;
  min-width: 10rem;
`;

const SubmitButtonRight = styled(CustomSubmitButton).attrs(
  ({ size, inline }) => {
    return { size, inline };
  },
)`
  align-items: right;
  max-width: 18rem;
  min-width: 10rem;
`;

const Unsubscribe = (props) => {
  const { control, formState, handleSubmit, setValue } = useForm({
    mode: "change",
  });
  const { t } = useTranslation();
  const queryParams = useQuery();
  const tokenValue = queryParams.get("token");
  const config = {
    headers: { token: tokenValue },
  };

  const disabledPrefs = {
    instant: { message: false, like: false, comment: false, share: false },
    digest: { daily: false, weekly: false, biweekly: false },
  };
  const [currPrefs, setCurrPrefs] = useState({ ...disabledPrefs });
  const [switchOnOff, setSwitchOnOff] = useState(true);
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  const onSubmit = async (formData) => {
    try {
      if (!switchOnOff) {
        localStorage.setItem(
          "notifyPrefs",
          JSON.stringify(formData.notifyPrefs),
        );
        Object.assign(formData.notifyPrefs, disabledPrefs);
      }
      await axios.patch("/api/users/unsubscribe", formData, config);
      setMessageSuccess(t("notifications.unsubscribe.success"));
      // delay for showing user the success Alert
      setTimeout(() => {
        props.history.push(`/`);
      }, 2000);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setMessageError(message);
    }
  };

  const onCancel = async () => {
    setMessageSuccess(t("notifications.unsubscribe.canceled"));
    setTimeout(() => {
      props.history.push(`/`);
    }, 2000);
  };

  useEffect(() => {
    (async function fetchProfile() {
      try {
        const res = await axios.get("/api/users/unsubscribe", config);
        let { _id, ...prefs } = res.data.notifyPrefs;
        if (isEqual(prefs, disabledPrefs)) {
          setSwitchOnOff(false); // update switch button
          const preNotifyPrefsString = localStorage.getItem("notifyPrefs");
          if (preNotifyPrefsString) {
            Object.assign(prefs, JSON.parse(preNotifyPrefsString));
          }
        }
        setCurrPrefs({ ...currPrefs, ...prefs });
        setValue("notifyPrefs", { ...prefs }); // update chexkboxes
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        setMessageError(message);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <LoginContainer>
      <LoginLeftContainer>
        <SocialImageContainer>
          <img className="SocialImageSVG" src={socialmedia2} alt="" />
        </SocialImageContainer>
      </LoginLeftContainer>
      <LoginRightContainer>
        {messageSuccess && (
          <SuccessAlert message={messageSuccess} type="success" />
        )}
        {messageError && <ErrorAlert message={messageError} type="error" />}
        <div className={"form-container"}>
          <Heading className="h4 text-center" level={4}>
            {t("notifications.unsubscribe.unsubscribe")}
          </Heading>
          <CustomForm>
            <NotifyPreferenceInput
              control={control}
              currPrefs={currPrefs}
              switchOnOff={switchOnOff}
              setSwitchOnOff={setSwitchOnOff}
            />
            {/* Button that saves changes */}
            <WhiteSpace />
            <WhiteSpace />
            <LoginContainer>
              <SubmitButtonLeft
                key="left"
                disabled={!formState.isValid}
                primary="true"
                onClick={handleSubmit(onCancel)}
              >
                {t("post.cancel")}
              </SubmitButtonLeft>
              <SubmitButtonRight
                key="right"
                disabled={!formState.isValid}
                primary="true"
                onClick={handleSubmit(onSubmit)}
              >
                {t("post.confirm")}
              </SubmitButtonRight>
            </LoginContainer>
          </CustomForm>
        </div>
      </LoginRightContainer>
    </LoginContainer>
  );
};

export default Unsubscribe;
