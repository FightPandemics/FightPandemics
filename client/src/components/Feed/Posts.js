import React from "react";
import Post from "./Post";

const Posts = ({ filteredPosts }) => {
  return (
    <div className="feed-posts">
      {Object.keys(filteredPosts).map((key) => (
        <Post post={filteredPosts[key]} key={key} />
      ))}
    </div>
  );
};

export default Posts;
