import React, { useCallback } from "react";
import {
  InfiniteLoader,
  AutoSizer,
  WindowScroller,
  List,
} from "react-virtualized";
import Post from "../Feed/Post";
import Loader from "components/Feed/StyledLoader";

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
        <div key={key} style={style}>
          {content}
        </div>
      );
    },
    [
      deleteModalVisibility,
      handleCancelPostDelete,
      handleEditPost,
      handlePostDelete,
      handlePostLike,
      isItemLoaded,
      postDelete,
      posts,
      updateComments,
      user,
    ],
  );

  return (
    <div className="activity">
      {!posts.length ? (
        "No activity found"
      ) : (
        <WindowScroller>
          {({ height, isScrolling, scrollTop, onChildScroll }) => (
            <InfiniteLoader
              isRowLoaded={isItemLoaded}
              loadMoreRows={loadMoreItems}
              rowCount={10000}
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
      )}
    </div>
  );
};

export default Activity;
