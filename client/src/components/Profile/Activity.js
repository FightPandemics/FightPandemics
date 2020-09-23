import React, { useCallback } from "react";
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

const cellMeasurerCache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 380,
});
const Activity = ({
  filteredPosts,
  updateComments,
  user,
  handlePostDelete,
  handleEditPost,
  handleCancelPostDelete,
  postDelete,
  deleteModalVisibility,
  handlePostLike,
  loadNextPage,
  isNextPageLoading,
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
          <Post
            currentPost={posts[index][1]}
            updateComments={updateComments}
            numComments={posts[index][1].commentsCount}
            handlePostLike={handlePostLike}
            postDelete={postDelete}
            user={user}
            deleteModalVisibility={deleteModalVisibility}
            onChange={handlePostDelete}
            handleCancelPostDelete={handleCancelPostDelete}
            onSelect={handleEditPost}
          />
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
      handleEditPost,
      handlePostDelete,
      handlePostLike,
      hasNextPage,
      isItemLoaded,
      postDelete,
      posts,
      updateComments,
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

export default Activity;
