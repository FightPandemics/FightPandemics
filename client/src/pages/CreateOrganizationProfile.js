import { Flex, WhiteSpace } from "antd-mobile";
import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
// import axios from "axios";
import createOrganizationProfile from "assets//data/createOrganizationProfile";
import Marker from "assets/create-profile-images/location-marker.svg";
import Heading from "components/Typography/Heading";
import Input from "components/Input/BaseInput";
import Select from "components/Input/Select";
import SubmitButton from "components/Button/SubmitButton";
import Label from "components/Input/Label";
import StyledCheckbox from "components/Input/Checkbox";
import StyledCheckboxGroup from "components/Input/CheckboxGroup";
import LocationInput from "components/Input/LocationInput";
import Checkbox from "components/Input/Checkbox";
import createOrganizationSvg from "assets/icons/create-organization.svg";
import { connect } from "react-redux";
import { theme } from "constants/theme";
import { StyledForm } from "../components/CreatePost/StyledCreatePost";
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
} from "components/OrganizationProfile/CreateProfileComponents";
import {
  CREATE_ORGANIZATION,
  CREATE_ORGANIZATION_ERROR,
} from "hooks/actions/organizationActions";
import {
  createOrganizationFormReducer,
  initialState,
} from "hooks/reducers/organizationReducers";
import axios from "axios";
import {
  blockLabelStyles,
  inputStyles,
  inlineLabelStyles,
} from "constants/formStyles";

const { type, industry } = createOrganizationProfile;

const organizationNeeds = [
  "Volunteer",
  "Staff",
  "Donations",
  "Investors",
  "Others",
];

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
  } = useForm();

  const [
    createOrganizationFormState,
    createOrganizationFormDispatch,
  ] = useReducer(createOrganizationFormReducer, initialState);

  const [location, setLocation] = useState({});
  const [privacy, setPrivacy] = useState("");
  const [conditions, setConditions] = useState("");

  const handleLocationChange = (location) => {
    setLocation(location);
    clearError("location");
  };
  const handleInputChangePrivacy = (e) => {
    setPrivacy(e.target.value);
  };
  const handleInputChangeConditions = (e) => {
    setConditions(e.target.value);
  };

  const onFormSubmit = async (formData) => {
    if (!privacy) {
      alert("You must agree to our privacy policy before proceeding");
      return;
    } else if (!conditions) {
      alert("You must agree to our terms and conditions before proceeding");
      return;
    } else {
      if (props.user) {
        if (!location.address) {
          // all location objects should have address (+coordinates), others optional
          return setError(
            "location",
            "required",
            "Please select an address from the drop-down",
          );
        }
        createOrganizationFormDispatch({ type: CREATE_ORGANIZATION });
        try {
          formData.location = location;
          formData.ownerId = props.user.id;

          const res = await axios.post("/api/organizations", formData);
          if (res) {
            props.history.push("/create-organization-complete", {
              orgId: res.data._id,
            });
          }
        } catch (err) {
          const message = err.response?.data?.message || err.message;
          createOrganizationFormDispatch({
            type: CREATE_ORGANIZATION_ERROR,
            error: `Creating organization failed, reason: ${message}`,
          });
        }
      } else {
        alert("You must be logged in to create an organization profile");
        return;
      }
    }
  };

  return (
    <Main>
      <SvgContainer>
        <img src={createOrganizationSvg} alt="create organization" />
      </SvgContainer>
      <FormContainer>
        <Heading className="h4" level={4}>
          Create Organization Profile
        </Heading>
        <WhiteSpace />
        <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
          <InputWrapper>
            <Label style={styleLabel} label="* Organization Name" />
            <Input
              type="text"
              required
              placeholder="notion"
              onChange={(name) => name}
              style={styleInput}
              ref={register({ required: true, minLength: 3 })}
              name="name"
            />
            <span style={errorStyles}>
              {errors.name && "Organization name is required"}
            </span>
          </InputWrapper>
          <WhiteSpace />
          <WhiteSpace />
          <InputWrapper>
            <Label style={styleLabel} label="* Organization Contact E-mail" />
            <Input
              type="email"
              required
              placeholder="help@notion.com (this is a fake)"
              onChange={(email) => email}
              style={styleInput}
              name="email"
              ref={register({ required: true, minLength: 3 })}
            />

            <span style={errorStyles}>
              {errors.email && "Email is required"}
            </span>
          </InputWrapper>
          <WhiteSpace />
          <WhiteSpace />
          <InputWrapper>
            <Label
              style={styleLabel}
              htmlFor="location"
              icon={Marker}
              label="Address"
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
            <span style={globalText}>We are a global organization</span>
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
                ? "Please select organization type and industry from dropdown"
                : ""}
            </span>
            <WhiteSpace />
            <WhiteSpace />
            <InputWrapper>
              <Label style={styleLabel} label="* What are you looking for" />
              <Controller
                as={StyledCheckboxGroup}
                control={control}
                color={theme.colors.royalBlue}
                display="column"
                options={organizationNeeds}
                name="needs"
                rules={{ required: true }}
                onChange={([checkedValues]) => checkedValues}
                validateStatus="error"
              />
              <span style={errorStyles}>
                {errors.needs && "Please select at least one option"}
              </span>
            </InputWrapper>
            <WhiteSpace />
            <WhiteSpace />
          </div>
          <SubmitButton
            primary="true"
            onClick={handleSubmit(onFormSubmit)}
            style={{ fontWeight: "normal" }}
            disabled={createOrganizationFormState.loading}
          >
            {createOrganizationFormState.loading
              ? "Creating Profile..."
              : "Create Profile"}
          </SubmitButton>
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
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
        </StyledForm>
        <WhiteSpace />
      </FormContainer>
    </Main>
  );
};

const mapStateToProps = ({ session }) => {
  return {
    user: session.user,
  };
};

export default connect(mapStateToProps)(CreateOrgProfile);
