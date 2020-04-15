import React, { useState } from "react";
import { Radio } from "antd";
import { Modal } from "antd-mobile";
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
  // debugger;

  const showModal = (setting) => (e) => {
    setModal(!modal);
    setOptions(setting.options);
    setSelected(setting.type);
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
        <Modal
          onClose={() => setModal(!modal)}
          maskClosable={true}
          closable={true}
          visible={modal}
          transparent
        >
          <Radio.Group
            onChange={(e) =>
              setSettings({ ...settings, [selected]: e.target.value })
            }
          >
            {options.map((option, idx) => (
              <Radio value={option} key={idx}>
                {option.text}
              </Radio>
            ))}
          </Radio.Group>
        </Modal>
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
          <Radio.Group
            onChange={(e) => setSettings({ ...settings, help: e.target.value })}
          >
            {helpTypes.options.map((option, idx) => (
              <Radio value={option} key={idx}>
                {option.text}
              </Radio>
            ))}
          </Radio.Group>
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
