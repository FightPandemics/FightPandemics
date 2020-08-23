import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Icon } from "antd-mobile";
import { theme } from "../../constants/theme";
import localEmergencyData from "./emergency-numbers-by-code";

const { typography, colors } = theme;

const LocalEmergencyBannerStyle = styled.div`
  display: flex;
  justify-content: center;
  background-color: #d1222c;
  color: ${colors.white};
  textalign: ${typography.paragraph};
  & .close {
    align-self: flex-start;
    & button {
      position: relative;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
    }
  }
  .localEmergencyNumber {
    flex: 1 0 auto;
    font-size: ${typography.size};
    justify-content: center;
    align-self: center;
    padding: 10px;
  }
  .emergencyNumberText {
    font-size: 22px;
  }
  .emergencyNumber {
    font-size: 22px;
    font-weight: bold;
  }
`;

const LocalEmergencyBanner = () => {
  const [displayBanner, setDisplayBanner] = useState(true);
  const [localEmergencyNumber, setLocalEmergencyNumber] = useState("");

  // Shows banner until client closes
  if (!displayBanner) return null;

  axios
    .get("https://extreme-ip-lookup.com/json/")
    .then((ipInfo) => {
      let countryCode = localEmergencyData[ipInfo.data.countryCode];
      if (countryCode.Ambulance === 0) {
        return "000";
      } else if (typeof countryCode.Ambulance === "string") {
        let updatedAmbulance = countryCode.Ambulance.replace(/[/]/g, " or ");
        return updatedAmbulance;
      } else {
        return countryCode.Ambulance;
      }
    })
    .then((emergencyNumber) => {
      setLocalEmergencyNumber(emergencyNumber);
    })
    .catch(() => {
      setLocalEmergencyNumber("location unavailable");
    });

  return (
    <LocalEmergencyBannerStyle>
      <div className="localEmergencyNumber">
        <span className="emergencyNumberText">Local Emergency Number</span>
        <br />
        <span className="emergencyNumber">{localEmergencyNumber}</span>
      </div>

      <div className="close">
        <button onClick={() => setDisplayBanner(!displayBanner)}>
          <Icon type="cross" size="lg" />
        </button>
      </div>
    </LocalEmergencyBannerStyle>
  );
};

export default LocalEmergencyBanner;
