// Core
import React from "react";
import styled from "styled-components";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import PostRemoval from "assets/icons/post-removal.svg";
import PostApproval from "assets/icons/post-approval.svg";
import EyeIcon from "assets/icons/eye-mask.svg";
// Constants
import { theme, mq } from "constants/theme";

const { colors, typography } = theme;
const { darkGray } = colors;
const { medium } = typography.size;

const StyledSvg = styled(SvgIcon)`
  pointer-events: none;
`;

const StyledSpan = styled.span`
  pointer-events: none;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

const StyledPostActions = styled.div`
  margin-bottom: 2rem;
  padding: 2rem 2rem 0rem 2rem;
  overflow-wrap: break-word;
  span {
    width: 1rem;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    span {
      width: 3rem;
    }
  }
  .social-icon {
    color: ${darkGray};
    cursor: pointer;

    .social-icon-svg {
      margin-right: 0.5rem;
      padding: 0.2rem 0 0.2rem 0;
    }

    span {
      font-size: ${medium};
    }
  }
`;

const PostActions = ({
  setCallReport,
  setForModerator,
  isEnabled,
  canRestore,
}) => {
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
  return (
    <StyledPostActions className="social-icons">
      {isEnabled ? (
        renderActionIcons
      ) : (
        <>
          {!canRestore && (
            <div className="social-icon" style={{ cursor: "initial" }}>
              <StyledSvg src={EyeIcon} className="social-icon-svg" />
              <StyledSpan>Read Only</StyledSpan>
            </div>
          )}
        </>
      )}
      {canRestore && (
        <div className="social-icon" onClick={callModal(false, true)}>
          <StyledSvg src={PostApproval} className="social-icon-svg" />
          <StyledSpan>Restore Post</StyledSpan>
        </div>
      )}
    </StyledPostActions>
  );
};

export default PostActions;
