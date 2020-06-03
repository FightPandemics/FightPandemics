import React from "react";
import Head from "./Head";
import { SubTitle, Section, Selector } from "components/CreatePost/StyledModal";
import SvgIcon from "components/Icon/SvgIcon";
import downArrowSlim from "assets/icons/down-arrow-slim.svg";

const Third = ({ formData }) => {
  const { shareWith, expires } = formData;
  return (
    <Section>
      <Head number={3} title="What is the visibility of your post?" />
      <div className="buttons">
        <SubTitle>The post will be visible to</SubTitle>
        <Selector
          suffixIcon={<SvgIcon src={downArrowSlim} />}
          defaultValue={shareWith.default.value}
          filterOption={false}
          options={shareWith.options}
        />
        <Selector
          suffixIcon={<SvgIcon src={downArrowSlim} />}
          defaultValue={expires.default.value}
          filterOption={false}
          options={expires.options}
        />
      </div>
    </Section>
  );
};

export default Third;
