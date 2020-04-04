import React from "react";
import styled from "styled-components";

import FilterBox from "../components/FilterBox/FilterBox";

const FeedWraper = styled.div`
  width: 100%;
  padding: 20px 0;
`;

const Feed = () => {
  return (
    <FeedWraper>
      <FilterBox />
    </FeedWraper>
  );
};

export default Feed;
