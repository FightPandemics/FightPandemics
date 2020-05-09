import React from 'react';
import styled from "styled-components";

import NearestHospitalLayout from "~/templates/layouts/NearestHospitalLayout";


const NearestHealthFacilities = props => {


  const ConfirmedCasesContainer = styled.div`
      display: flex;
      align-items: center;
  `;



  return (
    <NearestHospitalLayout>
        <ConfirmedCasesContainer>
          <h3>Confirmed Cases</h3>
        </ConfirmedCasesContainer>
    </NearestHospitalLayout>
  )
}

export default NearestHealthFacilities;
