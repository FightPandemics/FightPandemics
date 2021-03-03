import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
//import ReactDOM from "react-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
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
import { Alert } from "antd";
import SuccessAlert from "../../components/Alert/SuccessAlert";
import OrgBookTableOfContents from "../../components/OrgBook/OrgBookTableOfContents";
import OrgBookModal from "../../components/OrgBook/OrgBookModal";
import { ORANGE_RED, WHITE } from "../../constants/colors";

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
const ORGBOOK_CREATE_MODE = "create";
const ORGBOOK_EDIT_MODE = "edit";
const PAGE_CATEGORIES = {
  liveCategory: "live",
  draftCategory: "draft",
};
const MAX_PAGEGROUP_NUMBER = 5;

const OrgBookEditorContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  color: ${black};
  background-color: ${offWhite};
  display: flex;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block;
    background-color: ${white};
  }
`;

const TableOfContentsSidebar = styled.div`
  flex-basis: 30%;
  background-color: ${darkishGray};
  color: ${white};
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

const OrgBookEditorContentBox = styled.div`
  background-color: ${white};
  min-height: 100vh;
  padding-right: 1.5rem;
`;

const ErrorAlert = styled(Alert)`
  background-color: ${ORANGE_RED};
  margin: 3rem 6rem 0rem 0rem;
  z-index: 10;
  position: absolute;
  width: 30%;
  right: 1rem;
  border: none;
  border-radius: 0.5rem;
  .ant-alert-message {
    color: ${WHITE};
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin: auto;
    position: relative;
    width: 100%;
    right: 0rem;
  }
`;

export const Background = styled.div`
  width: 95%;
  background-color: ${mediumGray};
`;

