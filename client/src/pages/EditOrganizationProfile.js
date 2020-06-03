import React from "react";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import Checkbox from "components/Input/Checkbox";
import FormInput from "components/Input/FormInput";
import { WhiteSpace } from "antd-mobile";
import ProfilePic from "components/Picture/ProfilePic";
import notionLogo from "assets/icons/notion-logo.svg";
import { getInitials } from "utils/userInfo";
import { Link } from "react-router-dom";
import {
  FillEmptySpace,
  EditLayout,
  TitlePictureWrapper,
  CustomLink,
  CustomForm,
  CustomHeading,
  ChangePicButton,
  CustomSubmitButton,
  OptionDiv,
  FormLayout,
  CheckBoxWrapper,
  Label,
  Background,
  ProfileImage,
  ProfilePicWrapper
} from "../components/EditProfile/EditComponents";
// dummy data props,context, redux etc
const editProfile = true;

function EditOrganizationProfile(props) {

  const { register, handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // make a put/patch request to backend to update users profile information
  };

  const labelVariableValue = {
    // label name, variable name, value
    "Organization Owner": ["owner", ""],
    "Organization Website": ["website", ""],
    "Organization Language": ["language", ""],
    "Link to Apple Store": ["appleStoreLink", ""],
    "Link to Google Play": ["googlePlayLink", ""],
    "LinkedIn": ["linkedInLink", ""],
    "Twitter": ["twitterLink", ""],
  };

  const renderFormInputs = () => {
    // iterate and create input
    return Object.entries(labelVariableValue).map(([key, value]) => {
      return (
        <FormInput
          inputTitle={key}
          name={value[0]}
          defaultValue={value[1]}
          reference={register}
          key={key}
        />
      );
    });
  };

  return (
    <Background>
      <EditLayout>
        <TitlePictureWrapper>
          <CustomHeading level={4} className="h4">
            {editProfile ? "Edit Profile" : "Complete Profile"}
          </CustomHeading>
          <FillEmptySpace />
          <ProfilePicWrapper>
            <ProfileImage src={notionLogo} alt="logo" />
            <ChangePicButton>Change</ChangePicButton>
          </ProfilePicWrapper>
        </TitlePictureWrapper>
        <FormLayout>
          <OptionDiv>
            <CustomLink>
              <Link to="/edit-organization-account">Account Information</Link>
            </CustomLink>
            <CustomLink isSelected>
              <Link to="/edit-organization-profile">Profile Information</Link>
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            <FormInput
              inputTitle="Organization Description"
              name="description"
              error={!!errors["description"]}
              reference={register({ required: true, maxLength: 160 })}
              onChange={(text => text)}
            />
            <FormInput
              inputTitle="Organization Address"
              name="address"
              error={!!errors["address"]}
              onChange={(text => text)}
              reference={register({ required: true, maxLength: 160 })}
            />
            <CheckBoxWrapper>
              <Controller
                as={Checkbox}
                name="global"
                defaultValue={false}
                control={control}
                onChange={([event]) => event.target.checked}
              >
                <Label inputColor="#646464">We are a global organization</Label>
              </Controller>
            </CheckBoxWrapper>
            <WhiteSpace />
            <WhiteSpace />
            {renderFormInputs()}
            <CustomSubmitButton primary="true" onClick={handleSubmit(onSubmit)}>
              Save Changes
            </CustomSubmitButton>
          </CustomForm>
        </FormLayout>
      </EditLayout>
    </Background>
  );
}


export default EditOrganizationProfile;
