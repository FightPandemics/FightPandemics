import React from "react";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "../components/Input/Checkbox";
import SubmitButton from "../components/Button/SubmitButton";
import styled from "styled-components";
import FormInput from "../components/Input/FormInput";
import Title from "../components/Title/Title";
import UnderLineDescription from "../components/Input/UnderlineDescription";

const Label = styled.label` 
  color: ${(props) => props.inputColor || "#425AF2"};
  margin-top: 1.5rem;
};
`;

export default function EditAccount(props) {
  // dummy data props,context, redux etc
  const firstName = "Cees";
  const lastName = "Wang";
  const email = "test@Gmail.com";
  const country = "United States of America";
  const neighborhood = "NYC, NY";
  const neighborhoodDescription =
    "If you do not know your neighborhood, type in zip code or address to find it";
  const shareInfoStatus = true;
  const volunteerStatus = false;
  const donateStatus = true;
  const medicalHelpStatus = false;
  const otherHelpStatus = true;
  const medicalHelpDescription = "I have symptoms of COVID-19";
  const otherHelpDescription =
    "I need assistance getting groceries, medicine, etc.";
  const traveling = true;
  const displayNeighborhood = false;
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // make a put/patch request to backend to update users Account information
  };

  const userInfo = {
    // label name, variable name, value
    "E mail": ["email", email],
    "* Name": ["name", firstName + " " + lastName],
    "* Country": ["country", country],
    "* Neighborhood": ["neighborhood", neighborhood, neighborhoodDescription],
  };

  const helpSection = {
    Volunteer: ["volunteer", volunteerStatus],
    Donate: ["donate", donateStatus],
    "Share Information": ["shareInfo", shareInfoStatus],
  };

  const needHelpSection = {
    "Medical Help": ["medicalHelp", medicalHelpStatus, medicalHelpDescription],
    "Other Help": ["otherHelp", otherHelpStatus, otherHelpDescription],
  };

  const renderHelp = () => {
    return Object.entries(helpSection).map(([key, value]) => {
      return (
        <div key={key} style={{ margin: "1rem 0" }}>
          <Controller
            as={Checkbox}
            defaultValue={value[1]}
            name={value[0]}
            control={control}
            onChange={([event]) => event.target.checked}
          >
            <Label inputColor="#000000">{key}</Label>
          </Controller>
        </div>
      );
    });
  };

  const renderNeedHelp = () => {
    return Object.entries(needHelpSection).map(([key, value]) => {
      return (
        <div
          key={key}
          style={{
            margin: "1rem 0",
            marginBottom: "-1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
        </div>
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
            reference={register}
          />
          <UnderLineDescription marginTop={"-1.5rem"}>
            {value[2] || null}
          </UnderLineDescription>
        </div>
      );
    });
  };

  const renderNeighborhoodCheckBoxes = () => {
    return (
      <>
        <div
          style={{
            margin: "0.5rem 0",
            marginTop: "-1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Controller
            as={Checkbox}
            defaultValue={traveling}
            name={"traveling"}
            control={control}
            onChange={([event]) => event.target.checked}
          >
            <Label inputColor="#646464">I am traveling</Label>
          </Controller>
        </div>
        <div
          style={{
            margin: "0.5rem 0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Controller
            as={Checkbox}
            defaultValue={displayNeighborhood}
            name="displayNeighborhood"
            control={control}
            onChange={([event]) => event.target.checked}
          >
            <Label inputColor="#646464">Don't show my neighborhood</Label>
          </Controller>
        </div>
      </>
    );
  };

  return (
    <>
      <Title
        title="Account Information"
        style={{
          marginBottom: "2rem",
          marginTop: "2rem",
          fontWeight: "bolder",
        }}
      />
      <form style={{ display: "flex", flexDirection: "column" }}>
        {renderFormInputs()}
        {renderNeighborhoodCheckBoxes()}
        <Label>I want to</Label>
        {renderHelp()}
        <Label>I need</Label>
        {renderNeedHelp()}
        <SubmitButton
          title={"Save Changes"}
          style={{ marginTop: "1rem", marginBottom: "3rem" }}
          onClick={handleSubmit(onSubmit)}
        >
          Save Changes
        </SubmitButton>
      </form>
    </>
  );
}
