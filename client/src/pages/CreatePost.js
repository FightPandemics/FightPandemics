import React, { useState } from "react";
import filterOptions from "../assets/data/filterOptions";
import createPostSettings from "../assets//data/createPostSettings";
import CustomModal from "../components/CreatePost/CustomModal";
import RadioGroup from "../components/CreatePost/RadioGroup";
import CustomH1 from "../components/Typography/Title/CustomH1";
import DownArrowButton from "../components/Button/DownArrowButton";
import HorizontalLine from "../components/Icon/horizontal-line";
import AddTags from "../components/Tag/AddTags";
import SubmitButton from "../components/Button/SubmitButton";
import { theme } from "../constants/theme";
import {
  CreatePostWrapper,
  StyledForm,
  StyledInput,
  StyledTextArea,
} from "../components/CreatePost/StyledCreatePost";

const types = Object.values(filterOptions)[2].options;
const { shareWith, expires, helpTypes } = createPostSettings;

const initialState = {
  state: {
    modal: false,
    options: [],
    selected: "",
  },
  data: {
    title: "",
    body: "",
    tags: [],
    shareWith: shareWith.default.value,
    expires: expires.default.value,
    help: helpTypes.default.value,
  },
  errors: [],
};

const errorMsg = {
  title: "Please include a title for your post.",
  body: "Please include a body for your post.",
  help: "Please select a type of help.",
};

export default (props) => {
  const [state, setState] = useState(initialState.state);
  const [data, setData] = useState(initialState.data);
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

  const handleData = (field) => (e) => {
    setData({ ...data, [field]: e.target.value });
    if (errors.includes(field) && data[field]) {
      const newErrors = errors.filter((error) => error !== field);
      setErrors(newErrors);
    }
  };

  const addTag = (tag) => (e) => {
    const hasTag = data.tags.includes(tag);
    if (hasTag) {
      const tags = data.tags.filter((t) => t !== tag);
      setData({ ...data, tags });
    } else {
      setData({ ...data, tags: [...data.tags, tag] });
    }
  };

  const handleErrors = () => {
    const newErrors = [];
    for (let field in errorMsg) {
      if (!errors.includes(field) && !data[field]) {
        newErrors.push(field);
      }
    }
    setErrors([...errors, ...newErrors]);
  };

  const renderError = (field) => {
    if (errors.includes(field)) return errorMsg[field];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleErrors();
  };

  return (
    <CreatePostWrapper>
      <CustomH1
        className="title"
        fontsize={"2.2rem"}
        fontweight={"700"}
        color={"black"}
      >
        Create a Post
      </CustomH1>
      <StyledForm onSubmit={handleSubmit}>
        <div className="settings">
          <CustomModal
            title={selected ? createPostSettings[selected].title : ""}
            className="post-modal"
            content={
              <RadioGroup
                flex={true}
                padding={"1.3rem 0"}
                onChange={handleData(selected)}
                options={options}
                value={data[selected]}
                defaultValue={data[selected]}
              />
            }
            onClose={closeModal}
            visible={modal}
            closable={false}
          />
          <div className="buttons">
            <DownArrowButton
              handleClick={showModal(shareWith)}
              label={data.shareWith}
              color={theme.colors.royalBlue}
              bgcolor={"#fff"}
              long="true"
            />
            <DownArrowButton
              handleClick={showModal(expires)}
              label={data.expires}
              color={theme.colors.royalBlue}
              bgcolor={"#fff"}
              long="true"
            />
          </div>
          <div className="inline">
            <RadioGroup
              onChange={handleData("help")}
              options={helpTypes.options}
              value={data.help}
              padding={"0"}
            />
            <span className="error-box">{renderError("help")}</span>
          </div>
        </div>
        <HorizontalLine />
        <div className="post-content">
          <label>
            <StyledInput
              onChange={handleData("title")}
              value={data.title}
              placeholder="Title"
            />
          </label>
          <span className="error-box">{renderError("title")}</span>
          <label>
            <StyledTextArea
              onChange={handleData("body")}
              value={data.body}
              placeholder="Write a post."
              rows={12}
            />
          </label>
          <span className="error-box">{renderError("body")}</span>
        </div>
        <HorizontalLine />
        <div className="tags">
          <AddTags addTag={addTag} filters={types} />
        </div>
        <SubmitButton
          title="Post"
          handleClick={handleSubmit}
          className="submit-btn"
        />
      </StyledForm>
    </CreatePostWrapper>
  );
};
