import React from "react";
import { Radio } from "antd";
import SvgIcon from "../Icon/SvgIcon";
import privateIcon from "../../assets/icons/orgbook-private-alt.svg";
import publicIcon from "../../assets/icons/orgbook-public-alt.svg";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { theme } from "constants/theme";
const { royalBlue, black, darkGray } = theme.colors;
const { medium } = theme.typography.size;
const { display } = theme.typography.font.family;

const StyledRadioGroup = styled(Radio.Group)`
  width: 100%;
  margin-top: 0.5rem;
  text-align: left;
  .ant-radio-wrapper {
    justify-content: space-between;
    padding: ${(props) => props.padding};
    white-space: break-spaces;
    margin-left: -1.5rem;

    span.ant-radio + * {
      font-family: ${display};
      font-size: ${medium};
      color: ${black};
      letter-spacing: 0;
    }
    .ant-radio-inner {
      border-color: ${royalBlue};
      border-width: 0.2rem;
      width: 2.1rem;
      height: 2.1rem;
      &::after {
        background-color: ${royalBlue};
        top: 0rem;
        left: 0rem;
        width: 1.7rem;
        height: 1.7rem;
      }
    }
  }
`;

const OrgBookRadioGroup = ({
  name,
  options,
  onChange,
  value,
  defaultValue,
  flex,
  padding,
}) => {
  const { t } = useTranslation();

  return (
    <StyledRadioGroup
      name={name}
      size="large"
      flex={flex}
      padding={padding}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    >
      {options.map((option, idx) => (
        <Radio value={option.value} key={idx}>
          {name === "confirmPublishOption" && idx === 0 ? (
            <>
              <SvgIcon src={publicIcon} title={t("orgBook.publicView")} />
              {"  "}
            </>
          ) : (
            ""
          )}
          {name === "confirmPublishOption" && idx === 1 ? (
            <>
              <SvgIcon
                src={privateIcon}
                title={t("orgBook.orgViewOnly")}
                width={"3rem !important"}
                height={"3rem !important"}
              />
              {"  "}
            </>
          ) : (
            ""
          )}
          {option.value}
        </Radio>
      ))}
    </StyledRadioGroup>
  );
};

export default OrgBookRadioGroup;
