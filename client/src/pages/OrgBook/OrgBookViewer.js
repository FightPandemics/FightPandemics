import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import { connect } from "react-redux";
import dompurify from "dompurify";
import { notification } from "antd";
import OrgBookViewerTableOfContents from "../../components/OrgBook/OrgBookViewerTableOfContents";
import OrgBookViewerTOCMobile from "../../components/OrgBook/OrgBookViewerTOCMobile";
import { LOGIN } from "templates/RouteWithSubRoutes";
import { useTranslation } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import GTM from "constants/gtm-tags";
import axios from "axios";
import locationIcon from "assets/icons/location.svg";
import edit from "assets/icons/edit.svg";
import envelopeBlue from "assets/icons/social-envelope-blue.svg";
import playStoreIcon from "assets/icons/play-store-icon.svg";
import appStoreIcon from "assets/icons/app-store-icon.svg";
import instagramIcon from "assets/icons/social-instagram.svg";
import linkedinBlue from "assets/icons/social-linkedin.svg";
import facebookIcon from "assets/icons/social-fb.svg";
import twitterBlue from "assets/icons/social-tw.svg";
import githubIcon from "assets/icons/social-github.svg";
import websiteIcon from "assets/icons/website-icon.svg";

import {
  ProfileLayout,
  UserInfoContainer,
  EditIcon,
  UserInfoDesktop,
  NameDiv,
  DescriptionDesktop,
  IconsContainer,
  SocialIcon,
  AvatarPhotoContainer,
  NamePara,
  ProfileBackgroup,
} from "../../components/Profile/ProfileComponents";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  TWITTER_URL,
  GITHUB_URL,
  APPSTORE_URL,
  PLAYSTORE_URL,
} from "constants/urls";
import ProfilePic from "../../components/Picture/ProfilePic";
import { getInitialsFromFullName } from "utils/userInfo";
import { ROYAL_BLUE } from "constants/colors";

const sanitizer = dompurify.sanitize;
const { colors, typography } = theme;
const { white, black } = colors;
const PAGE_CATEGORIES = {
  liveCategory: "live",
  draftCategory: "draft",
};

const LIVE_PAGE_VIEW_LEVELS = {
  publicView: "public",
  orgView: "org",
  notApplicable: "n/a",
};

const URLS = {
  playStore: [playStoreIcon, PLAYSTORE_URL],
  appStore: [appStoreIcon, APPSTORE_URL],
  facebook: [facebookIcon, FACEBOOK_URL],
  instagram: [instagramIcon, INSTAGRAM_URL],
  linkedin: [linkedinBlue, LINKEDIN_URL],
  twitter: [twitterBlue, TWITTER_URL],
  github: [githubIcon, GITHUB_URL],
  website: [websiteIcon],
  email: [envelopeBlue],
};

const JoinOrgContainer = styled.div`
  position: absolute;
  top: 15rem;
  height: 4.5rem;
  left: 0rem;
  z-index: 5;
  width: 100%;
  background-color: ${ROYAL_BLUE};
`;

const JoinOrgContainerMobile = styled.div`
  position: absolute;
  top: 15rem;
  height: 4.5rem;
  left: 20rem;
  z-index: 3;
  background-color: ${white};
`;

const JoinOrgButton = styled.button`
  margin-left: 70rem;
  right: 1rem;
  width: 9rem;
  height: 3rem;
  border-radius: 4rem;
  background-color: ${white};
  margin-right: 7rem;
`;

const JoinOrgButtonMobile = styled.button`
  right: 1rem;
  width: 9rem;
  height: 3rem;
  border-radius: 4rem;
  background-color: ${white};
`;

const JoinOrgLabel = styled.div`
  color: ${black};
  white-space: nowrap;
  font-size: ${typography.size.medium};
`;

const TOCSidebarAndPageContainer = styled.div`
  position: absolute;
  top: 40rem;
  bottom: 35rem;
  z-index: 5;
  width: 100%;
`;

