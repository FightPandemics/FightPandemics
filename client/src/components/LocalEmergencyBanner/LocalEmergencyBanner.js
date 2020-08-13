import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "antd-mobile";
import { theme } from "../../constants/theme";
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

  // Shows banner until client closes
  const bannerDisplay = () => {

    if (!displayBanner){
      return <div></div>;
    } else {
      // const countryName = async () => {
      //   const data = await navigator.geolocation.getCurrentPosition(function(position) {
      //       axios.get('http://ws.geonames.org/countryCode', {
      //           lat: position.coords.latitude,
      //           lng: position.coords.longitude,
      //           type: 'JSON'
      //       }, function(result) {
      //           alert(result.countryName);
      //       });
      //   });
      //   console.log('hiiiii')
      //   console.log('country name', data)
      //   return data
      // }
      return (
          <LocalEmergencyBannerStyle>

          <div className="localEmergencyNumber">
            <span>Local Emergency Number</span>
            <br />
            <span>911</span>
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
