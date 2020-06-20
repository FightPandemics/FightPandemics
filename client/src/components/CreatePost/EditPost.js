import React from "react";

import TabForms from "./Form/TabForms";

const EditPost = (props) => {
  return props.post &&
    props.post.author &&
    props.isAuthenticated &&
    props.visible ? (
    <TabForms
      user={props.user}
      isAuthenticated={props.isAuthenticated}
      post={props.post}
      loadPost={props.loadPost}
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
