import Loader from "components/Feed/StyledLoader";
import ProfileListItem from "components/OrganisationProfile/ProfileListItem";
import { mq } from "constants/theme";
import React, { useCallback, useState } from "react";
import {
  InfiniteLoader,
  AutoSizer,
  WindowScroller,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "constants/theme";
import { TestMemberOfOrgs } from "utils/TestMemberOfOrgs";

const { colors } = theme;

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
});

const SeeAllLink = styled.div`
  display: block;
  color: ${colors.royalBlue};
  font-size: ${theme.typography.size.large};
  font-weight: normal;
  text-align: center;
  margin-top: 3rem;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    font-size: ${theme.typography.size.small};
    margin-top: 2rem;
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
  emptyFeed,
  type,
}) => {
  const applicantsList = filteredApplicants && true;
  const membersList = filteredMembers && true;
  const orgsList = filteredOrgs && true;
  const items = Object.entries(
    filteredApplicants || filteredMembers || filteredOrgs,
  );
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const [seeAll, setSeeAll] = useState(false);
  const handleSeeAll = () => {
    setSeeAll((prevState) => !prevState);
  };
  const windowWidth = window.innerWidth;
  const applicantItem = useCallback(
    ({ key, index, style, parent }) => {
      let content;
      if (!isItemLoaded(index) && hasNextPage) {
        content = <Loader />;
      } else if (items[index]) {
        content = (
          <>
            <HorizontalRule />
            <ProfileListItem
              item={items[index][1]}
              applicantsList={applicantsList}
              membersList={membersList}
              orgList={orgsList}
              type={type}
            />
          </>
        );
      }
      return (
        <CellMeasurer
          key={key}
          cache={cellMeasurerCache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          {({ measure, registerChild }) => (
            <div key={key} ref={registerChild} onLoad={measure} style={style}>
              {content}
            </div>
          )}
        </CellMeasurer>
      );
    },
    [hasNextPage, isItemLoaded, items, user],
  );
  return (
    <div className="activity" style={{ width: "100%", height: "100%" }}>
      {!items.length && isNextPageLoading ? (
        <Loader />
      ) : (
        <WindowScroller>
          {({ height, isScrolling, scrollTop, onChildScroll }) => (
            <InfiniteLoader
              isRowLoaded={isItemLoaded}
              loadMoreRows={loadMoreItems}
              rowCount={totalCount}
              threshold={5}
            >
              {({ onRowsRendered }) => (
                <AutoSizer disableHeight className="autosizer">
                  {({ width }) => (
                    <List
                      autoHeight
                      height={height}
                      width={width}
                      isScrolling={isScrolling}
                      onRowsRendered={onRowsRendered}
                      rowCount={
                        windowWidth > 767 ? itemCount : seeAll ? itemCount : 3
                      }
                      rowHeight={cellMeasurerCache.getHeight()}
                      rowHeight={cellMeasurerCache.rowHeight}
                      deferredMeasurementCache={cellMeasurerCache}
                      rowRenderer={applicantItem}
                      scrollTop={scrollTop}
                      onScroll={onChildScroll}
                      overscanRowCount={1}
                      scrollToAlignment={"start"}
                    />
                  )}
                </AutoSizer>
              )}
            </InfiniteLoader>
          )}
        </WindowScroller>
      )}
      <Link onClick={handleSeeAll}>
        <SeeAllLink>See All</SeeAllLink>
      </Link>
    </div>
  );
};

export default ProfileList;
