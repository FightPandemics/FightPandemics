import { WhiteSpace } from "antd-mobile";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
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
import StyledCheckboxGroup from "../components/Input/CheckboxGroup";
import { theme } from "../constants/theme";
import {
  CreatePostWrapper,
  StyledForm,
} from "../components/CreatePost/StyledCreatePost";


const Container = styled.div`
   padding: 0 2rem;
   padding-top: 10vh;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const StyleLabel = {
  textAlign: "left",
  color: "${theme.colors.royalBlue}"
};

const StyleInput = {
  width: "100%",
  height: "3rem"
};

const buttons = {
  display: "flex",
  margin: "1rem 0"
}

const globalText = {
  marginLeft: '1rem',
  fontSize: "1.2rem"
}

const types = Object.values(filterOptions)[2].options;
const { type, industry } = createOrganizationProfile;

const initialState = {
  state: {
    industryModal: false,
    typeModal: false,
    options: [],
    selected: "",
    name: ""
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

const organizationNeeds = ['Volunteer', 'Staff', 'Donations', 'Investors', 'Others'];

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

  const { register, handleSubmit, watch, control } = useForm();

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
  const { typeModal, industryModal, selected, options } = state;

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
    let currentModal = setting.type === "type" ? "typeModal" : "industryModal"
    setState({
      ...state,
      [currentModal]: !state[currentModal],
      options: setting.options,
      selected: setting.type,
      name: setting.type
    });
  };

  const closeModalType = (e) => {
    setState({
      ...state,
      typeModal: !state.typeModal,
      options: [],
      selected: "",
    });
  };

  const closeModalIndustry = (e) => {
    setState({
      ...state,
      industryModal: !state.industryModal,
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
  //
  // const onFormSubmit = async (data) => {
  //   // e.preventDefault();
  //   populateErrors();
  //   console.log(data);
  //   if (!errors.length) {
  //     // todo: finish integrating api
  //     try {
  //       // const req = await axios.post("/api/posts", formData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };


    const onFormSubmit = (data) => {
      console.log(data);
    };


  return (
    <Container>
      <Heading className="h4" level={4}>
        Create Organization Profile
      </Heading>
      <WhiteSpace />
      <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
        <InputWrapper>
          <Label style={StyleLabel} label="* Organization Name" />
          <Input
            type="text"
            required
            placeholder="notion"
            value={name}
            onChange={handleInputChangeName}
            style={StyleInput}
            ref={register}
            name="name"
          />
        </InputWrapper>
        <WhiteSpace />
        <WhiteSpace />
        <InputWrapper>
          <Label style={StyleLabel} label="* Organization Contact E-mail" />
          <Input
            type="email"
            required
            placeholder="help@notion.com (this is a fake)"
            value={email}
            onChange={handleInputChangeEmail}
            style={StyleInput}
            ref={register}
            name="email"
          />
        </InputWrapper>
        <WhiteSpace />
        <WhiteSpace />
        <InputWrapper>
          <Label style={StyleLabel} label="* Location" />
          <Input
            type="text"
            required
            placeholder="Pittsburgh, Pennsylvania, United States"
            value={location}
            onChange={handleInputChangeLocation}
            style={StyleInput}
            ref={register}
            name="location"
          />
        </InputWrapper>
        <WhiteSpace />
        <WhiteSpace />
        <InputWrapper>
          <Controller
           as={StyledCheckbox}
           name="global"
           control={control}
           onChange={([event]) => event.target.checked}
          />
         <span style={globalText}>We are a global organization</span>
        </InputWrapper>
        <WhiteSpace />
        <WhiteSpace />
        <InputWrapper>
          <Label style={StyleLabel} label="* Type and Industry" />
        </InputWrapper>
        <div className="settings">
          <CustomModal
            title={selected ? createOrganizationProfile[selected].title : ""}
            className="post-modal"
            content={
              <Controller
                as={RadioGroup}
                flex={true}
                name={state.name}
                padding="1.3rem 0"
                onChange={([event]) => event.target.value}
                options={options}
                control={control}
              />
            }
            onClose={closeModalType}
            visible={typeModal}
            closable={false}
          />
          <CustomModal
            title={selected ? createOrganizationProfile[selected].title : ""}
            className="post-modal"
            content={
              <Controller
                as={RadioGroup}
                flex={true}
                name={state.name}
                padding="1.3rem 0"
                onChange={([event]) => event.target.value}
                options={options}
                control={control}
              />
            }
            onClose={closeModalIndustry}
            visible={industryModal}
            closable={false}
          />
          <div style={buttons}>
            <DownArrowButton
              handleClick={showModal(type)}
              label={formData.type}
              color={theme.colors.royalBlue}
              bgcolor="#fff"
              long="true"
              style={{ marginRight: "2rem" }}
            />
            <WhiteSpace />
            <WhiteSpace />
            <DownArrowButton
              handleClick={showModal(industry)}
              label={formData.industry}
              color={theme.colors.royalBlue}
              bgcolor="#fff"
              long="true"
            />
          </div>
          <WhiteSpace />
          <WhiteSpace />
          <InputWrapper>
            <Label style={StyleLabel} label="* What are you looking for" />
            <Controller
             as={StyledCheckboxGroup}
             control={control}
             color={theme.colors.royalBlue}
             display="column"
             options={organizationNeeds}
             name="needs"
             onChange={([checkedValues]) => checkedValues}
            />

          </InputWrapper>
          <WhiteSpace />
          <WhiteSpace />
        </div>
        <SubmitButton
          primary="true"
          onClick={handleSubmit(onFormSubmit)}
          style={{ fontWeight: "normal" }}
        >
          Create Profile
        </SubmitButton>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <InputWrapper>
          <Label style={StyleLabel} label="" />
          <StyledCheckbox
            style={{ fontSize: "1.2rem" }}
            value="I agree to the Privacy Policy"
            onChange={handleInputChangePrivacy}
          >
            By signing up, I agree to the{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </StyledCheckbox>
          <WhiteSpace />
          <Label style={StyleLabel} label="" />
          <StyledCheckbox
            style={{ fontSize: "1.2rem" }}
            value="I agree to the Terms and Conditions"
            onChange={handleInputChangeConditions}
          >
            By signing up, I agree to the{" "}
            <Link to="/terms-conditions">Terms and Conditions</Link>
          </StyledCheckbox>
        </InputWrapper>
      </StyledForm>
      <WhiteSpace />
    </Container>
  );
};

export default CreateOrgProfile;
