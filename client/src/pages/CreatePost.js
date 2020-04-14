import React from "react";
import styled from "styled-components";
import CustomH1 from "../components/Typography/Title/CustomH1";

const CreatePostWrapper = styled.div`
  font-famlily: "Poppins";
  padding: 2rem 0;
`;

export default (props) => {
  const { filters } = props.location.state;
  return (
    <CreatePostWrapper>
      <CustomH1 fontsize={"2.2rem"} fontweight={"700"} color={"black"}>
        Create a Post
      </CustomH1>
    </CreatePostWrapper>
  );
};
