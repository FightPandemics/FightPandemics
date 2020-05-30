import { Flex, WhiteSpace } from "antd-mobile";
import { Dropdown, Menu } from "antd";
import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import PersonalDataImage from "assets/create-profile-images/personal-data.svg";
import Marker from "assets/create-profile-images/location-marker.svg";
import logo from "assets/logo.svg";
import Logo from "components/Logo";
import Input from "components/Input/BaseInput";
import Checkbox from "components/Input/Checkbox";
import Label from "components/Input/Label";
import Heading from "components/Typography/Heading";
import TextLabel from "components/Typography/TextLabel";
import SubmitButton from "components/Button/SubmitButton";
import { theme, mq } from "constants/theme";
import { inputStyles, labelStyles } from "constants/formStyles";
import { CREATE_USER, CREATE_USER_ERROR } from "hooks/actions/userActions";
import {
  createUserFormReducer,
  initialState,
} from "hooks/reducers/userReducers";
import { validateEmail } from "../utils/validators";
import { PASSWORD_MIN_LENGTH } from "../config";
import {
  AUTH_FORM_SIGNUP,
  AUTH_FORM_SIGNUP_ERROR,
} from "../hooks/actions/authFormActions";
import axios from "axios";
import { AUTH_SUCCESS } from "../constants/action-types";

const BrandLink = styled(Link)`
  align-self: flex-start;
  img {
  }
  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    padding-left: 4rem;
  }
`;

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  .form-container {
    background-color: ${theme.colors.offWhite};
    width: 100%;
    @media only screen and (min-width: ${mq.tablet.narrow.minWidth}) {
      margin-left: 50%;
      width: 50%;
    }
    @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
      margin-left: 40%;
      width: 60%;
    }
  }
  .image-container {
    background-color: ${theme.colors.selago};
    display: flex;
    justify-content: flex-start;
    @media only screen and ${mq.phone.wide.max} {
      display: none;
    }
    @media only screen and (min-width: ${mq.tablet.narrow.minWidth}) {
      height: 100vh;
      position: fixed;
      width: 50%;
    }
    @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
      height: 100vh;
      position: fixed;
      width: 40%;
    }
    .main-bg-image {
      margin-top: 14rem;
    }
  }
  .form-container,
  .image-container {
    padding: 1rem;
  }
`;

const InputWrapper = styled.div`
  margin: 2.2rem auto;
  width: 100%;
  position: relative;
`;

const SubLabel = styled.small`
  color: ${theme.colors.green};
`;

const ProfileFormGroup = styled.form`
  @media only screen and (min-width: ${mq.tablet.wide.minWidth}) {
    width: 350px;
    h1 {
      margin-left: -${theme.typography.size.large};
    }
  }
  p {
    margin-bottom: 0;
  }
`;

const CheckboxContainer = styled.div`
  --mt: ${theme.typography.size.xxsmall};
  --xsmall: ${theme.typography.size.xsmall};

  display: flex;
  align-items: ${(props) =>
    props.label && props.description ? "start" : "center"};
  margin: var(--mt) 0 0 0;
  p {
    color: ${theme.colors.darkerGray};
    font-weight: normal;
  }
  .ant-checkbox-wrapper {
    margin-right: ${theme.typography.size.large};
  }
  span {
    color: ${theme.colors.darkGray};
    font-size: var(--xsmall);
    font-family: ${(props) => props.font};
  }
`;

const CheckboxGroup = ({ children, description, font, label }) => {
  return (
    <CheckboxContainer font={font} label={label} description={description}>
      <Checkbox
        color={theme.colors.royalBlue}
        size={theme.typography.size.xxlarge}
      />
      <Flex direction="column" align="start">
        {children ?? (
          <TextLabel
            color={theme.colors.black}
            size={theme.typography.size.large}
          >
            {label}
          </TextLabel>
        )}
        <span>{description}</span>
      </Flex>
    </CheckboxContainer>
  );
};

const StyledMenu = styled(Menu)`
  padding: ${theme.typography.size.xxsmall};
  width: 100%;
  .ant-dropdown-menu-item {
    display: flex;
    span {
      font-size: ${theme.typography.size.medium};
      margin-right: ${theme.typography.size.xxsmall};
      :first-child {
        color: ${theme.colors.darkerGray};
        font-weight: 500;
      }
      :last-child {
        margin: 0;
      }
    }
    &.ant-dropdown-menu-item-active {
      background-color: ${theme.colors.selago};
    }
  }
