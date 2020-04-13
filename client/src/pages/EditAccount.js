import React from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "antd";
import styled from "styled-components";
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

const editAccount = true;

const StyledCheckbox = styled(Checkbox)`
  &.ant-checkbox-checked {
    color: red;
  }
`;

function getInitials(firstName, lastName) {
  // function to get the initials given firstname and last name
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}

const CustomCheckBox = styled.span`
  position: absolute;
  height: 2rem;
  width: 2rem;
  border: 0.1rem solid #646464;
  borderradius: 0.2rem;
  background-color: green;
`;

export default function EditAccount(props) {
  // dummy data props,context, redux etc
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // make a put/patch request to backend to update users Account information
  };
  const onChange = (event) => {
    console.log(event.target.checked);
  };

  return (
    <div>
      <div style={editAccountStyle}>
        <div style={editAccountTitleStyle}>Account Information</div>
      </div>
      <form style={editFormStyle} onSubmit={handleSubmit(onSubmit)}>
        <label style={labelStyle}>E-mail</label>
        <input
          style={inputFieldStyle}
          name="selfIntroduction"
          defaultValue={selfIntroduction}
          ref={register({ maxLength: 160 })}
        />
        <label style={labelStyle}>* Name</label>
        <input
          style={inputFieldStyle}
          name="facebookURL"
          defaultValue={facebookURL}
          ref={register}
        />
        <label style={labelStyle}>* Country</label>
        <input
          style={inputFieldStyle}
          name="linkedinURL"
          defaultValue={linkedinURL}
          ref={register}
        />
        <label style={labelStyle}>* Neigborhood</label>
        <input
          style={inputFieldStyle}
          name="linkedinURL"
          defaultValue={linkedinURL}
          ref={register}
        />

        <label style={labelStyle}>I want to</label>
        <label class="ant-checkbox-wrapper">
          <span class="ant-checkbox-checked">
            <input
              type="checkbox"
              class="ant-checkbox-input"
              name="helping"
              value="volunteer"
              ref={register}
            />
            <span class="ant-checkbox-inner"></span>
          </span>
          <span>Donate</span>
        </label>

        <label className="checkbox-label" style={checkBoxOptionStyle}>
          <input
            style={checkBoxStyle}
            type="checkbox"
            name="helping"
            value="bla"
            ref={register}
          />
          <StyledCheckbox>TESTING</StyledCheckbox>
          <Checkbox>Share Information</Checkbox>
        </label>
        <label className="checkbox-label" style={checkBoxOptionStyle}>
          <input
            style={checkBoxStyle}
            type="checkbox"
            name="helping"
            value="moreInfo"
            ref={register}
          />
          <span style={customCheckBoxStyle}></span>
          <span style={checkBoxTitle}>Donate</span>
        </label>
        {/* <label style={checkBoxOptionStyle}>
          <input
            style={checkBoxStyle}
            type="checkbox"
            name="helping"
            value="donate"
            ref={register}
          />
          <span style={customCheckBoxStyle}></span>
          <span style={checkBoxTitle}>Donate</span>
        </label>
        <label style={checkBoxOptionStyle}>
          <input
            style={checkBoxStyle}
            type="checkbox"
            name="helping"
            value="shareInfo"
            ref={register}
          />
          <span style={customCheckBoxStyle}></span>
          <span style={checkBoxTitle}>Share Information</span>
        </label>
        <label style={labelStyle}>I need</label>
        <label style={checkBoxOptionStyle}>
          <input
            style={checkBoxStyle}
            type="checkbox"
            name="needHelp"
            value="medical"
            ref={register}
          />
          <span style={customCheckBoxStyle}></span>
          <span style={checkBoxTitle}>Medical Help</span>
        </label>
        <label style={checkBoxOptionStyle}>
          <input
            style={checkBoxStyle}
            type="checkbox"
            name="needHelp"
            value="other"
            ref={register}
          />
          <span style={customCheckBoxStyle}></span>
          <span style={checkBoxTitle}>Other Help</span>
        </label> */}
        <input style={submitButtonStyle} type="submit" value="Save Changes" />
      </form>
    </div>
  );
}

//styling
const editAccountStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const editAccountTitleStyle = {
  fontWeight: "bolder",
  fontSize: "2rem",
  marginBottom: "3rem",
  marginTop: "2rem",
};

const editFormStyle = {
  display: "flex",
  flexDirection: "column",
};

const changeAccountPicStyle = {
  color: "#425AF2",
  marginBottom: "3rem",
};

const inputFieldStyle = {
  borderTopStyle: "hidden",
  borderLeftStyle: "hidden",
  borderRightStyle: "hidden",
  borderColor: "#5970EC",
  borderWidth: "thin",
  marginBottom: "2rem",
  marginTop: "1rem",
  paddingBottom: "0.5rem",
};
const labelStyle = {
  color: "#425AF2",
};
const initialsStyle = {
  margin: "auto",
  marginTop: "0",
  marginBottom: "1rem",
  borderRadius: "50%",
  border: "0.2rem solid #425AF2",
  color: "#425AF2",
  fontSize: "3rem",
  lineHeight: "6rem",
  width: "6rem",
  textAlign: "center",
  backgroundColor: "rgba(66, 90, 245, 0.04)",
};

const submitButtonStyle = {
  border: "none",
  borderRadius: "3rem",
  backgroundColor: "#5970EC",
  color: "#FFFFFF",
  height: "5rem",
  marginTop: "2rem",
  fontSize: "2rem",
  fontWeight: "bold",
};

const customCheckBoxStyle = {
  position: "absolute",
  height: "2rem",
  width: "2rem",
  border: "0.1rem solid #646464",
  borderRadius: "0.2rem",
};

const checkBoxStyle = {
  position: "absolute",
  opacity: "0",
};

const checkBoxTitle = {
  marginLeft: "3rem",
};

const checkBoxOptionStyle = {
  margin: "1rem 0",
};
