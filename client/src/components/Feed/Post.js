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
        margin-left: 47px;
        margin-top: -13px;
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
        margin-right: 50px;
        svg {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
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
        extra={
          <span>
            <svg
              width="6"
              height="6"
              style={{ marginRight: "8px" }}
              viewBox="0 0 6 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="3" cy="3" r="3" fill={ROYAL_BLUE} />
            </svg>
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
        <a class="view-more" href="">
          View More
        </a>
      </Card.Body>
      <Card.Body>
        <div class="social-icons">
          <div class="social-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3497 20.3074C12.5897 20.9974 11.4197 20.9974 10.6597 20.2974L10.5497 20.1974C5.29966 15.4474 1.86966 12.3374 1.99966 8.45741C2.05966 6.75741 2.92966 5.12741 4.33966 4.16741C6.97966 2.36741 10.2397 3.20741 11.9997 5.26741C13.7597 3.20741 17.0197 2.35741 19.6597 4.16741C21.0697 5.12741 21.9397 6.75741 21.9997 8.45741C22.1397 12.3374 18.6997 15.4474 13.4497 20.2174L13.3497 20.3074Z"
                fill="#425AF2"
              />
            </svg>

            <span>{numLikes}</span>
          </div>
          <div class="social-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2 0H18C19.1 0 20 0.9 20 2V14C20 15.1 19.1 16 18 16H4L0 20L0.01 2C0.01 0.9 0.9 0 2 0ZM15 7H5C4.45 7 4 7.45 4 8C4 8.55 4.45 9 5 9H15C15.55 9 16 8.55 16 8C16 7.45 15.55 7 15 7ZM11 12H5C4.45 12 4 11.55 4 11C4 10.45 4.45 10 5 10H11C11.55 10 12 10.45 12 11C12 11.55 11.55 12 11 12ZM5 6H15C15.55 6 16 5.55 16 5C16 4.45 15.55 4 15 4H5C4.45 4 4 4.45 4 5C4 5.55 4.45 6 5 6Z"
                fill={ROYAL_BLUE}
              />
            </svg>

            <span>{numComments}</span>
          </div>
          <div class="social-icon">
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.67148 17.4L19.1215 9.92002C19.9315 9.57002 19.9315 8.43002 19.1215 8.08002L1.67148 0.600017C1.01148 0.310017 0.281484 0.800017 0.281484 1.51002L0.271484 6.12002C0.271484 6.62002 0.641484 7.05002 1.14148 7.11002L15.2715 9.00002L1.14148 10.88C0.641484 10.95 0.271484 11.38 0.271484 11.88L0.281484 16.49C0.281484 17.2 1.01148 17.69 1.67148 17.4Z"
                fill={ROYAL_BLUE}
              />
            </svg>

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
