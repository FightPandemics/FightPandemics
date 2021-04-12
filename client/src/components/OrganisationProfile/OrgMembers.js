// import React from "react";
// import styled from "styled-components";
// import { theme } from "constants/theme";
// import { getInitialsFromFullName } from "utils/userInfo";

// const { colors } = theme;


// export const AllMembers = styled.div`

// `;

// export const MemberContainer = styled.div`
// display: flex;
// justify-content: flex-start;
// align-items: center;
// margin: .5rem 0;
// box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);

// `;

// export const MemberPic = styled.div`
// display: flex;
// align-items: center;
// justify-self: flex-start;
// justify-content: center;
// margin: 1rem 0;
// border-radius: 50%;
// border: 0.1rem solid ${colors.royalBlue};
// color: ${colors.royalBlue};
// width: 4rem;
// height: 4rem;
// text-align: center;
// font-size: 1.6rem;
// font-weight: 500;
// line-height: 2rem;
// `;

// export const Initials = styled.div`
//     font-size: 1.5rem;
// `;

// export const Name = styled.p`
//     color: ${colors.black};
//     font-size: 1.6rem;
//     line-height: 1.9rem;
//     font-weight: 400;
//     margin: 0;
//     margin-left: 2rem;
// `;



// export const TestMembers = () => {
//     const names = ["Amy Smith", "Juan Matias", "Richard James", "Emily Johnson"]
//     return (
//         <AllMembers>

//             {names.map((names) => {

//                 return (
//                     <>
//                         <MemberContainer>
//                             <MemberPic>
//                                 <Initials>{getInitialsFromFullName(names)}</Initials>

//                             </MemberPic>
//                             <Name>{names}</Name>
//                         </MemberContainer>

//                     </>
//                 )
//             })}
//             <center style={{ "color": "red" }}>TEST DATA</center>
//         </AllMembers>
//     )
// }

// const Members = (name) => {
//     return (
//         <AllMembers>
//             <MemberContainer>
//                 <MemberPic>
//                     <Initials></Initials>
//                 </MemberPic>
//             </MemberContainer>
//         </AllMembers>
//     )

// }

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
import Post from "../Feed/Post";
import Loader from "components/Feed/StyledLoader";
import GTM from "constants/gtm-tags";
import Member from "components/OrganisationProfile/Member";
import styled from "styled-components";
import { mq } from "constants/theme";

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
    defaultHeight: 80,
});

