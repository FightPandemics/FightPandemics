import React from "react";
import styled from "styled-components";
import { Radio } from "antd";
import CustomH1 from "../components/Typography/Title/CustomH1";
import DownArrowButton from "../components/Button/DownArrowButton";
import HorizontalLine from "../components/Icon/horizontal-line";
import CreatePostForm from "../components//Forms/CreatePostForm";
import SubmitButton from "../components/Button/SubmitButton";
import { ROYAL_BLUE, DARK_GRAY } from "../constants/colors";

const CreatePostWrapper = styled.div`
  font-family: "Poppins";
  margin-top: 2rem;

  .title {
    margin: 0;
    margin-bottom: 0.5rem;
  }
  .settings {
    margin-bottom: 1rem;
    .buttons {
      margin-bottom: 0.5rem;
      a {
        margin-top: 0;
        margin-right: 1.8rem;
      }
    }
    .inline {
      margin-left: 0.2rem;
      span.ant-radio + * {
        color: #282828;
        font-size: 1.4rem;
        letter-spacing: 0;
      }
      .ant-radio-inner {
        border-color: #6076ef;
        border-width: 0.2rem;
        &::after {
          background-color: #6076ef;
          top: 0.2rem;
          left: 0.2rem;
        }
      }
    }
  }
  .submit-btn {
    font-family: "Poppins";
    background-color: ${ROYAL_BLUE};
  }
`;

export default (props) => {
  const { filters } = props.location.state;
  return (
    <CreatePostWrapper>
      <CustomH1
        className="title"
        fontsize={"2.2rem"}
        fontweight={"700"}
        color={"black"}
      >
        Create a Post
      </CustomH1>
      <div className="settings">
        <div className="buttons">
          <DownArrowButton
            long="true"
            border="true"
            label={"Anyone"}
            color={ROYAL_BLUE}
            bgcolor={"#fff"}
          />
          <DownArrowButton
            long="true"
            border="true"
            label={"Forever"}
            color={ROYAL_BLUE}
            bgcolor={"#fff"}
          />
        </div>
        <div className="inline">
          <Radio.Group>
            <Radio value={"looking"}>Looking for help</Radio>
            <Radio value={"offering"}>Offering to help</Radio>
          </Radio.Group>
        </div>
      </div>
      <HorizontalLine />
      <CreatePostForm />
      <HorizontalLine />
      <SubmitButton className="submit-btn" type="primary" title={"Post"} />
    </CreatePostWrapper>
  );
};