const TOCSidebarAndPageWrapper = styled.div`
  margin-left: 3rem;
  margin-right: 3rem;
  display: grid;
  grid-template-columns: 30rem minmax(15rem, 100%);
  gap: 10px;
  grid-auto-rows: minmax(100%, 100%);
  grid-template-areas: "a b";

  overflow-y: auto; /*added*/
`;

const TableOfContentsSidebar = styled.div`
  grid-area: a;
  align-self: start;
  background-color: #f0f0f0;
  color: ${black};
  overflow-y: scroll;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

const TOCSidebarAndPageMobile = styled.div`
  position: absolute;
  top: 15rem;
  bottom: 35rem;
  width: 100%;
  left: 2rem;
`;

const OrgBookViewerContentBox = styled.div`
  grid-area: b;
  align-self: start;
  background-color: ${white};
`;

const PageContentWrapper = styled.div`
  height: 35vh;
  background-color: ${white};
  color: ${black};
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-color: light;
  padding: 0 0 0 0;

  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    height: 45vh;
    width: 30rem;
    scroll-behavior: auto;
  }
`;

export const NameParaViewerMobile = styled.p`
  overflow-wrap: break-word;
  text-align: left;
  color: #282828;
  padding: 0;
  overflow-wrap: break-word;
  margin: 0rem 0rem 0rem 2rem !important;
  text-align: left;
  max-width: 90%;
  font-family: Poppins;
  font-weight: 700;
  font-style: normal;
  font-size: 1.9rem;
  line-height: 1.9rem;
  letter-spacing: 0.05rem;
`;

export const OrgAddressViewerMobile = styled.p`
  overflow-wrap: break-word;
  text-align: left;
  margin: 0rem 0rem 0rem 2rem !important;
`;

const OrgBookViewerContentBoxMobile = styled.div`
  position: absolute;
  top: 6rem;
  z-index: 3;
  align-self: start;
  background-color: ${white};
  overflow-y: scroll;
