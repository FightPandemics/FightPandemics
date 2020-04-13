import React, { useState } from "react";
import styled from "styled-components";
import { Button, Flex, WhiteSpace } from "antd-mobile";
import { Link } from "react-router-dom";
import { validateEmail } from '../utils/common.js';
import { PASSWORD_MIN_LENGTH } from '../config';
import { loginWithEmail, signup } from '../actions/authActions';
import { useDispatch } from "react-redux";
import PasswordInput from "~/components/Input/PasswordInput";
import { Toast } from 'antd-mobile';
import Label from "~/components/Input/Label";
import Input from "~/components/Input/BaseInput";

import {
  FacebookIcon,
  TwitterIcon,
  GmailIcon,
  LinkedinIcon,
} from "../components/Icon";
import SubmitButton from "~/components/Button/SubmitButton";

const InputWrapper = styled.div`
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
  color: #d7d7d7;

  &:before,
  &:after {
    display: inline-block;
    content: "";
    border-top: 0.1rem solid #d7d7d7;
    width: 3rem;
    margin: 0 0.5rem;
    transform: translateY(-0.3rem);
  }
`;

const FlexBox = styled(Flex).attrs((props) => ({
  wrap: "wrap",
  justify: "center",
}))``;

const SocialButton = styled(Button).attrs((props) => ({
  inline: true,
}))`
  width: 150px;
  margin: 0.5rem;
`;

export default ({ isLoginForm }) => {
  
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChangeEmail = e => {
    setEmail(e.target.value);
  }

  const handleInputChangePassword = e => {
    setPassword(e.target.value);
  }

  const handleLoginWithEmail = (evt) => {
    evt.preventDefault();
    if (!validateEmail (email)) {
      Toast.fail('Invalid email address!', 3);
      return;
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      Toast.fail('Password must be at least 6 characters', 3);
      return;
    }
    dispatch(loginWithEmail({ email, password }));
  }

  const handleSignup = (evt) => {
    evt.preventDefault();
    if (!validateEmail (email)) {
      Toast.fail('Invalid email address!', 3);
      return;
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      Toast.fail('Password must be at least 6 characters', 3);
      return;
    }
    dispatch(signup({ email, password }));
  }  

  const loginWithConnection = (connection) => {};

  return (
    <div className="text-center">
      <h1>Welcome</h1>
      <form id="login-password" method="POST">
        <InputWrapper>
          <Label style={StyleLabel} label="E-mail"/>
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
          <Label style={StyleLabel} label="Password"/>
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
          title={isLoginForm ? "Login" : "Sign Up"}
          onClick={isLoginForm? handleLoginWithEmail: handleSignup}
        />
      </form>
      <WhiteSpace />
      {isLoginForm ? (
        <>
          <p>
            <Link to="/auth/forgot-password">Forgot password?</Link>
          </p>
          <p>
            <Link to="/auth/signup">Don't have an account? Sign up!</Link>
          </p>
        </>
      ) : (
        <p>
          <Link to="/auth/login">Already have an account? Sign in!</Link>
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
          onClick={() => loginWithConnection("fb")}
        >
          Facebook
        </SocialButton>
        <SocialButton
          style={StyleSocialIcon}
          icon={<GmailIcon />}
          onClick={() => loginWithConnection("gmail")}
        >
          Gmail
        </SocialButton>
        <SocialButton
          style={StyleSocialIcon}
          icon={<TwitterIcon />}
          onClick={() => loginWithConnection("twitter")}
        >
          Twitter
        </SocialButton>
        <SocialButton
          style={StyleSocialIcon}
          icon={<LinkedinIcon />}
          onClick={() => loginWithConnection("linkedin")}
        >
          Linkedin
        </SocialButton>
      </FlexBox>
    </div>
  );
};

//export default LoginOrSignup;