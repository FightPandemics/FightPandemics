import { WhiteSpace } from "antd-mobile";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import filterOptions from "../assets/data/filterOptions";
import createOrganizationProfile from "../assets//data/createOrganizationProfile";
import styled from "styled-components";
import CustomModal from "../components/CreatePost/CustomModal";
import RadioGroup from "../components/CreatePost/RadioGroup";
import Heading from "components/Typography/Heading";
import DownArrowButton from "../components/Button/DownArrowButton";
import Input from "../components/Input/BaseInput";
import SubmitButton from "../components/Button/SubmitButton";
import Label from "../components/Input/Label";
import StyledCheckbox from "../components/Input/Checkbox";
import { theme } from "../constants/theme";
import {
  CreatePostWrapper,
  StyledForm,
} from "../components/CreatePost/StyledCreatePost";

const InputWrapper = styled.div`
  width: 100%;
`;

const StyleLabel = {
  textAlign: "left",
};

const StyleInput = {
  width: "100%",
};

const types = Object.values(filterOptions)[2].options;
const { type, industry } = createOrganizationProfile;

const initialState = {
  state: {
    modal: false,
    options: [],
    selected: "",
  },
  formData: {
    title: "",
    description: "",
    tags: [],
    type: type.default.value,
    industry: industry.default.value,
  },
  errors: [],
};

const errorMsg = {
  name: "Please include an organization name.",
  email: "Please include an organization email.",
  location: "Please include a location.",
  type: "Please include an organization type",
  industry: "Please include an organization industry",
  interest: "Please include what your looking for",
  privacy: "Please include our Privacy Policy",
  conditions: "Please include Terms and Conditions",
};

