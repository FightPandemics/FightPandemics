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
    shareWith: shareWith.default,
    expires: expires.default,
    help: helpTypes.default,
  },
};

export default (props) => {
  const [state, setState] = useState(initialState.state);
  const [data, setData] = useState(initialState.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
              label={data.shareWith.label}
              color={theme.colors.royalBlue}
              bgcolor={"#fff"}
              long="true"
            />
            <DownArrowButton
              handleClick={showModal(expires)}
              label={data.expires.label}
              color={theme.colors.royalBlue}
              bgcolor={"#fff"}
              long="true"
            />
          </div>
          <div className="inline">
            <RadioGroup
              onChange={(e) => setData({ ...data, help: e.target.value })}
              options={helpTypes.options}
              value={data.help}
              padding={"0"}
            />
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
          <label>
            <StyledTextArea
              onChange={handleData("body")}
              value={data.body}
              placeholder="Write a post."
              rows={12}
            />
          </label>
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
