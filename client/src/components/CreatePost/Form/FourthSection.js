import React from "react";
import { useTranslation } from "react-i18next";

import Head from "./Head";
import { SubTitle, Section, Selector } from "components/CreatePost/StyledModal";
import SvgIcon from "components/Icon/SvgIcon";
import downArrowSlim from "assets/icons/down-arrow-slim.svg";
import createPostSettings from "assets/data/createPostSettings";
import { post } from "constants/gtm-tags";

const { workMode } = createPostSettings;

const Fourth = ({ onWorkModeChange, formData }) => {
  const { t } = useTranslation();

  const translateOptions = (options) =>
    options.map(({ text, value }) => ({ text: t(text), value: value }));

  return (
    <Section>
      <Head number={4} title={t("post.workMode")} />
      <div className="buttons visibility-post">
        <SubTitle className="visibility-post--info">
          {t("post.workFullfillment")}
        </SubTitle>
        <div className="visibility-post--selector">
          <Selector
            id={
              post.prefix + post.createPost + post.workMode
            } /* id added to assign id to fullfillment dropdown to track gtm tag in create post */
            suffixIcon={
              <SvgIcon
                src={downArrowSlim}
                style={{ width: "1.5rem", height: "auto" }}
              />
            }
            onChange={onWorkModeChange}
            defaultValue={formData ? formData.workMode : workMode.default.value}
            filterOption={false}
            options={translateOptions(workMode.options)}
            minWidth="13rem"
          />
        </div>
      </div>
    </Section>
  );
};

export default Fourth;
