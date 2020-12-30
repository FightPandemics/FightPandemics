import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import ErrorAlert from "components/Alert/ErrorAlert";
import FormInput from "components/Input/FormInput";
import ProfilePic from "components/Picture/ProfilePic";
import {
  FillEmptySpace,
  EditLayout,
  TitlePictureWrapper,
  CustomLink,
  CustomForm,
  CustomHeading,
  CustomSubmitButton,
  OptionDiv,
  ToggleHeading,
  CustomEditAccountHeader,
  FormLayout,
  Background,
} from "components/EditProfile/EditComponents";
import Label from "components/Input/Label";
import { blockLabelStyles } from "constants/formStyles";
import { UserContext, withUserContext } from "context/UserContext";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
  updateUser,
  updateUserError,
  updateUserSuccess,
} from "hooks/actions/userActions";
import { getInitialsFromFullName } from "utils/userInfo";
import { validateURL } from "utils/validators";
import facebookIcon from "assets/icons/social-facebook-unfilled.svg";
import instagramIcon from "assets/icons/social-instagram-unfilled.svg";
import githubIcon from "assets/icons/social-github.svg";
import linkedinBlue from "assets/icons/social-linkedin-unfilled.svg";
import twitterBlue from "assets/icons/social-twitter-unfilled.svg";
import styled from "styled-components";
import { mq, theme } from "constants/theme";
import { WhiteSpace } from "antd-mobile";
const { royalBlue, tropicalBlue, offWhite } = theme.colors;

const SocialIconsDiv = styled(Col)`
  img {
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      margin: 2rem;
      margin-top: 3rem;
      margin-bottom: 1rem;
    }
    max-width: 6rem;
    min-width: 6rem;
    margin: 2rem;
    margin-top: 4rem;
    margin-bottom: 4rem;
    cursor: pointer;
    background-color: ${(props) => (props.valid ? tropicalBlue : "0xffffff")};
    clip-path: inset(-10% 0% 0% -10% round 10px);

    &:hover {
      background-color: ${offWhite};
      color: ${royalBlue};
      transition: 0.3s all;
    }
  }
`;

const ABOUT_MAX_LENGTH = 160;

const socialIconsMap = {
  facebook: facebookIcon,
  instagram: instagramIcon,
  linkedin: linkedinBlue,
  twitter: twitterBlue,
  github: githubIcon,
};

const emptySocialUrls = {
  facebook: null,
  instagram: null,
  linkedin: null,
  twitter: null,
  github: null,
};

let lastProvider = "";

