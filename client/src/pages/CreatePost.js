import React from "react";
import styled from "styled-components";
import { Radio } from "antd";
import CustomH1 from "../components/Typography/Title/CustomH1";
import DownArrowButton from "../components/Button/DownArrowButton";
import { ROYAL_BLUE, DARK_GRAY } from "../constants/colors";

const CreatePostWrapper = styled.div`
  font-famlily: "Poppins";
  padding: 2rem 0;

  .title {
    margin: 0;
  }
  .settings {
    .buttons {
      margin-bottom: 0.5rem;
    }
    .inline {
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
    </CreatePostWrapper>
  );
};
