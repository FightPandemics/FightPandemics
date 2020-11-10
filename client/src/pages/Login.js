import { Button, Flex, WhiteSpace } from "antd-mobile";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GTM from "constants/gtm-tags";
import TagManager from "react-gtm-module";
import ErrorAlert from "components/Alert/ErrorAlert";
import Heading from "components/Typography/Heading";
import {
  AUTH_SUCCESS,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
} from "constants/action-types";
import { inputStyles, blockLabelStyles } from "constants/formStyles";
import { theme, mq } from "constants/theme";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "config";
import {
  AUTH_FORM_LOGIN,
  AUTH_FORM_LOGIN_ERROR,
  AUTH_FORM_SIGNUP,
  AUTH_FORM_SIGNUP_ERROR,
  AUTH_FORM_SOCIAL,
  AUTH_FORM_SOCIAL_ERROR,
  AUTH_FORM_FORGOT_PASSWORD,
  AUTH_FORM_FORGOT_PASSWORD_ERROR,
} from "hooks/actions/authFormActions";
import { authFormReducer, initialState } from "hooks/reducers/authFormReducer";
import SubmitButton from "components/Button/SubmitButton";
import Input from "components/Input/BaseInput";
import InputError from "components/Input/InputError";
import Label from "components/Input/Label";
import { useQuery } from "utils/hooks.js";
import { validateEmail, validatePassword } from "utils/validators";
import { useTranslation } from "react-i18next";

// ICONS
import SvgIcon from "components/Icon/SvgIcon";
import facebook from "super-tiny-icons/images/svg/facebook.svg";
import google from "super-tiny-icons/images/svg/google.svg";
import linkedin from "super-tiny-icons/images/svg/linkedin.svg";
import socialmedia from "assets/social-media.svg";
import socialmedia2 from "assets/social-media2.svg";
import eyeUnmask from "assets/icons/eye-unmask.svg";
import eyeMask from "assets/icons/eye-mask.svg";

const { colors, typography } = theme;

const InputWrapper = styled.div`
  margin: 2.2rem auto;
  width: 100%;
  position: relative;
`;

const StyleSocialIcon = {
  justifyContent: "unset",
  cursor: "pointer",
};

const SectionDiv = styled.div`
  font-size: 1.4rem;
  text-transform: uppercase;
  color: ${colors.lightGray};
  &:before,
  &:after {
    display: inline-block;
    content: "";
    border-top: 0.1rem solid ${colors.lightGray};
    width: 7rem;
    margin: 0 0.5rem;
    transform: translateY(-0.3rem);
  }
`;

const FlexBox = styled(Flex).attrs((props) => ({
  wrap: "wrap",
  justify: "center",
}))``;

const SocialButton = styled(Button)`
  border: 0.1rem solid ${colors.lightGray};
  border-radius: unset;
  display: flex;
  height: 4.8rem;
  margin: 0.5rem;
  padding: 2.5rem 1.8rem;
  width: 13.6rem;
`;

const ButtonText = styled.span`
  font-family: ${typography.font.family.display};
  font-size: 1.4rem;
  color: ${colors.darkGray};
`;

const AuthLink = styled(Link)`
  font-family: ${typography.font.family.display};
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 2.1rem;
  color: ${colors.royalBlue};
`;

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

const FormContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  @media screen and ${mq.phone.narrow.max} {
    width: 90%;
  }
`;

const VisibilityIconWrapper = styled.div`
  position: absolute;
  top: 2.3rem;
  right: 0.5rem;
  color: ${colors.tropicalBlue};
  cursor: pointer;
`;

const BackLinkContainer = styled.div`
  @media screen and (max-width: ${mq.phone.wide.minWidth}) {
    position: fixed;
    bottom: auto;
    right: 27%;
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) and (min-width: ${mq
      .phone.wide.minWidth}) {
    position: absolute;
    bottom: 30%;
    right: 40%;
  }
`;

const ForgotPasswordContainer = styled.div`
  margin-top: 25%;
`;

const EmailButtonContainer = styled.div`
  margin-top: 15%;
