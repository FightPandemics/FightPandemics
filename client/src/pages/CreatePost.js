import React, { useState } from "react";
import filterOptions from "../assets/data/filterOptions";
import createPostSettings from "../assets//data/createPostSettings";
import CustomModal from "../components/CreatePost/CustomModal";
import RadioGroup from "../components/CreatePost/RadioGroup";
import CustomH1 from "../components/Typography/Title/CustomH1";
import DownArrowButton from "../components/Button/DownArrowButton";
import HorizontalLine from "../components/Icon/horizontal-line";
import SubmitButton from "../components/Button/SubmitButton";
import AddTags from "../components/Tag/AddTags";
import CreatePostStyled from "../components/CreatePost/CreatePostStyled";
import { theme } from "../constants/theme";
import {
  StyledForm,
  StyledInput,
  StyledTextArea,
} from "../components/CreatePost/CreatePostForm";

const types = Object.values(filterOptions)[2].options;
const { shareWith, expires, helpTypes } = createPostSettings;

const initialState = {
  modal: false,
  options: [],
  selected: "",
  settings: {
    shareWith: shareWith.default,
    expires: expires.default,
    help: helpTypes.default,
  },
  content: {
    title: "",
    body: "",
  },
};

export default (props) => {
  const [modal, setModal] = useState(initialState.modal);
  const [options, setOptions] = useState(initialState.options);
  const [settings, setSettings] = useState(initialState.settings);
  const [selected, setSelected] = useState(initialState.selected);
  const [content, setContent] = useState(initialState.content);

  const showModal = (setting) => (e) => {
    setModal(!modal);
    setOptions(setting.options);
    setSelected(setting.type);
  };

  const closeModal = (e) => {
    setModal(!modal);
    setOptions([]);
    setSelected("");
  };

  const handleSettings = (e) => {
    setSettings({ ...settings, [selected]: e.target.value });
  };

  const handleInput = (type) => (e) => {
    setContent({ ...content, [type]: e.target.value });
  };

  return (
    <CreatePostStyled>
      <CustomH1
        className="title"
        fontsize={"2.2rem"}
        fontweight={"700"}
        color={"black"}
      >
        Create a Post
      </CustomH1>
      <div className="settings">
        <CustomModal
          title={selected ? createPostSettings[selected].title : ""}
          className="post-modal"
          content={
            <RadioGroup
              flex={true}
              padding={"1.3rem 0"}
              onChange={handleSettings}
              options={options}
              value={settings[selected]}
              defaultValue={settings[selected]}
            />
          }
          onClose={closeModal}
          visible={modal}
          closable={false}
        />
        <div className="buttons">
          <DownArrowButton
            handleClick={showModal(shareWith)}
            label={settings.shareWith.label}
            color={theme.colors.royalBlue}
            bgcolor={"#fff"}
            long="true"
          />
          <DownArrowButton
            handleClick={showModal(expires)}
            label={settings.expires.label}
            color={theme.colors.royalBlue}
            bgcolor={"#fff"}
            long="true"
          />
        </div>
        <div className="inline">
          <RadioGroup
            onChange={(e) => setSettings({ ...settings, help: e.target.value })}
            options={helpTypes.options}
            value={settings.help}
            padding={"0"}
          />
        </div>
      </div>
      <HorizontalLine />
      <StyledForm>
        <StyledInput
          onChange={handleInput("title")}
          value={content.title}
          placeholder="Title"
        />
        <StyledTextArea
          onChange={handleInput("body")}
          value={content.body}
          placeholder="Write a post."
          rows={12}
        />
      </StyledForm>
      <HorizontalLine />
      <AddTags filters={types} />
      <SubmitButton className="submit-btn" type="primary" title={"Post"} />
    </CreatePostStyled>
  );
};
