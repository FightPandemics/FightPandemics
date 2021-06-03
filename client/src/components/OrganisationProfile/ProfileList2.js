import Loader from "components/Feed/StyledLoader";
import Applicant from "components/OrganisationProfile/ApplicantOrMember";
import ProfileListItem from "components/OrganisationProfile/ProfileListItem";
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
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "constants/theme";
import UpArrow from "../../components/Icon/up-arrow.js";

const { colors } = theme;

const ListContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 1.2rem;
  overflow: hidden;
  margin-top: 0.3rem;
  box-shadow: 0 0 20px 0 ${colors.shadowBlack};
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
const ProfileList2 = ({
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
}) => {
  // const applicants = Object.entries(filteredApplicants);
  // console.log(JSON.stringify(filteredApplicants))
  const applicantsList = filteredApplicants && true;
  const membersList = filteredMembers && true;
  const orgsList = filteredOrgs && true;
  const items = Object.entries(
    filteredApplicants || filteredMembers || filteredOrgs,
  );
  // const items = Object.entries(filteredApplicants);
  // console.log("items " + items.length)
  const ref = useRef()
  // const scrollIndex = useRef(0);
  const history = useHistory();
  const scrollToIndex = () => {
    if (history?.location?.state) {
      let { keepScrollIndex, keepScroll } = history.location.state;
      if (keepScroll) return keepScrollIndex;
    }
    return -1;
  };
  console.log({ "scrollToIndex Profile List": scrollToIndex })
  // const scrollToTop = async () => window.scrollTo({ top: 0, behavior: "smooth" });
  // console.log({ "SCROLLTOP!!": scrollToTop })
  const loadMoreItems = isNextPageLoading ? () => { } : loadNextPage;
  // const loadMoreItems = isNextPageLoading
  //   ? () => {
  //     if (history?.location?.state) {
  //       const { keepScrollIndex, keepScroll } = history.location.state;
  //       if (keepScroll && scrollIndex.current < keepScrollIndex) {
  //         scrollIndex.current = keepScrollIndex;
  //       } else {
  //         history.location.state.keepScrollIndex = scrollIndex.current;
  //         history.location.state.keepScroll = false;
  //         history.location.state.keepPostsState = undefined;
  //         history.location.state.keepPageState = undefined;
  //       }
  //     }
  //   }
  //   : loadNextPage;

  const [seeAll, setSeeAll] = useState(false);
  const log = (e) => {
    console.log(e)
  }
  // useEffect(() => {
  //   cellMeasurerCache.clearAll()
  // }, [activeTab])

  // console.log({ "cell measurer": cellMeasurerCache })
  const handleSeeAll = () => {
    setSeeAll((prevState) => !prevState);
  };
  // console.log({ "total count": totalCount })
  // console.log({ "isItemLoaded": isItemLoaded })
  // console.log("loadMoreItems " + loadMoreItems)
  useEffect(() => {
    cellMeasurerCache.clear()
    cellMeasurerCache.clearAll()
  }, [activeTab])
  const windowWidth = window.innerWidth;
  const profileItem = useCallback(
    ({ key, index, style, parent }) => {
      let content;
      // scrollIndex.current = index;
      if (!isItemLoaded(index) && hasNextPage) {
        content = <Loader />;
      } else if (items[index]) {
        content = (
          <>
            <ProfileListItem
              item={items[index][1]}
              applicantsList={applicantsList}
              membersList={membersList}
              orgList={orgsList}
              organizationId={organisationId}
              isOwner={isOwner}
              isMember={isMember}
              isAdmin={isAdmin}
              isWiki={isWiki}
              isVolunteer={isVolunteer}
              activeTab={activeTab}
            />
            <HorizontalRule />
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
    [
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
    ],
  );

  return (
    <ListContainer id="profile-list" className="activity">
      {/* <Link onClick={async (e) => { cellMeasurerCache.clearAll() }}>CLEAR CACHE</Link> */}
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
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <List
                      autoHeight
                      height={height}
                      width={width}
                      // height={500}
                      // width={500}
                      isScrolling={isScrolling}
                      onRowsRendered={onRowsRendered}
                      // rowCount={
                      //   windowWidth > 767 ? itemCount : seeAll ? itemCount : 3
                      // }
                      rowCount={
                        itemCount
                      }
                      // rowCount={
                      //   20
                      // }
                      // rowHeight={cellMeasurerCache.getHeight()}
                      rowHeight={cellMeasurerCache.rowHeight}
                      deferredMeasurementCache={cellMeasurerCache}
                      rowRenderer={profileItem}
                      // scrollTop={scrollTop}
                      // scrollTop={scrollTop}
                      onScroll={onChildScroll}
                      overscanRowCount={10}
                      // overscanRowCount={1}
                      scrollToAlignment={"start"}
                      // style={{ "margin-top": "3rem" }}
                      // scrollToIndex={scrollToIndex()}
                      // scrollToIndex={List.scrollToRow}
                      // scrollToIndex={5}
                      // ref={el => {
                      //   window.listEl = el;
                      // }}
                      // onScroll={console.log({
                      //   "isScrolling": isScrolling,
                      //   "scrollTop": scrollTop,
                      //   "onChildScroll": onChildScroll,
                      // })}
                      scrollToIndex={-1}
                      tabIndex={2}
                    />
                  )}
                </AutoSizer>
              )}
            </InfiniteLoader>
          )}
        </WindowScroller>
      )}
      {/* {windowWidth < 767 && totalCount >= 3 ? (
        <>
          <Link
            onClick={handleSeeAll}
            style={seeAll ? { display: "none" } : null}
          >
            <SeeAllLink>See All</SeeAllLink>
          </Link>
          <Link onClick={scrollToTop}>
            <UpArrow activate={seeAll} />
          </Link>


        </>
      ) : null} */}
    </ListContainer>
  );
};

export default ProfileList2;
