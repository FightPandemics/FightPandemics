import React from "react";
import Post from "./Post";

const Posts = ({ filteredPosts, handlePostLike, updateComments }) => {
  return (
    <div className="feed-posts">
      {Object.keys(filteredPosts).map((key) => (
        <Post
          post={filteredPosts[key]}
          updateComments={updateComments}
          handlePostLike={handlePostLike}
          key={key}
        />
      ))}
    </div>
  );
};

export default Posts;
