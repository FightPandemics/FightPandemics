import React from "react";
import { useTranslation } from "react-i18next";

import Head from "./Head";
import { SubTitle, Section, Selector } from "components/CreatePost/StyledModal";
import SvgIcon from "components/Icon/SvgIcon";
import downArrowSlim from "assets/icons/down-arrow-slim.svg";
import createPostSettings from "assets/data/createPostSettings";

const { workRemote } = createPostSettings;

const Fourth = ({ onWorkRemoteChange, formData }) => {
  const { t } = useTranslation();

  const translateOptions = (options) =>
    options.map(({ text, value }) => ({ text: t(text), value: value }));

  return (
    <Section>
      <Head number={4} title={t("post.workRemote")} />
      <div className="buttons visibility-post">
        <div className="visibility-post--selector">
          <Selector
            suffixIcon={
              <SvgIcon
                src={downArrowSlim}
                style={{ width: "1.5rem", height: "auto" }}
              />
            }
            onChange={onWorkRemoteChange}
            defaultValue={
              formData ? formData.workRemote : workRemote.default.value
            }
            filterOption={false}
            options={translateOptions(workRemote.options)}
            minWidth="11rem"
          />
        </div>
      </div>
    </Section>
  );
};

export default Fourth;
