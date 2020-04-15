import React from "react";
import { Radio } from "antd";
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
        <div className="buttons">
          <DownArrowButton
            long="true"
            border="true"
            label={"Anyone"}
            color={ROYAL_BLUE}
            bgcolor={"#fff"}
          />
          <DownArrowButton
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
