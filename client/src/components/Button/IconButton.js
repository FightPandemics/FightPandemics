import React from "react";
import styled from "styled-components";

import SubmitButton from "./SubmitButton";
import { theme } from "../../constants/theme";
const { button, colors } = theme;

const IconButton = styled(SubmitButton).attrs()`
  ${button.iconAndText}

  &::before {
    display: none;
  }
  span {
    flex: 0;
    color: ${colors.darkGray};
    /* width: 100%; */
  }
`;

export default (props) => {
  const { icon, title } = props;
  console.log(props);

  return <IconButton icon={icon} title={title} />;
};
