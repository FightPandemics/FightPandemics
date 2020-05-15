import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Sidebar from "../../components/NearestHospital/HospitalSidebar";
import ConfirmedCases from "../../components/NearestHospital/ConfirmedCases";
import CheckSymptomsBox from "../../components/NearestHospital/CheckSymptomsBox";
import LocalEmergencyNumber from "../../components/NearestHospital/LocalEmergencyNumber";
import { withRouter } from 'react-router-dom';
import { mq } from "../../constants/theme";



  const NearestHospitalContainer = styled.div`
      width: 100%;
      min-height: 100vh;
      background-color: #FBFBFD;
      display: flex;
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        display: block;
      }
  `;

  const NearestHospitalSideBar = styled.div`
       flex-basis: 25%;
       background-color: #fff;
       min-height: 100vh;
       padding-right: 3.5rem;
       @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
         display: none;
       }
       @media screen and (max-width: ${mq.tablet.wide.maxWidth}) {
         padding-right: 1rem;
       }
  `;

  const NearestHospitalContentBox = styled.div`
       flex: 1;
       min-height: 100vh;
       padding: 5rem;
       @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
         padding: 0;
       }

  `;


const NearestHospitalLayout = props => {

  const [ isMobile, setMediaQuery ] = useState(false);

 useEffect(() => {
   const mediaQuery = window.matchMedia('(max-width: 767px)');;
   setMediaQuery(mediaQuery.matches);
   const listenerFunc = (query) => {
      setMediaQuery(query.currentTarget.matches);
   };
   window.matchMedia(mq.phone.wide.max).addListener(listenerFunc);

  }, [])


const renderChildComponents = () => {
  if(isMobile) {
    return (
      <div>
         {props.children}
      </div>
    )
  } else {
      return (
        <div>
          <CheckSymptomsBox />
         {props.children}
       </div>
      )
    }
  }


  return (
    <NearestHospitalContainer>

       <NearestHospitalSideBar>
          <Sidebar />
       </NearestHospitalSideBar>

       <NearestHospitalContentBox>
          {renderChildComponents()}
       </NearestHospitalContentBox>

    </NearestHospitalContainer>
  )
}

export default withRouter(NearestHospitalLayout);
