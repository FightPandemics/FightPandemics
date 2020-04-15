import React from "react";
import styled from "styled-components";
import FilterTag from "./FilterTag";
import { DARK_GRAY } from "../../constants/colors";

const AddTagsWrapper = styled.div`
  font-family: "Poppins";
  margin-top: 1.5rem;
  margin-bottom: 3rem;

  .am-tag {
    margin: 0.5rem 0;
    margin-right: 0.5rem;
    border: 0.1rem solid ${DARK_GRAY} !important;
    color: ${DARK_GRAY};
  }

  p {
    font-size: 1.1rem;
    color: black;
    font-weight: bold;
  }
`;

export default ({ filters }) => {
  return (
    <AddTagsWrapper>
      <p>Add tags to make your post more visible</p>
      {filters.map((filter, idx) => (
        <FilterTag label={filter} key={idx} />
      ))}
    </AddTagsWrapper>
  );
};
