import React from "react";
import styled from "styled-components";

//Local
import Post from "./Post";

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
  isMetaCrawler,
  filteredPosts,
  handlePostLike,
  handleCancelPostDelete,
  loadPosts,
  postDelete,
  user,
  deleteModalVisibility,
  handlePostDelete,
}) => (
  <div className="feed-posts">
    {Object.keys(filteredPosts).map((key) => (
      <>
        <Post
          currentPost={filteredPosts[key]}
          includeProfileLink={true}
          numComments={filteredPosts[key].commentsCount}
          loadPosts={loadPosts}
          handlePostLike={handlePostLike}
          handleCancelPostDelete={handleCancelPostDelete}
          postDelete={postDelete}
          isAuthenticated={isAuthenticated}
          isMetaCrawler={isMetaCrawler}
          user={user}
          key={key}
          deleteModalVisibility={deleteModalVisibility}
          onChange={handlePostDelete}
        />
        <HorizontalRule />
      </>
    ))}
  </div>
);

export default Posts;
