import React from "react";
import AddTags from "components/Tag/AddTags";
import Head from "./Head";
import { Section } from "components/CreatePost/StyledModal";
import filterOptions from "assets/data/filterOptions";

const types = Object.values(filterOptions)[2].options;

const Second = ({ addTag, selectedTags, title, renderError }) => {
  return (
    <Section>
      <Head number={2} title={title} />
      <div className="tags">
        <AddTags addTag={addTag} filters={types} selected={selectedTags} />
      </div>
      <span className="error-box">{renderError("tags")}</span>
    </Section>
  );
};

export default Second;
