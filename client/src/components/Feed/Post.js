import React from "react";
import styled from "styled-components";
import { Card, WingBlank, WhiteSpace } from "antd-mobile";

const CustomCard = styled(Card)`
  &.am-card,
  .am-card-body {
    &::before {
      content: normal !important;
    }
    .am-card-header {
      display: block;
      padding: 0;

      .am-card-header-content {
        align-items: unset;
        font-size: 15px;

        img {
          margin-top: -5px;
          margin-right: 10px;
        }
      }
      .am-card-header-extra {
        text-align: unset;
        font-size: 13px;
        margin-left: 52px;
        margin-top: -17px;
      }
    }
    .am-card-body {
      padding: 15px 0;
      color: black;

      h1 {
        font-size: 21px;
      }

      p {
        font-size: 13.5px;
        line-height: 20px;
      }
    }
  }
`;

export default ({ post }) => {
  const { title, description, author, location } = post;

  const thumbStyle = {
    borderRadius: "40px",
    width: "45px",
    height: "45px",
    maxWidth: "100%",
  };

  return (
    <CustomCard>
      <Card.Header
        title={author}
        thumb="https://www.pinclipart.com/picdir/middle/148-1486972_mystery-man-avatar-circle-clipart.png"
        thumbStyle={thumbStyle}
        extra={<span># {location}</span>}
      />
      <Card.Body>
        <h1>{title}</h1>
        <p>{description}</p>
      </Card.Body>
    </CustomCard>
  );
};
