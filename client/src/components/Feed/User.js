// Core
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "antd-mobile";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// Local
import Heading from "components/Typography/Heading";
import PostCard from "./PostCard";
import FilterTag from "components/Tag/FilterTag";
import TextAvatar from "components/TextAvatar";
import { buildLocationString } from "./utils";
import { getInitialsFromFullName } from "utils/userInfo";
import {
  PlaceholderIcon,
  IconsContainer,
  SocialIcon,
} from "../Profile/ProfileComponents";
import { mq } from "constants/theme";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  LINKEDIN_INDIVIDUAL_URL,
  TWITTER_URL,
  GITHUB_URL,
  APPSTORE_URL,
  PLAYSTORE_URL,
} from "constants/urls";
import { LOGIN } from "templates/RouteWithSubRoutes";

// Icons
import SvgIcon from "../Icon/SvgIcon";
import statusIndicator from "assets/icons/status-indicator.svg";
import envelopeBlue from "assets/icons/mail.svg";
import facebookIcon from "assets/icons/social-facebook-unfilled.svg";
import instagramIcon from "assets/icons/social-instagram-unfilled.svg";
import githubIcon from "assets/icons/social-github.svg";
import linkedinBlue from "assets/icons/social-linkedin-unfilled.svg";
import twitterBlue from "assets/icons/social-twitter-unfilled.svg";
import websiteIcon from "assets/icons/social-website-blue.svg";
import playStoreIcon from "assets/icons/play-store-icon.svg";
import appStoreIcon from "assets/icons/app-store-icon.svg";

const UserCard = styled(PostCard)`
  &.am-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      a {
        &:hover {
          color: inherit;
        }
      }
      .am-card-header {
        width: 100%;
      }
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
  font-size: 2rem;
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
  padding: 0 0.5rem;
  font-size: 1.3rem;
  font-weight: 300;
`;

const ProfileTypeMobile = styled(ProfileType)`
  display: none;
  float: left;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block;
  }
`;
const Goals = styled.span`
  float: right;
  padding: 0.3rem 1rem;
  margin: 0.5rem;
  background: #425af2;
  color: white;
  border-radius: 2rem;
`;
const SendMessage = styled(Link)`
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    span {
      display: none;
    }
    img {
      margin-top: -65%;
    }
  }
  &:hover {
    color: inherit;
  }
  padding-left: 7.7rem;
  color: #939393;
`;
const StyledCardHeader = styled(Card.Header)`
  img:not(.indicator):not(.status-icon) {
    width: 6rem !important;
    height: 6rem !important;
  }
`;
const URLS = {
  github: [githubIcon, GITHUB_URL],
  facebook: [facebookIcon, FACEBOOK_URL],
  instagram: [instagramIcon, INSTAGRAM_URL],
  linkedin: [linkedinBlue, LINKEDIN_INDIVIDUAL_URL],
  twitter: [twitterBlue, TWITTER_URL],
  website: [websiteIcon],
  appStore: [playStoreIcon, APPSTORE_URL],
  playStore: [appStoreIcon, PLAYSTORE_URL],
};

