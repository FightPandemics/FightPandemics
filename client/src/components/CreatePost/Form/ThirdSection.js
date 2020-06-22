import React from "react";
import Head from "./Head";
import { SubTitle, Section, Selector } from "components/CreatePost/StyledModal";
import SvgIcon from "components/Icon/SvgIcon";
import downArrowSlim from "assets/icons/down-arrow-slim.svg";
import createPostSettings from "assets/data/createPostSettings";

const { shareWith, expires } = createPostSettings;

const Third = ({ onShareWithChange, onExpirationChange, formData }) => {
  return (
    <Section>
      <Head number={3} title="What is the visibility of your post?" />
      <div className="buttons">
        <SubTitle>The post will be visible to</SubTitle>
        <Selector
          suffixIcon={<SvgIcon src={downArrowSlim} />}
          onChange={onShareWithChange}
          defaultValue={formData ? formData.shareWith : shareWith.default.value}
          filterOption={false}
          options={shareWith.options}
        />
        <Selector
          suffixIcon={<SvgIcon src={downArrowSlim} />}
          onChange={onExpirationChange}
          defaultValue={formData ? formData.expires : expires.default.value}
          filterOption={false}
          options={expires.options}
        />
      </div>
    </Section>
  );
};

export default Third;
