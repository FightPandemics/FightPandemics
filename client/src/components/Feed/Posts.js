import React from "react";
import styled from "styled-components";
import { FixedSizeList as List } from "react-window";
//Local
import Post from "./Post";

// Constants
import { mq } from "constants/theme";

//TODO implement it again back
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
}) => {
  const posts = Object.entries(filteredPosts);
  return (
    <div className="feed-posts">
      <List
        height={Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0,
        )}
        itemCount={posts.length}
        itemSize={400}
        width="100%"
      >
        {({ index, style }) => (
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
            style={style}
          />
        )}
      </List>
    </div>
  );
};

export default Posts;
