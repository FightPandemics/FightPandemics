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
  data: {
    title: "",
    body: "",
    shareWith: shareWith.default,
    expires: expires.default,
    help: helpTypes.default,
  },
};

export default (props) => {
  const [modal, setModal] = useState(initialState.modal);
  const [options, setOptions] = useState(initialState.options);
  const [selected, setSelected] = useState(initialState.selected);
  const [data, setData] = useState(initialState.data);

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

  const handleData = (key) => (e) => {
    setData({ ...data, [key]: e.target.value });
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
      <StyledForm>
        <StyledInput
          onChange={handleData("title")}
          value={data.title}
          placeholder="Title"
        />
        <StyledTextArea
          onChange={handleData("body")}
          value={data.body}
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
