import React from "react";
import styled from "styled-components";
import { mq } from "constants/theme";

const FormInput = styled.input`
  border-top-style: hidden;
  border-left-style: hidden;
  border-right-style: hidden;
  border-color: ${(props) => (props.error ? "#FF5656" : "#5970EC")};
  border-width: thin;
  margin-bottom: 2rem;
  margin-top: 0.4rem;
  padding-bottom: 0.5rem;
  color: #000000;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    margin-top: 1rem;
    margin-bottom: 4rem;
  }
`;
// const inputFieldStyle = {
//   borderTopStyle: "hidden",
//   borderLeftStyle: "hidden",
//   borderRightStyle: "hidden",
//   borderColor: error ? "#FF5656" : "#5970EC",
//   borderWidth: "thin",
//   marginBottom: "2rem",
//   marginTop: "0.4rem",
//   paddingBottom: "0.5rem",
//   color: "#000000",
// };
export default ({
  inputTitle,
  name,
  defaultValue,
  reference,
  error,
  ...props
}) => {
  return (
    <>
      {inputTitle && (
        <label style={{ color: error ? "#FF5656" : "#425AF2" }}>
          {inputTitle}
        </label>
      )}
      <FormInput
        name={name}
        defaultValue={defaultValue}
        ref={reference}
        placeholder="Please fill in the blank"
        {...props}
      />
    </>
  );
};
