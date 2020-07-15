import React from "react";
import Post from "./Post";

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
  return (
    <div className="feed-posts">
      {Object.keys(filteredPosts).map((key) => (
        <Post
          currentPost={filteredPosts[key]}
          includeProfileLink={true}
          numComments={filteredPosts[key].commentsCount}
          loadPosts={loadPosts}
          handlePostLike={handlePostLike}
          handleCancelPostDelete={handleCancelPostDelete}
          postDelete={postDelete}
          isAuthenticated={isAuthenticated}
          user={user}
          key={key}
          deleteModalVisibility={deleteModalVisibility}
          onChange={handlePostDelete}
        />
      ))}
    </div>
  );
};

export default Posts;
