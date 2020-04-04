import React from "react";
import styled from "styled-components";
import { Modal, List, Button, WhiteSpace, WingBlank, Icon } from "antd-mobile";
import FilterOptionButton from "../Button/FilterOptionButton";
import { DARK_GRAY } from "../../constants/colors";

const FilterBoxWrapper = styled.div`
  width: 100%;
`;

const FilterTitle = styled.p`
  margin: 5px;
  color: ${DARK_GRAY};
  font-size: 13px;
`;

export default () => {
  const labels = ["Location", "Provider", "Type", "Looking for"];
  return (
    <FilterBoxWrapper>
      <FilterTitle>Filter by</FilterTitle>
      {labels.map((label, idx) => (
        <FilterOptionButton
          handleClick={() => console.log("clicked")}
          key={idx}
          label={label}
        />
      ))}
    </FilterBoxWrapper>
  );
};
