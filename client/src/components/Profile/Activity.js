import React from "react";
import { useTranslation } from "react-i18next";
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
  handlePostLike,
}) => {
  const posts = Object.entries(filteredPosts);
  const { t } = useTranslation();
  return (
    <div className="activity">
      {!posts.length
        ? t("post.noActivity")
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
              handlePostLike={handlePostLike}
            />
          ))}
    </div>
  );
};

export default Activity;
