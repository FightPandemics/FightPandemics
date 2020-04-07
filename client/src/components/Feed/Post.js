import React, { useState } from "react";
import styled from "styled-components";
import { Card, WhiteSpace } from "antd-mobile";
import FilterTag from "../../components/Tag/FilterTag";
import TextInput from "../../components/Input/TextInput";
import { ROYAL_BLUE, DARK_GRAY, SELAGO } from "../../constants/colors";
import HeartIcon from "../Icon/heart";
import CommentIcon from "../Icon/comment";
import ShareIcon from "../Icon/share";
import StatusIcon from "../Icon/status-indicator";

const CustomCard = styled(Card)`
  margin-bottom: 65px;
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
        margin-left: 47px;
        margin-top: -13px;
        .status-icon {
          margin-right: 8px;
        }
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
        display: flex;
      }
      .social-icon {
        display: flex;
        align-items: center;
        color: ${DARK_GRAY};
        margin-right: 46px;
        .social-icon-svg {
          margin-right: 10px;
        }
        span {
          font-size: 15px;
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
      <FilterTag label={tag} selected={false} disabled={true} key={idx} />
    ));
  };

  return (
    <CustomCard>
      <Card.Header
        title={author}
        thumbStyle={thumbStyle}
        extra={
          <span>
            <StatusIcon className="status-icon" />
            {location}
          </span>
        }
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
        <a className="view-more" href="">
          View More
        </a>
      </Card.Body>
      <Card.Body>
        <div className="social-icons">
          <div className="social-icon">
            <HeartIcon className="social-icon-svg" />
            <span>{numLikes}</span>
          </div>
          <div className="social-icon">
            <CommentIcon className="social-icon-svg" />
            <span>{numComments}</span>
          </div>
          <div className="social-icon">
            <ShareIcon className="social-icon-svg" />
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