const User = ({ currentUser, highlightWords, isAuthenticated, user }) => {
  const { t } = useTranslation();
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
      getInitialsFromFullName(
        `${firstName ? firstName : name} ${lastName ? lastName : ""}`,
      )) ||
    "";

  const getHref = (url) => (url.startsWith("http") ? url : `//${url}`);

  const Highlight = ({ text = "", highlight = "" }) => {
    if (!highlight || !highlight.trim()) {
      return text;
    }
    let cleanKeywords = highlight.replace(/[.*+?^${}()|[\]\\\.]/g, "\\$&");
    let isLatin = /^[a-zA-Z .*+?^${}()|[\]\\\.]+$/.test(cleanKeywords);
    const regex = new RegExp(
      `(${
        cleanKeywords
          .split(/[ \/,=$%#()-]/gi)
          .filter(
            (key) =>
              key &&
              ((isLatin && key.length > 2) || (!isLatin && key.length > 1)),
          )
          .map((key) => (isLatin && key.length <= 3 ? key + "\\b" : key))
          .join("|") || "\\b\\B"
      })`,
      "ig",
    );
    const parts = text.split(regex);
    return parts
      .filter((part) => part)
      .map((part) =>
        regex.test(part) ? <span className={"highlighted"}>{part}</span> : part,
      );
  };

  const renderExternalLinks = urls
    ? Object.entries(urls).map(([name, url]) => {
        return (
          url &&
          (isAuthenticated ? (
            <a
              href={
                name === "website" ? getHref(url) : `${URLS[name][1]}${url}`
              }
              key={name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon src={URLS[name][0]} />
            </a>
          ) : (
            <Link
              onClick={() =>
                sessionStorage.setItem(
                  "postredirect",
                  `/${
                    type.toLowerCase() == "individual"
                      ? "profile"
                      : "organisation"
                  }/${_id}`,
                )
              }
              to={{
                pathname: LOGIN,
                state: { from: window.location.href },
              }}
            >
              <SocialIcon src={URLS[name][0]} />
            </Link>
          ))
        );
      })
    : "";

  const getUserGoals = (needs, objectives) => {
    const goals = [];
    if (needs && Object.values(needs).includes(true))
      goals.push(t("post.options.helpTypes.request"));
    if (objectives && Object.values(objectives).includes(true))
      goals.push(t("post.options.helpTypes.offer"));
    return goals;
  };

  const renderHeader = (
    <StyledCardHeader
      title={
        <div className="title-wrapper">
          <UserName>
            <Link
              to={`/${
                type.toLowerCase() == "individual" ? "profile" : "organisation"
              }/${_id}`}
            >
              <Highlight
                text={`${firstName ? firstName : name} ${
                  lastName ? lastName : ""
                }`}
                highlight={highlightWords}
              />
            </Link>
            <ProfileType>
              <SvgIcon
                src={statusIndicator}
                style={{ width: "0.5rem", margin: "0.11rem 1.1rem" }}
                className={"indicator"}
              />
              {t("feed.filters.providersOptions." + type)}
              {type == "Individual" &&
                getUserGoals(needs, objectives).map((goal) => {
                  return <Goals>{goal}</Goals>;
                })}
            </ProfileType>
          </UserName>

          {global ? (
            <div className="location-status">
              <SvgIcon src={statusIndicator} className="status-icon" />
              {t("profile.org.global")}
            </div>
          ) : location?.country ? (
            <div className="location-status">
              <SvgIcon src={statusIndicator} className="status-icon" />
              {buildLocationString(_user.location)}
            </div>
          ) : (
            ""
          )}
          <ProfileTypeMobile>
            {type == "Individual" &&
              getUserGoals(needs, objectives).map((goal, idx) => {
                return (
                  <FilterTag key={idx} disabled={true} selected={false}>
                    {goal}
                  </FilterTag>
                );
              })}
            <FilterTag disabled={true} selected={false}>
              {t("feed.filters.providersOptions." + type)}
            </FilterTag>
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

  const renderContent = (
    <Card.Body className="content-wrapper">
      <Heading level={4} className="h4">
        <Highlight text={_user.about} highlight={highlightWords} />
      </Heading>
      {/*<p className="post-description">?</p>*/}
    </Card.Body>
  );

  return (
    <>
      {
        //user in feed.
        <UserCard>
          <div className="card-header">
            <Link
              to={`/${
                type.toLowerCase() == "individual" ? "profile" : "organisation"
              }/${_id}`}
            >
              {renderHeader}
            </Link>
          </div>
          <Link
            to={`/${
              type.toLowerCase() == "individual" ? "profile" : "organisation"
            }/${_id}`}
            style={{ display: "none" }}
          ></Link>
          {renderContent}
          <IconsContainer>
            {isAuthenticated && type.toLowerCase() != "individual" ? (
              <SendMessage
                to={`/${
                  type.toLowerCase() == "individual"
                    ? "profile"
                    : "organisation"
                }/${_id}`}
              >
                <SvgIcon src={envelopeBlue} />
                <span> {t("profile.common.sendMessage")}</span>
              </SendMessage>
            ) : (
              type.toLowerCase() != "individual" && (
                <SendMessage
                  onClick={() =>
                    sessionStorage.setItem(
                      "postredirect",
                      `/${
                        type.toLowerCase() == "individual"
                          ? "profile"
                          : "organisation"
                      }/${_id}`,
                    )
                  }
                  to={{
                    pathname: LOGIN,
                    state: { from: window.location.href },
                  }}
                >
                  <SvgIcon src={envelopeBlue} />
                  <span> {t("profile.common.sendMessage")}</span>
                </SendMessage>
              )
            )}
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
