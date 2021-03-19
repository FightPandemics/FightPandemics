import React, { forwardRef, useState } from "react";
import styled from "styled-components";

import { blockLabelStyles } from "constants/formStyles";
import { mq, theme } from "constants/theme";
import InputError from "components/Input/InputError";
import InputInfo from "components/Input/InputInfo";
import Label from "components/Input/Label";
import TextArea from "components/Input/TextArea";

const { colors } = theme;

const ApplyFormInput = styled.input.attrs(({ maxLength, min, max }) => ({
  maxLength: maxLength || Number.MAX_SAFE_INTEGER,
  min: min || Number.MIN_SAFE_INTEGER,
  max: max || Number.MAX_SAFE_INTEGER,
}))`
  border: none;
  box-shadow: none;
  color: ${colors.black};
  flex-grow: 3;
  /* overflow: auto; */
  padding-bottom: 0.5rem;
`;

const OuterWrapper = styled.div`
  margin: 1rem auto;
  position: relative;
  text-align: left;
  width: 100%;
`;

const InputWrapper = styled.div`
  align-items: center;
  border-bottom: 1px solid ${colors.royalBlue};
  display: flex;
  margin: 0.4rem 0;
  &.has-error {
    border-bottom: 1px solid ${colors.red};
    color: ${colors.red};
  }
  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
`;

const Prefix = styled.span`
  padding-bottom: 0.5rem;
`;

const CharCounter = styled.p`
  color: ${colors.darkishGray} !important;
  padding-left: 2rem;
  font-size: 1.2rem !important;
  font-weight: 500 !important;
  text-align: right;

  &.has-error {
  color: ${colors.red} !important;
}
`;

export default forwardRef(
  (
    {
      orgName,
      onChange,
      onSubmit,
      onPressEnter,
      maxLength, inputTitle,
      name,
      defaultValue,
      error,
      icon,
      prefix,
      placeholder,
      counter,
      ...props
    },
    ref,
  ) => {
    const charsLeft =
      props.maxLength && props.value && props.maxLength - props.value.length;
    const [count, setCount] = useState(0);

    return (

      <OuterWrapper>

        <Label
          icon={icon}
          htmlFor={name}
          style={blockLabelStyles}
          label={inputTitle}
          className="asterisk"
        />
        <InputWrapper className={count > 250 ? "has-error" : "" || error && "has-error"}>
          {prefix && <Prefix>{prefix}</Prefix>}
          <ApplyFormInput
            name={name}
            id={name}
            defaultValue={defaultValue}
            ref={ref}
            // placeholder={placeholder}
            orgName={orgName}
            {...props}
            onChange={(event) => setCount(event.target.value.length)}
          />
          {// TextArea is for Autosize test
          }
          {/* <TextArea
            autoSize
            name={name}
            id={name}
            defaultValue={defaultValue}
            ref={ref}
            error={error}
            // placeholder={placeholder}
            {...props}
            onChange={(event) => setCount(event.target.value.length)}
          /> */}
          <CharCounter className={count > 250 ? "has-error" : ""}> {count} / {250} </CharCounter>
        </InputWrapper>

        {
          typeof charsLeft === "number" && charsLeft !== props.maxLength && (
            <InputInfo
              error={charsLeft === 0}
            >{`${charsLeft} characters left`}</InputInfo>
          )
        }
        {/* {error && <InputError>{error.message}</InputError>} */}
      </OuterWrapper >
    );
  },
);
