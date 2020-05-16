import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "antd";
import { theme } from "constants/theme";
import SvgIcon from "../Icon/SvgIcon";
import closeButton from "assets/icons/close-btn.svg";

const { colors, typography } = theme;

const Container = styled(Modal)`
  font-family: ${typography.font.family.display};
  font-size: ${typography.size.medium};
  font-weight: 600;
  line-height: 2.2rem;
  .ant-modal-content {
    width: 56.4rem;
    border-radius: 1.0rem;
  }

  .ant-modal-header {
    height: 5.8rem;
    border-radius: 1.0rem 1.0rem 0 0;
    
    div {
      font-size: ${typography.size.xlarge};
      font-weight: bold; 
      line-height: 116.8%;
    }
  }
  
  .ant-modal-body {
    padding: 3.8rem 4.0rem 4.7rem 4.0rem;
  }
  
  .ant-col {
    &:hover > a > div {
      background-color: ${colors.royalBlue};
      p {
        color: ${colors.white};
      }
      
      .icon {
        filter: brightness(4);     
      }
    }
  
    p {
      position: absolute;
      top: 9.7rem;
      left: 50%;
      transform: translate(-50%, 0);
      color: ${colors.royalBlue};
    }
  }
  
  .icon {
    position: absolute;
    top: 4.6rem;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;


const Option = ({ img, text, path }) => (
  <Link to={path}>
    <div
      style={{
        position: "relative",
        height: "17.2rem",
        border: `0.2rem solid ${colors.royalBlue}`,
        borderRadius: "0.8rem"
      }}
    >
      <SvgIcon src={img} className="icon" />
      <p>{text}</p>
    </div>
  </Link>
);

const CloseButton = <SvgIcon src={closeButton} style={{ position: 'absolute', right: '4.0rem', top: '1.7rem', filter: 'brightness(0.6)' }} />;

export {
  Container,
  Option,
  CloseButton,
};
