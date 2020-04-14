import React from "react";
import styled from "styled-components";
import CustomH1 from "../components/Typography/Title/CustomH1";
import DownArrowButton from "../components/Button/DownArrowButton";
import { ROYAL_BLUE } from "../constants/colors";

const CreatePostWrapper = styled.div`
  font-famlily: "Poppins";
  padding: 2rem 0;

  .select-options {
    margin-left: 0.5rem;
  }
`;

export default (props) => {
  const { filters } = props.location.state;
  return (
    <CreatePostWrapper>
      <CustomH1 fontsize={"2.2rem"} fontweight={"700"} color={"black"}>
        Create a Post
      </CustomH1>
      <div className="select-options">
        <DownArrowButton
          long={true}
          border={true}
          label={"Anyone"}
          color={ROYAL_BLUE}
          bgcolor={"#fff"}
        />
        <DownArrowButton
          long={true}
          border={true}
          label={"Forever"}
          color={ROYAL_BLUE}
          bgcolor={"#fff"}
        />
      </div>
    </CreatePostWrapper>
  );
};
