import React, { useCallback } from "react";
import styled from "styled-components";
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
  isNextPageLoading,
  loadNextPage,
  itemCount,
  isItemLoaded,
}) => {
  const posts = Object.entries(filteredPosts);
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const postItem = useCallback(
    ({ key, index, style }) => {
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
    },
    [
      deleteModalVisibility,
      handleCancelPostDelete,
      handlePostDelete,
      handlePostLike,
      isAuthenticated,
      isItemLoaded,
      loadPosts,
      postDelete,
      posts,
      user,
    ],
  );

  return (
    <div className="feed-posts">
      <WindowScroller>
        {({ height, isScrolling, scrollTop, onChildScroll }) => (
          <InfiniteLoader
            isRowLoaded={isItemLoaded}
            loadMoreRows={loadMoreItems}
            rowCount={100000}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    autoHeight
                    ref={registerChild}
                    height={height}
                    width={width}
                    isScrolling={isScrolling}
                    onRowsRendered={onRowsRendered}
                    rowCount={itemCount}
                    rowHeight={380}
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
    </div>
  );
};

export default Posts;
