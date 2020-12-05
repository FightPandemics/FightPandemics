// Core
import React from "react";
import styled from "styled-components";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import PostRemoval from "assets/icons/post-removal.svg";
import PostApproval from "assets/icons/post-approval.svg";

// Constants
import { mq } from "constants/theme";

const StyledSvg = styled(SvgIcon)`
  pointer-events: none;
`;

const StyledSpan = styled.span`
  pointer-events: none;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

const PostActions = ({ setCallReport, setForModerator }) => {
  const callModal = (remove, keep) => () => {
    setForModerator({ remove, keep });
    setCallReport(true);
  };
  const renderActionIcons = (
    <>
      <div className="social-icon" onClick={callModal(true, false)}>
        <StyledSvg src={PostRemoval} className="social-icon-svg" />
        <StyledSpan>Remove Post</StyledSpan>
      </div>

      <span></span>

      <div className="social-icon" onClick={callModal(false, true)}>
        <StyledSvg src={PostApproval} className="social-icon-svg" />
        <StyledSpan>Keep Post</StyledSpan>
      </div>

      <span></span>
    </>
  );
  return <div className="social-icons">{renderActionIcons}</div>;
};

export default PostActions;
