import React, { useState } from "react";
// import axios from "axios";
import filterOptions from "assets/data/filterOptions";
import createPostSettings from "assets/data/createPostSettings";
import CustomModal from "components/CreatePost/CustomModal";
import RadioGroup from "components/CreatePost/RadioGroup";
import Heading from "components/Typography/Heading";

import SelectWithIconButton from "components/Button/SelectWithIconButton";
import AddTags from "components/Tag/AddTags";
import SubmitButton from "components/Button/SubmitButton";
import {
  CreatePostWrapper,
  StyledForm,
  StyledInput,
  StyledTextArea,
} from "components/CreatePost/StyledCreatePost";

// ICONS
import SvgIcon from "components/Icon/SvgIcon";
import downArrow from "assets/icons/down-arrow.svg";
import horizontalLine from "assets/icons/horizontal-line.svg";

const types = Object.values(filterOptions)[2].options;
const { shareWith, expires, helpTypes } = createPostSettings;

const initialState = {
  state: {
    modal: false,
    options: [],
    selected: "",
  },
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

const errorMsg = {
  title: "Please include a title for your post.",
  description: "Please include a description for your post.",
  help: "Please select a type of help.",
  tags: "Please add at least one tag.",
};

const CreatePost = (props) => {
  const [state, setState] = useState(initialState.state);
  const [formData, setFormData] = useState(initialState.formData);
  const [errors, setErrors] = useState(initialState.errors);
  const { modal, selected, options } = state;

  const showModal = (setting) => (e) => {
    setState({
      ...state,
      modal: !state.modal,
      options: setting.options,
      selected: setting.type,
    });
  };

  const closeModal = (e) => {
    setState({
      ...state,
      modal: !state.modal,
      options: [],
      selected: "",
    });
  };

  const handleFormData = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
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

  const populateErrors = () => {
    const newErrors = [];
    for (let field in errorMsg) {
      if (!errors.includes(field)) {
        newErrors.push(field);
      }
    }
    setErrors([...errors, ...newErrors]);
  };

  const renderError = (field) => {
    if (errors.includes(field) && (!formData[field] || !formData[field].length))
      return errorMsg[field];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    populateErrors();
    if (!errors.length) {
      // todo: finish integrating api
      try {
        // const req = await axios.post("/api/posts", formData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <CreatePostWrapper>
      <Heading className="h4" level={4}>
        Create a Post
      </Heading>
      <StyledForm onSubmit={handleSubmit}>
        <div className="settings">
          <CustomModal
            title={selected ? createPostSettings[selected].title : ""}
            className="post-modal"
            content={
              <RadioGroup
                flex={true}
                padding="1.3rem 0"
                onChange={handleFormData(selected)}
                options={options}
                value={formData[selected]}
                defaultValue={formData[selected]}
              />
            }
            onClose={closeModal}
            visible={modal}
            closable={false}
          />
          <div className="buttons">
            <SelectWithIconButton
              long="true"
              size="small"
              righticon="true"
              secondary="true"
              icon={<SvgIcon src={downArrow} />}
              onClick={showModal(shareWith)}
            >
              {formData.shareWith}
            </SelectWithIconButton>
            <SelectWithIconButton
              long="true"
              size="small"
              righticon="true"
              secondary="true"
              icon={<SvgIcon src={downArrow} />}
              onClick={showModal(expires)}
            >
              {formData.expires}
            </SelectWithIconButton>
          </div>
          <div className="inline">
            <RadioGroup
              onChange={handleFormData("help")}
              options={helpTypes.options}
              value={formData.help}
              padding="0"
            />
            <span className="error-box">{renderError("help")}</span>
          </div>
        </div>
        <SvgIcon src={horizontalLine} />
        <div className="post-content">
          <label>
            <StyledInput
              onChange={handleFormData("title")}
              value={formData.title}
              placeholder="Title"
              className="title"
            />
          </label>
          <span className="error-box">{renderError("title")}</span>
          <label>
            <StyledTextArea
              onChange={handleFormData("description")}
              value={formData.description}
              placeholder="Write a post."
              rows={12}
            />
          </label>
          <span className="error-box">{renderError("description")}</span>
        </div>
        <SvgIcon src={horizontalLine} />
        <div className="tags">
          <AddTags addTag={addTag} filters={types} selected={formData.tags} />
        </div>
        <span className="error-box">{renderError("tags")}</span>
        <SubmitButton
          primary="true"
          onClick={handleSubmit}
          className="submit-btn"
        >
          Post
        </SubmitButton>
      </StyledForm>
    </CreatePostWrapper>
  );
};

export default CreatePost;
