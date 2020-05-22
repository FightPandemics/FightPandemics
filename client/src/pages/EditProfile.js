import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import styled from "styled-components";
import FormInput from "components/Input/FormInput";
import ProfilePic from "components/Picture/ProfilePic";
import SubmitButton from "components/Button/SubmitButton";
import Heading from "components/Typography/Heading";
import { theme, mq } from "constants/theme";
import {
  DARK_GRAY,
  ROYAL_BLUE,
  TROPICAL_BLUE,
  LIGHTER_GRAY,
  LIGHT_GRAY,
  DARKER_GRAY,
} from "constants/colors";
// dummy data props,context, redux etc
const editProfile = true;

const ChangePicButton = styled.div`
  color: #425af2;
  margin-bottom: 3rem;
  text-align: right;
`;

const EditProfileLayout = styled.div`
  background-color: #f9f9f9;
  flex-direction: row;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    padding: 0 15%;
  }
`;

const CustomHeading = styled(Heading)`
  margin-bottom: 3rem;
  margin-top: 2rem;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    &.ant-typography {
      font-size: 3.5rem;
    }
  }
`;
const CustomForm = styled.form`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    width: 70%;
    border: 0.1rem solid ${LIGHT_GRAY};
    padding: 3rem 4rem;
    background-color: #ffffff;
  }
`;
const TitlePictureWrapper = styled.div`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: flex;
    flex-direction: row;
  }
`;
const CustomSubmitButton = styled(SubmitButton)`
  margin-top: 1 rem;
  margin-bottom: 3 rem;

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    width: 30rem;
    align-self: center;
  }
`;

const FillEmptySpace = styled.div`
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    flex: 1;
  }
`;

function getInitials(firstName, lastName) {
  // function to get the initials given firstname and last name
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}

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
    console.log(data);
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
    <EditProfileLayout>
      <TitlePictureWrapper>
        <CustomHeading level={4} className="h4">
          {editProfile ? "Edit Profile" : "Complete Profile"}
        </CustomHeading>
        <FillEmptySpace />
        <ProfilePic noPic={true} initials={getInitials(firstName, lastName)} />
      </TitlePictureWrapper>
      <ChangePicButton>Change</ChangePicButton>

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
    </EditProfileLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(EditProfile);
