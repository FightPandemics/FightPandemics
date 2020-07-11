import React, { forwardRef } from "react";
import styled from "styled-components";

import { blockLabelStyles } from "constants/formStyles";
import { mq, theme } from "constants/theme";
import InputError from "./InputError";
import Label from "./Label";

const { colors } = theme;

const FormInput = styled.input`
  border: none;
  box-shadow: none;
  color: ${colors.black};
  flex-grow: 1;
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

export default forwardRef(
  (
    {
      inputTitle,
      name,
      defaultValue,
      error,
      icon,
      prefix,
      placeholder,
      ...props
    },
    ref,
  ) => (
    <OuterWrapper>
      <Label
        icon={icon}
        htmlFor={name}
        style={blockLabelStyles}
        label={inputTitle}
      />
      <InputWrapper className={error && "has-error"}>
        {prefix && <Prefix>{prefix}</Prefix>}
        <FormInput
          name={name}
          id={name}
          defaultValue={defaultValue}
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
      </InputWrapper>
      {error && <InputError>{error.message}</InputError>}
    </OuterWrapper>
  ),
);
