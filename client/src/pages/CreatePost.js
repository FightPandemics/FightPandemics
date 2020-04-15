import React, { useState } from "react";
import { Radio } from "antd";
import SettingsSelect from "../components/CreatePost/SettingsSelect";
import CustomH1 from "../components/Typography/Title/CustomH1";
import DownArrowButton from "../components/Button/DownArrowButton";
import HorizontalLine from "../components/Icon/horizontal-line";
import CreatePostForm from "../components//Forms/CreatePostForm";
import SubmitButton from "../components/Button/SubmitButton";
import AddTags from "../components/Tag/AddTags";
import CreatePostStyled from "../components/CreatePost/CreatePostStyled";
import { ROYAL_BLUE } from "../constants/colors";

export default (props) => {
  const { filters } = props.location.state;
  const types = filters[2].options;
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setModal(!modal);
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
      {modal ? (
        <SettingsSelect onClose={() => setModal(!modal)} modal={modal} />
      ) : (
        ""
      )}
      <div className="settings">
        <div className="buttons">
          <DownArrowButton
            onClick={handleClick}
            long="true"
            border="true"
            label={"Anyone"}
            color={ROYAL_BLUE}
            bgcolor={"#fff"}
          />
          <DownArrowButton
            onClick={handleClick}
            long="true"
            border="true"
            label={"Forever"}
            color={ROYAL_BLUE}
            bgcolor={"#fff"}
          />
        </div>
        <div className="inline">
          <Radio.Group>
            <Radio value={"looking"}>Looking for help</Radio>
            <Radio value={"offering"}>Offering to help</Radio>
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
