import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormInput from "../components/Input/FormInput";
import ProfilePic from "../components/Picture/ProfilePic";
import SubmitButton from "../components/Button/SubmitButton";
import Title from "../components/Title/Title";
// dummy data props,context, redux etc
const firstName = "Cees";
const lastName = "Wang";
const selfIntroduction =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit";
const editProfile = true;
const facebookURL = "http://facebook.com";
const twitterURL = "http://twitter.com";
const githubURL = "http://github.com";
const linkedinURL = "http://linkedin.com";
const personalURL = "http://personal.com";

const ChangePicButton = styled.div`
  color: #425af2;
  margin-bottom: 3rem;
  text-align: center;
`;

function getInitials(firstName, lastName) {
  // function to get the initials given firstname and last name
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}

export default function EditProfile(props) {
  // dummy data props,context, redux etc
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
    <>
      <Title
        title={editProfile ? "Edit Profile" : "Complete Profile"}
        style={{
          marginBottom: "3rem",
          marginTop: "2rem",
          fontWeight: "bolder",
        }}
      />
      <ProfilePic noPic={true} initials={getInitials(firstName, lastName)} />
      <ChangePicButton>Change</ChangePicButton>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <FormInput
          inputTitle="Self-introduction"
          name="selfIntroduction"
          defaultValue={selfIntroduction}
          reference={register({ maxLength: 160 })}
        />
        {renderFormInputs()}
        <SubmitButton
          title={"Save Changes"}
          style={{ marginTop: "1rem", marginBottom: "3rem" }}
          onClick={handleSubmit(onSubmit)}
        >
          Save Changes
        </SubmitButton>
      </form>
    </>
  );
}