`;

const DropdownMenu = ({ children }) => {
  const menu = (
    <StyledMenu>
      <Menu.Item>
        <span>10014</span>
        <span>13th Ave,</span>
        <span>New York,</span>
        <span>NY,</span>
        <span>USA</span>
      </Menu.Item>
      <Menu.Divider />
    </StyledMenu>
  );
  return <Dropdown overlay={menu}>{children}</Dropdown>;
};

const InputGroup = styled.div`
  --py: ${theme.typography.size.xxsmall};
  --my: ${theme.typography.size.xxxlarge};

  margin: var(--my) 0 var(--my) 0;

  .address {
    input {
      margin-bottom: 0;
    }
    label > p:before {
      content: " ";
      background-image: url(${Marker});
      background-size: contain;
      background-repeat: no-repeat;
      display: inline-block;
      margin-right: ${theme.typography.size.xxsmall};
      height: ${theme.typography.size.xlarge};
      width: ${theme.typography.size.xlarge};
    }

    label:after {
      content: "Enter address, zip code, or city";
      color: ${theme.colors.green};
      font-size: ${theme.typography.size.xsmall};
      font-family: ${theme.typography.font.family.body};
      margin-top: ${theme.typography.size.xsmall};
    }
  }

  .underline {
    color: ${theme.colors.green};
    font-size: ${theme.typography.size.xsmall};
    font-family: ${theme.typography.font.family.body};
    margin-top: ${theme.typography.size.xsmall};
  }
`;

const UnderlineLink = styled.p`
  --color: ${theme.colors.darkGray};
  color: var(--color) !important;
  a {
    color: var(--color);
    text-decoration: underline;
  }
  font-size: ${theme.typography.size.small};
`;

const Submit = styled(SubmitButton)`
  font-weight: 500;
`;

const CreateProfile = ({ email }) => {
  const { formState, getValues, handleSubmit, register } = useForm({
    mode: "change",
  });
  const [createUserFormState, createUserFormDispatch] = useReducer(
    createUserFormReducer,
    initialState,
  );

  const onSubmit = async (formData) => {
    createUserFormDispatch({ type: CREATE_USER });
    try {
      const res = await axios.post("/api/auth/signup", formData);
      // user created successfully
      console.log({ res });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      createUserFormDispatch({
        type: CREATE_USER_ERROR,
        error: `Signup failed, reason: ${message}`,
      });
    }
  };
  console.log({ email, formState, createUserFormState });
  return (
    <Container>
      <Flex className="image-container" direction="column">
        <BrandLink to="/">
          <Logo src={logo} alt="Fight Pandemics logo" />
        </BrandLink>
        <img
          className="main-bg-image"
          src={PersonalDataImage}
          alt="two people standing next to a list of personal items"
        />
      </Flex>
      <Flex className="form-container" direction="column">
        <WhiteSpace size="xl" />
        <ProfileFormGroup>
          <Heading className="text-center" level={4}>
            Create your Profile
          </Heading>
          <InputGroup>
            <InputWrapper>
              <Label htmlFor="email" style={labelStyles} label="E-mail" />
              <Input
                type="email"
                name="email"
                id="email"
                disabled
                required
                ref={register({ validate: validateEmail })}
                style={inputStyles}
                value={email}
              />
            </InputWrapper>

            <InputWrapper>
              <Label
                htmlFor="firstName"
                style={labelStyles}
                label="First name"
              />
              <Input
                type="text"
                name="firstName"
                id="firstName"
                required
                ref={register}
                style={inputStyles}
              />
            </InputWrapper>

            <InputWrapper>
              <Label htmlFor="lastName" style={labelStyles} label="Last name" />
              <Input
                type="text"
                name="lastName"
                id="lastName"
                required
                ref={register}
                style={inputStyles}
              />
              <SubLabel>Enter address, zip code, or city</SubLabel>
            </InputWrapper>

            <InputWrapper>
              <Label htmlFor="address" style={labelStyles} label="Address" />
              <DropdownMenu>
                <div id="dropdown-anchor" style={{ position: "relative" }}>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    required
                    ref={register}
                    style={inputStyles}
                  />
                </div>
              </DropdownMenu>
            </InputWrapper>
          </InputGroup>
          <CheckboxGroup description="I am traveling" />
          <CheckboxGroup description="Don't show my address" />
          <InputGroup>
            <TextLabel
              color={theme.colors.royalBlue}
              size={theme.typography.size.large}
              weight={500}
            >
              I want to
            </TextLabel>
            <CheckboxGroup label="Volunteer" />
            <CheckboxGroup label="Donate" />
            <CheckboxGroup label="Share Information" />
          </InputGroup>
          <InputGroup>
            <TextLabel
              color={theme.colors.royalBlue}
              size={theme.typography.size.large}
              weight={500}
            >
              I need
            </TextLabel>
            <CheckboxGroup
              label="Medical Help"
              description="I have symptoms of COVID-19"
            />
            <CheckboxGroup
              label="Other Help"
              description="I need assitance getting groceries, medicine, etc."
            />
          </InputGroup>
          <InputGroup>
            <Submit
              disabled={!formState.isValid}
              primary="true"
              onClick={handleSubmit(onSubmit)}
            >
              Create Profile
            </Submit>
            <CheckboxGroup>
              <UnderlineLink>
                By signing up, I agree to the{" "}
                <a href="/privacy-policy">Privacy Policy</a>
              </UnderlineLink>
            </CheckboxGroup>
            <CheckboxGroup>
              <UnderlineLink>
                By signing up, I agree to the{" "}
                <a href="/terms-conditions">Terms and Conditions</a>
              </UnderlineLink>
            </CheckboxGroup>
          </InputGroup>
        </ProfileFormGroup>
      </Flex>
    </Container>
  );
};

const mapStateToProps = ({ session }) => ({
  email: session.email,
});

export default connect(mapStateToProps)(CreateProfile);
