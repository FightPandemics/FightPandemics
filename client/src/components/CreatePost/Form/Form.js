import React, { useState } from "react";
import First from "./FirstSection";
import Second from "./SecondSection";
import Third from "./ThirdSection";
import { Footer, Submit } from "components/CreatePost/StyledModal";
import createPostSettings from "assets/data/createPostSettings";

const { shareWith, expires } = createPostSettings;

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
    shareWith: shareWith,
    expires: expires,
  },
  errors: [],
};

const Form = ({ setCurrentStep, textData }) => {
  const [formData, setFormData] = useState(initialState.formData);
  const [errors, setErrors] = useState(initialState.errors);

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
    // This live bellow is there only to show the confirmation modal for testers
    setCurrentStep(4);
    e.preventDefault();
    populateErrors();
    if (!errors.length) {
      // todo: finish integrating api
      try {
        // const req = await axios.post("/api/posts", formData);
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
      <Third formData={formData} />
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
