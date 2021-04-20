import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import { useSelector, connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import GTM from "constants/gtm-tags";
import axios from "axios";
import { selectOrganisationId } from "reducers/session";

import {
  ProfileLayout,
  UserInfoContainer,
  EditIcon,
  UserInfoDesktop,
  NameDiv,
  PlaceholderIcon,
  DescriptionDesktop,
  IconsContainer,
  SocialIcon,
  SectionHeader,
  CreatePostDiv,
  CreatePostIcon,
  //DrawerHeader,
  //CustomDrawer,
  PhotoUploadButton,
  AvatarPhotoContainer,
  NamePara,
  ProfileBackgroup,
} from "../../components/Profile/ProfileComponents";
import UploadPic from "../../components/Picture/UploadPic";
import ProfilePic from "../../components/Picture/ProfilePic";
import {
  getInitialsFromFullName,
  isAuthorOrg,
  isAuthorUser,
} from "utils/userInfo";

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
// const ORGBOOK_CREATE_MODE = "create";
// const ORGBOOK_EDIT_MODE = "edit";
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

/* const OrgBookEditorContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  color: ${black};
  background-color: ${offWhite};
  display: flex;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block;
    background-color: ${white};
  }
`; */

/* const TableOfContentsSidebar = styled.div`
  flex-basis: 30%;
  background-color: ${darkishGray};
  color: ${white};
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`; */

const OrgBookViewer = (props) => {
  const url = window.location.pathname.split("/");
  const sourceOrganisationId = url.length > 2 ? url[url.length - 1] : "";

  //const [isMobile, setIsMobile] = useState(false);

  const [selectedPage, setSelectedPage] = useState(null);
  const [organisation, setOrganisation] = useState(null);
  const [orgBookPages, setOrgBookPages] = useState(null);

  const history = useHistory();
  const { t } = useTranslation();

  const initialize = () => {
    // if (window.screen.width <= parseInt(mq.phone.wide.maxWidth)) {
    //   setIsMobile(true);
    // }()
    if (sourceOrganisationId.length === 0) {
      //if orgbook view depends on current user's particular org profile, get them from current session organisation
      setOrganisation(
        props.user.organisations.find(
          (org) => org._id === props.organisationId,
        ),
      );
      setOrgBookPages(
        props.user.organisations.find((org) => org._id === props.organisationId)
          .orgBookPages,
      );
    } else {
      //even though particular user not logged in as org, indiv user may still have an id in session
      if (props.user && props.isAuthenticated) {
        setOrganisation(
          props.user.organisations.find(
            (org) => org._id === sourceOrganisationId,
          ),
        );
        setOrgBookPages(
          props.user.organisations.find(
            (org) => org._id === sourceOrganisationId,
          ).orgBookPages,
        );
      } else {
        loadOrgBookPages(sourceOrganisationId);
      }
    }
  };

  useEffect(initialize, []);

  const loadOrgBookPages = async (organisationId) => {
    try {
      const res = await axios.get(`/api/organisations/${organisationId}`);
      // console.log(
      //   "in orgbookViewer, got res.data.orgBookPages for non-registered user: " +
      //     JSON.stringify(res.data.orgBookPages),
      // );
      setOrganisation(res.data);
      if (res.data.orgBookPages) {
        setOrgBookPages(res.data.orgBookPages);
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

  // const handleSelectPage = (page) => {
  //   setSelectedPage(currentOrgBookPages.find((p) => p.pageId === page.pageId));
  //   forceUpdate();
  // };

  // const handleBackBtnClick = () => {
  //   history.push(`/organisation/${organisation._id}`);
  // };

  const renderTableOfContents = () => {
    // if (organisation && currentOrgBookPages && currentOrgBookPages.length > 0) {
    //   let showAddNewPage = true;
    //   const highestPageIndex = getHighestPageGroupNumber();
    //   if (highestPageIndex === MAX_PAGEGROUP_NUMBER) {
    //     showAddNewPage = false;
    //   }
    //   return (
    //     <TableOfContentsSidebar>
    //       <OrgBookTableOfContents
    //         organisation={organisation}
    //         currentOrgBookPages={currentOrgBookPages}
    //         handleNewPageClick={handleNewPageClick}
    //         showAddNewPage={showAddNewPage}
    //         selectPage={handleSelectPage}
    //         preSelectedPage={preSelectedPage}
    //         handleBackBtnClick={handleBackBtnClick}
    //         selectedPageDirty={selectedPageDirty}
    //       ></OrgBookTableOfContents>
    //     </TableOfContentsSidebar>
    //   );
    // }
  };

  const renderViewerSpace = () => {
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
        <UserInfoContainer>
          <AvatarPhotoContainer>
            {organisation && (
              <ProfilePic
                user={organisation}
                initials={getInitialsFromFullName(organisation.name)}
              />
            )}
            <PhotoUploadButton>
              {organisation && props.organisationId == organisation._id && (
                <UploadPic
                  gtmPrefix={GTM.organisation.orgPrefix}
                  user={organisation}
                />
              )}
            </PhotoUploadButton>
          </AvatarPhotoContainer>
        </UserInfoContainer>
      </ProfileLayout>
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
