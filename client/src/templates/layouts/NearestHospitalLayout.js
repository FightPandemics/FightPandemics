import React from "react";
import styled from "styled-components";

import SubmitButton from "~/components/Button/SubmitButton";
import Sidebar from "~/components/NearestHospital/HospitalSidebar";
import CheckSymptomsBox from "~/components/NearestHospital/CheckSymptomsBox";
import { Tabs } from 'antd-mobile';
import { NavLink } from 'react-router-dom';
import { theme, mq } from "../../constants/theme";
const { colors } = theme;
const { primary } = colors;


const NearestHospitalLayout = props => {


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
  `;

  const NearestHospitalContentBox = styled.div`
       flex: 1;
       min-height: 100vh;
       padding: 5rem;
       @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
         padding: 0;
       }
  `;

  const ContentDesktop = styled.div`
      display: block;
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        display: none;
      }
  `;

const StyledTabs = styled(Tabs)`
    display: none;
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      display: block;
    }
`;

  const navigation = [
    { title: <NavLink to="/nearest-hospital">Health Facilities</NavLink> },
    { title: <NavLink to="/confirmed-cases">Confirmed Cases</NavLink> }
  ];



  return (
    <NearestHospitalContainer>

       <NearestHospitalSideBar>
          <Sidebar />
       </NearestHospitalSideBar>

       <NearestHospitalContentBox>

           <ContentDesktop>
             <CheckSymptomsBox />
             {props.children}
           </ContentDesktop>
       </NearestHospitalContentBox>

    </NearestHospitalContainer>
  );
};

export default NearestHospitalLayout;
