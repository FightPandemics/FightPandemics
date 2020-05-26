import { Alert } from "antd";
import { Button, Flex, WhiteSpace } from "antd-mobile";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { AUTH_SUCCESS } from "constants/action-types";
import { PASSWORD_MIN_LENGTH } from "config";
import {
  AUTH_FORM_LOGIN,
  AUTH_FORM_LOGIN_ERROR,
  AUTH_FORM_SIGNUP,
  AUTH_FORM_SIGNUP_ERROR,
  AUTH_FORM_SOCIAL,
  AUTH_FORM_SOCIAL_ERROR,
} from "hooks/actions/authFormActions";
import { authFormReducer, initialState } from "hooks/reducers/authFormReducer";
import SubmitButton from "components/Button/SubmitButton";
import Label from "components/Input/Label";
import Input from "components/Input/BaseInput";
import { inputStyles, labelStyles } from "constants/formStyles";
// import { validateEmail } from "utils/common.js";
import { useQuery } from "utils/hooks.js";
import Heading from "components/Typography/Heading";
import { ORANGE_RED, WHITE } from "constants/colors";
import { theme, mq } from "constants/theme";

// ICONS
import SvgIcon from "components/Icon/SvgIcon";
import twitter from "assets/icons/social-twitter.svg";
import facebook from "assets/icons/social-facebook.svg";
import gmail from "assets/icons/social-google.svg";
import linkedin from "assets/icons/social-linkedin.svg";
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
  border: 1px solid ${colors.lightGray};
  border-radius: unset;
  display: flex;
  height: 4.8rem;
  margin: 0.5rem;
  padding: 2.5rem;
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

const ErrorAlert = styled(Alert)`
  background-color: ${ORANGE_RED};
  .ant-alert-message {
    color: ${WHITE};
  }
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
  bottom: 0.6rem;
  right: 0.5rem;
  color: ${colors.tropicalBlue};
  cursor: pointer;
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

const Login = ({ isLoginForm }) => {
  const dispatch = useDispatch();
  const { formState, getValues, handleSubmit, register } = useForm({
    mode: "change",
  });
  const [authFormState, authFormDispatch] = useReducer(
    authFormReducer,
    initialState,
  );
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const queryParams = useQuery();
  const code = queryParams.get("code");
  const state = queryParams.get("state");

  useEffect(() => {
    if (code && state) {
      const loadOAuth = async () => {
        authFormDispatch({ type: AUTH_FORM_SOCIAL });
        try {
          const res = await axios.post(`/api/auth/oauth`, { code, state });
          dispatch({ type: AUTH_SUCCESS, payload: res.data });
        } catch (err) {
          const message = err.response?.data?.message || err.message;
          authFormDispatch({
            type: AUTH_FORM_SOCIAL_ERROR,
            error: `Authentication failed, reason: ${message}`,
          });
        }
      };
      loadOAuth();
    }
  }, [code, state, dispatch]);

  const onLoginWithEmail = async (formData) => {
    authFormDispatch({ type: AUTH_FORM_LOGIN });
    try {
      const res = await axios.post("/api/auth/login", formData);
      dispatch({ type: AUTH_SUCCESS, payload: res.data });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      authFormDispatch({
        type: AUTH_FORM_LOGIN_ERROR,
        error: `Login failed, reason: ${message}`,
      });
    }
  };

  const onSignup = async (formData) => {
    authFormDispatch({ type: AUTH_FORM_SIGNUP });
    try {
      const res = await axios.post("/api/auth/signup", formData);
      dispatch({ type: AUTH_SUCCESS, payload: res.data });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      authFormDispatch({
        type: AUTH_FORM_SIGNUP_ERROR,
        error: `Signup failed, reason: ${message}`,
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
    return password === confirmPassword || "Password don't match";
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
        <div>
          <FormContainer>
            <Heading className="text-center" level={4}>
              {isLoginForm ? "Sign In" : "Sign Up"}
            </Heading>
            {authFormState.error && (
              <ErrorAlert message={authFormState.error} type="error" />
            )}
            <form id="login-password">
              <InputWrapper>
                <Label htmlFor="email" style={labelStyles} label="E-mail" />
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter email address"
                  ref={register}
                  style={inputStyles}
                />
              </InputWrapper>
              <InputWrapper>
                <Label
                  htmlFor="password"
                  style={labelStyles}
                  label="Password"
                />
                <Input
                  type={passwordType}
                  name="password"
                  id="password"
                  required
                  placeholder="Enter password"
                  ref={register({ minLength: PASSWORD_MIN_LENGTH })}
                  style={inputStyles}
                />
                <VisibilityButton
                  onClick={togglePasswordVisibility}
                  type={passwordType}
                />
              </InputWrapper>
              {!isLoginForm && (
                <InputWrapper>
                  <Label
                    htmlFor="confirmPassword"
                    style={labelStyles}
                    label="Confirm Password"
                  />
                  <Input
                    type={confirmPasswordType}
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    placeholder="Confirm password"
                    ref={register({
                      minLength: PASSWORD_MIN_LENGTH,
                      validate: {
                        matchesPreviousPassword: comparePasswordConfirmation,
                      },
                    })}
                    style={inputStyles}
                  />
                  <VisibilityButton
                    onClick={toggleConfirmPasswordVisibility}
                    type={confirmPasswordType}
                  />
                </InputWrapper>
              )}
              <SubmitButton
                primary="true"
                disabled={!formState.isValid}
                onClick={
                  isLoginForm
                    ? handleSubmit(onLoginWithEmail)
                    : handleSubmit(onSignup)
                }
              >
                {isLoginForm ? "Sign In" : "Sign Up"}
              </SubmitButton>
            </form>
            <WhiteSpace />
            <WhiteSpace />
            <div className="text-center">
              {isLoginForm ? (
                <>
                  <p>
                    <AuthLink to="/auth/forgot-password">
                      Forgot password?
                    </AuthLink>
                  </p>
                  <p>
                    <AuthLink to="/auth/signup">
                      Don't have an account? <u>Sign Up</u>
                    </AuthLink>
                  </p>
                </>
              ) : (
                <p>
                  <AuthLink to="/auth/login">
                    Already have an account? <u>Sign In</u>
                  </AuthLink>
                </p>
              )}
            </div>
            <WhiteSpace />
            <SectionDiv className="text-center">
              {isLoginForm ? "Or Log in with" : "Or Sign up with"}
            </SectionDiv>
            <WhiteSpace />
          </FormContainer>
          <FlexBox>
            <SocialButton
              style={StyleSocialIcon}
              icon={<SvgIcon src={facebook} />}
              onClick={() => handleSocialLogin("facebook")}
            >
              <ButtonText>Facebook</ButtonText>
            </SocialButton>
            <SocialButton
              style={StyleSocialIcon}
              icon={<SvgIcon src={gmail} />}
              onClick={() => handleSocialLogin("google")}
            >
              <ButtonText>Gmail</ButtonText>
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
              style={StyleSocialIcon}
              icon={<SvgIcon src={linkedin} />}
              onClick={() => handleSocialLogin("linkedin")}
            >
              <ButtonText>Linkedin</ButtonText>
            </SocialButton>
          </FlexBox>
        </div>
      </LoginRightContainer>
    </LoginContainer>
  );
};

export default Login;
