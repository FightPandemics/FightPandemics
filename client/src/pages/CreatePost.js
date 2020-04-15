import React, { useState } from "react";
import CustomModal from "../components/CreatePost/CustomModal";
import RadioGroup from "../components/CreatePost/RadioGroup";
import CustomH1 from "../components/Typography/Title/CustomH1";
import DownArrowButton from "../components/Button/DownArrowButton";
import HorizontalLine from "../components/Icon/horizontal-line";
import CreatePostForm from "../components//Forms/CreatePostForm";
import SubmitButton from "../components/Button/SubmitButton";
import AddTags from "../components/Tag/AddTags";
import CreatePostStyled from "../components/CreatePost/CreatePostStyled";
import { ROYAL_BLUE } from "../constants/colors";
import filterOptions from "../assets/data/filterOptions";
import createPostSettings from "../assets//data/createPostSettings";

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
};

export default (props) => {
  const [modal, setModal] = useState(initialState.modal);
  const [options, setOptions] = useState(initialState.options);
  const [settings, setSettings] = useState(initialState.settings);
  const [selected, setSelected] = useState(initialState.selected);

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
          title={"Testing"}
          className="post-modal"
          content={
            <RadioGroup
              flex={true}
              onChange={handleSettings}
              options={options}
              value={settings[selected]}
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
            color={ROYAL_BLUE}
            bgcolor={"#fff"}
            long="true"
          />
          <DownArrowButton
            handleClick={showModal(expires)}
            label={settings.expires.label}
            color={ROYAL_BLUE}
            bgcolor={"#fff"}
            long="true"
          />
        </div>
        <div className="inline">
          <RadioGroup
            onChange={(e) => setSettings({ ...settings, help: e.target.value })}
            options={helpTypes.options}
            value={settings.help}
          />
        </div>
      </div>
      <HorizontalLine />
      <CreatePostForm />
      <HorizontalLine />
      <AddTags filters={types} />
      <SubmitButton className="submit-btn" type="primary" title={"Post"} />
    </CreatePostStyled>
  );
};
