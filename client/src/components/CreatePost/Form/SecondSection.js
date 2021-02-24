import React from "react";
import AddTags from "components/Tag/AddTags";
import Head from "./Head";
import { Section } from "components/CreatePost/StyledModal";
import filterOptions from "assets/data/filterOptions";

let types = Object.values(filterOptions)[2].options;
types = types.filter((val) => {
  return val.value !== "Remote Work";
});

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
