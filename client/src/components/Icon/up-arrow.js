import styled from "styled-components";
import React, { useState } from "react";
import { mq } from "constants/theme";
import DownArrowIcon from "../../assets/icons/down-arrow.svg";
import SvgIcon from "./SvgIcon";




const DownArrow = styled(SvgIcon).attrs((props) => ({
  src: DownArrowIcon,

}))`
`;

const ArrowContainer = styled.div`
  /* display: none; */
  img {transform: rotate(180deg) !important}
  width: fit-content;
  position: fixed;
  right: 20%;
  bottom: 3rem;
  z-index: 5;
  transition: all .35s ease;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) { 
    display: unset;
  } 
`;

const UpArrow = ({ activate }) => {


  const [isScrollBottom, setScrollBottom] = useState(false)
  console.log(window.innerHeight)
  window.onscroll = function (ev) {
    if (window.scrollY >= (document.body.offsetHeight * .7)) {
      setScrollBottom(true)
    }
    else {
      setScrollBottom(false)
    }
    console.log(isScrollBottom)
  };

  return (
    <div>
      <ArrowContainer
        id="arrow"
        style={
          isScrollBottom ? { bottom: "20rem" } : { bottom: "3rem" } &&
            activate == true ? { opacity: "1" } : { opacity: "0" }}
      >
        <DownArrow />
      </ArrowContainer>
    </div >
  )
}

export default UpArrow;
