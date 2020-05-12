import React from 'react';
import styled from "styled-components";
import { NoticeBar } from 'antd-mobile';

import { theme, mq } from "../../constants/theme";


const { colors } = theme;
const { typography } = theme;
const { xlarge } = typography.size;
const { royalBlue } = colors;


const LocalEmergencyNo = props => {


  const EmergencyLine = styled(NoticeBar)`
       height: auto;
       background-color: #D1222C;
       color: #fff;
       h4 {
         color: #fff;
         margin-bottom: 0;
       }
       h3 {
         color: #fff
       }
      @media screen and (min-width: ${mq.phone.wide.maxWidth}) {

          border: 0.2px solid rgba(185, 185, 185, 0.5);
          padding: 2rem;
          padding-left: 4rem;
          background-color: #fff;
          height: auto;
          .am-notice-bar-operation {
            display: none;
          }
          h4 {
            font-weight: bold;
            color: #000;
          }
          h3 {
            font-weight: bold;
            color: ${royalBlue};
            text-decoration: underline;
            font-size: ${xlarge};
          }

        }

        @media screen and (max-width: ${mq.tablet.wide.maxWidth}) {
          padding: 0;
          padding-left: 0;
        }

  `;


  return (
    <EmergencyLine mode="closable" icon={null}>
       <h4>Local emergency number</h4>
       <h3>911</h3>
    </EmergencyLine>
  )
}


export default LocalEmergencyNo;
