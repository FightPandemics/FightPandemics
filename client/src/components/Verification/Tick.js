import React from "react";
import styled from "styled-components";
import { Tooltip } from "antd";
import { theme, mq } from "constants/theme";
import { ReactComponent as TickSvg } from "assets/verification/tick.svg";

const { colors } = theme;

const Tick = styled(TickSvg)`
  margin-left: 1rem;
  position: relative;
  top: 0.1rem;
  @media screen and (max-width: ${mq.tablet.wide.maxWidth}) {
    top: 0.2rem;
  }
`;

function VerificationTick() {
  return (
    <Tooltip
      placement="right"
      color={colors.darkGray}
      title={"Verified by Veriff"}
    >
      <Tick className={"verification-tick"} />
    </Tooltip>
  );
}

export default VerificationTick;
