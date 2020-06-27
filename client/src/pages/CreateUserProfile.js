import { Flex, WhiteSpace } from "antd-mobile";
import React, { useReducer, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  InputWrapper,
  InputGroup,
  CheckboxContainer,
  styleLabel,
} from "components/OrganizationProfile/CreateProfileComponents";
import StyledCheckbox from "components/Input/Checkbox";
import PersonalDataImage from "assets/create-profile-images/personal-data.svg";
import Marker from "assets/create-profile-images/location-marker.svg";
import logo from "assets/logo.svg";
import LocationInput from "components/Input/LocationInput";
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

const Submit = styled(SubmitButton)`
  font-weight: 500;
`;

const handleCheckboxChange = ([evt]) => evt.target.checked;

const CreateProfile = ({ email, history }) => {
  const [location, setLocation] = useState({});
  const [privacy, setPrivacy] = useState("");
  const [conditions, setConditions] = useState("");

  const dispatch = useDispatch();
  const {
    clearError,
    control,
    errors,
    formState,
    handleSubmit,
    register,
    setError,
  } = useForm({
    mode: "change",
  });
  const [createUserFormState, createUserFormDispatch] = useReducer(
    createUserFormReducer,
    initialState,
  );

  const handleInputChangePrivacy = (e) => {
    setPrivacy(e.target.checked);
  };
  const handleInputChangeConditions = (e) => {
    setConditions(e.target.checked);
  };

  const onSubmit = async (formData) => {
    if (!privacy) {
      alert("You must agree to our privacy policy before proceeding");
      return;
    } else if (!conditions) {
      alert("You must agree to our terms and conditions before proceeding");
      return;
    } else if (!location.address) {
      // all location objects should have address (+coordinates), others optional
      return setError(
        "location",
        "required",
        "Please select an address from the drop-down",
      );
    }
    createUserFormDispatch({ type: CREATE_USER });
    try {
      const { email, ...body } = formData;
      body.location = location;
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

  const handleLocationChange = (location) => {
    setLocation(location);
    clearError("location");
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
              <LocationInput
                formError={errors.location}
                location={location}
                onLocationChange={handleLocationChange}
              />
            </InputWrapper>
          </InputGroup>
          {/*
            temporarily disabled until the fields are added to the API
          <CheckboxGroup description="I am traveling" />
          */}
          <InputGroup>
            <Controller
              as={CheckboxGroup}
              control={control}
              defaultValue={false}
              label="Don't show my address"
              name="hide.address"
              onChange={handleCheckboxChange}
            />
          </InputGroup>
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
          <InputWrapper>
            <Label style={styleLabel} label="" />
            <StyledCheckbox
              style={{ fontSize: "1.2rem" }}
              value="I agree to the Privacy Policy"
              onChange={handleInputChangePrivacy}
            >
              By signing up, I agree to the{" "}
              <Link to="/privacy-policy">Privacy Policy</Link>
            </StyledCheckbox>
            <WhiteSpace />
            <Label style={styleLabel} label="" />
            <StyledCheckbox
              style={{ fontSize: "1.2rem" }}
              value="I agree to the Terms and Conditions"
              onChange={handleInputChangeConditions}
            >
              By signing up, I agree to the{" "}
              <Link to="/terms-conditions">Terms and Conditions</Link>
            </StyledCheckbox>
          </InputWrapper>
          <InputGroup>
            <Submit
              disabled={!formState.isValid || !(privacy && conditions)}
              primary="true"
              onClick={handleSubmit(onSubmit)}
            >
              Create Profile
            </Submit>
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
