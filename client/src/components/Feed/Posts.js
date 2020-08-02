import React from "react";
import styled from "styled-components";
// import { FixedSizeList as List } from "react-window";
// import InfiniteLoader from "react-window-infinite-loader";
import {
  InfiniteLoader,
  AutoSizer,
  WindowScroller,
  List,
} from "react-virtualized";

//Local
import Post from "./Post";
import Loader from "components/Feed/StyledLoader";

// Constants
import { mq } from "constants/theme";

const HorizontalRule = styled.hr`
  display: none;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(243, 244, 254, 1);
    display: block;
    max-width: 325px;
  }
`;
const Posts = ({
  isAuthenticated,
  filteredPosts,
  handlePostLike,
  handleCancelPostDelete,
  loadPosts,
  postDelete,
  user,
  deleteModalVisibility,
  handlePostDelete,
  hasNextPage,
  isNextPageLoading,
  loadNextPage,
}) => {
  const posts = Object.entries(filteredPosts);
  const itemCount = hasNextPage ? posts.length + 1 : posts.length;
  const isItemLoaded = (index) => {
    return !hasNextPage || !!posts[index];
  };
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const postItem = ({ key, index, style }) => {
    let content;
    if (!isItemLoaded(index)) {
      content = <Loader />;
    } else {
      content = (
        <>
          <Post
            currentPost={posts[index][1]}
            includeProfileLink={true}
            numComments={posts[index][1].commentsCount}
            loadPosts={loadPosts}
            handlePostLike={handlePostLike}
            handleCancelPostDelete={handleCancelPostDelete}
            postDelete={postDelete}
            isAuthenticated={isAuthenticated}
            user={user}
            deleteModalVisibility={deleteModalVisibility}
            onChange={handlePostDelete}
          />
          <HorizontalRule />
        </>
      );
    }
    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  };
  return (
    <div className="feed-posts">
      <InfiniteLoader
        isRowLoaded={isItemLoaded}
        loadMoreRows={loadMoreItems}
        rowCount={itemCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, scrollTop, onChildScroll }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    autoHeight
                    ref={registerChild}
                    height={height}
                    width={width}
                    isScrolling={isScrolling}
                    rowCount={itemCount}
                    rowHeight={380}
                    rowRenderer={postItem}
                    scrollTop={scrollTop}
                    onScroll={onChildScroll}
                    onRowsRendered={onRowsRendered}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    </div>
  );
};

export default Posts;
