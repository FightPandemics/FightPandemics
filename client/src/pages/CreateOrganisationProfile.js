import { Flex, WhiteSpace } from "antd-mobile";
import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import createOrganisationProfile from "assets//data/createOrganisationProfile";
import Marker from "assets/create-profile-images/location-marker.svg";
import Heading from "components/Typography/Heading";
import Input from "components/Input/BaseInput";
import InputError from "components/Input/InputError";
import Select from "components/Input/Select";
import SubmitButton from "components/Button/SubmitButton";
import Label from "components/Input/Label";
import StyledCheckbox from "components/Input/Checkbox";
import LocationInput from "components/Input/LocationInput";
import PrivacyPolicyContent from "components/PolicyPages/PrivacyPolicyContent";
import TermsConditionsContent from "components/PolicyPages/TermsConditionsContent";
import PolicyModal from "components/PolicyPages/PolicyModal";
import Checkbox from "components/Input/Checkbox";
import createOrganisationSvg from "assets/icons/create-organisation.svg";
import { connect } from "react-redux";
import { theme } from "constants/theme";
import { StyledForm } from "../components/CreatePost/StyledCreatePost";
import ErrorAlert from "components/Alert/ErrorAlert";
import {
  Main,
  SvgContainer,
  FormContainer,
  InputWrapper,
  InputGroup,
  CheckboxContainer,
  styleLabel,
  styleInput,
  globalText,
  errorStyles,
} from "components/OrganisationProfile/CreateProfileComponents";
import {
  CREATE_Organisation,
  CREATE_Organisation_ERROR,
} from "hooks/actions/organisationActions";
import {
  createOrganisationFormReducer,
  initialState,
} from "hooks/reducers/organisationReducers";
import axios from "axios";
import { inlineLabelStyles } from "constants/formStyles";
import styled from "styled-components";
import GTM from "constants/gtm-tags";

const StyledUnderlineLink = styled.a`
  text-decoration-line: underline;
`;

const { type, industry } = createOrganisationProfile;

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

