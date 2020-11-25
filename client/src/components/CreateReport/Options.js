import React from "react";
import ButtonTag from "components/Tag/ButtonTag";
import { Section } from "components/CreatePost/StyledModal";

const options = ["Spam", "Inappropriate Content", "Violates Terms", "Other"];
const Options = ({ handleOption, selectedOptions }) => (
  <Section>
    <div className="tags">
      {options.map((text, idx) => (
        <ButtonTag
          className={`tag-selectable
              ${
                selectedOptions.length && selectedOptions.includes(text)
                  ? "tag-selected"
                  : ""
              }`}
          onClick={handleOption(text)}
          label={text}
          key={idx}
        >
          {text}
        </ButtonTag>
      ))}
    </div>
  </Section>
);

export default Options;
