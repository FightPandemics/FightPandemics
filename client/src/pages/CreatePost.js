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
import filterOptions from "../assets/data/filterOptions";

export default (props) => {
  const types = Object.values(filterOptions)[2].options;
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
            label={"Anyone"}
            color={ROYAL_BLUE}
            bgcolor={"#fff"}
            long="true"
          />
          <DownArrowButton
            label={"Forever"}
            color={ROYAL_BLUE}
            bgcolor={"#fff"}
            long="true"
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
