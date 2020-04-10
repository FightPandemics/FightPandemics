import React from "react";
import Post from "./Post";
import CreatPostIcon from "../Icon/create-post";

const ceatePostStyles = {
  position: "fixed",
  bottom: "19%",
  right: "5%",
};

export default ({ filteredPosts }) => {
  return (
    <div className="feed-posts">
      {filteredPosts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
      <CreatPostIcon style={ceatePostStyles} />
    </div>
  );
};
