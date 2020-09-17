import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "components/Input/Checkbox";
import { WhiteSpace } from "antd-mobile";
import FormInput from "components/Input/FormInput";
import { Alert } from "antd";
import { connect } from "react-redux";
import SuccessAlert from "components/Alert/SuccessAlert";
import { ORANGE_RED, WHITE } from "../constants/colors";
import { Link } from "react-router-dom";
import InputLabel from "components/Input/Label";
import orgData from "../assets/data/createOrganisationProfile";
import { refetchUser } from "actions/authActions";
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
  fetchOrganisation,
  fetchOrganisationError,
  fetchOrganisationSuccess,
  updateOrganisation,
  updateOrganisationError,
  updateOrganisationSuccess,
} from "hooks/actions/organisationActions";
import axios from "axios";
import {
  OrganisationContext,
  withOrganisationContext,
} from "context/OrganisationContext";
import Marker from "../assets/create-profile-images/location-marker.svg";
import LocationInput from "../components/Input/LocationInput";
import ProfilePic from "components/Picture/ProfilePic";
import { getInitialsFromFullName } from "utils/userInfo";
import { validateEmail } from "../utils/validators";
import { mq } from "constants/theme";

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
  donations: "Donations",
  other: "Other",
  staff: "Staff",
  volunteers: "Volunteers",
};

const ErrorAlert = styled(Alert)`
  background-color: ${ORANGE_RED};
  margin: 3rem 6rem 0rem 0rem;
  z-index: 10;
  position: absolute;
  width: 30%;
  right: 1rem;
  border: none;
  border-radius: 0.5rem;
  .ant-alert-message {
    color: ${WHITE};
  }

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin: auto;
    position: relative;
    width: 100%;
    right: 0rem;
  }
`;

const Container = styled.div`
  margin-top: 5rem;
`;

const isSame = (formData, organisation) => {
  if (formData.global === undefined) formData.global = false;
  for (let key in formData) {
    if (typeof formData[key] === "object") {
      if (JSON.stringify(formData[key]) !== JSON.stringify(organisation[key]))
        return false;
    } else if (formData[key] !== organisation[key]) return false;
  }
  return true;
};

