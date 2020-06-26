import React from "react";
import Post from "../Feed/Post";

const Activity = ({ filteredPosts, updateComments }) => {
  const posts = Object.entries(filteredPosts);
  return (
    <div className="activity">
      {!posts.length
        ? "No activity found"
        : posts.map(([key, post]) => (
            <Post
              currentPost={post}
              updateComments={updateComments}
              key={key}
            />
          ))}
    </div>
  );
};

export default Activity;
