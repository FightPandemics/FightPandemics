import React from "react";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import Checkbox from "components/Input/Checkbox";
import { getInitials } from "utils/userInfo";
import FormInput from "components/Input/FormInput";
import ProfilePic from "components/Picture/ProfilePic";
import { Link } from "react-router-dom";
import UnderLineDescription from "components/Input/UnderlineDescription";
import locationIcon from "assets/icons/location.svg";
import createOrganizationProfile from "../assets/data/createOrganizationProfile";
import {
  EditLayout,
  TitlePictureWrapper,
  FillEmptySpace,
  CustomLink,
  CustomForm,
  CustomHeading,
  ChangePicButton,
  CustomSubmitButton,
  OptionDiv,
  FormLayout,
  CheckBoxWrapper,
  Label,
  HelpWrapper,
  ToggleHeading,
  ProfilePicWrapper,
  StyledSelect,
  SelectWrapper,
  CustomEditAccountHeader,
  Background,
} from "../components/EditProfile/EditComponents";


function EditOrganizationAccount(props) {
  // dummy data props,context, redux etc

  const {
    firstName,
    lastName,
    email,
    country,
    address,
    shareInfoStatus,
    volunteerStatus,
    donateStatus,
    medicalHelpStatus,
    otherHelpStatus,
    traveling,
    displayAddress,
  } = props.user;
  const { register, handleSubmit, control, errors } = useForm();

  const { type, industry } = createOrganizationProfile;

  const onSubmit = (data) => {
    // console.log(data);
    // make a put/patch request to backend to update users Account information
  };

  const organizationInfo = {
    // label name, variable name, value
    "Organization Name": ["name", firstName + " " + lastName],
    "Organization Contact E-mail": ["email", email],
    "Organization Address": [
      "address",
      address
    ],
  };

  const lookingFor = {
    Volunteer: ["volunteer", volunteerStatus],
    Staff: ["staff", donateStatus],
    Investors: ["investors", shareInfoStatus],
    Donations: ["donations", shareInfoStatus],
    Others: ["others", shareInfoStatus],
  };

  const needHelpSection = {
    "Medical Help": [
      "medicalHelp",
      medicalHelpStatus,
      "I have symptoms of COVID-19",
    ],
    "Other Help": [
      "otherHelp",
      otherHelpStatus,
      "I need assistance getting groceries, medicine, etc.",
    ],
  };

  const renderNeedSection = () => {
    return Object.entries(lookingFor).map(([key, value]) => {
      return (
        <SelectWrapper>
        <CheckBoxWrapper key={key}>
          <Controller
            as={<Checkbox />}
            defaultValue={value[1]}
            name={value[0]}
            control={control}
            onChange={([event]) => event.target.checked}
          >
            <Label inputColor="#000000">{key}</Label>
          </Controller>
        </CheckBoxWrapper>
        </SelectWrapper>
      );
    });
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
            reference={register({ required: true })}
            error={!!errors[value[0]]}
            icon={value[3]}
          />
          <UnderLineDescription marginTop={"-1.5rem"}>
            {value[2] || null}
          </UnderLineDescription>
        </div>
      );
    });
  };
  const renderGlobalCheckBox = () => {
    return (
      <HelpWrapper>
        <CheckBoxWrapper>
          <Controller
            as={Checkbox}
            defaultValue={traveling}
            name={"traveling"}
            control={control}
            onChange={([event]) => event.target.checked}
          >
            <Label inputColor="#646464">We are a global organization</Label>
          </Controller>
        </CheckBoxWrapper>
      </HelpWrapper>
    );
  };

  const renderSelectItems = () => {
    return (
      <SelectWrapper>
        <StyledSelect defaultValue="Type">
           {type.options.map(option => (
             <StyledSelect.Option value={option.text}>{option.text}</StyledSelect.Option>
           ))}
        </StyledSelect>
        <StyledSelect defaultValue="Industry">
          {industry.options.map(option => (
            <StyledSelect.Option value={option.text}>{option.text}</StyledSelect.Option>
          ))}
        </StyledSelect>
      </SelectWrapper>
    )
  }

  return (
    <Background>
      <EditLayout>
        <TitlePictureWrapper>
          <CustomEditAccountHeader className="h4">
            Edit Profile
          </CustomEditAccountHeader>
          <ToggleHeading>
            <CustomHeading level={4} className="h4">
              Account Information
            </CustomHeading>
          </ToggleHeading>
          <FillEmptySpace />
          <ProfilePicWrapper>
            <ProfilePic
              resolution={"7680px"}
              noPic={true}
              initials={getInitials(firstName, lastName)}
            />
            <ChangePicButton>Change</ChangePicButton>
          </ProfilePicWrapper>
        </TitlePictureWrapper>
        <FormLayout>
          <OptionDiv>
            <CustomLink isSelected>
              <Link to="/edit-organization-account">Account Information</Link>
            </CustomLink>
            <CustomLink>
              <Link to="/edit-organization-profile">Profile Information</Link>
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            {renderFormInputs()}
            {renderGlobalCheckBox()}
            {renderSelectItems()}
            <Label>What are you looking for?</Label>
            <HelpWrapper>{renderNeedSection()}</HelpWrapper>
            <CustomSubmitButton primary="true" onClick={handleSubmit(onSubmit)}>
              Save Changes
            </CustomSubmitButton>
          </CustomForm>
        </FormLayout>
      </EditLayout>
    </Background>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(EditOrganizationAccount);
