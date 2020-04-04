import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Accordion, Button } from "antd-mobile";
import { DARK_GRAY } from "../../constants/colors";
import FilterOptionButton from "../Button/FilterOptionButton";
import FilterTag from "../Tag/FilterTag";
import filterOptions from "../../assets/data/filterOptions";
import FilterAccordion from "../Accordion/FilterAccordion";

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
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <FilterBoxWrapper>
      <FilterTitle>Filter by</FilterTitle>
      {Object.values(filterOptions).map((filter, idx) => (
        <FilterOptionButton
          handleClick={openModal(filter.label)}
          key={idx}
          label={filter.label}
          icon={true}
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
        <Accordion className="my-accordion" onChange={onChange}>
          {Object.values(filterOptions).map((filter) => (
            <FilterAccordion header={filter.label}>
              <div style={{ margin: "10px 15px", textAlign: "center" }}>
                {Object.values(filter.options).map((option) => (
                  <FilterTag label={option} />
                ))}
              </div>
            </FilterAccordion>
          ))}
        </Accordion>
      </Modal>
    </FilterBoxWrapper>
  );
};
