import React from "react";
import Post from "../Feed/Post";

const Activity = ({ 
  filteredPosts,
  updateComments,
  user,
  handlePostDelete,
  handleEditPost,
  }) => {
  const posts = Object.entries(filteredPosts);
  
  return (
    <div className="activity">
      {!posts.length
        ? "No activity found"
        : posts.map(([key, post]) => {
          return (
            <Post
              currentPost={post}
              updateComments={updateComments}
              handlePostDelete={handlePostDelete}
              onSelect={handleEditPost}
              key={key}
              user={user}
            />
          )})}
    </div>
  );
};

export default Activity;
