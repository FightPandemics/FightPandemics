import React from "react";
import styled from "styled-components";
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
  return (
    <AddTagsWrapper>
      <p className="tags-info">Add tags to make your post more visible</p>
      <div className="tags-selector">
      {filters.map((filter, idx) => (
        <ButtonTag
          className={
            "tag-selectable " +
            (selected.length && selected.includes(filter) ? "tag-selected" : "")
          }
          onClick={addTag(filter)}
          label={filter}
          key={idx}
        >
          {filter}
        </ButtonTag>
      ))}
      </div>
    </AddTagsWrapper>
  );
};

export default AddTags;
