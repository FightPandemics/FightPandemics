import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ButtonTag from "./ButtonTag";

const AddTagsWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 3rem;

  .tags-info {
    font-size: 1.1rem;
    color: black;
  }

  .tags-selector {
    margin-right: -0.3rem;
    margin-left: -0.3rem;
  }
`;

const AddTags = ({ filters, addTag, selected = [] }) => {
  const { t } = useTranslation();
  return (
    <AddTagsWrapper>
      <p className="tags-info">{t("post.addTags")}</p>
      <div className="tags-selector">
        {filters.map(({ text, value }, idx) => (
          <ButtonTag
            className={
              "tag-selectable " +
              (selected.length && selected.includes(value)
                ? "tag-selected"
                : "")
            }
            onClick={addTag(value)}
            label={value}
            key={idx}
          >
            {text}
          </ButtonTag>
        ))}
      </div>
    </AddTagsWrapper>
  );
};

export default AddTags;
