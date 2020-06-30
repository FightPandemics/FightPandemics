import React, { useState } from "react";
import axios from "axios";

import First from "./FirstSection";
import Second from "./SecondSection";
import Third from "./ThirdSection";
import { Footer, Submit } from "components/CreatePost/StyledModal";
import { isAuthorOrg } from "pages/Feed";

import {
  SET_POST,
  RESET_POST,
} from "hooks/actions/postActions";

import {
  postToFormData,
  formDataToPostPatch,
} from "assets/data/formToPostMappings";

const errorMsg = {
  title: "Please include a title for your post.",
  description: "Please include a description for your post.",
  help: "Please select a type of help.",
  tags: "Please add at least one tag.",
};

const EditModalComponent = ({
  isAuthenticated,
  onClose,
  currentPost,
  textData,
  dispatchAction,
  type,
  user,
}) => {
  const post = { ...currentPost };

  const initialState = {
    formData: postToFormData(post),
    errors: [],
  };
  const [formData, setFormData] = useState(initialState.formData);
  const [errors, setErrors] = useState(initialState.errors);
  formData.help = type;

  const renderError = (field) => {
    if (errors.includes(field) && (!formData[field] || !formData[field].length))
      return errorMsg[field];
  };

  const populateErrors = () => {
    const newErrors = [];
    for (let field in errorMsg) {
      if (!errors.includes(field)) {
        newErrors.push(field);
      }
    }
    setErrors([...errors, ...newErrors]);
  };

  const handleFormData = (field) => (e) => {
    if (e.target) {
      setFormData({ ...formData, [field]: e.target.value });
    } else {
      const helpmap = { 1: "offer", 2: "request" };
      setFormData({ ...formData, [field]: helpmap[e] });
    }
    if (errors.includes(field) && formData[field]) {
      const newErrors = errors.filter((error) => error !== field);
      setErrors(newErrors);
    }
  };
  const addTag = (tag) => (e) => {
    const hasTag = formData.tags.includes(tag);
    if (hasTag) {
      const tags = formData.tags.filter((t) => t !== tag);
      setFormData({ ...formData, tags });
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const setExpiration = (expires) => {
    if (expires) {
      setFormData({ ...formData, expires });
    } else {
      setFormData({ ...formData, expires: expires.default.value });
    }
  };
  const setShareWith = (shareWith) => {
    if (shareWith) {
      setFormData({ ...formData, shareWith });
    } else {
      setFormData({ ...formData, shareWith: shareWith.default.value });
    }
  };

  const handleSubmit = async () => {
    populateErrors();
    onClose();

    let response;
    const postId = post._id;
    const payload = formDataToPostPatch(formData);

    if (
      isAuthenticated &&
      user &&
      (user._id === post.author.id || user.id === post.author.id || isAuthorOrg(user.organizations, post.author))
    ) {
      const endPoint = `/api/posts/${postId}`;

      try {
        response = await axios.patch(endPoint, payload);
        if (response && response.data) {
          dispatchAction(SET_POST, "content", response.data.content, "post", {
            ...post,
            ...response.data,
          });
        }
      } catch (error) {
        console.log({ error });
        dispatchAction(RESET_POST);
      }
    }
  };

  return (
    <>
      <First
        onChangeTitle={handleFormData("title")}
        onChangeDescription={handleFormData("description")}
        formData={formData}
        renderError={renderError}
      />
      <Second
        addTag={addTag}
        selectedTags={formData.tags}
        renderError={renderError}
        title={textData.question}
      />
      <Third
        formData={formData}
        onShareWithChange={setShareWith}
        onExpirationChange={setExpiration}
      />
      <Footer>
        <Submit
          primary="true"
          onClick={handleSubmit}
          disabled={
            !formData.title ||
            !formData.description ||
            formData.tags.length === 0
          }
        >
          Post
        </Submit>
      </Footer>
    </>
  );
};

export default EditModalComponent;
