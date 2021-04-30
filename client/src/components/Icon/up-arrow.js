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
  img {transform: rotate(180deg) !important}
  width: fit-content;
  position: fixed;
  right: 20%;
  bottom: 3rem;
  z-index: 5;
  transition: all .1s ease;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) { 
    display: unset;
  } 
`;



const UpArrow = ({ activate }) => {



  // const arrowPosition = window.innerHeight - objDiv
  const [isScrollBottom, setScrollBottom] = useState(false)

  const [positionBottom, setPositionBottom] = useState()

  window.onscroll = function (ev) {
    const scrollHeight = document.body.scrollHeight
    const innerHeight = window.innerHeight
    const listBottom = document.getElementById('profile-list').getBoundingClientRect().bottom
    setPositionBottom(innerHeight - listBottom)

    if ((window.scrollY * .85) > innerHeight) {
      // (document.body.offsetHeight)) {
      setScrollBottom(true)
    }
    else {
      setScrollBottom(false)
    }
  };

  return (
    <div>
      <ArrowContainer
        id="arrow"
        style={
          isScrollBottom ? { bottom: "10rem" } : { bottom: "3rem" } &&
            activate == true ? { opacity: "1" } : { opacity: "0" }}
      >
        <DownArrow />
      </ArrowContainer>
    </div >
  )
}

export default UpArrow;
