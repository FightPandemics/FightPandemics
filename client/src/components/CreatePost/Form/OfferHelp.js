import React from "react";
import { Tabs } from "antd";
import First from "./FirstSection";
import Second from "./SecondSection";
import Third from "./ThirdSection";
import { Footer, Submit } from "components/CreatePost/StyledModal";

const OfferHelp = ({
  formData,
  renderError,
  addTag,
  selectedTags,
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
        selectedTags={selectedTags}
        renderError={renderError}
        title="What are you offering"
      />
      <Third formData={formData} />
      <Footer>
        <Submit
          primary="true"
          onClick={handleSubmit}
          disabled={!formData.title || !formData.description || selectedTags.length === 0}
        >
          Post
        </Submit>
      </Footer>
    </>
  );
};

export default OfferHelp;
