import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import FormInput from "components/Input/FormInput";
import ProfilePic from "components/Picture/ProfilePic";
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
  Background,
} from "../components/EditProfile/EditComponents";
// dummy data props,context, redux etc
const editProfile = true;

function EditProfile(props) {
  // dummy data props,context, redux etc
  const {
    firstName,
    lastName,
    facebookURL,
    twitterURL,
    githubURL,
    linkedinURL,
    personalURL,
    about,
  } = props.user;
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    // make a put/patch request to backend to update users profile information
  };

  const labelVariableValue = {
    // label name, variable name, value
    "Facebook URL": ["facebookURL", facebookURL],
    "LinkedIn URL": ["linkedinURL", linkedinURL],
    "Twitter URL": ["twitterURL", twitterURL],
    "Github URL": ["githubURL", githubURL],
    "Personal Website": ["personalURL", personalURL],
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
          <ProfilePic
            resolution={"7680px"}
            noPic={true}
            initials={getInitials(firstName, lastName)}
          />
        </TitlePictureWrapper>
        <ChangePicButton>Change</ChangePicButton>
        <FormLayout>
          <OptionDiv>
            <CustomLink>
              <Link to="/edit-account">Account Information</Link>
            </CustomLink>
            <CustomLink isSelected>
              <Link to="/edit-profile">Profile Information</Link>
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            <FormInput
              inputTitle="Self-introduction"
              name="about"
              defaultValue={about}
              reference={register({ maxLength: 160 })}
            />
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(EditProfile);
