// Core
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "antd-mobile";
import styled from "styled-components";
import { escapeRegExp } from "lodash"

// Local
import Heading from "components/Typography/Heading";
import PostCard from "./PostCard";
import TextAvatar from "components/TextAvatar";
import { buildLocationString } from "./utils";
import { getInitialsFromFullName } from "utils/userInfo";
import { PlaceholderIcon, IconsContainer, SocialIcon } from "../Profile/ProfileComponents";
import { mq } from "constants/theme";
import {
  FACEBOOK_URL,
  LINKEDIN_URL,
  LINKEDIN_INDIVIDUAL_URL,
  TWITTER_URL,
  GITHUB_URL,
  APPSTORE_URL,
  PLAYSTORE_URL
} from "constants/urls";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import statusIndicator from "assets/icons/status-indicator.svg";
import envelopeBlue from "assets/icons/mail.svg";
import facebookIcon from "assets/icons/social-facebook-unfilled.svg";
import githubIcon from "assets/icons/social-github.svg";
import linkedinBlue from "assets/icons/social-linkedin-unfilled.svg";
import twitterBlue from "assets/icons/social-twitter-unfilled.svg";
import websiteIcon from "assets/icons/social-website-blue.svg";
import playSotreIcon from "assets/icons/google-play.svg";
import appSotreIcon from "assets/icons/apple-app-store.svg";


const UserCard = styled(PostCard)`
  &.am-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .title-wrapper {
      padding-left: 2.7rem;
      .location-status {
        @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
          margin: 0 0.2rem 0;
        }
        margin: -1rem 0.2rem 0;
        .status-icon {
          transform: scale(1.7);
        }
      }
    }
    .content-wrapper {
      padding-left: 7.7rem;
      .post-description {
        color: #bdbdbd;
      }
    }
  }
`;

const UserName = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
`;
const UserTextAvatar = styled(TextAvatar)`
  height: 6rem;
  line-height: 6rem;
  width: 6rem;
  font-size: 2.5rem;
`;
const ProfileType = styled.span`
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
  color: #425af2;
  padding: 1rem 3rem 1rem 0.5rem;
  font-size: 1.3rem;
  font-weight: 300;
`;

const ProfileTypeMobile = styled(ProfileType)`
  display: none;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block;
  }
`;
const Goals = styled.span`
  float: right;
  padding: 0.3rem 1rem;
  margin: 5px;
  background: #425af2;
  color: white;
  border-radius: 40px;
`;
const SendMessage = styled(Link)`
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    span {
      display: none;
    }
  }
  padding-left: 7.7rem;
  color: #bdbdbd;
  img {
    margin-right: 7px;
  }
`;

const URLS = {
  github: [githubIcon, GITHUB_URL],
  facebook: [facebookIcon, FACEBOOK_URL],
  linkedin: [linkedinBlue, LINKEDIN_INDIVIDUAL_URL],
  twitter: [twitterBlue, TWITTER_URL],
  website: [websiteIcon],
  appStore: [playSotreIcon, APPSTORE_URL],
  playStore: [appSotreIcon, PLAYSTORE_URL]
};

const User = ({
  currentUser,
  highlightWords,
  isAuthenticated,
  user,
}) => {
  let _user;
  if (currentUser) {
    _user = currentUser;
  }

  const {
    _id,
    name,
    firstName,
    lastName,
    about,
    needs,
    objectives,
    urls,
    isLoading,
    page,
    global,
    industry,
    type,
    location,
  } = _user || {};

  const AvatarName =
    (_user &&
      getInitialsFromFullName(`${firstName? firstName : name} ${lastName? lastName : ''}`)) ||
    "";

  const getHref = (url) => (url.startsWith("http") ? url : `//${url}`);

  const Highlight = ({text = '', highlight = ''}) => {
    if (!highlight || !highlight.trim()) {
      return text
    }
    const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi')
    const parts = text.split(regex)
    return (
      parts.filter(part => part).map((part) => (
        regex.test(part) ? <span className={'highlighted'}>{part}</span> : part
      ))
    )
   }

  const renderExternalLinks = urls ? Object.entries(urls).map(([name, url]) => {
    return (
      url && (
        <a
          href={name === "website" ? getHref(url) : `${URLS[name][1]}${url}`}
          key={name}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialIcon src={URLS[name][0]} />
        </a>
      )
    );
  }) : '';

  const getUserGoals = (needs, objectives) => {
    const goals = [];
    if (needs && Object.values(needs).includes(true)) goals.push("Requesting Help");
    if (objectives && Object.values(objectives).includes(true)) goals.push("Offering Help");
    return goals;
  };

  const renderHeader = (
    <Card.Header
      title={
        <div className="title-wrapper">
          <UserName>
            <Highlight text={`${firstName? firstName : name} ${lastName? lastName : ''}`} highlight={highlightWords}/>
            <ProfileType>
              <SvgIcon
                src={statusIndicator}
                style={{ width: "4px", margin: "1px 10px" }}
              />
              {type}
              {getUserGoals(needs, objectives).map((goal) => {
                return <Goals>{goal}</Goals>;
              })}
            </ProfileType>
          </UserName>

          {global? (
            <div className="location-status">
              <SvgIcon src={statusIndicator} className="status-icon" />
              Global
          </div>
          ) : location?.country ? (
            <div className="location-status">
              <SvgIcon src={statusIndicator} className="status-icon" />
              {buildLocationString(_user.location)}
            </div>
          ) :  ("") }
          <ProfileTypeMobile>
            {getUserGoals(needs, objectives).map((goal) => {
              return <Goals style={{ float: "left" }}>{goal}</Goals>;
            })}
            <Goals style={{ float: "left" }}>{_user.type}</Goals>
          </ProfileTypeMobile>
        </div>
      }
      thumb={
        _user?.photo ? (
          _user.photo
        ) : (
          <UserTextAvatar>{AvatarName}</UserTextAvatar>
        )
      }
    />
  );

  const renderHeaderWithLink = (
    <Link to={`/${type.toLowerCase() == "individual"? 'profile' : 'organisation'}/${_id}`}>{renderHeader}</Link>
  );

  const renderContent = (
    <Card.Body className="content-wrapper">
      <Heading level={4} className="h4">
        <Highlight text={_user.about} highlight={highlightWords}/>
      </Heading>
      {/*<p className="post-description">?</p>*/}
    </Card.Body>
  );

  return (
    <>
      {
        //user in feed.
        <UserCard>
          <div className="card-header">{renderHeaderWithLink}</div>
          <Link to={`/${type.toLowerCase() == "individual"? 'profile' : 'organisation'}/${_id}`} style={{ display: "none" }}></Link>
          {renderContent}
          <IconsContainer>
            <SendMessage
              to={`/${type.toLowerCase() == "individual"? 'profile' : 'organisation'}/${_id}`}
            >
              <SvgIcon src={envelopeBlue} />
              <span>Send Message</span>
            </SendMessage>
            <PlaceholderIcon />
            {renderExternalLinks}
          </IconsContainer>
        </UserCard>
      }
    </>
  );
};

const mapStateToProps = ({ session: { isAuthenticated } }) => {
  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(User);