const TestMembers = ({
    postDispatch,
    filteredPosts,
    updateComments,
    user,
    handlePostDelete,
    handleEditPost,
    handleCancelPostDelete,
    postDelete,
    deleteModalVisibility,
    loadNextPage,
    isNextPageLoading,
    itemCount,
    isItemLoaded,
    hasNextPage,
    totalPostCount,
    isProfile,
    gtmIdPost,
    page,
    // cellMeasurerCache
}) => {


    const scrollIndex = useRef(0);
    const history = useHistory();
    const scrollToIndex = () => {
        if (history?.location?.state) {
            let { keepScrollIndex, keepScroll } = history.location.state;
            if (keepScroll) return keepScrollIndex;
        }
        return -1;
    };

    // TEST VARIABLES FOR PROPS
    // const isItemLoaded = () => { return true }


    // const posts = Object.entries(filteredPosts);
    // test activity
    // const posts = [
    //     ["yooo", { author: { name: "yoo2" }, types: "typetest" }]

    // ]

    // const filteredPosts = [
    //     { author: { name: "Amy Smith" } },
    //     { author: { name: "Juan Matias" } },
    //     { author: { name: "Richard James" } },
    //     { author: { name: "Emily Johnson" } },
    //     { author: { name: "Juan Matias" } },
    //     { author: { name: "Richard James" } },
    //     { author: { name: "Emily Johnson" } },
    //     { author: { name: "Juan Matias" } },
    //     { author: { name: "Richard James" } },
    //     { author: { name: "Emily Johnson" } },
    //     { author: { name: "Juan Matias" } },
    //     { author: { name: "Richard James" } },
    //     { author: { name: "Emily Johnson" } },
    //     { author: { name: "Juan Matias" } },
    //     { author: { name: "Richard James" } },
    //     { author: { name: "Emily Johnson" } },
    //     { author: { name: "Juan Matias" } },
    //     { author: { name: "Richard James" } },
    //     { author: { name: "Emily Johnson" } },
    //     { author: { name: "Juan Matias" } },
    //     { author: { name: "Richard James" } },
    //     { author: { name: "Emily Johnson" } },
    //     { author: { name: "Juan Matias" } },
    //     { author: { name: "Richard James" } },
    //     { author: { name: "Emily Johnson" } },
    //     { author: { name: "Juan Matias" } },
    //     { author: { name: "Richard James" } },
    //     { author: { name: "Emily Johnson" } },
    //     { author: { name: "Juan Matias" } },
    //     { author: { name: "Richard James" } },
    //     { author: { name: "Emily Johnson" } },
    //     { author: { name: "Juan Matias" } },
    //     { author: { name: "Richard James" } },
    //     { author: { name: "Emily Johnson" } },
    //     { author: { name: "Juan Matias" } },
    //     { author: { name: "Richard James" } },
    //     { author: { name: "Emily Johnson" } }
    // ]

    const posts = Object.entries(filteredPosts)

    const [hiddenPosts, setHiddenPosts] = useState(
        JSON.parse(localStorage.getItem("hiddenPosts")) || {},
    );

    const hidePost = useCallback(
        (postId) => {
            localStorage.setItem(
                "hiddenPosts",
                JSON.stringify({ ...hiddenPosts, [postId]: true }),
            ); // objects are fast, better than looking for postId in an Array
            setHiddenPosts({ ...hiddenPosts, [postId]: true });
        },
        [hiddenPosts],
    );

    const unhidePost = useCallback(
        (postId) => {
            localStorage.setItem(
                "hiddenPosts",
                JSON.stringify({ ...hiddenPosts, [postId]: null }),
            );
            setHiddenPosts({ ...hiddenPosts, [postId]: null });
        },
        [hiddenPosts],
    );

    const loadMoreItems = isNextPageLoading
        ? () => {
            console.log("total Post Count:" + totalPostCount)
            if (history?.location?.state) {
                const { keepScrollIndex, keepScroll } = history.location.state;
                if (keepScroll && scrollIndex.current < keepScrollIndex) {
                    scrollIndex.current = keepScrollIndex;
                } else {
                    history.location.state.keepScrollIndex = scrollIndex.current;
                    history.location.state.keepScroll = false;
                    history.location.state.keepPostsState = undefined;
                    history.location.state.keepPageState = undefined;
                }
            }

        }
        : loadNextPage;

    // ADMIN PROFILE postItem

    const postItem = useCallback(
        ({ key, index, style, parent }) => {
            let content;
            scrollIndex.current = index;
            if (!isItemLoaded(index) && hasNextPage) {
                content = <Loader />;
            } else if (posts[index]) {
                content = (
                    <>
                        <HorizontalRule />
                        <Member
                            members={posts[index][1]}

                        />
                        {/* <HorizontalRule /> */}
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
            deleteModalVisibility,
            filteredPosts,
            handleCancelPostDelete,
            handlePostDelete,
            hasNextPage,
            hiddenPosts,
            hidePost,
            // highlightWords,
            // isAuthenticated,
            isItemLoaded,
            page,
            postDelete,
            postDispatch,
            posts,
            unhidePost,
            user,
        ],
    );

    return (
        <div className="activity">
            {!posts.length && isNextPageLoading ? (
                <Loader />
            ) : (
                <WindowScroller>
                    {({ height, isScrolling, scrollTop, onChildScroll }) => (
                        <InfiniteLoader
                            isRowLoaded={isItemLoaded}
                            loadMoreRows={loadMoreItems}
                            rowCount={totalPostCount}
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
                                            rowCount={itemCount}
                                            rowHeight={cellMeasurerCache.getHeight()}
                                            deferredMeasurementCache={cellMeasurerCache}
                                            rowRenderer={postItem}
                                            scrollTop={scrollTop}
                                            onScroll={onChildScroll}
                                            overscanRowCount={1}
                                            scrollToAlignment={"center"}
                                            scrollToIndex={scrollToIndex()}
                                        />
                                    )}
                                </AutoSizer>
                            )}
                        </InfiniteLoader>
                    )}
                </WindowScroller>
            )}
        </div>
    );
};

export default TestMembers;


