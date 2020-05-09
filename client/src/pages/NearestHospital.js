import React from 'react';
import styled from "styled-components";
import { mq } from '../constants/theme';

import NrMap from "./NrMap";
import HospitalCard from "~/components/NearestHospital/HospitalCard";
import NearestHospitalLayout from "~/templates/layouts/NearestHospitalLayout";

const NearestHealthFacilities = props => {


   const HealthFacilitiesData = [
       {
         id: 1,
         hospitalName: "United hospital",
         hospitalAddress: "9915 Saddle Dr Undefined San Fancisco , Washinton United State",
         openDate: "Open Mon - Fri 09:00 to 22:00",
         contactNo: "(704) 555.0126",
         distance: "3km",
         isOpen: true
       },
       {
         id: 2,
         hospitalName: "United hospital",
         hospitalAddress: "9915 Saddle Dr Undefined San Fancisco , Washinton United State",
         openDate: "Open Mon - Fri 09:00 to 22:00",
         contactNo: "(234) 712.191.531",
         distance: "4.3km",
         isOpen: false
       },
       {
         id: 3,
         hospitalName: "United hospital",
         hospitalAddress: "9915 Saddle Dr Undefined San Fancisco , Washinton United State",
         openDate: "Open Mon - Fri 09:00 to 22:00",
         contactNo: "(704) 555.0126",
         distance: "6km",
         isOpen: false
       },
       {
         id: 4,
         hospitalName: "United hospital",
         hospitalAddress: "9915 Saddle Dr Undefined San Fancisco , Washinton United State",
         openDate: "Open Mon - Fri 06:00 to 22:00",
         contactNo: "(704) 555.0126",
         distance: "12km",
         isOpen: true
       }
     ]


  const NearestLocationContainer = styled.div`
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        display: block;
      }
  `;

  const NearestHealthFacilities = styled.div`
      flex-basis: 55%;
      align-self: flex-start;
      padding-top: 2rem;
      overflow-Y: hidden;
      h2 {
        font-weight: bold;
        color: #282828;
      }
      div {
        margin-right: 2rem;
        @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
          margin-right: 0;
        }
      }

  `;

  const MapContainer = styled.div`
      /* align-self: flex-start; */
      flex: 1;
      div {
        align-self: flex-start;
        height: auto;
      }
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        display: none;
      }
  `;

  return (
    <NearestHospitalLayout>
        <NearestLocationContainer>
          <NearestHealthFacilities>
             <h2>Your nearest health facilities</h2>

             {HealthFacilitiesData.map(data => (
               <HospitalCard
                 key={data.id}
                 hospitalName={data.hospitalName}
                 hospitalAddress={data.hospitalAddress}
                 openDate={data.openDate}
                 contactNo={data.contactNo}
                 distance={data.distance}
                 isOpen={data.isOpen}
               />
             ))}

          </NearestHealthFacilities>
            <MapContainer>
               <NrMap />
            </MapContainer>
        </NearestLocationContainer>
    </NearestHospitalLayout>
  )
}

export default NearestHealthFacilities;
