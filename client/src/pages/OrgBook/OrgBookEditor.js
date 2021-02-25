import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useReducer,
  useRef,
} from "react";
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
import OrgBookTableOfContents from "../../components/OrgBook/OrgBookTableOfContents";
import OrgBookModal from "../../components/OrgBook/OrgBookModal";

const { colors, typography } = theme;
const {
  darkerGray,
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
  flex-basis: 25%;
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

const OrgBookEditor = () => {
  const url = window.location.pathname.split("/");
  const organisationId = url[url.length - 1];
  const editOrgBookMode = url[url.length - 2];

  //const [isMobile, setIsMobile] = useState(false);

  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [currentEditOrgBookMode, setCurrentEditOrgBookMode] = useState(
    editOrgBookMode,
  );

  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganisationContext,
  );
  const { t } = useTranslation();
  const { loading, organisation } = orgProfileState;
  const history = useHistory();
  //const { name, email, global, needs } = organisation || {};

  const initialize = () => {
    // if (window.screen.width <= parseInt(mq.phone.wide.maxWidth)) {
    //   setIsMobile(true);
    // }
    if (editOrgBookMode === ORGBOOK_CREATE_MODE) {
      setCurrentEditOrgBookMode(ORGBOOK_CREATE_MODE);
      setCreateFormVisible(true);
    }
  };

  useEffect(initialize, []);

  useEffect(() => {
    (async function fetchProfile() {
      orgProfileDispatch(fetchOrganisation());
      try {
        const res = await axios.get(`/api/organisations/${organisationId}`);
        console.log(
          "in orgbookeditor, got res.data.orgBookPages: " +
            JSON.stringify(res.data.orgBookPages),
        );

        orgProfileDispatch(fetchOrganisationSuccess(res.data));
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

  const renderTableOfContents = () => {
    if (organisation) {
      return (
        <TableOfContentsSidebar>
          <OrgBookTableOfContents
            organisation={organisation}
            editOrgBookMode={currentEditOrgBookMode}
          ></OrgBookTableOfContents>
        </TableOfContentsSidebar>
      );
    }
  };

  const renderEditorSpace = () => {
    return (
      <div>
        <h1>OrgBook Editor here</h1>
      </div>
    );
  };

  const handleOnCreate = (formData) => {
    //console.log("in orgbook editorReceived values of form: ", values);
    console.log("pagename received is: " + formData.pagename);

    if (currentEditOrgBookMode === ORGBOOK_CREATE_MODE) {
      addFirstOrgBookDraftPage(formData);
    }
    setCreateFormVisible(false);
  };

  const addFirstOrgBookDraftPage = async (formData) => {
    let newPages = [];
    const newOrgBookPage = {
      name: formData.pagename,
      pageGroupNumber: 1,
      status: PAGE_CATEGORIES.draftCategory,
      created_by: organisation.ownerId, //this will have to be filled in by be when editors exist
      created_at: new Date().toLocaleString().replace(",", ""),
    };
    newPages.push(newOrgBookPage);
    let orgBookPages = {
      orgBookPages: newPages,
    };

    console.log("orgBookPages: " + JSON.stringify(orgBookPages));

    orgProfileDispatch(updateOrganisation());
    try {
      const res = await axios.patch(
        `/api/organisations/${organisationId}`,
        orgBookPages,
      );
      console.log(
        "res.data in addFirstOrgBookDraftPage" + JSON.stringify(res.data),
      );
      setCurrentEditOrgBookMode(ORGBOOK_EDIT_MODE);
      orgProfileDispatch(updateOrganisationSuccess(res.data));

      // handleSuccess(true);
      // setTimeout(() => {
      //   handleSuccess(false);
      // }, 10000);
      // handleUpdateError(false);
      // refetchUser();
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      console.log("err message: " + message);
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);
      // handleUpdateError(true);
      // handleSuccess(false);
      orgProfileDispatch(
        updateOrganisationError(
          `${t("error.failedUpdatingOrgProfile")} ${translatedErrorMessage}`,
        ),
      );
    }
  };

  const handleOnCancel = () => {
    setCreateFormVisible(false);
    history.push(`/organisation/${organisation._id}`);
  };

  return (
    <>
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
    </>
  );
};

const mapDispatchToProps = {
  refetchUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(withOrganisationContext(OrgBookEditor));
