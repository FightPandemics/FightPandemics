import { Flex, WhiteSpace } from "antd-mobile";
import { Dropdown, Menu } from "antd";
import React from "react";
import styled, { css } from "styled-components";
import TextInput from "../components/Input/TextInput";
import Checkbox from "../components/Input/Checkbox";
import Label from "../components/Input/Label";
import UnderlineDescription from "../components/Input/UnderlineDescription";
import CustomH1 from "../components/Typography/Title/CustomH1";
import Title from "../components/Typography/Title";
import SubmitButton from "../components/Button/SubmitButton";
import { theme, mq } from "../constants/theme";

import PersonalDataImage from "../assets/create-profile-images/personal_data.svg";

require('typeface-dm-sans');
require('typeface-work-sans');

const Container = styled.div`
    display: flex;
    .form-container {
        width: 100%;
        @media only screen and (min-width: ${mq.tablet.narrow.minWidth}) {
            width: 50%;
        }
        @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
            width: 60%;
        }
    }
    .image-container {
        background-color: ${theme.colors.selago};
        @media only screen and ${mq.phone.wide.max} {
            display: none;
        }
        @media only screen and (min-width: ${mq.tablet.narrow.minWidth}) {
            width: 50%;
        }
        @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
            width: 40%;
        }
        img {
            margin-top: 16rem;
        }
    }
    .form-container, .image-container {
        padding: 1rem;
    }
`;

const ProfileFormGroup = styled.form`
    @media only screen and ${mq.phone.wide.max} {
        h1 {
            text-align: center !important;
        }
    }
    @media only screen and (min-width: ${mq.tablet.wide.minWidth}) {
        width: 350px;
        h1 {
            margin-left: -${theme.typography.size.large}; 
        }
    }
    p {
        margin-bottom: 0;
    }
`;

const CheckboxContainer = styled.div`
    --mt: ${theme.typography.size.xxsmall};
    display: flex;
    align-items: center;
    margin: var(--mt) 0 0 0;
    p {
        color: ${theme.colors.darkerGray};
        font-weight: normal;
    }
    p, div {
        margin-left: ${theme.typography.size.xsmall};      
    } 
`

const CheckboxGroup = ({children, description, label}) => {
    return (
    <CheckboxContainer>
        <Checkbox/>
        <div>
            {children ?? <Label label={label}/>} 
            <UnderlineDescription>{description}</UnderlineDescription>
        </div>
    </CheckboxContainer>
    )
};

const StyledMenu = styled(Menu)`
    padding: ${theme.typography.size.xxsmall};
    width: 100%;
    .ant-dropdown-menu-item {
        display: flex;
        span {
            font-size: ${theme.typography.size.medium};
            margin-right: ${theme.typography.size.xxsmall};
            :first-child {
                color: ${theme.colors.darkerGray};
                font-weight: 500;
            }
            :last-child {
                margin: 0;
            }
        }
        &.ant-dropdown-menu-item-active {
            background-color: ${theme.colors.selago};
        }
    }
`;

const DropdownMenu = ({children}) => {
    const menu = (
        <StyledMenu>
            <Menu.Item>
               <span>10014</span>
               <span>13th Ave,</span>
               <span>New York,</span>
               <span>NY,</span>
               <span>USA</span>
            </Menu.Item>
            <Menu.Divider/>
        </StyledMenu>
    );
    return <Dropdown overlay={menu}>
        {children}
    </Dropdown>
}

const InputGroup = styled.div`
    --py: ${theme.typography.size.xxsmall};
    --my: ${theme.typography.size.xxxlarge};
    
    margin: var(--my) 0 var(--my) 0;

    h3 {
        color: ${theme.colors.primary};
        font-weight: bold;
    }
    input {
        color: ${theme.colors.darkerGray};
        font-size: ${theme.typography.size.xlarge};
        width: 100%;
        margin-bottom: var(--my);
        padding: var(--py) 0 var(--py) 0;

    }
    label {
        font-family: ${theme.typography.font.family.button};
        font-size: ${theme.typography.size.large};
        font-weight: 500;
    }
`

const UnderlineLink = styled.p`
    --color: ${theme.colors.darkGray};
    color: var(--color) !important;
    a {
        color: var(--color);
        text-decoration: underline;
    }
    font-size: ${theme.typography.size.small};
`;

const CreateProfile = () => {
return <Container>
    <Flex className="image-container" direction="column">
        <img src={PersonalDataImage} alt="two people standing next to a list of personal items" />
    </Flex>
    <Flex className="form-container" direction="column">
        <WhiteSpace size="xl"/>
        <ProfileFormGroup>
            <CustomH1 color={theme.colors.darkerGray} fontweight="bold">Create your Profile</CustomH1>
            <InputGroup>
                <TextInput label="E-mail" />
                <TextInput label="Name" />
                <DropdownMenu>
                    <div id="dropdown-anchor" style={{'position': 'relative'}}>
                        <TextInput label="Address"/>
                    </div>
                </DropdownMenu>
            </InputGroup>
            <CheckboxGroup description="I am traveling" />
            <CheckboxGroup description="Don't show my address" />
            <InputGroup>
                <Title>I want to</Title>
                <CheckboxGroup label="Volunteer" />
                <CheckboxGroup label="Donate" />
                <CheckboxGroup label="Share Information" />
            </InputGroup>
            <InputGroup>
                <Title>I need</Title>
                <CheckboxGroup 
                label="Medical Help" 
                description="I have symptoms of COVID-19"/>
                <CheckboxGroup 
                label="Other Help" 
                description="I need assitance getting groceries, medicine, etc." />
            </InputGroup>
            <InputGroup>
                <SubmitButton primary="true">Create Profile</SubmitButton>
                <CheckboxGroup>
                    <UnderlineLink>By signing up, I agree to the <a href="#">Terms and Conditions</a>
                    </UnderlineLink>
                </CheckboxGroup>
                <CheckboxGroup>
                    <UnderlineLink>By signing up, I agree to the <a href="#">Privacy Policy</a>
                    </UnderlineLink>
                </CheckboxGroup>
            </InputGroup>
        </ProfileFormGroup>
    </Flex>
</Container>
};

export default CreateProfile;