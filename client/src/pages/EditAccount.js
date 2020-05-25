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
  CustomEditAccountHeader,
  Background,
} from "../components/EditProfile/EditComponents";

function EditAccount(props) {
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

  const onSubmit = (data) => {
    // console.log(data);
    // make a put/patch request to backend to update users Account information
  };

  const userInfo = {
    // label name, variable name, value
    "E mail": ["email", email],
    Name: ["name", firstName + " " + lastName],
    Country: ["country", country],
    Address: [
      "address",
      address,
      "Enter address, zip code or city",
      locationIcon,
    ],
  };

  const helpSection = {
    Volunteer: ["volunteer", volunteerStatus],
    Donate: ["donate", donateStatus],
    "Share Information": ["shareInfo", shareInfoStatus],
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

  const renderHelp = () => {
    return Object.entries(helpSection).map(([key, value]) => {
      return (
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
      );
    });
  };

  const renderNeedHelp = () => {
    return Object.entries(needHelpSection).map(([key, value]) => {
      return (
        <CheckBoxWrapper key={key}>
          <Controller
            as={Checkbox}
            defaultValue={value[1]}
            name={value[0]}
            control={control}
            onChange={([event]) => event.target.checked}
          >
            <Label inputColor="black">{key}</Label>
            <UnderLineDescription marginLeft="3rem">
              {value[2]}
            </UnderLineDescription>
          </Controller>
        </CheckBoxWrapper>
      );
    });
  };

  const renderFormInputs = () => {
    return Object.entries(userInfo).map(([key, value]) => {
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
  const renderAddressCheckBoxes = () => {
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
            <Label inputColor="#646464">I am traveling</Label>
          </Controller>
        </CheckBoxWrapper>
        <CheckBoxWrapper>
          <Controller
            as={Checkbox}
            defaultValue={displayAddress}
            name="displayAddress"
            control={control}
            onChange={([event]) => event.target.checked}
          >
            <Label inputColor="#646464">Don't show my address</Label>
          </Controller>
        </CheckBoxWrapper>
      </HelpWrapper>
    );
  };

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
              <Link to="/edit-account">Account Information</Link>
            </CustomLink>
            <CustomLink>
              <Link to="/edit-profile">Profile Information</Link>
            </CustomLink>
          </OptionDiv>
          <CustomForm>
            {renderFormInputs()}
            {renderAddressCheckBoxes()}
            <Label>I want to</Label>
            <HelpWrapper>{renderHelp()}</HelpWrapper>
            <Label>I need</Label>
            <HelpWrapper>{renderNeedHelp()}</HelpWrapper>
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

export default connect(mapStateToProps)(EditAccount);
