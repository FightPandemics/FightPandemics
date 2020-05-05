import { Button, Flex, WhiteSpace, Toast } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { PASSWORD_MIN_LENGTH } from "../config";
import {
  authWithSocialProvider,
  loginWithEmail,
  signup,
} from "actions/authActions";
import SubmitButton from "~/components/Button/SubmitButton";
import Label from "~/components/Input/Label";
import Input from "~/components/Input/BaseInput";
import { validateEmail } from "../utils/common.js";
import { useQuery } from "../utils/hooks.js";
import { theme, mq } from "../constants/theme";

// ICONS
import SvgIcon from "../components/Icon/SvgIcon";
import twitter from "~/assets/icons/social-twitter.svg";
import facebook from "~/assets/icons/social-facebook.svg";
import gmail from "~/assets/icons/social-google.svg";
import linkedin from "~/assets/icons/social-linkedin.svg";
import socialmedia from "~/assets/social-media.svg";
import socialmedia2 from "~/assets/social-media2.svg";
import eye from "~/assets/icons/eye.svg";
const { colors } = theme;
const { typography } = theme;

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
  position: relative;
`;

const PasswordVisibility = styled.img`
   position: absolute;
   bottom: 6px;
   right: 5px;
`;

const StyleInput = {
  fontSize: "1.8rem",
  lineHeight: "2.5rem",
  paddingBottom: "0.8rem",
  width: "100%",
  borderBottom: "2px solid #5970EC",
  backgroundColor: "transparent"
};

const StyleLabel = {
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "1.6rem",
  lineHeight: "1.9rem",
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

const AuthLink = styled.a`
  font-family: ${typography.font.family.display};
  font-style: normal;
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 2.1rem;
  text-align: center;
  color: ${colors.royalBlue};
`;


const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #FBFBFD;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    padding-top: 6vh;
  }
`;

const LoginLeftContainer = styled.div`
  flex-basis: 45%;
  background-color: #F3F4FE;
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

const Login = ({ isLoginForm }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleInputChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
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
    if (!validateEmail(email)) {
      Toast.fail("Invalid email address!", 3);
      return
    }
    // todo: add inline validation (disable button / indicate error on form)
    if (password.length < PASSWORD_MIN_LENGTH) {
      Toast.fail("Password must be at least 6 characters", 3);
      return
    }
    // todo: check if passwords are the same (dissable button / indicate error on form)
    if(password !== confirmPassword) {
      Toast.fail("Password and confirm password do not match!", 3);
      return
    }
    dispatch(signup({ email, password, confirmPassword }));
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `/api/auth/oauth/${provider}`;
  };

  const togglePasswordVisibility = (e) => {
    let x = document.getElementById("password");
     if (x.type === "password") {
       x.type = "text";
     } else {
       x.type = "password";
     }
  }

  const toggleConfirmPasswordVisibility = (e) => {
    let x = document.getElementById("confirmPassword");
     if (x.type === "password") {
       x.type = "text";
     } else {
       x.type = "password";
     }
  }


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
          <div className="text-center">
            <FormContainer>
                <Title>{isLoginForm ? "Sign In" : "Sign Up"}</Title>
                <form id="login-password" method="POST">
                  <InputWrapper>
                    <Label for="email" style={StyleLabel} label="E-mail" />
                    <Input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter email address"
                      value={email}
                      onChange={handleInputChangeEmail}
                      style={StyleInput}
                    />
                  </InputWrapper>
                  <InputWrapper>
                    <Label for="password" style={StyleLabel} label="Password" />
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      required
                      placeholder="Enter password"
                      value={password}
                      onChange={handleInputChangePassword}
                      style={StyleInput}
                    />
                    <PasswordVisibility onClick={togglePasswordVisibility} src={eye} alt="" />
                  </InputWrapper>
                  {isLoginForm ? ''
                   : ( <InputWrapper>
                    <Label for="confirmPassword" style={StyleLabel} label="Confirm Password" />
                    <Input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      required
                      placeholder="Confirm password"
                      onChange={handleInputChangeConfirmPassword}
                      value={confirmPassword}
                      style={StyleInput}
                    />
                    <PasswordVisibility onClick={toggleConfirmPasswordVisibility} src={eye} alt="" />
                  </InputWrapper> ) }
                  <SubmitButton
                    primary="true"
                    onClick={isLoginForm ? handleLoginWithEmail : handleSignup}
                  >{isLoginForm ? "Sign In" : "Sign Up"}</SubmitButton>
                </form>
                <WhiteSpace />
                <WhiteSpace />
                {isLoginForm ? (
                  <>
                    <p>
                      <AuthLink href="/auth/forgot-password">Forgot password?</AuthLink>
                    </p>
                    <p>
                      <AuthLink href="/auth/signup">
                        Don't have an account? <u>Sign Up</u>
                      </AuthLink>
                    </p>
                  </>
                ) : (
                  <p>
                    <AuthLink href="/auth/login">
                      Already have an account? <u>Sign In</u>
                    </AuthLink>
                  </p>
                )}
                <WhiteSpace />
                <SectionDiv>
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
              <SocialButton
                style={StyleSocialIcon}
                icon={<SvgIcon src={twitter} />}
                onClick={() => handleSocialLogin("twitter")}
              >
                <ButtonText>Twitter</ButtonText>
              </SocialButton>
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
