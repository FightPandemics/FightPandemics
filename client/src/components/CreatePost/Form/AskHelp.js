import React from "react";
import First from "./FirstSection";
import Second from "./SecondSection";
import Third from "./ThirdSection";
import { Footer, Submit } from "components/CreatePost/StyledModal";
import createPostSettings from "assets/data/createPostSettings";

const { helpTypes } = createPostSettings;

const AskHelp = ({
  formData,
  renderError,
  addTag,
  selectedTags,
  onShareWithChange,
  onExpirationChange,
  handleSubmit,
  handleFormData,
}) => {
  if (!formData.help) {
    formData.help = helpTypes.options[1].value;
  }

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
        title="What do you need?"
      />
      <Third
        formData={formData}
        onShareWithChange={onShareWithChange}
        onExpirationChange={onExpirationChange}
      />
      <Footer>
        <Submit
          primary="true"
          onClick={handleSubmit}
          disabled={
            !formData.title ||
            !formData.description ||
            selectedTags.length === 0
          }
        >
          Post
        </Submit>
      </Footer>
    </>
  );
};

export default AskHelp;
