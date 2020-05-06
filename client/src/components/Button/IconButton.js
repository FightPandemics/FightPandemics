import { mq, theme } from "../../constants/theme";

import React from "react";
import SubmitButton from "./SubmitButton";
import styled from "styled-components";

const { button, colors } = theme;

const IconBtn = styled(SubmitButton).attrs()`
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

const IconButton = (props) => {
  const { icon, title } = props;

  return <IconBtn icon={icon} title={title} />;
};

export default IconButton;
