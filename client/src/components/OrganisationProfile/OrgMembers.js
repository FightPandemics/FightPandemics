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

import React, { useCallback, useState } from "react";
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

const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 380,
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
    // isItemLoaded,
    hasNextPage,
    totalPostCount,
    isProfile,
    gtmIdPost,
}) => {
    // TEST VARIABLES FOR PROPS
    const isItemLoaded = () => { return true }


    // const posts = Object.entries(filteredPosts);
    // test activity
    const posts = [
        ["yooo", { author: { name: "yoo2" }, types: "typetest" }]
        
    ]



    const printInput = async (e) => {
        console.log(e)
        console.log("yooo!")
    };

    // printInput(posts)

    const loadMoreItems = isNextPageLoading ? () => { } : loadNextPage;
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

    const postItem = useCallback(
        ({ key, index, style, parent }) => {
            let content;
            if (!isItemLoaded(index) && hasNextPage) {
                content = <Loader />;
            } else if (posts[index]) {
                content = (
                    <Post
                        //     postDispatch={postDispatch}
                        currentPost={posts[index][1]}
                    //     updateComments={updateComments}
                    //     postDelete={postDelete}
                    //     user={user}
                    //     deleteModalVisibility={deleteModalVisibility}
                    //     onChange={handlePostDelete}
                    //     handleCancelPostDelete={handleCancelPostDelete}
                    //     onSelect={handleEditPost}
                    //     gtmPrefix={GTM.profile.viewProfilePrefix}
                    //     isHidden={hiddenPosts[posts[index][1]?._id]}
                    //     onPostHide={hidePost}
                    //     onPostUnhide={unhidePost}
                    //     convertTextToURL={false}
                    //     isProfile={isProfile}
                    //     gtmIdPost={gtmIdPost}
                    />
                    // <div>Yoo</div>
                );
                // printInput("PRINT CONTENT" + content)
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
            gtmIdPost,
            handleCancelPostDelete,
            handleEditPost,
            handlePostDelete,
            hasNextPage,
            hiddenPosts,
            hidePost,
            isItemLoaded,
            isProfile,
            postDelete,
            postDispatch,
            posts,
            unhidePost,
            updateComments,
            user,
        ],
    );
    return (
        <div className="activity">
            {
                // !posts.length && isNextPageLoading ? (
                !posts ? (
                    <Loader />
                ) : (
                    <WindowScroller>
                        {({ height, isScrolling, scrollTop, onChildScroll }) => (
                            <InfiniteLoader
                                isRowLoaded={isItemLoaded}
                                // isRowLoaded={true}
                                // loadMoreRows={loadMoreItems}
                                loadMoreRows={false}
                                // rowCount={totalPostCount}
                                rowCount={5}
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
                                                // rowCount={itemCount}
                                                rowCount={4}
                                                rowHeight={cellMeasurerCache.rowHeight}
                                                deferredMeasurementCache={cellMeasurerCache}
                                                rowRenderer={postItem}
                                                scrollTop={scrollTop}
                                                onScroll={onChildScroll}
                                                overscanRowCount={10}
                                                scrollToAlignment={"start"}
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


