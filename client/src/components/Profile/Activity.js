import React from "react";
import Post from "../Feed/Post";

const Activity = ({
  filteredPosts,
  updateComments,
  user,
  handlePostDelete,
  handleEditPost,
  handleCancelPostDelete,
  postDelete,
  deleteModalVisibility,
}) => {
  const posts = Object.entries(filteredPosts);
  return (
    <div className="activity">
      {!posts.length
        ? "No activity found"
        : posts.map(([key, post]) => (
            <Post
              currentPost={post}
              updateComments={updateComments}
              numComments={post.commentsCount}
              postDelete={postDelete}
              onChange={handlePostDelete}
              onSelect={handleEditPost}
              key={key}
              user={user}
              handleCancelPostDelete={handleCancelPostDelete}
              deleteModalVisibility={deleteModalVisibility}
            />
          ))}
    </div>
  );
};

export default Activity;
