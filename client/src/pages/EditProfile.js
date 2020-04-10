import React from "react";
import { Popover, WhiteSpace } from "antd-mobile";
import { MenuOutlined, EditOutlined } from "@ant-design/icons";

// dummy data props,context, redux etc
const firstName = "Cees";
const lastName = "Wang";
const about =
  "  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diamnonummy nibh euismod tincidunt ut laoreet dolore magna";
const email = "ceeswang@Test.com";
const location = "NY, USA";
const needHelp = true;

function getInitials(firstName, lastName) {
  // function to get the initials given firstname and last name
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}

export const EditProfile = (props) => {
  // dummy data props,context, redux etc
  return (
    <div>
      <div style={initialsStyle}>{getInitials(firstName, lastName)}</div>
    </div>
  );
};

//styling

const initialsStyle = {
  marginBottom: "1rem",
  borderRadius: "50%",
  border: "0.2rem solid #425AF2",
  color: "#425AF2",
  fontSize: "3rem",
  lineHeight: "6rem",
  width: "6rem",
  textAlign: "center",
  backgroundColor: "rgba(66, 90, 245, 0.04)",
};