function EditProfile(props) {
  const { userProfileState, userProfileDispatch } = useContext(UserContext);
  const { errors, formState, register, handleSubmit } = useForm({
    mode: "change",
  });
  const { error, loading, user } = userProfileState;
  const { t } = useTranslation();
  const { firstName, lastName, urls = {}, about, usesPassword = false } =
    user || {};

  const [urlValues, setUrlValues] = useState({ ...emptySocialUrls });
  const [codeState, setCodeState] = useState({ code: "", state: "" });

  const urlValidator = (str) => {
    !str || validateURL(str) || t("profile.common.invalidURL");
  };

  useEffect(() => {
    const { code, state } = codeState;
    if (code) {
      const loadOAuth = async () => {
        try {
          const res = await axios.get(
            `/api/auth/oauth/${lastProvider}/user-link?code=${code}&state=${state}`,
          );
          const { userLink } = res.data;
          console.log(userLink);
          const linkTail = userLink?.substring(userLink?.lastIndexOf("/") + 1);
          setUrlValues({ ...urlValues, [lastProvider]: linkTail });
        } catch (err) {}
      };
      loadOAuth();
    }
  }, [codeState]); // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    setUrlValues({ ...urls });
  }, [urls]); // eslint-disable-next-line react-hooks/exhaustive-deps

  const connect = async (provider) => {
    lastProvider = provider;
    var win = window.open(
      `/api/auth/oauth/${provider}/auth-url`,
      "Authentication",
      "width=800, height=600, target = _blank",
    );

    // reference: https://www.gethugames.in/2012/04/authentication-and-authorization-for-google-apis-in-javascript-popup-window-tutorial.html
    const REDIRECT = window.location.hostname;
    var pollTimer = window.setInterval(function () {
      try {
        if (win.closed) {
          window.clearInterval(pollTimer);
        } else if (win.document.URL.indexOf(REDIRECT) != -1) {
          window.clearInterval(pollTimer);
          var url = win.document.URL;
          const searchParam = new URL(url).searchParams;
          const code = searchParam.get("code");
          const state = searchParam.get("state");
          setCodeState({ code: code, state: state });
          win.close();
        }
      } catch (e) {}
    }, 100);
  };

  const IconItem = (props) => {
    return (
      <SocialIconsDiv valid={urlValues[props.type]}>
        <img
          loading="lazy"
          src={props.icon}
          onClick={() => connect(props.type)}
          alt=""
        />
      </SocialIconsDiv>
    );
  };

  const onSubmit = async (formData) => {
    userProfileDispatch(updateUser());
    try {
      const res = await axios.patch("/api/users/current", {
        ...formData,
        urls: { ...formData.urls, ...urlValues },
      });
      userProfileDispatch(updateUserSuccess(res.data));
      // TODO: consistently return _id or id or both
      props.history.push(`/profile/${res.data._id}`);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);
      userProfileDispatch(
        updateUserError(
          `${t("error.failedUpdatingProfile")} ${translatedErrorMessage}`,
        ),
      );
    }
  };

  useEffect(() => {
    (async function fetchProfile() {
      userProfileDispatch(fetchUser());
      try {
        const res = await axios.get("/api/users/current");
        userProfileDispatch(fetchUserSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        const translatedErrorMessage = t([
          `error.${message}`,
          `error.http.${message}`,
        ]);
        userProfileDispatch(
          fetchUserError(
            `${t("error.failedLoadingProfile")} ${translatedErrorMessage}`,
          ),
        );
      }
    })();
  }, [t, userProfileDispatch]); // eslint-disable-next-line react-hooks/exhaustive-deps

  if (loading) return <div>"{t("profile.common.loading")}"</div>;
  return (
    <Background>
      <EditLayout>
        <TitlePictureWrapper>
          <CustomEditAccountHeader className="h4">
            {t("profile.individual.editProfile")}
          </CustomEditAccountHeader>
          <ToggleHeading>
            <CustomHeading level={4} className="h4">
              {t("profile.common.profileInfo")}
            </CustomHeading>
          </ToggleHeading>
          <FillEmptySpace />
          <ProfilePic
            resolution={"768rem"}
            allowUpload={false}
            user={user}
            initials={getInitialsFromFullName(`${firstName} ${lastName}`)}
          />
        </TitlePictureWrapper>
        {/* hide this until backend API is available
        <ChangePicButton>Change</ChangePicButton> */}
        <FormLayout>
          <OptionDiv>
            <CustomLink to="/edit-account">
              {t("profile.common.accountInfo")}
            </CustomLink>
            <CustomLink to="/edit-profile" isSelected>
              {t("profile.common.profileInfo")}
            </CustomLink>
            {usesPassword && (
              <CustomLink to="/edit-security">
                {t("profile.common.securityInfo")}
              </CustomLink>
            )}
            <CustomLink to="/edit-notifications">
              {t("profile.common.notificationInfo")}
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            {error && <ErrorAlert message={error} type="error" />}
            <FormInput
              inputTitle={t("profile.individual.intro")}
              name="about"
              type="text"
              defaultValue={about}
              error={errors.about}
              ref={register({
                maxLength: {
                  value: ABOUT_MAX_LENGTH,
                  message: t("profile.common.maxCharacters", {
                    maxNum: ABOUT_MAX_LENGTH,
                  }),
                },
              })}
            />
            <FormInput
              type={"text"}
              inputTitle={t("profile.common.urls.website")}
              name={`urls.website`}
              error={errors.urls?.["website"]}
              defaultValue={urls["website"]}
              ref={register(urlValidator)}
              key={"website"}
            />
            <WhiteSpace />
            <Label
              style={blockLabelStyles}
              label={t("profile.common.urls.linkSocial")}
            />
            <Row>
              {Object.keys(socialIconsMap).map((socialType) => (
                <IconItem
                  key={socialType}
                  icon={socialIconsMap[socialType]}
                  type={socialType}
                />
              ))}
            </Row>
            <CustomSubmitButton
              disabled={!formState.isValid}
              primary="true"
              onClick={handleSubmit(onSubmit)}
            >
              {t("profile.common.saveChanges")}
            </CustomSubmitButton>
          </CustomForm>
        </FormLayout>
      </EditLayout>
    </Background>
  );
}

export default withUserContext(EditProfile);
