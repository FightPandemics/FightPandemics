import React, {useState} from "react";
import { Modal, Button } from "antd";
import LinkButton from "./LinkButton";
import PopUpButton from "./PopUpButton";
import styled from "styled-components";

const StyledContainer = styled.section`
height: 28px;
font-family: Poppins;
font-size: 24px;
font-weight: 600;
font-stretch: normal;
font-style: normal;
line-height: 1.17;
letter-spacing: normal;
color: #1e1e1e;
margin: 0 auto;
display: flex;
justify-content: center;
`;

const StyledContainer1 = styled.section`
height: 28px;
font-family: Poppins;
font-size: 24px;
font-weight: 600;
font-stretch: normal;
font-style: normal;
line-height: 1.17;
letter-spacing: normal;
color: #1e1e1e;
margin: 0 auto;
display: flex;
justify-content: center;
margin-top: 60px;
`;

const StyledContainer2 = styled.section`
  width: 304px;
  height: 25px;
  font-family: WorkSans;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #1e1e1e;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-top: 7.7px;
`;

const GetInvolvedButton = () => {
    const [visible, setVisible] = useState(false);

    const handleCancel = async (e) => {
        setVisible(false);
    };

    const showPopUp = async (e) => {
        setVisible(true);
    };

    return (
        <>
        <LinkButton type="primary" shape="round" onClick={showPopUp}>
        Get Involved
        </LinkButton>
        <Modal
        visible={visible}
        width={564}
        footer={null}
        centered={true}
        onCancel={handleCancel}
        style={{"height": "544px",
                "max-width": "100%",
                "max-height": "100%",           
                "border-radius": "10px"
               }}
        bodyStyle={{"padding-bottom" : "56px", "padding-top": "56px",}}
        >
        <StyledContainer>Get Involved</StyledContainer>
        <PopUpButton type="primary" shape="round"
        href="https://apply.workable.com/fightpandemics" target="_blank">
        Join as Volunteer
        </PopUpButton>
        <PopUpButton type="primary" shape="round" href="https://apply.workable.com/fightpandemics/j/46D6EF3B44/" target="_blank">
        Join as Ambassador
        </PopUpButton>
         <StyledContainer1>
        <p>Student Summer Program</p>
        </StyledContainer1>
        <StyledContainer2>
        <p>For Students ages 14-18.</p>
        </StyledContainer2>
        <PopUpButton type="primary" shape="round" href="https://apply.workable.com/fightpandemics/j/58B157AAB2/" target="_blank">
        Join Student Program
        </PopUpButton>
        </Modal>
        </>
        );

};

export default GetInvolvedButton;