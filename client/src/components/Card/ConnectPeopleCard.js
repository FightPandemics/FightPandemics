import React from 'react';
import { Row, Col, Card, Divider } from 'antd';
import styled from "styled-components";
import ConnectImage from "assets/about-us-images/weConnectPeople.png";

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const StyledContainer = styled.section`
  width: 440px;
  height: 66px;
  font-family: Poppins;
  font-size: 44px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  margin-right: 123px;
  margin-left: 102.4px;
  margin-top: 90px;
  margin-bottom: 10px;
  color: var(--color-primary-text);
`;

const StyledContainer1 = styled.section`
width: 435px;
height: 60px;
font-family: Poppins;
font-size: 20px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.5;
letter-spacing: normal;
margin-right: 128px;
margin-left: 102.4px;
margin-bottom: 220px;
margin-top: 20px;
color: var(--color-primary-text);
`;

const ConnectCard = () => {

    return(
        <>   
        <Row justify="space-around" align="middle">
          <Col span={4}>
            <DemoBox value={100}>
            <Card  
              bordered={false}        
              style={{ width: 266.6}}
              cover={<img alt="example" src={ConnectImage} 
              style={{ width: "266.6px", height:"467.1px","object-fit": "contain",
              "margin-left": "125px","margin-bottom": "150px","margin-top": "100px"}}
              />}
            >
            </Card>
            </DemoBox>
          </Col>
          <Col span={10}>
            <DemoBox value={50}>
            <StyledContainer>
              We connect people
            </StyledContainer>
            <StyledContainer1>
              An altruistic platform to
             connect those who need help with those who can provide it.
             </StyledContainer1>
             </DemoBox>
          </Col>  
        </Row>
      </>
    )  
};

export default ConnectCard;
