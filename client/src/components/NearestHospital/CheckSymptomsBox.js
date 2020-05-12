import React from 'react';
import styled from "styled-components";
import SubmitButton from "../Button/SubmitButton";

const checkSymptoms = props => {

  const CheckSymptomsBox = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      border: 1px solid rgba(156, 155, 155, 0.27);
      box-sizing: border-box;
      border-radius: 2px;
      padding: 2rem;
      p {
        flex-basis: 50%;
      }
  `;


return (
  <CheckSymptomsBox>
     <p>Evaluate your health and receive instructions and recommendations about COVID-19</p>
     <div style={{ flexBasis: '40%' }}>
     <SubmitButton primary="true">Check Symptoms</SubmitButton>
     </div>
  </CheckSymptomsBox>
)

}

export default checkSymptoms;
