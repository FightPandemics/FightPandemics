import React from "react";
import styled from "styled-components";

import FilterBox from "../components/FilterBox/FilterBox";
import FilterBoxModal from "../components/FilterBox/FilterBoxModal";

const FeedWraper = styled.div`
  width: 100%;
  padding: 20px 0;
`;

const Feed = () => {
  return (
    <FeedWraper>
      <FilterBox />
      <FilterBoxModal />
    </FeedWraper>
  );
};

export default Feed;
