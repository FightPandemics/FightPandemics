import Loader from "components/Feed/StyledLoader";
import Applicant from "components/OrganisationProfile/ApplicantOrMember";
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
import UpArrow from "../../components/Icon/up-arrow.js";

const { colors } = theme

const ListContainer = styled.div`
    background-color: ${colors.white};
    border-radius: 1.2rem;
    overflow: hidden;
    margin-top: .3rem;
    box-shadow:  0 0 20px 0 ${colors.shadowBlack};
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
    defaultHeight: 70,
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
`
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
    emptyFeed
}) => {
    // const applicants = Object.entries(filteredApplicants);
    // console.log(JSON.stringify(filteredApplicants))
    const applicantsList = filteredApplicants && true
    const membersList = filteredMembers && true
    const orgsList = filteredOrgs && true
    const items = Object.entries(filteredApplicants || filteredMembers || filteredOrgs);
    const loadMoreItems = isNextPageLoading ? () => { } : loadNextPage;
    const [seeAll, setSeeAll] = useState(false)

    const handleSeeAll = () => {
        setSeeAll(prevState => !prevState)
    }

    const scrollTop = async () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const windowWidth = window.innerWidth
    const profileItem = useCallback(
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
        [
            hasNextPage,
            isItemLoaded,
            items,
            user,
        ],
    );

    return (
        <ListContainer id="profile-list" className="activity">
            { !items.length && isNextPageLoading ? (
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
                                            isScrolling={isScrolling}
                                            onRowsRendered={onRowsRendered}
                                            rowCount={windowWidth > 767 ? itemCount : seeAll ? itemCount : 3}
                                            rowHeight={cellMeasurerCache.getHeight()}
                                            deferredMeasurementCache={cellMeasurerCache}
                                            rowRenderer={profileItem}
                                            scrollTop={scrollTop}
                                            onScroll={onChildScroll}
                                            overscanRowCount={1}
                                            scrollToAlignment={"start"}
                                            style={{ "margin-top": "3rem" }}

                                        />
                                    )}
                                </AutoSizer>
                            )}

                        </InfiniteLoader>
                    )}
                </WindowScroller>
            )}
            {windowWidth < 767 && totalCount >= 3 ?
                <>
                    <Link
                        onClick={handleSeeAll}
                        style={seeAll ? { display: "none" } : null}
                    >
                        <SeeAllLink>
                            See All
                </SeeAllLink>
                    </Link>
                    <Link
                        onClick={scrollTop}
                    >
                        <UpArrow
                            activate={seeAll}
                        />
                    </Link>
                </> : null}
        </ListContainer >
    );
};

export default ProfileList;


