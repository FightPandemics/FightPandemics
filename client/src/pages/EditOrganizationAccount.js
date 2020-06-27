import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "components/Input/Checkbox";
import { WhiteSpace } from "antd-mobile";
import FormInput from "components/Input/FormInput";
import { Link } from "react-router-dom";
import UnderLineDescription from "components/Input/UnderlineDescription";
import InputLabel from "components/Input/Label";
import orgData from "../assets/data/createOrganizationProfile";
import {
  EditLayout,
  TitlePictureWrapper,
  FillEmptySpace,
  CustomLink,
  CustomForm,
  CustomHeading,
  CustomSubmitButton,
  OptionDiv,
  FormLayout,
  CheckBoxWrapper,
  Label,
  HelpWrapper,
  ToggleHeading,
  ProfilePicWrapper,
  StyledSelect,
  CustomEditAccountHeader,
  Background,
} from "../components/EditProfile/EditComponents";
import {
  fetchOrganization,
  fetchOrganizationError,
  fetchOrganizationSuccess,
  updateOrganization,
  updateOrganizationError,
  updateOrganizationSuccess,
} from "hooks/actions/organizationActions";
import axios from "axios";
import {
  OrganizationContext,
  withOrganizationContext,
} from "context/OrganizationContext";
import Marker from "../assets/create-profile-images/location-marker.svg";
import LocationInput from "../components/Input/LocationInput";
import ProfilePic from "components/Picture/ProfilePic";
import { getInitials } from "utils/userInfo";

const errorStyles = {
  color: "#FF5656",
  fontSize: "1.2rem",
  display: "block",
};

const InputWrapper = styled.div`
  margin: 2.2rem auto;
  width: 100%;
  position: relative;
`;

const NEEDS = {
  volunteers: "Volunteers",
  donations: "Donations",
  staff: "Staff",
  other: "Other",
};

