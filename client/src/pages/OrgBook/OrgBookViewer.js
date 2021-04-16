import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { refetchUser } from "actions/authActions";
import {
  fetchOrganisation,
  fetchOrganisationError,
  fetchOrganisationSuccess,
  updateOrganisation,
  updateOrganisationError,
  updateOrganisationSuccess,
} from "hooks/actions/organisationActions";
import axios from "axios";
import {
  OrganisationContext,
  withOrganisationContext,
} from "../../context/OrganisationContext";
import { UserContext, withUserContext } from "context/UserContext";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "hooks/actions/userActions";
// import { Alert } from "antd";
// import SuccessAlert from "../../components/Alert/SuccessAlert";
// import OrgBookTableOfContents from "../../components/OrgBook/OrgBookTableOfContents";
// import OrgBookEditorSpace from "../../components/OrgBook/OrgBookEditorSpace";
// import OrgBookModal from "../../components/OrgBook/OrgBookModal";
// import OrgBookInfoModal from "../../components/OrgBook/OrgBookInfoModal";
// import OrgBookConfirmModal from "../../components/OrgBook/OrgBookConfirmModal";
// import { ORANGE_RED, WHITE } from "../../constants/colors";

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

const OrgBookViewer = () => {
  const url = window.location.pathname.split("/");
  const organisationId = url[url.length - 1];
  //const editOrgBookMode = url[url.length - 2];

  //const [isMobile, setIsMobile] = useState(false);

  const [selectedPage, setSelectedPage] = useState(null);
  //const [preSelectedPage, setPreselectedPage] = useState(null);
  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganisationContext,
  );
  const {
    userProfileState: { user },
    userProfileDispatch,
  } = useContext(UserContext);
  const { loading, organisation } = orgProfileState;
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentOrgBookPages, setCurrentOrgBookPages] = useState(null);

  const history = useHistory();
  const { t } = useTranslation();

  const initialize = () => {
    // if (window.screen.width <= parseInt(mq.phone.wide.maxWidth)) {
    //   setIsMobile(true);
    // }
  };

  useEffect(initialize, []);

  useEffect(() => {
    (async function fetchProfile() {
      userProfileDispatch(fetchUser());
      orgProfileDispatch(fetchOrganisation());
      try {
        const res = await axios.get(`/api/organisations/${organisationId}`);
        // console.log(
        //   "in orgbookeditor, got res.data.orgBookPages: " +
        //     JSON.stringify(res.data.orgBookPages),
        // );
        orgProfileDispatch(fetchOrganisationSuccess(res.data));
        if (res.data.orgBookPages && res.data.orgBookPages.length > 0) {
          setCurrentOrgBookPages(res.data.orgBookPages);
        }
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        const translatedErrorMessage = t([
          `error.${message}`,
          `error.http.${message}`,
        ]);
        console.log("got err:  " + message);
        orgProfileDispatch(
          fetchOrganisationError(
            `${t("error.failedLoadingProfile")} ${translatedErrorMessage}`,
          ),
        );
      }
    })();
    (async function fetchUserProfile() {
      userProfileDispatch(fetchUser());
      try {
        const res = await axios.get("/api/users/current");
        userProfileDispatch(fetchUserSuccess(res.data));
        setCurrentUserId(res.data.id);
        //console.log('user fetched: ' + JSON.stringify(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        const translatedErrorMessage = t([
          `error.${message}`,
          `error.http.${message}`,
        ]);
        userProfileDispatch(
          fetchUserError(
            `${t("error.failedLoadingProfile")} ${translatedErrorMessage}`,
          ),
        );
      }
    })();
  }, [orgProfileDispatch, organisationId, userProfileDispatch, t]);

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

  return <div>Orgbook Viewer</div>;
};

const mapDispatchToProps = {
  refetchUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(withUserContext(withOrganisationContext(OrgBookViewer)));
