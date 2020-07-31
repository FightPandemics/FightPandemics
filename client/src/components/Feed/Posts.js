import React from "react";
import styled from "styled-components";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

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
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = (index) => !hasNextPage || index < posts.length;
  const postItem = ({ index, style }) => {
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
            key={index}
            deleteModalVisibility={deleteModalVisibility}
            onChange={handlePostDelete}
          />
          <HorizontalRule />
        </>
      );
    }
    return <div style={style}>{content}</div>;
  };
  return (
    <div className="feed-posts">
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={Math.max(
              document.documentElement.clientHeight,
              window.innerHeight || 0,
            )}
            itemCount={itemCount}
            itemSize={380}
            width="100%"
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {postItem}
          </List>
        )}
      </InfiniteLoader>
    </div>
  );
};

export default Posts;
