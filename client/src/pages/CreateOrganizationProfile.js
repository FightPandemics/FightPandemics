import { WhiteSpace } from "antd-mobile";
import React, { useState, useEffect } from "react";
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
import StyledDropDown from "../components/Input/DropDown";
import Input from "../components/Input/BaseInput";
import SubmitButton from "../components/Button/SubmitButton";
import Label from "../components/Input/Label";
import StyledCheckbox from "../components/Input/Checkbox";
import StyledCheckboxGroup from "../components/Input/CheckboxGroup";
import createOrganizationSvg from "../assets/icons/create-organization.svg";
import { theme, mq } from "../constants/theme";
import {
  CreatePostWrapper,
  StyledForm,
} from "../components/CreatePost/StyledCreatePost";
import { Menu, Dropdown, Item, Button, message, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

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
     padding-left: 5;
     padding-right: 5;
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
  color: "${theme.colors.royalBlue}"
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

const types = Object.values(filterOptions)[2].options;
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

  const { register, handleSubmit, watch, control, errors } = useForm();

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


  const onFormSubmit = (data) => {
    console.log(data);
  };

  const menu = settings => {
    const options = settings.options;
    return (
      <Menu
         name={settings.type}
         onClick={event => event.item.node.innerText}
        >
        {options.map((option, i) => (
          <Menu.Item key={i}>
            {option.text}
          </Menu.Item>
        ))}
      </Menu>
  )
  }

  const dropDownButtons = () => {
    if(isMobile) {
      return (
        <div style={buttons}>
          <DownArrowButton
            handleClick={showModal(type)}
            label="Type"
            color={theme.colors.royalBlue}
            bgcolor="#fff"
            long="true"
            value={options}
            style={{ marginRight: "2rem" }}
          />
          <WhiteSpace />
          <WhiteSpace />
          <DownArrowButton
            handleClick={showModal(industry)}
            label="Industry"
            color={theme.colors.royalBlue}
            bgcolor="#fff"
            long="true"
            value={options}
          />
        </div>
      )
    } else {
      return (
        <div style={buttons}>
          <StyledDropDown
           overlay={menu(type)}
           label="Type"
           placement="bottomCenter"
           trigger={["click"]}
           style={{ marginRight: "3rem" }}
          />
          <StyledDropDown
           overlay={menu(industry)}
           label="Industry"
           placement="bottomCenter"
           trigger={["click"]}
          />
        </div>
      )
    }
  }


  return (
    <Main>
     <SvgContainer>
        <img src={createOrganizationSvg} />
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
            value={name}
            onChange={handleInputChangeName}
            style={StyleInput}
            ref={register({ required: true, minLength: 3 })}
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
            name="email"
            ref={register({ required: true, minLength: 3 })}
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
            name="location"
            ref={register({ required: true, minLength: 3 })}
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
            title="Organization Type"
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
      </FormContainer>
    </Main>
  );
};

export default CreateOrgProfile;
