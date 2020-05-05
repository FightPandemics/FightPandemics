import React from "react";
import styled from "styled-components";
import FilterTag from "./FilterTag";
import { DARK_GRAY, ROYAL_BLUE } from "../../constants/colors";

const AddTagsWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 3rem;

  .am-tag {
    margin: 0.5rem 0;
    margin-right: 0.5rem;
    border: 0.1rem solid ${DARK_GRAY} !important;
    color: ${DARK_GRAY};
  }

  .am-tag-active,
  .am-tag-disabled {
    border: 0.1rem solid ${ROYAL_BLUE} !important;
    background-color: #fff !important;
    color: ${ROYAL_BLUE} !important;
  }

  p {
    font-family: "Poppins";
    font-size: 1.1rem;
    color: black;
  }
`;

const AddTags = ({ filters, addTag }) => {
  return (
    <AddTagsWrapper>
      <p>Add tags to make your post more visible</p>
      {filters.map((filter, idx) => (
        <FilterTag handleClick={addTag(filter)} label={filter} key={idx} />
      ))}
    </AddTagsWrapper>
  );
};

export default AddTags;