`;

const VisibilityButton = ({ onClick, type }) => {
  return (
    <VisibilityIconWrapper>
      {type === "text" ? (
        <SvgIcon src={eyeMask} onClick={onClick} />
      ) : (
        <SvgIcon src={eyeUnmask} onClick={onClick} />
      )}
    </VisibilityIconWrapper>
  );
};

const Login = ({ isLoginForm, forgotPassword }) => {
  const dispatch = useDispatch();
  const { errors, formState, getValues, handleSubmit, register } = useForm({
    mode: "change",
  });
  const [authFormState, authFormDispatch] = useReducer(
    authFormReducer,
    initialState,
  );
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const { t } = useTranslation();
  const queryParams = useQuery();
  const code = queryParams.get("code");
  const state = queryParams.get("state");

  useEffect(() => {
    if (code && state) {
      const loadOAuth = async () => {
        authFormDispatch({ type: AUTH_FORM_SOCIAL });
        try {
          const res = await axios.post(`/api/auth/oauth`, { code, state });
          const { token, emailVerified } = res.data;
          const userId = res.data?.user?.id;
          if (token && emailVerified) {
            // on initial sign in with social there is no id
            TagManager.dataLayer({
              dataLayer: {
                userId: userId ? userId : -1,
              },
            });
          }
          dispatch({ type: AUTH_SUCCESS, payload: res.data });
        } catch (err) {
          const message = err.response?.data?.message || err.message;
          const translatedErrorMessage = t([
            `error.${message}`,
            `error.http.${message}`,
          ]);
          authFormDispatch({
            type: AUTH_FORM_SOCIAL_ERROR,
            error: `${t(
              "error.failedAuthentication",
            )} ${translatedErrorMessage}`,
          });
        }
      };
      loadOAuth();
    }
  }, [code, state, dispatch, t]);

  const onLoginWithEmail = async (formData) => {
    authFormDispatch({ type: AUTH_FORM_LOGIN });

    try {
      const res = await axios.post("/api/auth/login", formData);
      TagManager.dataLayer({
        dataLayer: {
          userId: res.data?.user?.id,
        },
      });
      dispatch({
        type: AUTH_SUCCESS,
        payload: { ...res.data, email: formData.email },
      });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);
      authFormDispatch({
        type: AUTH_FORM_LOGIN_ERROR,
        error: `${t("error.failedLogin")} ${translatedErrorMessage}`,
      });
    }
  };

  const onSignup = async (formData) => {
    authFormDispatch({ type: AUTH_FORM_SIGNUP });
    try {
      const res = await axios.post("/api/auth/signup", formData);
      dispatch({
        type: AUTH_SUCCESS,
        payload: { ...res.data, email: formData.email },
      });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);
      authFormDispatch({
        type: AUTH_FORM_SIGNUP_ERROR,
        error: `${t("error.failedSignup")} ${translatedErrorMessage}`,
      });
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      isLoginForm ? handleSubmit(onLoginWithEmail)() : handleSubmit(onSignup)();
    }
  };

  const onForgotPassword = async (formData) => {
    authFormDispatch({ type: AUTH_FORM_FORGOT_PASSWORD });
    try {
      await axios.post("/api/auth/change-password", formData);
      dispatch({
        type: FORGOT_PASSWORD_REQUEST_SUCCESS,
        payload: { email: formData.email },
      });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);
      authFormDispatch({
        type: AUTH_FORM_FORGOT_PASSWORD_ERROR,
        error: `${t("error.failedPasswordRecovery")} ${translatedErrorMessage}`,
      });
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `/api/auth/oauth/${provider}`;
  };

  const togglePasswordVisibility = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const toggleConfirmPasswordVisibility = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordType("password");
    }
  };

  const comparePasswordConfirmation = (confirmPassword) => {
    const { password } = getValues();
    return password === confirmPassword || t("auth.passwordNotMatch");
  };

  return (
    <LoginContainer>
      <LoginLeftContainer>
        <SocialImageContainer>
          <img
            className="SocialImageSVG"
            src={isLoginForm ? socialmedia : socialmedia2}
            alt=""
          />
        </SocialImageContainer>
      </LoginLeftContainer>
      <LoginRightContainer>
        <div className={forgotPassword ? "bkg-white" : "form-container"}>
          <FormContainer onKeyPress={handleEnterKeyPress}>
            <Heading className="h4 text-center" level={4}>
              {isLoginForm
                ? t("auth.signIn")
                : forgotPassword
                ? t("auth.forgotPassword")
                : t("auth.joinNow")}
            </Heading>
            {authFormState.error && (
              <ErrorAlert message={authFormState.error} type="error" />
            )}
            {!forgotPassword ? (
              <form id="login-password">
                <InputWrapper>
                  <Label
                    htmlFor="email"
                    style={blockLabelStyles}
                    label={t("auth.email")}
                  />
                  <Input
                    type="email"
                    required
                    name="email"
                    id="email"
                    className={errors.email && "has-error"}
                    placeholder={t("auth.enterEmail")}
                    ref={register({
                      validate: (email) => validateEmail(email),
                    })}
                    style={inputStyles}
                  />
                  {errors.email && (
                    <InputError>
                      {t(`profile.common.${errors.email.message}`)}
                    </InputError>
                  )}
                </InputWrapper>
                <InputWrapper>
                  <Label
                    htmlFor="password"
                    style={blockLabelStyles}
                    label={t("auth.password")}
                  />
                  <Input
                    type={passwordType}
                    name="password"
                    id="password"
                    className={errors.password && "has-error"}
                    placeholder={t("auth.enterPassword")}
                    ref={register({
                      maxLength: {
                        value: PASSWORD_MAX_LENGTH,
                        message: t("auth.passwordMax", {
                          num: PASSWORD_MAX_LENGTH,
                        }),
                      },
                      minLength: {
                        value: PASSWORD_MIN_LENGTH,
                        message: t("auth.passwordMin", {
                          num: PASSWORD_MIN_LENGTH,
                        }),
                      },
                      required: t("profile.common.passwordRequired") + ".",
                      validate: (password) =>
                        validatePassword(password) ||
                        t("profile.common.invalidPassword"),
                    })}
                    style={{ ...inputStyles, paddingRight: "3.5rem" }}
                  />
                  <VisibilityButton
                    onClick={togglePasswordVisibility}
                    type={passwordType}
                  />
                  {errors.password && (
                    <InputError>{errors.password.message}</InputError>
                  )}
                </InputWrapper>
                {!isLoginForm && (
                  <InputWrapper>
                    <Label
                      htmlFor="confirmPassword"
                      style={blockLabelStyles}
                      label={t("auth.confirmPassword")}
                    />
                    <Input
                      type={confirmPasswordType}
                      name="confirmPassword"
                      id="confirmPassword"
                      className={errors.confirmPassword && "has-error"}
                      required
                      placeholder={t("auth.confirmPassword")}
                      ref={register({
                        maxLength: PASSWORD_MAX_LENGTH,
                        minLength: PASSWORD_MIN_LENGTH,
                        required: t("auth.passwordConfirmationRequired"),
                        validate: comparePasswordConfirmation,
                      })}
                      style={{ ...inputStyles, paddingRight: "3.5rem" }}
                    />
                    <VisibilityButton
                      onClick={toggleConfirmPasswordVisibility}
                      type={confirmPasswordType}
                    />
                    {errors.confirmPassword && (
                      <InputError>{errors.confirmPassword.message}</InputError>
                    )}
                  </InputWrapper>
                )}
                <SubmitButton
                  primary="true"
                  disabled={!formState.isValid}
                  id={
                    isLoginForm
                      ? GTM.sign.inPrefix + GTM.sign.in
                      : GTM.sign.upPrefix + GTM.sign.up
                  }
                  onClick={
                    isLoginForm
                      ? handleSubmit(onLoginWithEmail)
                      : handleSubmit(onSignup)
                  }
                >
                  {isLoginForm ? t("auth.signIn") : t("auth.joinNow")}
                </SubmitButton>
              </form>
            ) : (
              <ForgotPasswordContainer>
                <form id="forgot-password">
                  <InputWrapper>
                    <Label
                      htmlFor="email"
                      style={blockLabelStyles}
                      label={t("auth.email")}
                    />
                    <Input
                      type="email"
                      required
                      name="email"
                      id="email"
                      className={errors.email && "has-error"}
                      placeholder={t("auth.enterEmail")}
                      ref={register({
                        validate: (email) => validateEmail(email),
                      })}
                      style={inputStyles}
                    />
                    {errors.email && (
                      <InputError>
                        {t(`profile.common.${errors.email.message}`)}
                      </InputError>
                    )}
                  </InputWrapper>

                  <EmailButtonContainer>
                    <SubmitButton
                      primary="true"
                      disabled={!formState.isValid}
                      onClick={handleSubmit(onForgotPassword)}
                    >
                      {t("onboarding.common.submit")}
                    </SubmitButton>
                  </EmailButtonContainer>
                </form>
              </ForgotPasswordContainer>
            )}
            <WhiteSpace />
            <WhiteSpace />
            {!forgotPassword ? (
              <div className="text-center">
                {isLoginForm ? (
                  <>
                    <p>
                      <AuthLink to="/auth/forgot-password">
                        {t("auth.forgotPassword")}
                      </AuthLink>
                    </p>
                    <p>
                      <AuthLink
                        id={GTM.sign.inPrefix + GTM.sign.up}
                        to="/auth/signup"
                      >
                        {t("auth.noAccount")} <u>{t("auth.joinNow")}</u>
                      </AuthLink>
                    </p>
                  </>
                ) : (
                  <p>
                    <AuthLink
                      id={GTM.sign.upPrefix + GTM.sign.in}
                      to="/auth/login"
                    >
                      {t("auth.haveAccount")} <u>{t("auth.signIn")}</u>
                    </AuthLink>
                  </p>
                )}
              </div>
            ) : (
              <BackLinkContainer>
                <div className="text-center">
                  <AuthLink to="/auth/login">{t("auth.back")}</AuthLink>
                </div>
              </BackLinkContainer>
            )}
            <WhiteSpace />
            {!forgotPassword && (
              <SectionDiv className="text-center">
                {isLoginForm ? t("auth.orSignIn") : t("auth.orJoinNow")}
              </SectionDiv>
            )}
            <WhiteSpace />
          </FormContainer>
          {!forgotPassword && (
            <FlexBox>
              <SocialButton
                id={
                  isLoginForm
                    ? GTM.sign.inPrefix + GTM.social.facebook
                    : GTM.sign.upPrefix + GTM.social.facebook
                }
                style={StyleSocialIcon}
                icon={<SvgIcon src={facebook} />}
                onClick={() => handleSocialLogin("facebook")}
              >
                <ButtonText>Facebook</ButtonText>
              </SocialButton>
              <SocialButton
                id={
                  isLoginForm
                    ? GTM.sign.inPrefix + GTM.social.google
                    : GTM.sign.upPrefix + GTM.social.google
                }
                style={StyleSocialIcon}
                icon={<SvgIcon src={google} />}
                onClick={() => handleSocialLogin("google")}
              >
                <ButtonText>Google</ButtonText>
              </SocialButton>
              {/** temporarily disable twitter for MVP v1
               <SocialButton
                style={StyleSocialIcon}
                icon={<SvgIcon src={twitter} />}
                onClick={() => handleSocialLogin("twitter")}
              >
                <ButtonText>Twitter</ButtonText>
              </SocialButton>**/}
              <SocialButton
                id={
                  isLoginForm
                    ? GTM.sign.inPrefix + GTM.social.linkedin
                    : GTM.sign.upPrefix + GTM.social.linkedin
                }
                style={StyleSocialIcon}
                icon={<SvgIcon src={linkedin} />}
                onClick={() => handleSocialLogin("linkedin")}
              >
                <ButtonText>LinkedIn</ButtonText>
              </SocialButton>
            </FlexBox>
          )}
        </div>
      </LoginRightContainer>
    </LoginContainer>
  );
};

export default Login;
