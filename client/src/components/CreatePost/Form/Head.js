import React from "react";
import { Title, Badge, HeadWrapper } from "../StyledModal";

const Head = ({ number, title }) => {
  return (
    <HeadWrapper>
      <Badge>
        <span>{number}</span>
      </Badge>
      <Title>{title}</Title>
    </HeadWrapper>
  );
};

export default Head;
