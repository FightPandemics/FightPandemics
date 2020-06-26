import React, { useState } from "react";
import First from "./FirstSection";
import Second from "./SecondSection";
import Third from "./ThirdSection";
import { Footer, Submit } from "components/CreatePost/StyledModal";
import createPostSettings from "assets/data/createPostSettings";
import axios from "axios";
import { formDataToPost } from "assets/data/formToPostMappings";

const { shareWith, expires, helpTypes } = createPostSettings;

const errorMsg = {
  title: "Please include a title for your post.",
  description: "Please include a description for your post.",
  help: "Please select a type of help.",
  tags: "Please add at least one tag.",
};

const initialState = {
  formData: {
    title: "",
    description: "",
    tags: [],
    shareWith: shareWith.default.value,
    expires: expires.default.value,
    help: helpTypes.default.value,
  },
  errors: [],
};

const Form = ({
  setCurrentStep,
  textData,
  type,
  onShareWithChange,
  onExpirationChange,
  setPostUrl,
}) => {
  const [formData, setFormData] = useState(initialState.formData);
  const [errors, setErrors] = useState(initialState.errors);
  formData.help = type;

  const handleFormData = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });

    if (errors.includes(field) && formData[field]) {
      const newErrors = errors.filter((error) => error !== field);
      setErrors(newErrors);
    }
  };

  const cleanForm = () => setFormData(initialState.formData);

  const renderError = (field) => {
    if (errors.includes(field) && (!formData[field] || !formData[field].length))
      return errorMsg[field];
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

  const populateErrors = () => {
    const newErrors = [];
    for (let field in errorMsg) {
      if (!errors.includes(field)) {
        newErrors.push(field);
      }
    }
    setErrors([...errors, ...newErrors]);
  };

  const handleSubmit = async (e) => {
    setCurrentStep(4);
    e.preventDefault();
    populateErrors();

    const payload = formDataToPost(formData);

    if (!errors.length) {
      try {
        const res = await axios.post("/api/posts", payload);
        setPostUrl(res.data._id);
        cleanForm();
      } catch (error) {
        console.log(error);
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
        onShareWithChange={onShareWithChange}
        onExpirationChange={onExpirationChange}
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

export default Form;
