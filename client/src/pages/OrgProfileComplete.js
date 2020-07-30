import React, { useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { WhiteSpace } from "antd-mobile";
import { theme, mq } from "../constants/theme";
import smiley from "../assets/icons/smiley.svg";
import { Link } from "react-router-dom";
import { refetchUser } from "actions/authActions";
import GTM from "constants/gtm-tags";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.offWhite};
`;

const SvgContainer = styled.div`
  width: 100%;
  img {
    margin: 0 auto;
    display: block;
    margin-top: 10vh;
  }
`;

const Heading = styled.h2`
  width: 100%;
  text-align: center;
  color: ${theme.colors.darkerGray};
  font-weight: bold;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: block;
  width: 22%;
  margin: 0 auto;
  @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
    width: 30%;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 50%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0 auto;
  font-weight: 500;
  display: block;
  text-align: center;
  background-color: ${theme.colors.white};
  font-size: ${theme.typography.size.large};
  color: ${theme.colors.royalBlue};
  line-height: 7rem;
  height: 7rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  &:hover {
    border: 1px solid ${theme.colors.royalBlue};
    color: ${theme.colors.royalBlue};
  }
`;

const OrgProfileComplete = ({ history, refetchUser }) => {
  useEffect(() => {
    refetchUser();
    // will only run once (on mount) to update navbar org list
  }, [refetchUser]);
  return (
    <Container>
      <WhiteSpace />
      <SvgContainer>
        <img src={smiley} alt=":)" />
      </SvgContainer>
      <WhiteSpace />
      <WhiteSpace />
      <Heading>Thank you for joining our community!</Heading>
      <WhiteSpace />
      <WhiteSpace />
      <WhiteSpace />
      <WhiteSpace />
      <ButtonsContainer>
        <StyledLink
          id={GTM.organisation.completedPrefix + GTM.profile.viewProfile}
          to={`/organisation/${history.location.state.orgId}`}
        >
          View my profile
        </StyledLink>
        <WhiteSpace />
        <WhiteSpace />
        <StyledLink
          id={GTM.organisation.completedPrefix + GTM.profile.continueToFeed}
          to="/feed"
        >
          Check the Help Board
        </StyledLink>
      </ButtonsContainer>
    </Container>
  );
};

const mapDispatchToProps = {
  refetchUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(OrgProfileComplete));
