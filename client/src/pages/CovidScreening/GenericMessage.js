import React from "react";

const GenericMessage = (props) => {
  return props.msg.map((item, index) => <p key={index}> {item} </p>);
};

export default GenericMessage;
