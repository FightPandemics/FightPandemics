import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../components/Input/FormInput";
import ProfilePic from "../components/Picture/ProfilePic";
// dummy data props,context, redux etc
const firstName = "Cees";
const lastName = "Wang";
const selfIntroduction =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diamnonummy nibh euismod tincidunt ut laoreet dolore magna";
const facebookURL = "http://facebook.com";
const twitterURL = "http://twitter.com";
const githubURL = "http://github.com";
const linkedinURL = "http://linkedin.com";
const personalURL = "http://personal.com";

const editProfile = true;

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
    <div>
      <div style={editProfileStyle}>
        <div style={editProfileTitleStyle}>
          {editProfile ? "Edit" : "Complete"} Profile
        </div>
        <ProfilePic noPic={true} initials={getInitials(firstName, lastName)} />
        <div style={changeProfilePicStyle}>Change</div>
      </div>
      <form style={editFormStyle} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          inputTitle="Self-introduction"
          name="selfIntroduction"
          defaultValue={selfIntroduction}
          reference={register({ maxLength: 160 })}
        />
        {renderFormInputs()}
        <input style={submitButtonStyle} type="submit" value="Save Changes" />
      </form>
    </div>
  );
}

//styling
const editProfileStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const editProfileTitleStyle = {
  fontWeight: "bolder",
  fontSize: "2rem",
  marginBottom: "3rem",
  marginTop: "2rem",
};

const editFormStyle = {
  display: "flex",
  flexDirection: "column",
};

const changeProfilePicStyle = {
  color: "#425AF2",
  marginBottom: "3rem",
};

const submitButtonStyle = {
  border: "none",
  borderRadius: "3rem",
  backgroundColor: "#5970EC",
  color: "#FFFFFF",
  height: "5rem",
  marginTop: "1rem",
  marginBottom: "3rem",
  fontSize: "2rem",
  fontWeight: "bold",
};
