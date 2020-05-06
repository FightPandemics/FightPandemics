import Post from "./Post";
import React from "react";

const Posts = ({ filteredPosts }) => {
  return (
    <div className="feed-posts">
      {filteredPosts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
