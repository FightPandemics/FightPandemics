import Loader from "components/Feed/StyledLoader";
import ProfileListItem from "components/Profile/ProfileListItem";
import { mq } from "constants/theme";
import React, { useCallback, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  InfiniteLoader,
  AutoSizer,
  WindowScroller,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import { List as AntList } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "constants/theme";
// import UpArrow from "../../components/Icon/up-arrow.js";
import BaseButton from "components/Button/BaseButton";

const { colors } = theme;

const ListContainer = styled.div`
  /* background-color: ${colors.white}; */
  /* border-radius: 1.2rem; */
  overflow: hidden;
  /* margin-top: 0.3rem; */
  /* box-shadow: 0 0 20px 0 ${colors.shadowBlack}; */
  .ant-list-empty-text {
     display: none;
  }

`;

const HorizontalRule = styled.hr`
  display: none;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    border: 0;
    height: 0;
    display: block;
    max-width: 325px;
  }
`;

const cellMeasurerCache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100,
});

const SeeAllLink = styled.div`
  display: none;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 3rem;
    color: ${colors.royalBlue};
    font-size: 1.4rem;
    font-weight: normal;
    text-align: center;
  }
`;


const LoadMoreButton = styled.div`
  color: ${colors.royalBlue};
  justify-self: center;
  text-align: center;
  margin: auto;
  width: fit-content;
  :hover {
    cursor: pointer !important;
   }
`;

const ItemContainer = styled.div`
.ant-list-item a{
  width: 100%;
}

`;

const ProfileList = ({
  filteredApplicants,
  filteredMembers,
  filteredOrgs,
  user,
  loadNextPage,
  isNextPageLoading,
  itemCount,
  isItemLoaded,
  hasNextPage,
  totalCount,
  organisationId,
  isOwner,
  isMember,
  isAdmin,
  isWiki,
  isVolunteer,
  activeTab,
  emptyFeed,
  listInitialized,
  isSelf
}) => {

  const items = Object.entries(filteredOrgs);
  const loadMoreItems = isNextPageLoading ? () => {
  } : loadNextPage;
  const [seeAll, setSeeAll] = useState(false);
  const log = (e) => {
    console.log(e)
  }
  const windowWidth = window.innerWidth;
  return (
    <>
      {
        <ListContainer>
          <AntList
            itemLayout="horizontal"
            loadMore={
              items.length >= totalCount ? null :
              <LoadMoreButton onClick={loadNextPage}>
                Load More
                </LoadMoreButton>
            }
            dataSource={items}
            renderItem={item => (
              <ItemContainer>
                <AntList.Item
                >
                  <ProfileListItem
                    style={{ width: "100%", display: "flex" }}
                    item={item[1]}
                    isOwner={isOwner}
                    isSelf={isSelf}
                  />
                </AntList.Item>
              </ItemContainer>
            )}
          />
        </ListContainer>
      }
    </>
  )
};

export default ProfileList;
