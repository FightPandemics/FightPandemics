import React from "react";

import TabForms from "./Form/TabForms";

const EditPost = (props) => {
  return props.currentPost &&
    props.currentPost.author &&
    props.isAuthenticated &&
    props.visible ? (
    <TabForms
      user={props.user}
      isAuthenticated={props.isAuthenticated}
      dispatchAction={props.dispatchAction}
      currentPost={props.currentPost}
      loadPost={props.loadPost}
      fullContent={props.fullContent}
      textData={props.textData}
      onClose={() => {
        props.onCancel();
      }}
    />
  ) : (
    <></>
  );
};

export default EditPost;
