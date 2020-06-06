import React from "react";
import styled from "styled-components";
import { mq, theme } from "constants/theme";
import SvgIcon from "../Icon/SvgIcon";
const FormInput = styled.input`
  border-top-style: hidden;
  border-left-style: hidden;
  border-right-style: hidden;
  border-color: ${(props) => (props.error ? "#FF5656" : "#5970EC")};
  border-width: thin;
  margin-bottom: 2rem;
  margin-top: 0.4rem;
  padding-bottom: 0.5rem;
  color: ${theme.colors.black};
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    margin-top: 1rem;
    margin-bottom: 4rem;
  }
  :last-of-type {
    margin-bottom: 2rem;
  }
`;

const Icon = styled(SvgIcon)`
  display: none;
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    display: initial;
    margin-right: 1rem;
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
  icon,
  ...props
}) => {
  return (
    <>
      {icon ? (
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <Icon src={icon} />
          <label style={{ color: error ? "#FF5656" : "#425AF2" }}>
            {inputTitle || null}
          </label>
        </div>
      ) : (
        inputTitle && (
          <label style={{ color: error ? "#FF5656" : "#425AF2" }}>
            {inputTitle}
          </label>
        )
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
