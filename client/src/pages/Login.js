import { Button, Flex, WhiteSpace } from "antd-mobile";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import ErrorAlert from "components/Alert/ErrorAlert";
import Heading from "components/Typography/Heading";
import { AUTH_SUCCESS } from "constants/action-types";
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
} from "hooks/actions/authFormActions";
import { authFormReducer, initialState } from "hooks/reducers/authFormReducer";
import SubmitButton from "components/Button/SubmitButton";
import Input from "components/Input/BaseInput";
import InputError from "components/Input/InputError";
import Label from "components/Input/Label";
import { useQuery } from "utils/hooks.js";
import { setAuthToken } from "utils/auth-token";
import { validateEmail, validatePassword } from "utils/validators";

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
  top: 2.3rem;
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
  const { errors, formState, getValues, handleSubmit, register } = useForm({
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
          if (res?.data?.token) {
            setAuthToken(res.data.token);
          }
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

      if (res?.data?.token) {
        setAuthToken(res.data.token);
      }

      dispatch({
        type: AUTH_SUCCESS,
        payload: { ...res.data, email: formData.email },
      });
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
      dispatch({
        type: AUTH_SUCCESS,
        payload: { ...res.data, email: formData.email },
      });
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
    return password === confirmPassword || "Passwords don't match";
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
                <Label htmlFor="email" style={blockLabelStyles} label="Email" />
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className={errors.email && "has-error"}
                  placeholder="Enter email address"
                  ref={register({
                    required: "Email is required.",
                    validate: (email) =>
                      validateEmail(email) || "Invalid email",
                  })}
                  style={inputStyles}
                />
                {errors.email && (
                  <InputError>{errors.email.message}</InputError>
                )}
              </InputWrapper>
              <InputWrapper>
                <Label
                  htmlFor="password"
                  style={blockLabelStyles}
                  label="Password"
                />
                <Input
                  type={passwordType}
                  name="password"
                  id="password"
                  className={errors.password && "has-error"}
                  placeholder="Enter password"
                  ref={register({
                    maxLength: {
                      value: PASSWORD_MAX_LENGTH,
                      message: `Password must be at most ${PASSWORD_MAX_LENGTH} characters`,
                    },
                    minLength: {
                      value: PASSWORD_MIN_LENGTH,
                      message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
                    },
                    required: "Password is required.",
                    validate: (password) =>
                      validatePassword(password) ||
                      "Password must contain at least 3 of these: " +
                        "a lower-case letter, an upper-case letter, a number, a special character (such as !@#$%^&*).",
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
                    label="Confirm Password"
                  />
                  <Input
                    type={confirmPasswordType}
                    name="confirmPassword"
                    id="confirmPassword"
                    className={errors.confirmPassword && "has-error"}
                    required
                    placeholder="Confirm password"
                    ref={register({
                      maxLength: PASSWORD_MAX_LENGTH,
                      minLength: PASSWORD_MIN_LENGTH,
                      required: "Password confirmation is required.",
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
