import { WhiteSpace } from "antd-mobile";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
// import axios from "axios";
import createOrganizationProfile from "../assets//data/createOrganizationProfile";
import styled from "styled-components";
import CustomModal from "../components/CreatePost/CustomModal";
import RadioGroup from "../components/CreatePost/RadioGroup";
import Heading from "components/Typography/Heading";
import DownArrowButton from "../components/Button/DownArrowButton";
import Input from "../components/Input/BaseInput";
import Select from "../components/Input/Select";
import SubmitButton from "../components/Button/SubmitButton";
import Label from "../components/Input/Label";
import StyledCheckbox from "../components/Input/Checkbox";
import StyledCheckboxGroup from "../components/Input/CheckboxGroup";
import createOrganizationSvg from "../assets/icons/create-organization.svg";
import { theme, mq } from "../constants/theme";
import {
  StyledForm,
} from "../components/CreatePost/StyledCreatePost";


const Main = styled.div`
   display: flex;
   background-color: ${theme.colors.offWhite};
   @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
     display: block;
     padding: 0 2rem;
   }
`;

const SvgContainer = styled.div`
   flex-basis: 40%;
   background-color: ${theme.colors.selago};
   display: block;
   padding: 4rem;
   padding-top: 30vh;
   img {
     width: 90%;
   }
   @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
     display: none;
   }
`;

const FormContainer = styled.div`
   padding-top: 10vh;
   padding-left: 20rem;
   padding-right: 20rem;
   flex: 1;
   min-height: 100vh;
   @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
     padding-left: 5rem;
     padding-right: 5rem;
   }
   @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
     padding-left: 0;
     padding-right: 0;
   }

`;

const InputWrapper = styled.div`
  width: 100%;
`;

const StyleLabel = {
  textAlign: "left",
  color: "#425af2"
};

const StyleInput = {
  width: "100%",
  height: "3rem",
  backgroundColor: "transparent"
};

const buttons = {
  display: "flex",
  margin: "1rem 0"
}

const globalText = {
  marginLeft: '1rem',
  fontSize: "1.2rem"
}

const errorStyles = {
  color: "#FF5656",
  fontSize: "1.2rem",
  alignSelf: ""
}

const { type, industry } = createOrganizationProfile;

const initialState = {
  state: {
    industryModal: false,
    typeModal: false,
    options: [],
    selected: "",
    name: ""
  }
};

const organizationNeeds = ['Volunteer', 'Staff', 'Donations', 'Investors', 'Others'];


