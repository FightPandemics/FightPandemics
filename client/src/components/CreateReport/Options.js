import React from "react";
import { useTranslation } from "react-i18next";
import ButtonTag from "components/Tag/ButtonTag";
import { Section } from "components/CreatePost/StyledModal";

const Options = ({ handleOption, selectedOptions }) => {
  const { t } = useTranslation();
  const options = [
    {
      stateKey: "Spam",
      value: "moderation.spam",
    },
    {
      stateKey: "Inappropriate Content",
      value: "moderation.inappropriateContent",
    },
    {
      stateKey: "Violates Terms",
      value: "moderation.violatesTerms",
    },
    {
      stateKey: "Other",
      value: "moderation.other",
    },
  ];
  return (
    <Section>
      <div className="tags">
        {options.map((option, idx) => (
          <ButtonTag
            className={`tag-selectable
              ${
                selectedOptions.length &&
                selectedOptions.includes(option.stateKey)
                  ? "tag-selected"
                  : ""
              }`}
            onClick={handleOption(option.stateKey)}
            label={t(option.value)}
            key={idx}
          >
            {t(option.value)}
          </ButtonTag>
        ))}
      </div>
    </Section>
  );
};

export default Options;
