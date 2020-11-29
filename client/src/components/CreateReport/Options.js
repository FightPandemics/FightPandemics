import React from "react";
import { useTranslation } from "react-i18next";
import ButtonTag from "components/Tag/ButtonTag";
import { Section } from "components/CreatePost/StyledModal";

const Options = ({ handleOption, selectedOptions }) => {
  const { t } = useTranslation();
  const options = [
    {
      stateKey: "reportReasons",
      value: t("moderation.spam"),
    },
    {
      stateKey: "reportReasons",
      value: t("moderation.inappropriateContent"),
    },
    {
      stateKey: "reportReasons",
      value: t("moderation.violatesTerms"),
    },
    {
      stateKey: "reportReasons",
      value: t("moderation.other"),
    },
  ];
  return (
    <Section>
      <div className="tags">
        {options.map((option, idx) => (
          <ButtonTag
            className={`tag-selectable
              ${
                selectedOptions.length && selectedOptions.includes(option.value)
                  ? "tag-selected"
                  : ""
              }`}
            onClick={handleOption(option.value)}
            label={option.value}
            key={idx}
          >
            {option.value}
          </ButtonTag>
        ))}
      </div>
    </Section>
  );
};

export default Options;