function EditOrganisationAccount({ refetchUser, history }) {
  // TODO: integrate location w proper react-hook-forms use
  const organisationId = window.location.pathname.split("/")[2];
  const [location, setLocation] = useState({});
  const [isUpdateSuccess, handleSuccess] = useState(false);
  const [isUpdateError, handleUpdateError] = useState(false);
  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganisationContext,
  );
  const {
    register,
    handleSubmit,
    control,
    errors,
    clearError,
    setError,
  } = useForm({
    mode: "change",
  });
  const { loading, organisation } = orgProfileState;
  const { name, email, global, needs } = organisation || {};

  const handleLocationChange = (location) => {
    setLocation(location);
    clearError("location");
  };

  const handleSuccessClose = () => {
    handleSuccess(false);
  };

  const onSubmit = async (formData) => {
    if (!location?.address) {
      // all location objects should have address (+coordinates), others optional
      return setError(
        "location",
        "required",
        "Address is required. Please enter your address and select it from the drop-down",
      );
    }
    Object.entries(NEEDS).map(([key, label]) => {
      if (formData.needs[key] === undefined) formData.needs[key] = needs[key];
    });
    formData.location = location;
    if (isSame(formData, orgProfileState.organisation)) {
      history.push(`/organisation/${orgProfileState.organisation._id}`);
    } else {
      formData.location = location;
      orgProfileDispatch(updateOrganisation());
      try {
        const res = await axios.patch(
          `/api/organisations/${organisationId}`,
          formData,
        );
        orgProfileDispatch(updateOrganisationSuccess(res.data));
        handleSuccess(true);
        setTimeout(() => {
          handleSuccess(false);
        }, 10000);
        handleUpdateError(false);
        refetchUser();
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        handleUpdateError(true);
        handleSuccess(false);
        orgProfileDispatch(
          updateOrganisationError(
            `Failed updating organisation profile. ${message}`,
          ),
        );
      }
    }
  };

  useEffect(() => {
    (async function fetchProfile() {
      orgProfileDispatch(fetchOrganisation());
      try {
        const res = await axios.get(`/api/organisations/${organisationId}`);
        setLocation(res.data.location);
        orgProfileDispatch(fetchOrganisationSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        orgProfileDispatch(
          fetchOrganisationError(`Failed loading profile, reason: ${message}`),
        );
      }
    })();
  }, [orgProfileDispatch, organisationId]);

  const organisationInfo = {
    // label name, variable name, value
    "Organisation Name": [
      "name",
      name,
      "Organisation name is required",
      false,
      {
        value: 60,
        message: "Max. 60 characters",
      },
    ],
    "Organisation Contact E-mail": [
      "email",
      email,
      "Email is required",
      true,
      {
        value: 50,
        message: "Max. 50 characters",
      },
    ],
  };

  const renderNeedSection = () => {
    if (organisation) {
      return (
        <div>
          {Object.entries(NEEDS).map(([key, label]) => (
            <CheckBoxWrapper key={key}>
              <Controller
                as={Checkbox}
                defaultChecked={needs[key]}
                name={`needs.${key}`}
                control={control}
                onChange={([event]) => event.target.checked}
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
    return Object.entries(organisationInfo).map(([key, value]) => {
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
            ref={register({
              required: value[2],
              maxLength: value[4],
              validate: value[3]
                ? (email) => validateEmail(email) || "Invalid email"
                : null,
            })}
            error={errors[value[0]]}
            onChange={(event) => event.target.value}
          />
        </div>
      );
    });
  };
  const renderGlobalCheckBox = () => {
    if (organisation) {
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
              <Label inputColor="#646464">We are a global organisation</Label>
            </Controller>
          </CheckBoxWrapper>
        </HelpWrapper>
      );
    }
  };

  const renderSelectItems = () => {
    if (organisation) {
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
            defaultValue={organisation.type}
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
            defaultValue={organisation.industry}
            rules={{ required: true }}
            control={control}
            onChange={([text]) => text}
            name="industry"
          />
          <span style={errorStyles}>
            {errors.type || errors.industry
              ? "Please select organisation type and industry from dropdown"
              : ""}
          </span>
        </div>
      );
    }
  };

  const renderAddressInput = () => {
    if (organisation) {
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
    if (organisation) {
      return (
        <ProfilePicWrapper>
          <ProfilePic
            resolution={"7680px"}
            noPic={true}
            initials={getInitialsFromFullName(name)}
          />
          {/* hide this until backend API is available
          <ChangePicButton>Change</ChangePicButton> */}
        </ProfilePicWrapper>
      );
    }
  };

  if (loading) return <div>"loading"</div>;
  return (
    <Background>
      {isUpdateSuccess ? (
        <>
          <SuccessAlert
            message={"organisation successfully updated"}
            closable
            afterClose={handleSuccessClose}
          />
        </>
      ) : isUpdateError ? (
        <>
          <ErrorAlert message={orgProfileState.error} />
        </>
      ) : (
        ""
      )}
      <Container>
        <EditLayout>
          <TitlePictureWrapper>
            <CustomEditAccountHeader className="h4">
              Edit Organisation Profile
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
                <Link to={`/edit-organisation-account/${organisationId}`}>
                  Account Information
                </Link>
              </CustomLink>
              <CustomLink>
                <Link to={`/edit-organisation-profile/${organisationId}`}>
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
              <CustomSubmitButton
                primary="true"
                onClick={handleSubmit(onSubmit)}
              >
                {loading ? "Saving Changes..." : "Save Changes"}
              </CustomSubmitButton>
            </CustomForm>
          </FormLayout>
        </EditLayout>
      </Container>
    </Background>
  );
}

const mapDispatchToProps = {
  refetchUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(withOrganisationContext(EditOrganisationAccount));
