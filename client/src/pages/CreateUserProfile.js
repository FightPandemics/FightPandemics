import { Flex, WhiteSpace } from "antd-mobile";
import { Dropdown, Menu } from "antd";
import React, { useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import PersonalDataImage from "assets/create-profile-images/personal-data.svg";
import Marker from "assets/create-profile-images/location-marker.svg";
import logo from "assets/logo.svg";
import ErrorAlert from "components/Alert/ErrorAlert";
import Logo from "components/Logo";
import Input from "components/Input/BaseInput";
import Checkbox from "components/Input/Checkbox";
import InputError from "components/Input/InputError";
import Label from "components/Input/Label";
import Heading from "components/Typography/Heading";
import TextLabel from "components/Typography/TextLabel";
import SubmitButton from "components/Button/SubmitButton";
import { theme, mq } from "constants/theme";
import {
  blockLabelStyles,
  inputStyles,
  inlineLabelStyles,
} from "constants/formStyles";
import { CREATE_USER, CREATE_USER_ERROR } from "hooks/actions/userActions";
import {
  createUserFormReducer,
  initialState,
} from "hooks/reducers/userReducers";
import { validateEmail } from "../utils/validators";
import axios from "axios";
import { SET_USER } from "../constants/action-types";

const { colors } = theme;

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
  display: block;
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
  --xsmall: ${theme.typography.size.xsmall};

  display: flex;
  align-items: "flex-start";
  margin: 1.5rem 0;
  .ant-checkbox-wrapper {
    margin-right: ${theme.typography.size.large};
  }
  span {
    color: ${theme.colors.darkGray};
    font-size: var(--xsmall);
    font-family: ${(props) => props.font};
  }
`;

const CheckboxGroup = ({
  defaultValue,
  description,
  label,
  name,
  onChange,
}) => {
  return (
    <CheckboxContainer>
      <Checkbox
        defaultValue={defaultValue}
        color={theme.colors.royalBlue}
        id={name}
        name={name}
        size={theme.typography.size.xxlarge}
        onChange={onChange}
      />
      <Flex direction="column" align="start">
        <Label htmlFor={name} style={inlineLabelStyles} label={label} />
        {description && <span>{description}</span>}
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

  .underline {
    color: ${theme.colors.green};
    font-size: ${theme.typography.size.xsmall};
    font-family: ${theme.typography.font.family.body};
    margin-top: ${theme.typography.size.xsmall};
  }
`;

/*
const UnderlineLink = styled.p`
  --color: ${theme.colors.darkGray};
  color: var(--color) !important;
  a {
    color: var(--color);
    text-decoration: underline;
  }
  font-size: ${theme.typography.size.small};
`;
*/

const Submit = styled(SubmitButton)`
  font-weight: 500;
`;

const handleCheckboxChange = ([evt]) => evt.target.checked;

const CreateProfile = ({ email, history }) => {
  const dispatch = useDispatch();
  const { control, errors, formState, handleSubmit, register } = useForm({
    mode: "change",
  });
  const [createUserFormState, createUserFormDispatch] = useReducer(
    createUserFormReducer,
    initialState,
  );

  const onSubmit = async (formData) => {
    createUserFormDispatch({ type: CREATE_USER });
    try {
      const { email, ...body } = formData;
      /* TEMP location until geolocation service id done */
      body.location = {
        address: 'New York, NY, USA',
        coordinates: [ -74.0059728, 40.7127753 ],
        city: "New York",
        state: "NY",
        country: "US"
      }
      const res = await axios.post("/api/users", body);

      dispatch({
        type: SET_USER,
        payload: { user: res.data },
      });
      history.push("/profile-completed");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      createUserFormDispatch({
        type: CREATE_USER_ERROR,
        error: `Create user failed, reason: ${message}`,
      });
    }
  };

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
          {createUserFormState.error && (
            <ErrorAlert message={createUserFormState.error} type="error" />
          )}
          <InputGroup>
            <InputWrapper>
              <Label
                htmlFor="email"
                style={{ ...blockLabelStyles, color: theme.colors.darkGray }}
                label="E-mail"
              />
              <Input
                type="email"
                name="email"
                id="email"
                className={errors.email && "has-error"}
                disabled
                ref={register({
                  required: "Email is required.",
                  validate: (email) => validateEmail(email) || "Invalid email",
                })}
                style={inputStyles}
                value={email}
              />
              {errors.email && <InputError>{errors.email.message}</InputError>}
            </InputWrapper>

            <InputWrapper>
              <Label
                htmlFor="firstName"
                style={blockLabelStyles}
                label="First name"
              />
              <Input
                type="text"
                name="firstName"
                id="firstName"
                className={errors.firstName && "has-error"}
                ref={register({
                  required: "First name is required.",
                })}
                style={inputStyles}
              />
              {errors.firstName && (
                <InputError>{errors.firstName.message}</InputError>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label
                htmlFor="lastName"
                style={blockLabelStyles}
                label="Last name"
              />
              <Input
                type="text"
                name="lastName"
                id="lastName"
                className={errors.lastName && "has-error"}
                ref={register({
                  required: "Last name is required.",
                })}
                style={inputStyles}
              />
              {errors.lastName && (
                <InputError>{errors.lastName.message}</InputError>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label
                htmlFor="location"
                icon={Marker}
                style={blockLabelStyles}
                label="Address"
              />
              <DropdownMenu>
                <div id="dropdown-anchor" style={{ position: "relative" }}>
                  <Input
                    type="text"
                    name="location.address"
                    id="location"
                    className={errors.location?.address && "has-error"}
                    ref={register({
                      required: "Location is required.",
                    })}
                    style={inputStyles}
                  />
                  {errors.location?.address && (
                    <InputError>{errors.location.address.message}</InputError>
                  )}
                  <SubLabel>Enter address, zip code, or city</SubLabel>
                </div>
              </DropdownMenu>
            </InputWrapper>
          </InputGroup>
          {/*
            temporarily disabled until the fields are added to the API
          <CheckboxGroup description="I am traveling" />
          <CheckboxGroup description="Don't show my address" />
          */}
          <InputGroup>
            <TextLabel
              color={theme.colors.royalBlue}
              size={theme.typography.size.large}
              weight={500}
            >
              I want to
            </TextLabel>
            <Controller
              as={CheckboxGroup}
              control={control}
              defaultValue={false}
              label="Volunteer"
              name="objectives.volunteer"
              onChange={handleCheckboxChange}
            />
            <Controller
              as={CheckboxGroup}
              control={control}
              defaultValue={false}
              label="Donate"
              name="objectives.donate"
              onChange={handleCheckboxChange}
            />
            <Controller
              as={CheckboxGroup}
              control={control}
              defaultValue={false}
              label="Share Information"
              name="objectives.shareInformation"
              onChange={handleCheckboxChange}
            />
          </InputGroup>
          <InputGroup>
            <TextLabel
              color={theme.colors.royalBlue}
              size={theme.typography.size.large}
              weight={500}
            >
              I need
            </TextLabel>
            <Controller
              as={CheckboxGroup}
              control={control}
              defaultValue={false}
              description="I have symptoms of COVID-19"
              label="Medical Help"
              name="needs.medicalHelp"
              onChange={handleCheckboxChange}
            />
            <Controller
              as={CheckboxGroup}
              control={control}
              defaultValue={false}
              description="I need assistance getting groceries, medicine, etc."
              label="Other Help"
              name="needs.otherHelp"
              onChange={handleCheckboxChange}
            />
          </InputGroup>
          <InputGroup>
            <Submit
              disabled={!formState.isValid || createUserFormState.loading}
              primary="true"
              onClick={handleSubmit(onSubmit)}
            >
              Create Profile
            </Submit>
            {/* temporarily disabled until API is updated to save these fields
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
            */}
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