function EditOrganizationAccount(props) {
  // TODO: integrate location w proper react-hook-forms use
  const organizationId = window.location.pathname.split("/")[2];
  const [location, setLocation] = useState({});
  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganizationContext,
  );
  const {
    register,
    handleSubmit,
    control,
    errors,
    clearError,
    setError,
  } = useForm();
  const { loading, organization } = orgProfileState;
  const { name, email, global, needs } = organization || {};

  const handleLocationChange = (location) => {
    setLocation(location);
    clearError("location");
  };

  const onSubmit = async (formData) => {
    if (!location?.address) {
      // all location objects should have address (+coordinates), others optional
      return setError(
        "location",
        "required",
        "Please select an address from the drop-down",
      );
    }
    formData.location = location;
    orgProfileDispatch(updateOrganization());
    try {
      const res = await axios.patch(
        `/api/organizations/${organizationId}`,
        formData,
      );
      orgProfileDispatch(updateOrganizationSuccess(res.data));
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      orgProfileDispatch(
        updateOrganizationError(
          `Failed updating organization profile, reason: ${message}`,
        ),
      );
    }
  };

  useEffect(() => {
    (async function fetchProfile() {
      orgProfileDispatch(fetchOrganization());
      try {
        const res = await axios.get(`/api/organizations/${organizationId}`);
        setLocation(res.data.location);
        orgProfileDispatch(fetchOrganizationSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        orgProfileDispatch(
          fetchOrganizationError(`Failed loading profile, reason: ${message}`),
        );
      }
    })();
  }, [orgProfileDispatch, organizationId]);

  const handleCheckboxChange = ([event]) => {
    return event.target.checked;
  };

  const organizationInfo = {
    // label name, variable name, value
    "Organization Name": ["name", name],
    "Organization Contact E-mail": ["email", email],
  };

  const renderNeedSection = () => {
    if (organization) {
      return (
        <div>
          {Object.entries(NEEDS).map(([key, label]) => (
            <CheckBoxWrapper key={key}>
              <Controller
                as={Checkbox}
                defaultChecked={needs[key]}
                name={`needs.${key}`}
                control={control}
                onChange={handleCheckboxChange}
              >
                <Label inputColor="#000000">{label}</Label>
              </Controller>
            </CheckBoxWrapper>
          ))}
          <span style={errorStyles}>
            {errors.needs ? "Please select at least one option" : ""}
          </span>
        </div>
      );
    }
  };

  const renderFormInputs = () => {
    return Object.entries(organizationInfo).map(([key, value]) => {
      return (
        <div
          key={key}
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "2rem",
          }}
        >
          <FormInput
            inputTitle={key}
            name={value[0]}
            defaultValue={value[1]}
            ref={register({ required: true })}
            error={!!errors[value[0]]}
            onChange={(event) => event.target.value}
          />
          <UnderLineDescription marginTop={"-1.5rem"}>
            {value[2] || null}
          </UnderLineDescription>
        </div>
      );
    });
  };
  const renderGlobalCheckBox = () => {
    if (organization) {
      return (
        <HelpWrapper>
          <CheckBoxWrapper>
            <Controller
              as={Checkbox}
              name="global"
              defaultChecked={global}
              control={control}
              onChange={([event]) => event.target.checked}
            >
              <Label inputColor="#646464">We are a global organization</Label>
            </Controller>
          </CheckBoxWrapper>
        </HelpWrapper>
      );
    }
  };

  const renderSelectItems = () => {
    if (organization) {
      return (
        <div>
          <Controller
            as={
              <StyledSelect>
                {orgData.type.options.map((option, i) => (
                  <StyledSelect.Option key={i} value={option.text}>
                    {option.text}
                  </StyledSelect.Option>
                ))}
              </StyledSelect>
            }
            defaultValue={organization.type}
            control={control}
            onChange={([text]) => text}
            name="type"
          />
          <Controller
            as={
              <StyledSelect>
                {orgData.industry.options.map((option, i) => (
                  <StyledSelect.Option key={i} value={option.text}>
                    {option.text}
                  </StyledSelect.Option>
                ))}
              </StyledSelect>
            }
            defaultValue={organization.industry}
            rules={{ required: true }}
            control={control}
            onChange={([text]) => text}
            name="industry"
          />
          <span style={errorStyles}>
            {errors.type || errors.industry
              ? "Please select organization type and industry from dropdown"
              : ""}
          </span>
        </div>
      );
    }
  };

  const renderAddressInput = () => {
    if (organization) {
      return (
        <InputWrapper>
          <InputLabel htmlFor="location" icon={Marker} label="Address" />
          <LocationInput
            formError={errors.location}
            location={location}
            onLocationChange={handleLocationChange}
          />
        </InputWrapper>
      );
    } else {
      return <p>Loading...</p>;
    }
  };

  const renderProfilePicture = () => {
    let firstName, lastName;
    if (organization) {
      const nameArr = name.split(" ");
      if (nameArr.length < 2) {
        firstName = nameArr[0];
        lastName = firstName.split("").pop();
      } else {
        firstName = nameArr[0];
        lastName = nameArr[1];
      }
      return (
        <ProfilePicWrapper>
          <ProfilePic
            resolution={"7680px"}
            noPic={true}
            initials={getInitials(firstName, lastName)}
          />
          {/* hide this until backend API is available
          <ChangePicButton>Change</ChangePicButton> */}
        </ProfilePicWrapper>
      );
    }
  };

  return (
    <Background>
      <EditLayout>
        <TitlePictureWrapper>
          <CustomEditAccountHeader className="h4">
            Edit Organization Profile
          </CustomEditAccountHeader>
          <ToggleHeading>
            <CustomHeading level={4} className="h4">
              Account Information
            </CustomHeading>
          </ToggleHeading>
          <FillEmptySpace />
          <ProfilePicWrapper>{renderProfilePicture()}</ProfilePicWrapper>
        </TitlePictureWrapper>
        <FormLayout>
          <OptionDiv>
            <CustomLink isSelected>
              <Link to={`/edit-organization-account/${organizationId}`}>
                Account Information
              </Link>
            </CustomLink>
            <CustomLink>
              <Link to={`/edit-organization-profile/${organizationId}`}>
                Profile Information
              </Link>
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            {renderFormInputs()}
            {renderAddressInput()}
            {renderGlobalCheckBox()}
            <WhiteSpace />
            <WhiteSpace />
            {renderSelectItems()}
            <Label>What are you looking for?</Label>
            <HelpWrapper>{renderNeedSection()}</HelpWrapper>
            <CustomSubmitButton primary="true" onClick={handleSubmit(onSubmit)}>
              {loading ? "Saving Changes..." : "Save Changes"}
            </CustomSubmitButton>
          </CustomForm>
        </FormLayout>
      </EditLayout>
    </Background>
  );
}

export default withOrganizationContext(EditOrganizationAccount);
