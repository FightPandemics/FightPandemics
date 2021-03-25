import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "constants/theme";
import { useTranslation } from "react-i18next";

const { colors, typography } = theme;
const { royalBlue, black } = colors;

const ViewsRow = styled.div`
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewWrapper = styled.button`
  color: ${(props) => (props.selected ? "royalBlue" : "black")};
  border: none;
  background: transparent;
  font-weight: bold;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.selected ? "3px solid royalBlue" : "none"};
`;

const FacilityView = (props) => {
  const { selectedView, onViewClick } = props;
  const INITIAL_STATE = {
    selectedView: selectedView,
  };
  const [state, setState] = useState(INITIAL_STATE);

  const { t } = useTranslation();

  const viewTypes = [
    { type: "HealthFacilities", label: t("nearestHsp.healthFacilities") },
    { type: "ConfirmedCases", label: t("nearestHsp.confirmedCases") },
  ];

  const toggle = (viewName) => () => {
    setState({ selectedView: viewName });
    onViewClick(viewName);
  };

  const View = ({ selected, label, type }) => {
    return (
      <ViewWrapper selected={selected} onClick={toggle(type)}>
        {label}
      </ViewWrapper>
    );
  };

  return (
    <ViewsRow>
      {viewTypes.map(({ type, label }, idx) => (
        <View
          selected={state.selectedView === type}
          label={label}
          type={type}
          key={idx}
        />
      ))}
    </ViewsRow>
  );
};

export default FacilityView;
