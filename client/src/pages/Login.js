import { Button, Flex, WhiteSpace, Toast } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { PASSWORD_MIN_LENGTH } from "../config";
import {
  authWithSocialProvider,
  loginWithEmail,
  signup,
} from "../actions/authActions";
import SubmitButton from "~/components/Button/SubmitButton";
import Label from "~/components/Input/Label";
import Input from "~/components/Input/BaseInput";
import {
  FacebookIcon,
  TwitterIcon,
  GmailIcon,
  LinkedinIcon,
} from "../components/Icon";
import { validateEmail } from "../utils/common.js";
import { useQuery } from "../utils/hooks.js";
import { TermsLink } from "../components/PolicyPages/TermsLink";

import { theme } from "../constants/theme";
const { colors } = theme;

const Title = styled.h1`
  align-items: center;
  display: flex;
  font-size: 2.2rem;
  font-weight: bold;
  height: 5rem;
  justify-content: center;
`;

const InputWrapper = styled.div`
  margin: 2.2rem auto;
  width: 100%;
`;

const StyleInput = {
  width: "100%",
};

const StyleLabel = {
  textAlign: "left",
};

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
    width: 3rem;
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
  border-radius: 0.8rem;
  display: flex;
  height: 4.8rem;
  margin: 0.5rem;
  padding: 2.5rem;
  width: 13.6rem;
`;

const ButtonText = styled.span`
  font-family: "Poppins";
  font-size: 1.4rem;
  color: ${colors.darkGray};
`;

const Login = ({ isLoginForm }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryParams = useQuery();
  const code = queryParams.get("code");
  const state = queryParams.get("state");
  useEffect(() => {
    if (code && state) {
      dispatch(authWithSocialProvider({ code, state }));
    }
  }, [code, state, dispatch]);

  const handleInputChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleInputChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginWithEmail = (evt) => {
    evt.preventDefault();
    if (!validateEmail(email)) {
      Toast.fail("Invalid email address!", 3);
      return;
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      Toast.fail("Password must be at least 6 characters", 3);
      return;
    }
    dispatch(loginWithEmail({ email, password }));
  };

  const handleSignup = (evt) => {
    evt.preventDefault();
    // todo: add inline validation (disable button / indicate error on form)
    /*if (!validateEmail(email)) {
      "Invalid email address!"
    }*/
    // todo: add inline validation (disable button / indicate error on form)
    /*if (password.length < PASSWORD_MIN_LENGTH) {
      "Password must be at least 6 characters"
    }*/
    dispatch(signup({ email, password }));
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `/api/auth/oauth/${provider}`;
  };

  return (
    <div className="text-center">
      <Title>{isLoginForm ? "Sign In" : "Sign Up"}</Title>
      <form id="login-password" method="POST">
        <InputWrapper>
          <Label style={StyleLabel} label="E-mail" />
          <Input
            type="email"
            required
            placeholder="Enter email address"
            value={email}
            onChange={handleInputChangeEmail}
            style={StyleInput}
          />
        </InputWrapper>
        <InputWrapper>
          <Label style={StyleLabel} label="Password" />
          <Input
            type="password"
            required
            placeholder="Enter password"
            value={password}
            onChange={handleInputChangePassword}
            style={StyleInput}
          />
        </InputWrapper>
        <WhiteSpace />
        <WhiteSpace />
        <SubmitButton
          title={isLoginForm ? "Sign In" : "Sign Up"}
          onClick={isLoginForm ? handleLoginWithEmail : handleSignup}
        />
      </form>
      <WhiteSpace />
      {isLoginForm ? (
        <>
          <p>
            <TermsLink href="/auth/forgot-password">Forgot password?</TermsLink>
          </p>
          <p>
            <TermsLink href="/auth/signup">
              Don't have an account? <u>Sign Up</u>
            </TermsLink>
          </p>
        </>
      ) : (
        <p>
          <TermsLink href="/auth/login">
            Already have an account? <u>Sign In</u>
          </TermsLink>
        </p>
      )}
      <WhiteSpace />
      <SectionDiv>
        {isLoginForm ? "Or Log in with" : "Or Sign up with"}
      </SectionDiv>
      <WhiteSpace />
      <FlexBox>
        <SocialButton
          style={StyleSocialIcon}
          icon={<FacebookIcon />}
          onClick={() => handleSocialLogin("facebook")}
        >
          <ButtonText>Facebook</ButtonText>
        </SocialButton>
        <SocialButton
          style={StyleSocialIcon}
          icon={<GmailIcon />}
          onClick={() => handleSocialLogin("google")}
        >
          <ButtonText>Gmail</ButtonText>
        </SocialButton>
        <SocialButton
          style={StyleSocialIcon}
          icon={<TwitterIcon />}
          onClick={() => handleSocialLogin("twitter")}
        >
          <ButtonText>Twitter</ButtonText>
        </SocialButton>
        <SocialButton
          style={StyleSocialIcon}
          icon={<LinkedinIcon />}
          onClick={() => handleSocialLogin("linkedin")}
        >
          <ButtonText>Linkedin</ButtonText>
        </SocialButton>
      </FlexBox>
    </div>
  );
};

export default Login;
