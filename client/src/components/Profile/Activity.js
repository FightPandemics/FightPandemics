import React from "react";
import { FixedSizeList as List } from "react-window";
import { WindowScroller } from "react-virtualized"; // TODO worth to use it or not.
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

  return (
    <div className="activity">
      {!posts.length ? (
        "No activity found"
      ) : (
        <List
          height={Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0,
          )}
          itemCount={posts.length}
          itemSize={400}
          width="100%"
        >
          {({ index, style }) => (
            <Post
              currentPost={posts[index][1]}
              updateComments={updateComments}
              numComments={posts[index][1].commentsCount}
              postDelete={postDelete}
              onChange={handlePostDelete}
              onSelect={handleEditPost}
              key={index}
              user={user}
              handleCancelPostDelete={handleCancelPostDelete}
              deleteModalVisibility={deleteModalVisibility}
              handlePostLike={handlePostLike}
              style={style}
            />
          )}
        </List>
      )}
    </div>
  );
};

export default Activity;