const CreateOrgProfile = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [global, setGlobal] = useState("");
  const [volunteer, setVolunteer] = useState("");
  const [staff, setStaff] = useState("");
  const [investors, setInvestors] = useState("");
  const [donations, setDonations] = useState("");
  const [other, setOther] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [conditions, setConditions] = useState("");
  const [state, setState] = useState(initialState.state);
  const [formData, setFormData] = useState(initialState.formData);
  const [errors, setErrors] = useState(initialState.errors);
  const { modal, selected, options } = state;

  const handleInputChangeName = (e) => {
    setName(e.target.value);
  };
  const handleInputChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleInputChangeLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleInputChangeGlobal = (e) => {
    setGlobal(e.target.value);
  };
  const handleInputChangeVolunteer = (e) => {
    setVolunteer(e.target.value);
  };
  const handleInputChangeStaff = (e) => {
    setStaff(e.target.value);
  };
  const handleInputChangeInvestors = (e) => {
    setInvestors(e.target.value);
  };
  const handleInputChangeDonations = (e) => {
    setDonations(e.target.value);
  };
  const handleInputChangeOther = (e) => {
    setOther(e.target.value);
  };
  const handleInputChangePrivacy = (e) => {
    setPrivacy(e.target.value);
  };
  const handleInputChangeConditions = (e) => {
    setConditions(e.target.value);
  };

  const showModal = (setting) => (e) => {
    setState({
      ...state,
      modal: !state.modal,
      options: setting.options,
      selected: setting.type,
    });
  };

  const closeModal = (e) => {
    setState({
      ...state,
      modal: !state.modal,
      options: [],
      selected: "",
    });
  };

  const handleFormData = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors.includes(field) && formData[field]) {
      const newErrors = errors.filter((error) => error !== field);
      setErrors(newErrors);
    }
  };

  const populateErrors = () => {
    const newErrors = [];
    for (let field in errorMsg) {
      if (!errors.includes(field)) {
        newErrors.push(field);
      }
    }
    setErrors([...errors, ...newErrors]);
  };

  const renderError = (field) => {
    if (errors.includes(field) && (!formData[field] || !formData[field].length))
      return errorMsg[field];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    populateErrors();
    if (!errors.length) {
      console.log(name);
      console.log(email);
      console.log(location);
      console.log(global);
      console.log(formData);
      console.log(volunteer);
      console.log(staff);
      console.log(investors);
      console.log(donations);
      console.log(other);
      console.log(privacy);
      console.log(conditions);
      // todo: finish integrating api
      try {
        // const req = await axios.post("/api/posts", formData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <CreatePostWrapper>
      <Heading className="h4" level={4}>
        Create Organization Profile
      </Heading>
      <StyledForm onSubmit={handleSubmit}>
        <InputWrapper>
          <Label style={StyleLabel} label="Organization Name" />
          <Input
            type="text"
            required
            placeholder="notion"
            value={name}
            onChange={handleInputChangeName}
            style={StyleInput}
          />
        </InputWrapper>
        <WhiteSpace />
        <WhiteSpace />
        <InputWrapper>
          <Label style={StyleLabel} label="Organization Contact Email" />
          <Input
            type="email"
            required
            placeholder="help@notion.com (this is a fake)"
            value={email}
            onChange={handleInputChangeEmail}
            style={StyleInput}
          />
        </InputWrapper>
        <WhiteSpace />
        <WhiteSpace />
        <InputWrapper>
          <Label style={StyleLabel} label="Location" />
          <Input
            type="text"
            required
            placeholder="Pittsburgh, Pennsylvania, United States"
            value={location}
            onChange={handleInputChangeLocation}
            style={StyleInput}
          />
        </InputWrapper>
        <WhiteSpace />
        <WhiteSpace />
        <InputWrapper>
          <StyledCheckbox value="global" onChange={handleInputChangeGlobal}>
            We are a global organization
          </StyledCheckbox>
        </InputWrapper>
        <WhiteSpace />
        <WhiteSpace />
        <InputWrapper>
          <Label style={StyleLabel} label="Type and Industry" />
        </InputWrapper>
        <div className="settings">
          <CustomModal
            title={selected ? createOrganizationProfile[selected].title : ""}
            className="post-modal"
            content={
              <RadioGroup
                flex={true}
                padding="1.3rem 0"
                onChange={handleFormData(selected)}
                options={options}
                value={formData[selected]}
                defaultValue={formData[selected]}
              />
            }
            onClose={closeModal}
            visible={modal}
            closable={false}
          />
          <div className="buttons">
            <DownArrowButton
              handleClick={showModal(type)}
              label={formData.type}
              color={theme.colors.royalBlue}
              bgcolor="#fff"
              long="true"
            />
            <WhiteSpace />
            <DownArrowButton
              handleClick={showModal(industry)}
              label={formData.industry}
              color={theme.colors.royalBlue}
              bgcolor="#fff"
              long="true"
            />
          </div>

          <InputWrapper>
            <Label style={StyleLabel} label="What are you looking for" />
            <StyledCheckbox
              value="volunteer"
              onChange={handleInputChangeVolunteer}
            >
              Volunteer
            </StyledCheckbox>
            <Label style={StyleLabel} label="" />
            <StyledCheckbox value="staff" onChange={handleInputChangeStaff}>
              Staff
            </StyledCheckbox>
            <Label style={StyleLabel} label="" />
            <StyledCheckbox
              value="investors"
              onChange={handleInputChangeInvestors}
            >
              Investors
            </StyledCheckbox>
            <Label style={StyleLabel} label="" />
            <StyledCheckbox
              value="donations"
              onChange={handleInputChangeDonations}
            >
              Donations
            </StyledCheckbox>
            <Label style={StyleLabel} label="" />
            <StyledCheckbox value="other" onChange={handleInputChangeOther}>
              Other
            </StyledCheckbox>
          </InputWrapper>
          <WhiteSpace />
          <WhiteSpace />
        </div>
        <SubmitButton
          title="Create Profile"
          onClick={handleSubmit}
          className="submit-btn"
        />
        <InputWrapper>
          <Label style={StyleLabel} label="" />
          <StyledCheckbox
            value="I agree to the Privacy Policy"
            onChange={handleInputChangePrivacy}
          >
            By signing up, I agree to the{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </StyledCheckbox>
          <Label style={StyleLabel} label="" />
          <StyledCheckbox
            value="I agree to the Terms and Conditions"
            onChange={handleInputChangeConditions}
          >
            By signing up, I agree to the{" "}
            <Link to="/terms-conditions">Terms and Conditions</Link>
          </StyledCheckbox>
        </InputWrapper>
      </StyledForm>
      <WhiteSpace />
    </CreatePostWrapper>
  );
};

export default CreateOrgProfile;
