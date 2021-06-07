import Loader from "components/Feed/StyledLoader";
// import Applicant from "components/OrganisationProfile/ApplicantOrMember";
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

const LoadMoreButton = styled(BaseButton)`
  background-color: ${colors.royalBlue};
  color: ${colors.white};
  width: 25%;
  justify-self: center;
  margin: auto;
  /* pointer-events: none; */
  :hover {
    color: ${colors.white};
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
  // const applicants = Object.entries(filteredApplicants);
  // console.log(JSON.stringify(filteredApplicants))
  // console.log({ "next page4 itemCount APPLICANTS": itemCount })
  // const applicantsList = filteredApplicants && true;
  // const membersList = filteredMembers && true;
  // const orgsList = filteredOrgs && true;
  const items = Object.entries(filteredOrgs);
  // const items = Object.entries(filteredApplicants);
  // console.log("items " + items.length)
  // const ref = useRef()
  // const scrollIndex = useRef(0);
  // const history = useHistory();
  // const scrollToIndex = () => {
  //   if (history?.location?.state) {
  //     let { keepScrollIndex, keepScroll } = history.location.state;
  //     if (keepScroll) return keepScrollIndex;
  //   }
  //   return -1;
  // };
  // console.log({ "scrollToIndex Profile List": scrollToIndex })
  // const scrollToTop = async () => window.scrollTo({ top: 0, behavior: "smooth" });
  // console.log({ "SCROLLTOP!!": scrollToTop })
  const loadMoreItems = isNextPageLoading ? () => {
    console.log("next page4 isNextPageLoading TRUE!")
  } : loadNextPage;
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

  console.log({ "manual loadMore: items": items.length })
  console.log({ "manual loadMore: totalCount": totalCount })
  const [seeAll, setSeeAll] = useState(false);
  const log = (e) => {
    console.log(e)
  }
  const handleSeeAll = () => {
    setSeeAll((prevState) => !prevState);
  };
  // useEffect(() => {
  //   cellMeasurerCache.clear()
  //   cellMeasurerCache.clearAll()
  // }, [activeTab])
  const windowWidth = window.innerWidth;
  console.log({ "items": items })
  return (

    <>
      {

        <ListContainer>
          <AntList
            itemLayout="horizontal"
            loadMore={
              items.length >= totalCount ? null :
                <LoadMoreButton onClick={loadNextPage}>
                  {/* <Link onClick={loadNextPage}>Load More</Link> */}
                  Load More
                </LoadMoreButton>
            }
            dataSource={items}
            renderItem={item => (
              <ItemContainer>
                {
                  // !listInitialized ?
                  //   <Loader /> :
                  <AntList.Item
                  >
                    <ProfileListItem
                      style={{ width: "100%", display: "flex" }}
                      item={item[1]}
                      // applicantsList={filteredOrgs}
                      // organizationId={organisationId}
                      isOwner={isOwner}
                      // isMember={isMember}
                      // isAdmin={isAdmin}
                      // isWiki={isWiki}
                      // isVolunteer={isVolunteer}
                      // activeTab={activeTab}
                      isSelf={isSelf}
                    />
                  </AntList.Item>}
              </ItemContainer>
            )}
          />
        </ListContainer>
      }
    </>
  )
};

export default ProfileList;
