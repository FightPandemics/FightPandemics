import React, { useCallback } from "react";
import styled from "styled-components";
import {
  InfiniteLoader,
  AutoSizer,
  WindowScroller,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

//Local
import Post from "./Post";
import Loader from "components/Feed/StyledLoader";

// Constants
import { mq } from "constants/theme";

const cellMeasurerCache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 380,
});

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
  postDelete,
  user,
  deleteModalVisibility,
  handlePostDelete,
  isNextPageLoading,
  loadNextPage,
  itemCount,
  isItemLoaded,
  hasNextPage,
  totalPostCount,
}) => {
  const posts = Object.entries(filteredPosts);
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const postItem = useCallback(
    ({ key, index, style, parent }) => {
      let content;
      if (!isItemLoaded(index) && hasNextPage) {
        content = <Loader />;
      } else if (posts[index]) {
        content = (
          <>
            <Post
              currentPost={posts[index][1]}
              includeProfileLink={true}
              numComments={posts[index][1].commentsCount}
              handlePostLike={handlePostLike}
              postDelete={postDelete}
              isAuthenticated={isAuthenticated}
              user={user}
              deleteModalVisibility={deleteModalVisibility}
              handleCancelPostDelete={handleCancelPostDelete}
              onChange={handlePostDelete}
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
      deleteModalVisibility,
      handleCancelPostDelete,
      handlePostDelete,
      handlePostLike,
      hasNextPage,
      isAuthenticated,
      isItemLoaded,
      postDelete,
      posts,
      user,
    ],
  );

  return (
    <div className="feed-posts">
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

export default Posts;
