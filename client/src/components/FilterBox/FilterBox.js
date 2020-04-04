import React, { useState } from "react";
import styled from "styled-components";
import FilterOptionButton from "../Button/FilterOptionButton";
import { Modal, List, Button, WhiteSpace, WingBlank, Icon } from "antd-mobile";
import { DARK_GRAY } from "../../constants/colors";

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
  const labels = ["Location", "Provider", "Type", "Looking for"];
  const toggleModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };
  return (
    <FilterBoxWrapper>
      <FilterTitle>Filter by</FilterTitle>
      {labels.map((label, idx) => (
        <FilterOptionButton handleClick={toggleModal} key={idx} label={label} />
      ))}
      <WhiteSpace />
      <Modal
        popup
        visible={modal}
        onClose={toggleModal}
        animationType="slide-up"
        afterClose={() => {
          console.log("afterClose");
        }}
      >
        <List
          renderHeader={() => <div>Placeholder Text</div>}
          className="popup-list"
        >
          {labels.map((i, index) => (
            <List.Item key={index}>{i}</List.Item>
          ))}
          <List.Item>
            <Button type="primary" onClick={toggleModal}>
              Apply Filters
            </Button>
          </List.Item>
        </List>
      </Modal>
    </FilterBoxWrapper>
  );
};
