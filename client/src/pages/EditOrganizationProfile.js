import React from "react";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "components/Input/Checkbox";
import FormInput from "components/Input/FormInput";
import { WhiteSpace } from "antd-mobile";
import notionLogo from "assets/icons/notion-logo.svg";
import plus from "assets/icons/plus.svg";
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
  ProfilePicWrapper,
  MobilePicWrapper,
  PlusIcon,
  Eclipse
} from "../components/EditProfile/EditComponents";



// 
// const URLS_CONFIG = {
//   facebook: [
//     "Facebook URL",
//     {
//       pattern: {
//         value: /^[a-zA-Z0-9.]*$/,
//         message:
//           "Invalid entry: only alphanumeric characters and . are allowed",
//       },
//       minLength: {
//         value: 5,
//         message: "Min. length is 5 characters",
//       },
//     },
//     FACEBOOK_URL,
//   ],
//   linkedin: [
//     "LinkedIn URL",
//     {
//       pattern: {
//         value: /^[a-zA-Z0-9]*$/,
//         message: "Invalid entry: only alphanumeric characters are allowed",
//       },
//     },
//     LINKEDIN_URL,
//   ],
//   twitter: [
//     "Twitter URL",
//     {
//       pattern: {
//         value: /^[a-zA-Z0-9_]*$/,
//         message:
//           "Invalid entry: only alphanumeric characters and _ are allowed",
//       },
//       maxLength: {
//         value: 15,
//         message: "Max. length is 15 characters",
//       },
//     },
//     TWITTER_URL,
//   ],
//   github: [
//     "Github URL",
//     {
//       pattern: {
//         value: /^[a-zA-Z0-9_-]*$/,
//         message:
//           "Invalid entry: only alphanumeric characters and _ are allowed",
//       },
//     },
//     GITHUB_URL,
//   ],
//   website: [
//     "Personal Website",
//     {
//       validate: (str) => !str || validateURL(str) || "Invalid URL",
//     },
//   ],
// };
// const ABOUT_MAX_LENGTH = 160;


const editProfile = true;

function EditOrganizationProfile(props) {

  const { register, handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
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
            {editProfile ? "Edit Organization Profile" : "Complete Organization Profile"}
          </CustomHeading>
          <FillEmptySpace />
          <ProfilePicWrapper>
            <ProfileImage src={notionLogo} alt="logo" />
            <ChangePicButton>Change</ChangePicButton>
          </ProfilePicWrapper>

          <MobilePicWrapper>
            <Eclipse>
              <PlusIcon src={plus} alt="" />
            </Eclipse>
            <ChangePicButton>Change</ChangePicButton>
          </MobilePicWrapper>

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
