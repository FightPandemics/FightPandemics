import React from "react";
import Post from "./Post";

export default ({ filteredPosts }) => {
  if (filteredPosts.length) {
    return (
      <div className="feed-posts">
        {filteredPosts.map((post) => (
          <Post post={post.fields} key={post.id} />
        ))}
      </div>
    );
  } else {
    return <div>Loading posts...</div>;
  }
};
