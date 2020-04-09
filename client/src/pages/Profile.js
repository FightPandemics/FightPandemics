import React from "react";
import { Flex, WhiteSpace } from "antd-mobile";
import { MenuOutlined } from "@ant-design/icons";

export const Profile = () => {
  return (
    <div style={profile}>
      <div style={wrapper}>
        <div style={backgroundHeader}>
          <div style={{ textAlign: "right" }}>
            <MenuOutlined
              style={{
                color: "#FFFFFF",
                fontSize: "2rem",
                marginTop: "3rem",
                marginRight: "2rem",
              }}
            />
          </div>
        </div>
        <div style={userInfo}>
          <div>Initials</div>
          <div>email</div>
          <div>location</div>
          <div></div>
        </div>
      </div>
      <WhiteSpace />
      <div style={sections}>
        <section>
          <div style={title}>About</div>
          <WhiteSpace />
          <div style={about}>
            {" "}
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna.
          </div>
        </section>
        <WhiteSpace />
        <section>
          <div style={title}>My activity</div>
          <WhiteSpace />
        </section>
      </div>
    </div>
  );
};

//styling

const wrapper = {
  height: "40vh",
};
const profile = {
  backgroundColor: "#F9F9F9",
  height: "100vh",
  width: "100vw",
  maxWidth: "100%",
  maxHeight: "100%",
  flexDirection: "row",
};

const backgroundHeader = {
  height: "20vh",
  left: "0",
  right: "0",
  backgroundColor: "#425AF2",
  borderBottomRightRadius: "30px",
  position: "absolute",
};

const userInfo = {
  height: "30vh",
  backgroundColor: "#FFFFFF",
  marginTop: "10vh",
  left: "0",
  right: "0",
  marginLeft: "2rem",
  marginRight: "2rem",
  borderRadius: "10px",
  position: "absolute",
  zIndex: "8",
  filter: "drop-shadow(5px 5px 20px black)",
};

const title = {
  color: "#939393",
  fontWeight: "lighter",
};

const sections = {
  // width: '100vw',
};

const about = {
  backgroundColor: "#FFFFFF",
  borderRadius: "5px",
};
