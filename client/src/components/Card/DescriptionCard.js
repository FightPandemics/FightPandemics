import React from "react";
import styled from "styled-components";

import { Card, WhiteSpace } from "antd-mobile";

import { theme } from "constants/theme";

const { colors, typography } = theme;
const {
  primary,
  orangeRed,
  mintGreen,
  lightGray,
  lighterGray,
  darkerGray,
} = colors;
const { medium, large } = typography.size;

const HospitalCard = styled(Card)`
  border: 1px solid ${lightGray};
  transition: all 0.3s;
  padding: 1rem;
  border-radius: 2px;
  &:hover {
    background-color: ${lighterGray};
  }
  .am-card-header {
    margin-right: 0;
  }
  .am-card-header-content {
    margin-right: 0;
    font-weight: bold;
    color: ${darkerGray};
    text-transform: uppercase;
    flex-basis: 65%;
  }
  .am-card-body::before {
    display: none !important;
  }
  .am-card-body {
    border-top: 0;
    color: rgba(0, 0, 0, 0.5);
    padding-top: 0;
  }
  .am-card-footer {
    font-weight: bold;
    color: ${primary};
    font-size: ${large};
    margin-right: 0;
  }
  .am-card-header-extra {
    margin-right: 0;
    flex-basis: 30%;
    font-size: ${medium};
  }
  .am-card-footer-content {
    font-weight: 600;
    color: ${primary};
    margin-right: 0;
  }
  .am-card-footer-extra {
    font-size: ${large};
    margin-right: 0;
  }
`;

const openDateStyles = {
  paddingTop: ".8rem",
  fontWeight: "500",
};

const DescriptionCard = (props) => {
  const {
    hospitalName,
    hospitalAddress,
    openDate,
    contactNo,
    distance,
    isOpen,
  } = props;

  return (
    <div>
      <WhiteSpace size="lg" />
      <HospitalCard full>
        <Card.Header
          title={hospitalName}
          extra={
            isOpen ? (
              <span style={{ color: `${mintGreen}` }}>Open now</span>
            ) : (
                <span style={{ color: `${orangeRed}` }}>Closed</span>
              )
          }
        />
        <Card.Body>
          <div>{hospitalAddress}</div>
          <div style={openDateStyles}>{openDate}</div>
        </Card.Body>
        <Card.Footer content={contactNo} extra={distance} />
      </HospitalCard>
    </div>
  );
};

export default DescriptionCard;
