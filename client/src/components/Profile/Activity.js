import React from "react";
import Post from "../Feed/Post";

const Activity = ({ filteredPosts, updateComments }) => {
  return (
    <div className="activity">
      {Object.keys(filteredPosts).map((key) => (
        <Post
          post={filteredPosts[key]}
          updateComments={updateComments}
          key={key}
        />
      ))}
    </div>
  );
};

export default Activity;
