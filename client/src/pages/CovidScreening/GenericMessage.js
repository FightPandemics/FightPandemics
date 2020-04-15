import React from "react";
export const GenericMessage = (props) => {
  return props.msg.map((item, index) => <p key={index}> {item} </p>);
};
