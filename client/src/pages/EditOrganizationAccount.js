import React from "react";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "components/Input/Checkbox";
import StyledCheckboxGroup from "components/Input/CheckboxGroup";
import { getInitials } from "utils/userInfo";
import { WhiteSpace } from "antd-mobile";
import FormInput from "components/Input/FormInput";
import ProfilePic from "components/Picture/ProfilePic";
import { Link } from "react-router-dom";
import UnderLineDescription from "components/Input/UnderlineDescription";
import notionLogo from "assets/icons/notion-logo.svg";
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
  CustomEditAccountHeader,
  Background,
  ProfileImage
} from "../components/EditProfile/EditComponents";

const organizationNeeds = ['Volunteer', 'Staff', 'Donations', 'Investors', 'Others']

const errorStyles = {
  color: "#FF5656",
  fontSize: "1.2rem",
  display: "block"
}


function EditOrganizationAccount(props) {

  const { register, handleSubmit, control, errors } = useForm();

  const { type, industry } = createOrganizationProfile;

  const onSubmit = (data) => {
    console.log(data);
    // make a put/patch request to backend to update users Account information
  };

  const organizationInfo = {
    // label name, variable name, value
    "Organization Name": ["name", ""],
    "Organization Contact E-mail": ["email", ""],
    "Organization Address": ["address", ""],
  };

  const lookingFor = {
    Volunteer: ["volunteer", ""],
    Staff: ["staff", ""],
    Investors: ["investors", ""],
    Donations: ["donations", ""],
    Others: ["others", ""],
  };

  const renderNeedSection = () => {
      return (
        <div>
        <CheckBoxWrapper>
          <Controller
           as={StyledCheckboxGroup}
           control={control}
           display="column"
           options={organizationNeeds}
           name="needs"
           rules={{ required: true }}
           onChange={([checkedValues]) => checkedValues}
          />
        </CheckBoxWrapper>
            <span style={errorStyles}>{errors.needs ? "Please select at least one option" : ""}</span>
        </div>
      );
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
            name="global"
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
      <div>
       <Controller
        as={<StyledSelect defaultValue="Type">
           {type.options.map((option, i) => (
             <StyledSelect.Option key={i} value={option.text}>{option.text}</StyledSelect.Option>
           ))}
        </StyledSelect>}
        rules={{ required: true }}
        control={control}
        onChange={([text]) => text}
        name="type"
        />
        <Controller
         as={<StyledSelect defaultValue="Industry">
          {industry.options.map((option, i) => (
            <StyledSelect.Option key={i} value={option.text}>{option.text}</StyledSelect.Option>
          ))}
         </StyledSelect>}
         rules={{ required: true }}
         control={control}
         onChange={([text]) => text}
         name="industry"
         />
              <span style={errorStyles}>{errors.type || errors.industry ? "Please select organization type and industry from dropdown" : ""}</span>
      </div>
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
            <ProfileImage src={notionLogo} alt="logo" />
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
            <WhiteSpace />
            <WhiteSpace />
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



export default EditOrganizationAccount;