const CreateOrgProfile = (props) => {
  const {
    clearError,
    register,
    handleSubmit,
    control,
    errors,
    setError,
  } = useForm({
    mode: "onTouched",
  });

  const [
    createOrganisationFormState,
    createOrganisationFormDispatch,
  ] = useReducer(createOrganisationFormReducer, initialState);

  const [location, setLocation] = useState(null);
  const [privacy, setPrivacy] = useState("");
  const [conditions, setConditions] = useState("");
  const [validEmail, setValid] = useState(false);
  const [email, setEmail] = useState("");
  const [privacyPolicyModalVisible, setPrivacyPolicyModalVisible] = useState(
    false,
  );
  const [
    termsConditionsModalVisible,
    setTermsConditionsModalVisible,
  ] = useState(false);

  const handleLocationChange = (location) => {
    setLocation(location);
    clearError("location");
  };
  const handleInputChangePrivacy = (e) => {
    setPrivacy(e.target.checked);
  };
  const handleInputChangeConditions = (e) => {
    setConditions(e.target.checked);
  };
  const handleInputChangeEmail = (e) => {
    setEmail(e.target.value);
    setValid(e.target.checkValidity());
  };

  const showPrivacyPolicyModal = (e) => {
    e.preventDefault();
    setPrivacyPolicyModalVisible(true);
  };
  const hidePrivacyPolicyModal = () => {
    setPrivacyPolicyModalVisible(false);
  };

  const showTermsConditionsModal = (e) => {
    e.preventDefault();
    setTermsConditionsModalVisible(true);
  };
  const hideTermsConditionsModal = () => {
    setTermsConditionsModalVisible(false);
  };

  const onFormSubmit = async (formData) => {
    if (!privacy) {
      return createOrganisationFormDispatch({
        type: CREATE_Organisation_ERROR,
        error: `You must agree to our privacy policy before proceeding`,
      });
    } else if (!conditions) {
      return createOrganisationFormDispatch({
        type: CREATE_Organisation_ERROR,
        error: `You must agree to our terms and conditions before proceeding`,
      });
    } else {
      if (props.user) {
        if (!location) {
          // all location objects should have address (+coordinates), others optional
          return setError(
            "location",
            "required",
            "Address is required. Please enter your address and select it from the drop-down",
          );
        }
        createOrganisationFormDispatch({ type: CREATE_Organisation });
        try {
          formData.location = location;

          const res = await axios.post("/api/organisations", formData);
          if (res) {
            props.history.push("/create-organisation-complete", {
              orgId: res.data._id,
            });
          }
        } catch (err) {
          const message = err.response?.data?.message || err.message;
          createOrganisationFormDispatch({
            type: CREATE_Organisation_ERROR,
            error: `Creating organisation failed, reason: ${message}`,
          });
        }
      } else {
        return createOrganisationFormDispatch({
          type: CREATE_Organisation_ERROR,
          error: `You must be logged in to create an organisation profile`,
        });
      }
    }
  };

  if (createOrganisationFormState.error) {
    window.scrollTo(0,0);
  }

  return (
    <Main>
      <SvgContainer>
        <img src={createOrganisationSvg} alt="create organisation" />
      </SvgContainer>
      <FormContainer>
        <Heading className="h4" level={4}>
          Create Organisation Profile
        </Heading>
        {createOrganisationFormState.error && (
          <ErrorAlert
            message={createOrganisationFormState.error}
            type="error"
          />
        )}
        <WhiteSpace />
        <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
          <InputWrapper>
            <Label style={styleLabel} label="* Organisation Name" />
            <Input
              type="text"
              required
              placeholder=""
              onChange={(name) => name}
              style={styleInput}
              ref={register({
                required: "Organisation name is required",
                maxLength: {
                  value: 60,
                  message: "Max. 60 characters",
                },
              })}
              name="name"
            />
            <span style={errorStyles}>{errors.name?.message}</span>
          </InputWrapper>
          <WhiteSpace />
          <WhiteSpace />
          <InputWrapper>
            <Label style={styleLabel} label="* Organisation Contact E-mail" />
            <Input
              type="email"
              required
              placeholder=""
              onChange={handleInputChangeEmail}
              style={styleInput}
              name="email"
              ref={register({
                required: "Email is required",
                maxLength: {
                  value: 30,
                  message: "Max. 30 characters",
                },
              })}
            />
            {validEmail || errors.email || email === "" ? (
              ""
            ) : (
              <InputError>Email is invalid</InputError>
            )}
            <span style={errorStyles}>{errors.email?.message}</span>
          </InputWrapper>
          <WhiteSpace />
          <WhiteSpace />
          <InputWrapper>
            <Label
              style={styleLabel}
              htmlFor="location"
              icon={Marker}
              label="* Address"
            />
            <LocationInput
              formError={errors.location}
              location={location}
              onLocationChange={handleLocationChange}
            />
          </InputWrapper>
          <WhiteSpace />
          <WhiteSpace />
          <InputWrapper>
            <Controller
              as={StyledCheckbox}
              name="global"
              control={control}
              onChange={([event]) => event.target.checked}
            />
            <span style={globalText}>We are a global organisation</span>
            <InputGroup>
              <Label style={styleLabel} label="* What are you looking for" />
              <Controller
                as={CheckboxGroup}
                control={control}
                defaultValue={false}
                label="Volunteers"
                name="needs.volunteers"
                onChange={([event]) => event.target.checked}
              />
              <Controller
                as={CheckboxGroup}
                control={control}
                defaultValue={false}
                label="Donations"
                name="needs.donations"
                onChange={([event]) => event.target.checked}
              />
              <Controller
                as={CheckboxGroup}
                control={control}
                defaultValue={false}
                label="Staff"
                name="needs.staff"
                onChange={([event]) => event.target.checked}
              />
              <Controller
                as={CheckboxGroup}
                control={control}
                defaultValue={false}
                label="Others"
                name="needs.other"
                onChange={([event]) => event.target.checked}
              />
            </InputGroup>
            <span style={errorStyles}>
              {errors.needs && "Please select at least one option"}
            </span>
          </InputWrapper>
          <WhiteSpace />
          <WhiteSpace />
          <InputWrapper>
            <Label style={styleLabel} label="* Type and Industry" />
          </InputWrapper>
          <div className="settings">
            <Controller
              as={
                <Select defaultValue="Type">
                  {type.options.map((option, i) => (
                    <Select.Option key={i} value={option.text}>
                      {option.text}
                    </Select.Option>
                  ))}
                </Select>
              }
              control={control}
              name="type"
              rules={{ required: true }}
              onClick={(event) => event.target.innerText}
            />
            <Controller
              as={
                <Select defaultValue="Industry">
                  {industry.options.map((option, i) => (
                    <Select.Option key={i} value={option.text}>
                      {option.text}
                    </Select.Option>
                  ))}
                </Select>
              }
              name="industry"
              rules={{ required: true }}
              control={control}
              onClick={(event) => event.target.innerText}
            />
            <span style={errorStyles}>
              {errors.type || errors.industry
                ? "Please select organisation type and industry from dropdown"
                : ""}
            </span>
            <WhiteSpace />
            <WhiteSpace />
          </div>
          <InputWrapper>
            <Label style={styleLabel} label="" />
            <StyledCheckbox
              style={{ fontSize: "1.2rem" }}
              value="I agree to the Privacy Policy"
              onChange={handleInputChangePrivacy}
            >
              *By signing up, I agree to the{" "}
              <StyledUnderlineLink onClick={showPrivacyPolicyModal}>
                Privacy Policy
              </StyledUnderlineLink>
            </StyledCheckbox>
            <WhiteSpace />
            <Label style={styleLabel} label="" />
            <StyledCheckbox
              style={{ fontSize: "1.2rem" }}
              value="I agree to the Terms and Conditions"
              onChange={handleInputChangeConditions}
            >
              *By signing up, I agree to the{" "}
              <StyledUnderlineLink onClick={showTermsConditionsModal}>
                Terms and Conditions
              </StyledUnderlineLink>
            </StyledCheckbox>
          </InputWrapper>
          <WhiteSpace />
          <WhiteSpace />
          <SubmitButton
            primary="true"
            onClick={handleSubmit(onFormSubmit)}
            style={{ fontWeight: "normal" }}
            disabled={!(privacy && conditions && validEmail && location)}
            id={
              GTM.organisation.createOrgProfPrefix + GTM.profile.createProfile
            }
          >
            {createOrganisationFormState.loading
              ? "Creating Profile..."
              : "Create Profile"}
          </SubmitButton>
        </StyledForm>
        <WhiteSpace />
      </FormContainer>
      <PolicyModal
        title="Privacy Policy"
        visible={privacyPolicyModalVisible}
        handleHideModal={hidePrivacyPolicyModal}
      >
        <PrivacyPolicyContent />
      </PolicyModal>
      <PolicyModal
        title={`Terms & Conditions`}
        visible={termsConditionsModalVisible}
        handleHideModal={hideTermsConditionsModal}
      >
        <TermsConditionsContent />
      </PolicyModal>
    </Main>
  );
};

const mapStateToProps = ({ session }) => {
  return {
    user: session.user,
  };
};

export default connect(mapStateToProps)(CreateOrgProfile);
