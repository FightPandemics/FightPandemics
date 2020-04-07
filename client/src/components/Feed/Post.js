import React, { useState } from "react";
import styled from "styled-components";
import { Card, WhiteSpace } from "antd-mobile";
import FilterTag from "../../components/Tag/FilterTag";
import TextInput from "../../components/Input/TextInput";
import { ROYAL_BLUE, DARK_GRAY, SELAGO } from "../../constants/colors";

const CustomCard = styled(Card)`
  margin-bottom: 40px;
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
          margin-right: 7px;
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
      padding: 0;
      color: black;

      h1 {
        font-size: 21px;
        margin: 0;
      }

      p {
        font-size: 13.5px;
        line-height: 20px;
      }

      .view-more {
        color: ${ROYAL_BLUE};
        font-weight: bold;
      }

      .social-icons {
      }
      .social-icon {
        display: inline-block;
        color: ${DARK_GRAY};
        margin-right: 50px;
        img {
          margin-right: 10px;
        }
      }
    }
  }
`;

export default ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const {
    title,
    description,
    author,
    photoUrl,
    location,
    tags,
    numLikes,
    numComments,
    numShares,
  } = post;

  const thumbStyle = {
    borderRadius: "40px",
    width: "40px",
    height: "40px",
    maxWidth: "100%",
  };

  const commentStyles = {
    backgroundColor: SELAGO,
    width: "86%",
    borderBottom: "unset",
    borderRadius: "40px",
    padding: "14px",
  };

  const renderTags = () => {
    return tags.map((tag, idx) => (
      <FilterTag label={tag} selected={false} key={idx} />
    ));
  };

  return (
    <CustomCard>
      <Card.Header
        title={author}
        thumbStyle={thumbStyle}
        extra={<span># {location}</span>}
        thumb={photoUrl}
      />
      <WhiteSpace size="lg" />
      <Card.Body>{renderTags()}</Card.Body>
      <WhiteSpace />
      <Card.Body>
        <h1>{title}</h1>
        <p>{description}</p>
      </Card.Body>
      <WhiteSpace size="sm" />
      <Card.Body>
        <a class="view-more" href="">
          View More
        </a>
      </Card.Body>
      <Card.Body>
        <div class="social-icons">
          <div class="social-icon">
            <img
              style={{ width: "15px", height: "15px" }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsRidJC_XT8z0t0r4nqJF2YTxJp7xP80vCky7UPRmKxAeTXvde&usqp=CAU"
              alt="social"
            />
            <span>{numLikes}</span>
          </div>
          <div class="social-icon">
            <img
              style={{ width: "20px", height: "20px" }}
              src="https://lh3.googleusercontent.com/-W4_-RfoF-Gj1Heb6ZePq4SbNThOn8cPb9NCOiV0HuBrzSU-V2YHkTO4rz6wUOO1tY0"
              alt="social"
            />
            <span>{numComments}</span>
          </div>
          <div class="social-icon">
            <img
              style={{ width: "15px", height: "15px" }}
              src="https://library.kissclipart.com/20180830/iuw/kissclipart-arrow-bullet-icon-clipart-computer-icons-arrow-bul-da4eb4d84fc18db6.png"
              alt="social"
            />
            <span>{numShares}</span>
          </div>
        </div>
      </Card.Body>
      <Card.Body>
        <TextInput
          type={"text"}
          style={commentStyles}
          placeholder={"Write a comment ..."}
        />
      </Card.Body>
    </CustomCard>
  );
};
