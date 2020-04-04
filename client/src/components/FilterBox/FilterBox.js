import React, { useState } from "react";
import styled from "styled-components";
import { Modal, List, Button } from "antd-mobile";
import { DARK_GRAY } from "../../constants/colors";
import FilterOptionButton from "../Button/FilterOptionButton";
import filterOptions from "../../assets/data/filterOptions";

const FilterBoxWrapper = styled.div`
  width: 100%;
`;
const FilterTitle = styled.p`
  color: ${DARK_GRAY};
  margin: 5px;
  font-size: 13px;
`;

export default () => {
  const [modal, setModal] = useState(false);
  const [clickedLabel, setClickedLabel] = useState("");

  const openModal = (label) => (e) => {
    e.preventDefault();
    setModal(true);
    setClickedLabel(label);
  };

  const closeModal = () => {
    setModal(false);
    setClickedLabel("");
  };

  return (
    <FilterBoxWrapper>
      <FilterTitle>Filter by</FilterTitle>
      {Object.values(filterOptions).map((filter, idx) => (
        <FilterOptionButton
          handleClick={openModal(filter.label)}
          key={idx}
          filter={filter}
        />
      ))}
      <Modal
        popup
        visible={modal}
        onClose={closeModal}
        animationType="slide-up"
        afterClose={() => {
          console.log("afterClose");
        }}
      >
        <List
          renderHeader={() => <div>Placeholder Text</div>}
          className="popup-list"
        >
          {Object.values(filterOptions).map((filter, index) => (
            <List.Item key={index}>{filter.label}</List.Item>
          ))}
          <List.Item>
            <Button type="primary" onClick={openModal(clickedLabel)}>
              Apply Filters
            </Button>
          </List.Item>
        </List>
      </Modal>
    </FilterBoxWrapper>
  );
};