const CreateOrgProfile = (props) => {

  const { register, handleSubmit, control, errors } = useForm();

  const [privacy, setPrivacy] = useState("");
  const [conditions, setConditions] = useState("");
  const [ orgType, setType ] = useState("");
  const [ orgIndustry, setIndustry ] = useState("");
  const [state, setState] = useState(initialState.state);
  const { typeModal, industryModal, options } = state;


  const handleInputChangePrivacy = (e) => {
    setPrivacy(e.target.value);
  };
  const handleInputChangeConditions = (e) => {
    setConditions(e.target.value);
  };
  const changeOrgTypeHandler = ([event]) => {
    setType(event.target.value)
    return event.target.value
  }
  const changeOrgIndustryHandler = ([event]) => {
    setIndustry(event.target.value)
    return event.target.value
  }

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

  const searchIndustryHandler = (text) => {
    const industryOptions = [...industry.options];
    text.toLowerCase();
    if(options.length < 1) {
      setState({
        ...state,
        options: industry.options,
      });
    }
    for (let i = 0; i < options.length; i++) {
      if (options[i].text.toLowerCase().indexOf(text) > -1) {
        setState({
          ...state,
          options: industry.options,
        });
      } else {
        industryOptions.splice(i, 1);
        setState({
          ...state,
          options: industryOptions,
        });
      }
    }
  }

  const [isMobile, setMediaQuery] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(mq.phone.wide.max);
    setMediaQuery(mediaQuery.matches);
    const listenerFunc = (query) => {
      setMediaQuery(query.currentTarget.matches);
    };
    window.matchMedia(mq.phone.wide.max).addListener(listenerFunc);
  }, []);


  const dropDownButtons = () => {
    if(isMobile) {
      return (
        <>
        <div style={buttons}>
          <DownArrowButton
            handleClick={showModal(type)}
            label={orgType ? orgType : "Type"}
            color={theme.colors.royalBlue}
            bgcolor="#fff"
            long="true"
            style={{ marginRight: "2rem" }}
          />
          <WhiteSpace />
          <WhiteSpace />
          <DownArrowButton
            handleClick={showModal(industry)}
            label={orgIndustry ? orgIndustry : "Industry"}
            color={theme.colors.royalBlue}
            bgcolor="#fff"
            long="true"
          />
        </div>
          <span style={errorStyles}>{errors.type || errors.industry ? "Please select organization type and industry from dropdown" : ""}</span>
        </>
      )
    } else {
      return (
        <div>
        <Controller
          as={<Select defaultValue="Type">
            {type.options.map((option, i) => (
              <Select.Option key={i} value={option.text}>
                {option.text}
              </Select.Option>
            ))}
          </Select>}
         control={control}
         name="type"
         rules={{ required: true }}
         onClick={(event) => event.target.innerText}
        />
        <Controller
        as={<Select defaultValue="Industry">
          {industry.options.map((option, i) => (
            <Select.Option key={i} value={option.text}>
              {option.text}
            </Select.Option>
          ))}
        </Select>}
        name="industry"
        rules={{ required: true }}
        control={control}
        onClick={(event) => event.target.innerText}
        />
         <span style={errorStyles}>{errors.type || errors.industry ? "Please select organization type and industry from dropdown" : ""}</span>
        </div>
      )
    }
  }

  //
  // const onFormSubmit = async (data) => {
  //   // e.preventDefault();
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
    if(!privacy) {
      alert("You must agree to our privacy policy before proceeding")
      return;
    } else if (!conditions) {
      alert("You must agree to our terms and conditions before proceeding")
      return;
    } else {
      console.log(data);
    }
  };


  return (
    <Main>
     <SvgContainer>
        <img src={createOrganizationSvg} alt="create organization" />
     </SvgContainer>
     <FormContainer>
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
            onChange={name => name}
            style={StyleInput}
            ref={register({ required: true, minLength: 3 })}
            name="name"
          />
          <span style={errorStyles}>{errors.name && "Organization name is required"}</span>
        </InputWrapper>
        <WhiteSpace />
        <WhiteSpace />
        <InputWrapper>
          <Label style={StyleLabel} label="* Organization Contact E-mail" />
          <Input
            type="email"
            required
            placeholder="help@notion.com (this is a fake)"
            onChange={email => email}
            style={StyleInput}
            name="email"
            ref={register({ required: true, minLength: 3 })}
          />
          <span style={errorStyles}>{errors.email && "Email is required"}</span>
        </InputWrapper>
        <WhiteSpace />
        <WhiteSpace />
        <InputWrapper>
          <Label style={StyleLabel} label="* Location" />
          <Input
            type="text"
            required
            placeholder="Pittsburgh, Pennsylvania, United States"
            onChange={location => location}
            style={StyleInput}
            name="location"
            ref={register({ required: true, minLength: 3 })}
          />
          <span style={errorStyles}>{errors.location && "Location is required"}</span>
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
            title="Organization Type"
            className="post-modal"
            content={
              <Controller
                as={RadioGroup}
                flex={true}
                name="type"
                padding="1.3rem 0"
                rules={{ required: true }}
                onChange={changeOrgTypeHandler}
                options={options}
                value={orgType}
                control={control}
              />
            }
            onClose={closeModalType}
            visible={typeModal}
            closable={false}
            closeButton={true}
            closeButtonName="Select Type"
            selectCloseButton={closeModalType}
          />
          <CustomModal
            title="Select Industry"
            className="post-modal"
            content={
              <Controller
                as={RadioGroup}
                flex={true}
                name="industry"
                padding="1.3rem 0"
                rules={{ required: true }}
                onChange={changeOrgIndustryHandler}
                options={options}
                value={orgIndustry}
                control={control}
              />
            }
            onClose={closeModalIndustry}
            visible={industryModal}
            closable={false}
            closeButton={true}
            closeButtonName="Select Industry"
            selectCloseButton={closeModalIndustry}
            searchBar={true}
            onSearch={searchIndustryHandler}
          />

          {dropDownButtons()}
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
             rules={{ required: true }}
             onChange={([checkedValues]) => checkedValues}
             validateStatus="error"
            />
           <span style={errorStyles}>{errors.needs && "Please select at least one option"}</span>
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
      </FormContainer>
    </Main>
  );
};

export default CreateOrgProfile;
