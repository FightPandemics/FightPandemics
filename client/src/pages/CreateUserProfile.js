import { Flex, WhiteSpace } from "antd-mobile";
import { Dropdown, Menu } from "antd";
import React, {useEffect} from "react";
import styled from "styled-components";
import TextInput from "components/Input/TextInput";
import Checkbox from "components/Input/Checkbox";
import Heading from "components/Typography/Heading";
import TextLabel from "components/Typography/TextLabel";
import SubmitButton from "components/Button/SubmitButton";
import { theme, mq } from "constants/theme";

import PersonalDataImage from "assets/create-profile-images/personal-data.svg";
import Marker from "assets/create-profile-images/location-marker.svg";

require('typeface-dm-sans');
require('typeface-work-sans');

const Container = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    .form-container {
        background-color: #fbfbfd;
        width: 100%;
        @media only screen and (min-width: ${mq.tablet.narrow.minWidth}) {
            margin-left: 50%;
            width: 50%;
        }
        @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
            margin-left: 40%;
            width: 60%;
        }
    }
    .image-container {
        background-color: ${theme.colors.selago};
        @media only screen and ${mq.phone.wide.max} {
            display: none;
        }
        @media only screen and (min-width: ${mq.tablet.narrow.minWidth}) {
            height: 100VH;
            position: fixed;
            width: 50%;
        }
        @media only screen and (min-width: ${mq.desktop.medium.minWidth}) {
            height: 100VH;
            position: fixed;
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
    --xsmall: ${theme.typography.size.xsmall};

    display: flex;
    align-items: ${props => (props.label && props.description) ? 'start' : 'center' };
    margin: var(--mt) 0 0 0;
    p {
        color: ${theme.colors.darkerGray};
        font-weight: normal;
    }
    .ant-checkbox-wrapper {
        margin-right: ${theme.typography.size.large};
    }
    span {
        color: #646464;
        font-size: var(--xsmall);
        font-family: ${props => props.font};
    }
`

const CheckboxGroup = ({children, description, font, label}) => {
    return (
    <CheckboxContainer font={font} label={label} description={description}>
        <Checkbox 
        color={theme.colors.royalBlue} 
        size={theme.typography.size.xxlarge}
        />
        <Flex direction="column" align="start">
            {children ?? <TextLabel color={theme.colors.black} size={theme.typography.size.large}>{label}</TextLabel>} 
            <span>{description}</span>
        </Flex>
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

    color: ${theme.colors.royalBlue};
    margin: var(--my) 0 var(--my) 0;

    input {
        background-color: transparent;
        color: ${theme.colors.darkerGray};
        font-size: ${theme.typography.size.xlarge};
        margin-bottom: 3.4rem;
        padding: var(--py) 0 var(--py) 0;
        width: 100%;
    }

    label {
        font-family: ${theme.typography.font.family.button};
        font-size: ${theme.typography.size.large};
        font-weight: 500;
    }

    .address {
        input {
            margin-bottom: 0;
        }
        label > p:before {
            content: ' ';
            background-image: url(${Marker});
            background-size: contain;
            background-repeat: no-repeat;
            display: inline-block;
            margin-right: ${theme.typography.size.xxsmall};
            height: ${theme.typography.size.xlarge};
            width: ${theme.typography.size.xlarge};
        }

        label:after {
            content: 'Enter address, zip code, or city';
            color: #209d7f;
            font-size: ${theme.typography.size.xsmall};
            font-family: ${theme.typography.font.family.body};
            margin-top: ${theme.typography.size.xsmall};
        }
    }

    .underline {
        color: #209d7f;
        font-size: ${theme.typography.size.xsmall};
        font-family: ${theme.typography.font.family.body};
        margin-top: ${theme.typography.size.xsmall};     
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

const Submit = styled(SubmitButton)`
    font-weight: 500;
`
const CreateProfile = () => {
useEffect(() => {
    let header = document.querySelector('.header');
    let headerNav = document.querySelector('.am-navbar-right');
    let main = document.getElementsByTagName('main')[0];
    header.style.position = 'fixed';
    header.style.zIndex = 999;
    headerNav.style.display = 'none';
    document.querySelector('.am-navbar-light').style.backgroundColor = 'transparent';
    main.style.marginLeft = '0px';
    main.style.marginRight = '0px';
}, [])
return <Container>
    <Flex className="image-container" direction="column">
        <img src={PersonalDataImage} alt="two people standing next to a list of personal items" />
    </Flex>
    <Flex className="form-container" direction="column">
        <WhiteSpace size="xl"/>
        <ProfileFormGroup>
            <Heading level="1" className="h2" color={theme.colors.darkerGray} fontweight="bold">Create your Profile</Heading>
            <InputGroup>
                <TextInput label="E-mail" />
                <TextInput label="First name" />
                <TextInput label="Last name" />
                <div className="address">
                    <DropdownMenu>
                        <div id="dropdown-anchor" style={{'position': 'relative'}}>
                            <TextInput label="Address"/>
                        </div>
                    </DropdownMenu>
                </div>
            </InputGroup>
            <CheckboxGroup font={theme.typography.font.family.body} description="I am traveling" />
            <CheckboxGroup font={theme.typography.font.family.body} description="Don't show my address" />
            <InputGroup>
                <TextLabel color={theme.colors.royalBlue} size={theme.typography.size.large} weight={500}>I want to</TextLabel>
                <CheckboxGroup label="Volunteer" />
                <CheckboxGroup label="Donate" />
                <CheckboxGroup label="Share Information" />
            </InputGroup>
            <InputGroup>
                <TextLabel color={theme.colors.royalBlue} size={theme.typography.size.large} weight={500}>I need</TextLabel>
                <CheckboxGroup 
                label="Medical Help" 
                description="I have symptoms of COVID-19"/>
                <CheckboxGroup 
                label="Other Help" 
                description="I need assitance getting groceries, medicine, etc." />
            </InputGroup>
            <InputGroup>
                <Submit primary="true">Create Profile</Submit>
                <CheckboxGroup>
                    <UnderlineLink>By signing up, I agree to the <a href="/privacy-policy">Privacy Policy</a>
                    </UnderlineLink>
                </CheckboxGroup>
                <CheckboxGroup>
                    <UnderlineLink>By signing up, I agree to the <a href="/terms-conditions">Terms and Conditions</a>
                    </UnderlineLink>
                </CheckboxGroup>
            </InputGroup>
        </ProfileFormGroup>
    </Flex>
</Container>
};

export default CreateProfile;