import React from "react";

import TabForms from "./Form/TabForms";

const EditPost = (props) => {
  const {
    user,
    isAuthenticated,
    dispatchAction,
    currentPost,
    loadPost,
    fullContent,
    textData,
    onSuccess,
    onCancel,
    visible,
  } = props;
  return props.currentPost &&
    currentPost.author &&
    isAuthenticated &&
    visible ? (
    <TabForms
      user={user}
      isAuthenticated={isAuthenticated}
      dispatchAction={dispatchAction}
      currentPost={currentPost}
      loadPost={loadPost}
      fullContent={fullContent}
      textData={textData}
      onSuccess={onSuccess}
      onClose={() => {
        onCancel();
      }}
    />
  ) : (
    <></>
  );
};

export default EditPost;
