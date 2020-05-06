import React from "react";
import styled from "styled-components";
import FilterTag from "./FilterTag";
import { DARK_GRAY, ROYAL_BLUE } from "../../constants/colors";

const AddTagsWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 3rem;

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
