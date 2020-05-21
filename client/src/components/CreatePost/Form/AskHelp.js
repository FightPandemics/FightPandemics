import React from "react";
import { Tabs } from "antd";
import First from "./FirstSection";
import Second from "./SecondSection";
import Third from "./ThirdSection";
import { Footer, Submit } from "components/CreatePost/StyledModal";

const { TabPane } = Tabs;

const AskHelp = ({
  formData,
  renderError,
  addTag,
  handleSubmit,
  handleFormData,
}) => {
  return (
    <>
      <First
        onChangeTitle={handleFormData("title")}
        onChangeDescription={handleFormData("description")}
        formData={formData}
        renderError={renderError}
      />
      <Second
        addTag={addTag}
        renderError={renderError}
        title="What do you need?"
      />
      <Third formData={formData} />
      <Footer>
        <Submit
          primary="true"
          onClick={handleSubmit}
          disabled={!formData.title || !formData.description}
        >
          Share
        </Submit>
      </Footer>
    </>
  );
};

export default AskHelp;
