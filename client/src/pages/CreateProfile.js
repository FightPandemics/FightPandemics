import { Button, Flex, WhiteSpace, Toast } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import TextInput from "../components/Input/TextInput";
import Checkbox from "../components/Input/Checkbox";
import Label from "../components/Input/Label";
import CustomH1 from "../components/Typography/Title/CustomH1";
import { theme, mq } from "../constants/theme";

import PersonalDataImage from "../assets/create-profile-images/personal_data.svg";

const Container = styled.div`
    height: 100vh;
    display: flex;
    .form-container {
        width: 60%;
    }
    .image-container {
        background-color: ${theme.colors.selago};
        width: 40%;
        img {
            margin-top: 16rem;
        }
    }
    .form-container, .image-container {
        padding: 1rem;
    }
`;


const ProfileFormGroup = styled.form`
    width: 350px;
    p {
        margin-bottom: 0;
    }
`;

const CheckboxGroup = ({label}) => {
    return (
    <Flex alignContent="center">
        <Checkbox/>
        <Label label={label} style={{'marginLeft': '1rem'}}/>
    </Flex>
    )
}

const inputStyle = {
    'width': '100%',
    'marginTop': '1em',
    'marginBottom': '2em',
    'paddingBottom': '1em'
};

const labelStyle = {
    'fontWeight': 'bold',
    'fontFamily': theme.typography.font.family.button
};

const CreateProfile = () =>
<Container>
    <Flex className="image-container" direction="column">
        <img src={PersonalDataImage} alt="" />
    </Flex>
    <Flex className="form-container" direction="column">
        <CustomH1 color={theme.colors.darkerGray} fontweight="bold">Create your Profile</CustomH1>
        <WhiteSpace size="xl"/>
        <ProfileFormGroup>
            <TextInput label="E-mail" inputStyle={inputStyle} labelStyle={labelStyle}/>
            <TextInput label="Name" inputStyle={inputStyle}/>
            <TextInput label="Address" inputStyle={inputStyle}/>
            <CheckboxGroup label="I am traveling" />
            <CheckboxGroup label="Don't show my address" />
        </ProfileFormGroup>
    </Flex>
</Container>;

export default CreateProfile;