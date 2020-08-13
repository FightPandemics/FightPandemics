import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "antd-mobile";
import { theme } from "../../constants/theme";
import localEmergencyData from './localEmergencyData';
import axios from "axios"

const { typography, colors } = theme;

const LocalEmergencyBannerStyle = styled.div`
  display: flex;
  justify-content: center;
  background: ${colors.red};
  color: ${colors.white};
  textAlign: ${typography.paragraph};
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
`;

const LocalEmergencyBanner = () => {
  const [displayBanner, setDisplayBanner] = useState(true);
  const [localEmergencyNumber, setLocalEmergencyNumber] = useState("")

  // Shows banner until client closes
  const bannerDisplay = () => {

    if (!displayBanner){
      return <div></div>;
    } else {
        axios.get('https://extreme-ip-lookup.com/json/')
          .then(ipInfo => {
            let localData = localEmergencyData.filter(location => {
              if(location.Country.includes(ipInfo.data.country)){
                return location.Ambulance;
              }
            })
            return localData[0];
          })
          .then(emergencyNumber => {
            setLocalEmergencyNumber(emergencyNumber.Ambulance);
          })
          .catch(() => {
            setLocalEmergencyNumber('Cannot location unavailable')
          })

      return (
          <LocalEmergencyBannerStyle>

          <div className="localEmergencyNumber">
            <span>Local Emergency Number</span>
            <br />
            <span>{localEmergencyNumber}</span>
          </div>
          
          <div className="close">
            <button onClick={() => setDisplayBanner(!displayBanner)}>
              <Icon type="cross" size="lg" />
            </button>
          </div>

          </LocalEmergencyBannerStyle>
      );
    };
  };
  return (
    <div>
      {bannerDisplay()}
    </div>
  );
};

export default LocalEmergencyBanner;
