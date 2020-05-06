import { mq, theme } from "../../constants/theme";

import React from "react";
import SubmitButton from "./SubmitButton";
import styled from "styled-components";

const { button, colors } = theme;

const IconButton = styled(SubmitButton).attrs((props) => {
    return {
        icon: props.icon,
    };
})`
  ${button.iconAndText}

  &::before {
    display: none;

    @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
      display: none !important;
    }
  }
  span {
    flex: 0;
    color: ${colors.darkGray};
    /* width: 100%; */
  }
`;

export default IconButton;
