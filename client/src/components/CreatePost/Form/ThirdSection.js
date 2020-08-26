import React from "react";
import { useTranslation } from "react-i18next";

import Head from "./Head";
import { SubTitle, Section, Selector } from "components/CreatePost/StyledModal";
import SvgIcon from "components/Icon/SvgIcon";
import downArrowSlim from "assets/icons/down-arrow-slim.svg";
import createPostSettings from "assets/data/createPostSettings";

const { shareWith, expires } = createPostSettings;

const Third = ({ onShareWithChange, onExpirationChange, formData }) => {
  const { t } = useTranslation();
  return (
    <Section>
      <Head number={3} title={t("post.whatVisibility")} />
      <div className="buttons visibility-post">
        <SubTitle className="visibility-post--info">
          {t("post.postVisible")}
        </SubTitle>
        <div className="visibility-post--selector">
          <Selector
            suffixIcon={
              <SvgIcon
                src={downArrowSlim}
                style={{ width: "1.5rem", height: "auto" }}
              />
            }
            onChange={onShareWithChange}
            defaultValue={
              formData ? formData.shareWith : shareWith.default.value
            }
            filterOption={false}
            options={shareWith.options}
          />
          <Selector
            suffixIcon={
              <SvgIcon
                src={downArrowSlim}
                style={{ width: "1.5rem", height: "auto" }}
              />
            }
            onChange={onExpirationChange}
            defaultValue={formData ? formData.expires : expires.default.value}
            filterOption={false}
            options={expires.options}
          />
        </div>
      </div>
    </Section>
  );
};

export default Third;
