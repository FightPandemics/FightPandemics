import React from "react";
import styled from "styled-components";
import { mq, theme } from "constants/theme";

const primaryColor = theme?.colors?.royalBlue;
const whiteColor = theme?.colors?.offWhite;

const ThanksButton= styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 38px;

position: absolute;
width: 152px;
height: 40px;
left: 1083px;
top: 305px;

background: #FFFFFF;

border: 1px solid #425AF2;
box-sizing: border-box;
border-radius: 46px;
width: 152px;
height: 40px;
top: 305px;
left: 1083px;
radius: 46px;
padding: 8px, 38px, 8px, 38px;
cursor: pointer;

@media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
 `

const ThankButton = () => {
    return(
        <>
        <ThanksButton>♡Thanks</ThanksButton>
        </>
    )
}

export default ThankButton



// import { Modal, Button } from "antd";
// import styled from "styled-components";
// import { mq, theme } from "constants/theme";

// const primaryColor = theme?.colors?.royalBlue;
// const whiteColor = theme?.colors?.offWhite;

// export const ThankButton= styled.div`
// cursor: pointer;
// :hover {
//   color: #939393;
// }

// svg {
//   position: relative;
//   top: 0.28rem;
// }
// span {
//   position: relative;
//   left: 0.7rem;
//   font-size: 1.8rem;
//   color: ${primaryColor};
//   font-weight: 500;
//   @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
//     display: none;
//   }
//   img{
//     @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
//       width: 25px;
//     }
//   }
// }


// img,
// span {
//   pointer-events: none;
// }

// ${(props) =>
//   props.isFromUserCard
//     ? `
//   margin-left: 7.4rem;
// `
//     : ""}

// ${(props) =>
//   props.isFromProfile
//     ? `
//     position: absolute;
//     top: -33px;
//     right: 50px;
//     background: ${whiteColor};
//     border: 0.3rem solid ${primaryColor};
//     box-sizing: border-box;
//     border-radius: 4.6rem;
//     padding: 0.8rem 2.8rem;
   
//     @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
//       justify-content: center;
//       width: auto;
//       height: 55px;
//       position: absolute;
//       top: -23px;
//       right: 50px;
//       background: ${whiteColor};
//       border: none;
//       box-shadow: 3px 3px 3px lightgrey;
//     }
//   }
//     `
//     : ""}
//     `