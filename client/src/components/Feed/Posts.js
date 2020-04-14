import React from "react";
import Post from "./Post";
import CreatPostIcon from "../Icon/create-post";

export default ({ filteredPosts }) => {
  return (
    <div className="feed-posts">
      {filteredPosts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
      
    </div>
  );
};
