import React from "react";
import styled from "styled-components";

import { FilterOptionButton } from "../components/Button/FilterOptionButton";

const FeedContainer = styled.div`
  width: 100%;
  padding: 20px 0;
`;

const Feed = () => {
  return (
    <FeedContainer>
      <FilterOptionButton label={"Location"} />
    </FeedContainer>
  );
};

export default Feed;
