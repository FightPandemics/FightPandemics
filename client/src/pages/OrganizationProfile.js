import React from "react";
import styled from "styled-components";

import { theme } from "../constants/theme";

import ProfileInfo from "../components/Profile/ProfileInfo";

const Container = styled.div`
    min-height: 100vh;
    width: 64%;
`;

const OrganizationProfile = props => {

  return (
    <Container>
    <ProfileInfo />
    </Container>
  )
}

export default OrganizationProfile;