`;

const OrgBookViewer = (props) => {
  const url = window.location.pathname.split("/");
  const sourceOrganisationId = url.length > 2 ? url[url.length - 1] : "";

  const [isMobile, setIsMobile] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [preSelectedPage, setPreselectedPage] = useState(null);
  const [organisationId, setOrganisationId] = useState("");
  const [organisation, setOrganisation] = useState(null);
  const [orgBookPages, setOrgBookPages] = useState(null);

  const history = useHistory();
  const { t } = useTranslation();

  const initialize = () => {
    if (window.screen.width <= parseInt(mq.phone.wide.maxWidth)) {
      setIsMobile(true);
    }
    loadOrgBookPages();
  };

  const loadOrgBookPages = async () => {
    if (sourceOrganisationId.length === 0) {
      setOrganisationId(props.organisationId);
      await getOrgBookPages(props.organisationId);
    } else {
      setOrganisationId(sourceOrganisationId);
      await getOrgBookPages(sourceOrganisationId);
    }
  };

  useEffect(initialize, []);

  const getOrgBookPages = async (orgId) => {
    try {
      const res = await axios.get(`/api/organisations/${orgId}`);
      setOrganisation(res.data);
      if (res.data.orgBookPages) {
        setOrgBookPages(res.data.orgBookPages);
        if (res.data.orgBookPages.length > 0) {
          const preSelPage = res.data.orgBookPages.find(
            (page) =>
              page.name === t("orgBook.welcome") &&
              page.status === PAGE_CATEGORIES.liveCategory,
          );
          setPreselectedPage(preSelPage);
          setSelectedPage(preSelPage);
        }
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);
      const title = t(`error.http.${"Internal Server Error"}`);
      notification.error({
        message: title,
        translatedErrorMessage,
      });
    }
  };

  const handleSelectPage = (page) => {
    setSelectedPage(orgBookPages.find((p) => p.pageId === page.pageId));
  };

  const handleEditClick = () => {
    history.push(`/orgbook-editor/edit/${organisation._id}`);
  };

  const renderURL = () => {
    const urlsAndEmail = {
      ...organisation.urls,
      email:
        props.organisationId === organisation._id ? null : organisation.email,
    };
    const getHref = (url) => (url.startsWith("http") ? url : `//${url}`);

    if (organisation) {
      if (urlsAndEmail.length !== 0) {
        return Object.entries(urlsAndEmail).map(([name, url]) => {
          let href;
          if (name === "website") {
            href = getHref(url);
          } else if (name === "email") {
            href = `mailto:${url}`;
          } else {
            href = `${URLS[name][1]}${url}`;
          }

          return (
            url && (
              <a
                href={href}
                key={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon
                  src={URLS[name][0]}
                  alt={name}
                  id={
                    name === "email"
                      ? GTM.organisation.orgPrefix + GTM.organisation.email
                      : ""
                  }
                />
              </a>
            )
          );
        });
      } else {
        return;
      }
    }
  };

  const isOrgMember = () => {
    if (!props.isAuthenticated) {
      return false;
    } else {
      if (props.user.id === organisation.ownerId) {
        return true;
      } else {
        const userOrg = props.user.organisations.find(
          (org) => org._id === organisation._id,
        );
        if (userOrg) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  const isOwner = () => {
    if (!props.isAuthenticated) {
      return false;
    } else {
      if (props.user.id === organisation.ownerId) {
        return true;
      } else {
        return false;
      }
    }
  };

  const showEditIcon = () => {
    if (isMobile) {
      return false;
    }
    return isOwner() ? true : false;
  };

  const renderTableOfContents = () => {
    let filteredOrgBookPages = [];
    if (isOrgMember()) {
      //if registered member, filter for all live pages (public and private)
      filteredOrgBookPages = organisation.orgBookPages.filter(
        (page) => page.status === PAGE_CATEGORIES.liveCategory,
      );
    } else {
      //if user is non-registered, show only live public pages
      filteredOrgBookPages = organisation.orgBookPages.filter(
        (page) =>
          page.viewLevel === LIVE_PAGE_VIEW_LEVELS.publicView &&
          page.status === PAGE_CATEGORIES.liveCategory,
      );
    }

    if (filteredOrgBookPages.length === 0) {
      return (
        <TableOfContentsSidebar>
          <span>no orgbook pages to show</span>
        </TableOfContentsSidebar>
      );
    }

    if (isMobile) {
      return (
        selectedPage && (
          <OrgBookViewerTOCMobile
            organisation={organisation}
            filteredOrgBookPages={filteredOrgBookPages}
            selectPage={handleSelectPage}
            preSelectedPage={preSelectedPage}
          ></OrgBookViewerTOCMobile>
        )
      );
    } else {
      return (
        selectedPage && (
          <TableOfContentsSidebar>
            <OrgBookViewerTableOfContents
              organisation={organisation}
              filteredOrgBookPages={filteredOrgBookPages}
              selectPage={handleSelectPage}
              preSelectedPage={preSelectedPage}
            ></OrgBookViewerTableOfContents>
          </TableOfContentsSidebar>
        )
      );
    }
  };

  return (
    <>
      {!isMobile ? <ProfileBackgroup /> : ""}

      {organisation && !isMobile ? (
        <ProfileLayout>
          <UserInfoContainer>
            <AvatarPhotoContainer>
              <ProfilePic
                user={organisation}
                initials={getInitialsFromFullName(organisation.name)}
              />
            </AvatarPhotoContainer>
            <UserInfoDesktop>
              <NameDiv>
                <div className="name-container">
                  <NamePara>{organisation.name}</NamePara>
                  {organisation.location.address && (
                    <div
                      title={organisation.location.address}
                      className="address-container"
                    >
                      <img
                        src={locationIcon}
                        alt={organisation.location.address}
                      />
                      {organisation.location.address}
                    </div>
                  )}
                </div>

                {organisation && !isOrgMember() ? (
                  <JoinOrgContainer>
                    <Link
                      onClick={() => {
                        sessionStorage.setItem(
                          "postredirect",
                          `/organisation/${organisationId}`, //will be `/organisation/${organisationId}/positions`
                        );
                      }}
                      to={{
                        pathname: LOGIN,
                        state: { from: window.location.pathname },
                      }}
                      id={GTM.orgBook.prefix + GTM.orgBook.joinOrgContainer}
                    >
                      <JoinOrgButton>
                        <JoinOrgLabel>{t("orgBook.joinUs")}</JoinOrgLabel>
                      </JoinOrgButton>
                    </Link>
                  </JoinOrgContainer>
                ) : (
                  ""
                )}

                {showEditIcon() && (
                  <EditIcon
                    src={edit}
                    id={GTM.organisation.orgPrefix + GTM.profile.modify}
                    onClick={handleEditClick}
                  />
                )}
              </NameDiv>
              {organisation.about && (
                <DescriptionDesktop> {organisation.about} </DescriptionDesktop>
              )}
              <IconsContainer>
                <div className="social-icons">{renderURL()}</div>
              </IconsContainer>
            </UserInfoDesktop>
          </UserInfoContainer>
        </ProfileLayout>
      ) : (
        ""
      )}

      {organisation && isMobile ? (
        <NameDiv>
          <div className="name-container">
            <NameParaViewerMobile>{organisation.name}</NameParaViewerMobile>
            {organisation.location.address && (
              <OrgAddressViewerMobile
                title={organisation.location.address}
                className="address-container"
              >
                <img src={locationIcon} alt={organisation.location.address} />
                {organisation.location.address}
              </OrgAddressViewerMobile>
            )}
          </div>
          {organisation && !isOrgMember() ? (
            <JoinOrgContainerMobile>
              <Link
                onClick={() => {
                  sessionStorage.setItem(
                    "postredirect",
                    `/organisation/${organisationId}`, //will be `/organisation/${organisationId}/positions`
                  );
                }}
                to={{
                  pathname: LOGIN,
                  state: { from: window.location.pathname },
                }}
                id={GTM.orgBook.prefix + GTM.orgBook.joinOrgContainer}
              >
                <JoinOrgButtonMobile>
                  <JoinOrgLabel>{t("orgBook.joinUs")}</JoinOrgLabel>
                </JoinOrgButtonMobile>
              </Link>
            </JoinOrgContainerMobile>
          ) : (
            ""
          )}
        </NameDiv>
      ) : (
        ""
      )}

      {organisation &&
        (isMobile ? (
          <TOCSidebarAndPageMobile>
            {renderTableOfContents()}
            <OrgBookViewerContentBoxMobile>
              {selectedPage && (
                <PageContentWrapper
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(selectedPage.content),
                  }}
                ></PageContentWrapper>
              )}
              {!selectedPage && (
                <PageContentWrapper
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(
                      "<p><span style='display: block; height: 500px'>&nbsp;</span></p>",
                    ),
                  }}
                ></PageContentWrapper>
              )}
            </OrgBookViewerContentBoxMobile>
          </TOCSidebarAndPageMobile>
        ) : (
          <TOCSidebarAndPageContainer>
            <TOCSidebarAndPageWrapper>
              {renderTableOfContents()}
              <OrgBookViewerContentBox>
                {selectedPage && (
                  <PageContentWrapper
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(selectedPage.content),
                    }}
                  ></PageContentWrapper>
                )}
                {!selectedPage && (
                  <PageContentWrapper
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(
                        "<p><span style='display: block; height: 500px'>&nbsp;</span></p>",
                      ),
                    }}
                  ></PageContentWrapper>
                )}
              </OrgBookViewerContentBox>
            </TOCSidebarAndPageWrapper>
          </TOCSidebarAndPageContainer>
        ))}
    </>
  );
};

const mapStateToProps = ({ session }) => {
  return {
    isAuthenticated: session.isAuthenticated,
    user: session.user,
  };
};

export default connect(mapStateToProps)(OrgBookViewer);
