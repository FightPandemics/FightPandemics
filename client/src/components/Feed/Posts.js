import React from "react";
import Post from "./Post";

export default ({ filteredPosts }) => {
  return (
    <div>
      {filteredPosts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};
