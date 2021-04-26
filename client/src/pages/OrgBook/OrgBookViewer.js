import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import { connect } from "react-redux";
import OrgBookViewerTableOfContents from "../../components/OrgBook/OrgBookViewerTableOfContents";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
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
import UploadPic from "../../components/Picture/UploadPic";
import ProfilePic from "../../components/Picture/ProfilePic";
import { getInitialsFromFullName } from "utils/userInfo";

const { colors, typography } = theme;
const {
  lighterGray,
  white,
  royalBlue,
  black,
  offWhite,
  darkishGray,
  mediumGray,
} = colors;
const PAGE_CATEGORIES = {
  liveCategory: "live",
  draftCategory: "draft",
};

const VIEW_LEVELS = {
  //org (private), public correspond to live pages only
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

const TOCSidebarAndPageContainer = styled.div`
  position: absolute;
  top: 35rem;
  z-index: 5;
  width: 100%;
  margin-left: 5rem;
`;

const TOCSidebarAndPageWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  grid-auto-rows: 100px;
  grid-template-areas: "a a b b b b";
`;

const TableOfContentsSidebar = styled.div`
  grid-area: a;
  align-self: start;
  background-color: ${offWhite};
  color: ${black};
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

const OrgBookViewerContentBox = styled.div`
  grid-area: b;
  align-self: start;
  background-color: ${white};
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

  const loadOrgBookPages = () => {
    if (sourceOrganisationId.length === 0) {
      setOrganisationId(props.organisationId);
      getOrgBookPages(props.organisationId);
    } else {
      setOrganisationId(sourceOrganisationId);
      getOrgBookPages(sourceOrganisationId);
    }
  };

  useEffect(initialize, []);

  // useEffect(() => {
  //   if (props.organisationId && props.organisationId !== organisationId)  {
  //     setOrganisationId(props.organisationId);
  //     getOrgBookPages(props.organisationId);
  //   };
  //  }, [props.user]);

  const getOrgBookPages = async (orgId) => {
    try {
      const res = await axios.get(`/api/organisations/${orgId}`);
      //console.log('getting pages for orgid: ' + orgId)
      // console.log(
      //   "in orgbookViewer, got res.data.orgBookPagesr: " +
      //     JSON.stringify(res.data.orgBookPages),
      // );
      setOrganisation(res.data);
      if (res.data.orgBookPages) {
        setOrgBookPages(res.data.orgBookPages);
        if (res.data.orgBookPages.length > 0) {
          setPreselectedPage(
            res.data.orgBookPages.find(
              (page) =>
                page.name === "Welcome" &&
                page.status === PAGE_CATEGORIES.liveCategory,
            ),
          );
        }
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);
      console.log("got err:  " + message);
    }
  };

  const handleSelectPage = (page) => {
    setSelectedPage(orgBookPages.find((p) => p.pageId === page.pageId));
    //forceUpdate();
  };

  // const handleBackBtnClick = () => {
  //   history.push(`/organisation/${organisation._id}`);
  // };

  const handleEditClick = () => {
    history.push(`/orgbook-editor/edit/${organisation._id}`);
  };

  const renderURL = () => {
    const urlsAndEmail = {
      ...organisation.urls,
      email:
        props.organisationId == organisation._id ? null : organisation.email,
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

  const renderTableOfContents = () => {
    let filteredOrgBookPages = [];
    if (isOrgMember) {
      //if registered member, filter for all live pages (public and private)
      filteredOrgBookPages = organisation.orgBookPages.filter(
        (page) => page.status === PAGE_CATEGORIES.liveCategory,
      );
    } else {
      //if user is non-registered, show only live public pages
      filteredOrgBookPages = organisation.orgBookPages.filter(
        (page) =>
          page.viewLevel == VIEW_LEVELS.publicView &&
          page.status === PAGE_CATEGORIES.liveCategory,
      );
    }

    return (
      <TableOfContentsSidebar>
        {filteredOrgBookPages.length === 0 ? (
          <span>no orgbook pages to show</span>
        ) : (
          <OrgBookViewerTableOfContents
            organisation={organisation}
            filteredOrgBookPages={filteredOrgBookPages} //NEW
            selectPage={handleSelectPage}
            preSelectedPage={preSelectedPage}
          ></OrgBookViewerTableOfContents>
        )}
      </TableOfContentsSidebar>
    );
  };

  const renderViewerSpace = () => {
    return <div>viewer space here</div>;
    // const livePageExists = selectedPage
    //   ? livePageExistsForSelectedPage()
    //   : false;
    // if (organisation) {
    //   return (
    //     <OrgBookEditorSpace
    //       organisation={organisation}
    //       selectedPage={selectedPage || null}
    //       preSelectedPage={preSelectedPage}
    //       onClearPreselectedPage={() => setPreselectedPage(null)}
    //       PAGE_CATEGORIES={PAGE_CATEGORIES}
    //       UPDATE_ACTION_TYPES={UPDATE_ACTION_TYPES}
    //       onUpdateAction={handleUpdateAction}
    //       livePageExists={livePageExists}
    //       selectedPageDirty={selectedPageDirty}
    //       onSelectedPageDirty={handleSelectedPageDirty}
    //       VIEW_LEVELS={VIEW_LEVELS}
    //     ></OrgBookEditorSpace>
    //   );
    // }
  };

  //if (loading) return <div>"{t("profile.common.loading")}"</div>;

  return (
    <>
      <ProfileBackgroup />
      <ProfileLayout>
        {organisation && (
          <UserInfoContainer>
            <AvatarPhotoContainer>
              <ProfilePic
                user={organisation}
                initials={getInitialsFromFullName(organisation.name)}
              />
              {/*  {organisation && props.organisationId == organisation._id && (
              <PhotoUploadButton>
                <UploadPic
                  gtmPrefix={GTM.organisation.orgPrefix}
                  user={organisation}
                />
              </PhotoUploadButton>
            )} */}
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
                {props.organisationId == organisation._id && (
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
        )}
      </ProfileLayout>
      {organisation && (
        <TOCSidebarAndPageContainer>
          <TOCSidebarAndPageWrapper>
            {renderTableOfContents()}
            <OrgBookViewerContentBox>
              {renderViewerSpace()}
            </OrgBookViewerContentBox>
          </TOCSidebarAndPageWrapper>
        </TOCSidebarAndPageContainer>
      )}
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
