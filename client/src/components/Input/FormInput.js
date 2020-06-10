import React, { forwardRef } from "react";
import styled from "styled-components";

import { blockLabelStyles } from "constants/formStyles";
import { mq, theme } from "constants/theme";
import InputError from "./InputError";
import Label from "./Label";

const { colors } = theme;

const FormInput = styled.input`
  border: none;
  flex-grow: 1;
  padding-bottom: 0.5rem;
  color: ${colors.black};
`;

const OuterWrapper = styled.div`
  margin: 2.2rem auto;
  width: 100%;
  position: relative;
`;

const InputWrapper = styled.div`
  margin-bottom: 2rem;
  margin-top: 0.4rem;
  align-items: center;
  border-bottom: 1px solid ${colors.royalBlue};
  display: flex;
  &.has-error {
    border-bottom-color: ${colors.red};
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
  ) => {
    console.log({ inputTitle, prefix });
    return (
      <OuterWrapper>
        <Label
          icon={icon}
          htmlFor={name}
          style={blockLabelStyles}
          label={inputTitle}
        />
        <InputWrapper>
          {prefix && <Prefix>{prefix}</Prefix>}
          <FormInput
            className={error && "has-error"}
            name={name}
            id={name}
            value={defaultValue}
            ref={ref}
            placeholder={placeholder}
            {...props}
          />
        </InputWrapper>
        {error && <InputError>{error.message}</InputError>}
      </OuterWrapper>
    );
  },
);
