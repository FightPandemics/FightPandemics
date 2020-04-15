import React from "react";
import FilterTag from "./FilterTag";

export default ({ filters }) => {
  debugger;
  return (
    <div>
      <p>Add tags to make your post more visible</p>
      {filters.map((filter, idx) => (
        <FilterTag label={filter} key={idx} />
      ))}
    </div>
  );
};