const OrgBookEditor = () => {
  const url = window.location.pathname.split("/");
  const organisationId = url[url.length - 1];
  const editOrgBookMode = url[url.length - 2];

  //const [isMobile, setIsMobile] = useState(false);

  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [newPageFormVisible, setNewPageFormVisible] = useState(false);
  const [currentEditOrgBookMode, setCurrentEditOrgBookMode] = useState(
    editOrgBookMode,
  );
  const [isUpdateSuccess, handleSuccess] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isUpdateError, handleUpdateError] = useState(false);
  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganisationContext,
  );
  const { loading, organisation } = orgProfileState;
  const [currentOrgBookPages, setCurrentOrgBookPages] = useState(null);

  const history = useHistory();
  const { t } = useTranslation();

  const initialize = () => {
    // if (window.screen.width <= parseInt(mq.phone.wide.maxWidth)) {
    //   setIsMobile(true);
    // }
    if (editOrgBookMode === ORGBOOK_CREATE_MODE) {
      setCurrentEditOrgBookMode(ORGBOOK_CREATE_MODE);
      setCreateFormVisible(true);
    } else {
      setCurrentEditOrgBookMode(ORGBOOK_EDIT_MODE);
    }
  };

  useEffect(initialize, []);

  useEffect(() => {
    (async function fetchProfile() {
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
  }, [orgProfileDispatch, organisationId, t]);

  const handleOnCreate = (formData) => {
    //console.log("in orgbook editorReceived values of form: ", values);
    //console.log("in handleOnCreate, pagename received is: " + formData.pagename);
    if (currentEditOrgBookMode === ORGBOOK_CREATE_MODE) {
      addFirstOrgBookDraftPage(formData);
    }
    setCreateFormVisible(false);
  };

  const handleOnAdd = (formData) => {
    //console.log("in handleOnAdd, pagename received is: " + formData.pagename);
    addNewOrgBookDraftPage(formData);
    setNewPageFormVisible(false);
  };

  const getContentForNewPage = (pagename) => {
    return `<p><span style="font-size:11pt;font-family: Arial;">${pagename}</span></p>`;
  };

  const addFirstOrgBookDraftPage = (formData) => {
    let newPages = [];
    const newOrgBookPage = {
      name: formData.pagename,
      pageGroupNumber: 1,
      status: PAGE_CATEGORIES.draftCategory,
      locked: false,
      content: getContentForNewPage(formData.pagename),
      updated_by: "",
      updated_at: "",
      created_by: organisation.ownerId, //this will have to be filled in by be when editors exist
      created_at: new Date().toLocaleString().replace(",", ""),
    };
    newPages.push(newOrgBookPage);
    let orgBookPages = {
      orgBookPages: newPages,
    };
    updateOrgBookPages(orgBookPages);
  };

  const getHighestPageGroupNumber = () => {
    return Math.max.apply(
      Math,
      currentOrgBookPages.map(function (page) {
        return page.pageGroupNumber;
      }),
    );
  };

  const addNewOrgBookDraftPage = (formData) => {
    const highestPageIndex = getHighestPageGroupNumber();
    const newPageGroupNumber = highestPageIndex + 1;

    const newOrgBookPage = {
      name: formData.pagename,
      pageGroupNumber: newPageGroupNumber,
      status: PAGE_CATEGORIES.draftCategory,
      locked: false,
      content: getContentForNewPage(formData.pagename),
      updated_by: "",
      updated_at: "",
      created_by: organisation.ownerId, //this will have to be filled in by be when editors exist
      created_at: new Date().toLocaleString().replace(",", ""),
    };
    currentOrgBookPages.push(newOrgBookPage);
    let orgBookPages = {
      orgBookPages: currentOrgBookPages,
    };
    updateOrgBookPages(orgBookPages);
  };

  const updateOrgBookPages = async (orgBookPages) => {
    orgProfileDispatch(updateOrganisation());
    try {
      const res = await axios.patch(
        `/api/organisations/${organisationId}`,
        orgBookPages,
      );
      // console.log(
      //   "res.data in addFirstOrgBookDraftPage" + JSON.stringify(res.data));
      setCurrentEditOrgBookMode(ORGBOOK_EDIT_MODE);
      orgProfileDispatch(updateOrganisationSuccess(res.data));
      setCurrentOrgBookPages(res.data.orgBookPages);
      handleSuccess(true);
      setTimeout(() => {
        handleSuccess(false);
      }, 10000);
      handleUpdateError(false);
      refetchUser();
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      console.log("err message: " + message);
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);
      handleUpdateError(true);
      handleSuccess(false);
      orgProfileDispatch(
        updateOrganisationError(
          `${t("error.failedUpdatingOrgProfile")} ${translatedErrorMessage}`,
        ),
      );
    }
  };

  const handleOnCancel = () => {
    if (currentEditOrgBookMode === ORGBOOK_CREATE_MODE) {
      setCreateFormVisible(false);
      //setNewPageFormVisible(false);
      history.push(`/organisation/${organisation._id}`);
    } else {
      //setCreateFormVisible(false);
      setNewPageFormVisible(false);
    }
  };

  const handleSuccessClose = () => {
    handleSuccess(false);
  };

  const handleNewPageClick = () => {
    setNewPageFormVisible(true);
  };

  const handleSelectPage = (page) => {
    //console.log('in orgbookeditor, got page: ' + JSON.stringify(page));
    setSelectedPage(page);
  };

  const renderTableOfContents = () => {
    if (organisation && currentOrgBookPages && currentOrgBookPages.length > 0) {
      let showAddNewPage = true;
      const highestPageIndex = getHighestPageGroupNumber();
      if (highestPageIndex === MAX_PAGEGROUP_NUMBER) {
        showAddNewPage = false;
      }

      return (
        <TableOfContentsSidebar>
          <OrgBookTableOfContents
            organisation={organisation}
            currentOrgBookPages={currentOrgBookPages}
            handleNewPageClick={handleNewPageClick}
            showAddNewPage={showAddNewPage}
            selectPage={handleSelectPage}
          ></OrgBookTableOfContents>
        </TableOfContentsSidebar>
      );
    }
  };

  const renderEditorSpace = () => {
    if (!selectedPage) return "";

    return (
      <div>
        <h1>selected page: {selectedPage.name}</h1>
      </div>
    );
  };

  const renderNewPageModal = () => {
    const highestPageIndex = getHighestPageGroupNumber();
    const newDefaultPageName =
      t("orgBook.page") + (highestPageIndex + 1).toString();

    return (
      <Background>
        <OrgBookModal
          title={t("orgBook.newOrgBookPage")}
          okText={t("orgBook.add")}
          requiredPageNameMessage={t("orgBook.pleaseEnterPageNameAdd")}
          defaultPageName={newDefaultPageName}
          visible={newPageFormVisible}
          onCancel={handleOnCancel}
          onCreate={handleOnAdd}
        />
      </Background>
    );
  };

  if (newPageFormVisible) {
    return renderNewPageModal();
  }

  if (loading) return <div>"{t("profile.common.loading")}"</div>;

  return (
    <Background>
      {isUpdateSuccess ? (
        <>
          <SuccessAlert
            message={t("orgBook.updateSuccess")}
            closable
            afterClose={handleSuccessClose}
          />
        </>
      ) : isUpdateError ? (
        <>
          <ErrorAlert message={orgProfileState.error} />
        </>
      ) : (
        ""
      )}
      {currentEditOrgBookMode === ORGBOOK_CREATE_MODE ? (
        <OrgBookModal
          title={t("orgBook.newOrgBook")}
          okText={t("orgBook.create")}
          requiredPageNameMessage={t("orgBook.pleaseEnterPageNameCreate")}
          defaultPageName={t("orgBook.page1")}
          visible={createFormVisible}
          onCancel={handleOnCancel}
          onCreate={handleOnCreate}
        />
      ) : (
        <OrgBookEditorContainer>
          {renderTableOfContents()}
          <OrgBookEditorContentBox>
            {renderEditorSpace()}
          </OrgBookEditorContentBox>
        </OrgBookEditorContainer>
      )}
    </Background>
  );
};

const mapDispatchToProps = {
  refetchUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(withOrganisationContext(OrgBookEditor));
