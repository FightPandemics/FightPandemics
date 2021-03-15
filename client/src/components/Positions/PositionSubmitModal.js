import React, { useState } from "react";
import { Modal } from "antd";
import LinkButton from "components/Button/LinkButton";
import styled from "styled-components";
import { mq, theme } from "constants/theme";
import { Column } from "react-virtualized";
const { lighterBlack } = theme.colors;
const { lightGrey } = theme.colors;
const { display, body } = theme.typography.font.family;


const PositionSubmitModal = styled.section`
  /* padding: 2.5rem 0; */
  display: flex;
  flex-direction: column;
  align-items: center;
  

  h2 {
    font-family: ${display};
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.17;
    text-align: center;
    margin-bottom: 1.4rem;
    color: ${lighterBlack};
  }

  p {
    width: 100%;
    text-align: center;
    font-family: ${body};
    font-size: 1.3rem;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.8rem;
    letter-spacing: normal;
    margin: 0 auto;
    margin-bottom: 3.5rem;
    /* margin-top: -1.4rem; */
    display: flex;
    justify-content: center;
    color: ${lightGrey};
  }

  img {
    padding-bottom: 2rem;
}

button {
    
}

.am-button {
    width: 15.7rem;
    margin: auto;
    margin-bottom: 1rem !important;
    

`;



const StyledCancelButton = styled.button`
  font-size: 1.6rem;
  padding: 0;
  position:absolute;
  border: none;
  background: none;
  button:focus { outline: none; };
  cursor: pointer;
  bottom: 1rem;
  right: 12.6rem;
  color: Blue;
  
`;


const StyledSubmitButton = styled.button`
  font-size: 1.6rem;
  padding: 50rem;
  position:absolute;
  border: none;
  background: none;
  button:focus { outline: none; };
  cursor: pointer;
  bottom: 1rem;
  right: 5rem;
  color: Blue;
`;

// const PositionSubmitModal = ({ getGTM, t, props }) => {

//     // 't' comes from 'AboutUs' scope for translation
//     const [visible, setVisible] = useState(false);
//     const [visibletwo, setVisibleTwo] = useState(false);

//     const handleCancel = async (e) => {
//         setVisible(false);
//     };

//     const showPopUp = async (e) => {

//         setVisible(true);
//     };

//     const handleClick = (e) => {
//         console.log("submit")
//     };
//     const handleCancelTwo = async (e) => {
//         setVisibleTwo(false);
//     };

//     const showPopUpTwo = async (e) => {
//         setVisibleTwo(true);
//     };








//     return (
//         <>
//             <Modal
//                 style={{ border: "3rem" }}
//                 // visible={visibletwo}
//                 // width={564}
//                 // footer={null}
//                 // centered={true}
//                 onCancel={handleCancelTwo}
//             >
//                 <StyledContainer>
//                     <h2>Application Submitted</h2>
//                     <br></br>
//                     <p>Thank you for your interest in orgName. We have received your application and we’ll be in touch with you as soon as possible.</p>
//                     <LinkButton

//                         type="primary"
//                         shape="round"
//                         // onClick={this.close}
//                     >
//                         {"Okay"}
//                     </LinkButton>

//                 </StyledContainer>
//             </Modal>

//         </>
//     );
// };

export default PositionSubmitModal;
