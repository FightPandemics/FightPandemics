import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
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
import { Alert } from "antd";
import SuccessAlert from "../../components/Alert/SuccessAlert";
import OrgBookTableOfContents from "../../components/OrgBook/OrgBookTableOfContents";
import OrgBookEditorSpace from "../../components/OrgBook/OrgBookEditorSpace";
import OrgBookModal from "../../components/OrgBook/OrgBookModal";
import OrgBookInfoModal from "../../components/OrgBook/OrgBookInfoModal";
import OrgBookConfirmModal from "../../components/OrgBook/OrgBookConfirmModal";
import { ORANGE_RED, WHITE } from "../../constants/colors";

const { colors } = theme;
const { white, black, offWhite, darkishGray, mediumGray } = colors;
const ORGBOOK_CREATE_MODE = "create";
const ORGBOOK_EDIT_MODE = "edit";
const PAGE_CATEGORIES = {
  liveCategory: "live",
  draftCategory: "draft",
};
const UPDATE_ACTION_TYPES = {
  noAction: "none",
  saveProgressType: "saveProgress",
  republishType: "republish",
  renamePageType: "renamePage",
  publishType: "publish",
  unpublishType: "unpublish",
  deleteDraftType: "deleteDraft",
  undoAllChangesType: "undoAllChanges",
  changeLiveToPublicViewType: "changeLiveToPublic",
  changeLiveToPrivateViewType: "changeLiveToPrivateView",
  deleteOrgBookType: "deleteOrgBook",
};
const UNPUBLISH_OPTIONS = {
  leaveDraftContent: 1,
  replaceDraftContent: 2,
};
const PUBLISH_OPTIONS = {
  publicView: 1,
  privateView: 2,
};
const LIVE_PAGE_VIEW_LEVELS = {
  publicView: "public",
  orgView: "org",
  notApplicable: "n/a",
};

const MAX_PAGEGROUP_NUMBER = 5;
const MAX_CHARACTERS_OF_CONTENT = 500000;
const MIN_CHARACTERS_OF_CONTENT = 5;

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
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
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

export const ModalMount = styled.div`
  id: modalMount;
  display: inline-block;
  width: 95%;
  position: fixed;
  top: 6rem;
  right: 0;
  bottom: 0;
  left: 0;
`;

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

const OrgBookEditor = () => {
  const url = window.location.pathname.split("/");
  const organisationId = url[url.length - 1];
  const editOrgBookMode = url[url.length - 2];

  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [newPageFormVisible, setNewPageFormVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [renamePageFormVisible, setRenamePageFormVisible] = useState(false);
  const [maxContentExceeded, setMaxContentExceeded] = useState(false);
  const [minContentNotMet, setMinContentNotMet] = useState(false);
  const [noOfContentChars, setNoOfContentChars] = useState(0);
  const [targetPageId, setTargetPageId] = useState("");
  const [currentUpdateAction, setCurrentUpdateAction] = useState(
    UPDATE_ACTION_TYPES.noAction,
  );
  const [currentEditOrgBookMode, setCurrentEditOrgBookMode] = useState(
    editOrgBookMode,
  );
  const [isUpdateSuccess, handleSuccess] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [preSelectedPage, setPreselectedPage] = useState(null);
  const [selectedPageDirty, setSelectedPageDirty] = useState(false);
  const [isUpdateError, handleUpdateError] = useState(false);
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
  const [isOwner, setIsOwner] = useState(false);
  const forceUpdate = useForceUpdate();

  const history = useHistory();
  const { t } = useTranslation();

  const initialize = () => {
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
      userProfileDispatch(fetchUser());
      orgProfileDispatch(fetchOrganisation());
      try {
        const res = await axios.get(`/api/organisations/${organisationId}`);
        setIsOwner(res.data.isOwner);
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

  const handleOnCreate = (formData) => {
    if (currentEditOrgBookMode === ORGBOOK_CREATE_MODE) {
      addFirstOrgBookPages(formData);
    }
    setCreateFormVisible(false);
  };

  const handleOnAdd = (formData) => {
    addNewOrgBookDraftPage(formData);
    setNewPageFormVisible(false);
  };

  const getContentForNewPage = (pagename) => {
    const title =
      pagename === t("orgBook.welcome")
        ? t("orgBook.welcomeToOrgBook")
        : pagename;
    //if any new properties get changed or oadded, make sure to include a space after semi-colon (due to tinymce updating)
    return `<p><span style="display: block; text-align: center; font-size: 24px; font-family: Arial;">${title}</span></p><p>&nbsp;</p>`;
  };

  const addFirstOrgBookPages = (formData) => {
    let newPages = [];

    //create live for first/Welcome page - default to public view
    let newOrgBookPage = getNewOrgBookPage(
      formData.pagename,
      1,
      PAGE_CATEGORIES.liveCategory,
      getContentForNewPage(formData.pagename),
    );
    newPages.push(newOrgBookPage);

    //create draft for first/Welcome page
    newOrgBookPage = getNewOrgBookPage(
      formData.pagename,
      1,
      PAGE_CATEGORIES.draftCategory,
      getContentForNewPage(formData.pagename),
    );
    newPages.push(newOrgBookPage);

    const liveWelcomePage = newPages.find(
      (page) =>
        page.pageGroupNumber === 1 &&
        page.status === PAGE_CATEGORIES.liveCategory,
    );

    //preselect live Welcome page
    setSelectedPage(liveWelcomePage);
    setPreselectedPage(liveWelcomePage);

    setSelectedPageDirty(false);
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

  const getNewOrgBookPage = (
    pageName,
    pageGroupNumber,
    category,
    content,
    publishOption = null,
  ) => {
    let viewLevel = LIVE_PAGE_VIEW_LEVELS.notApplicable;
    if (category !== PAGE_CATEGORIES.draftCategory) {
      if (publishOption && publishOption === PUBLISH_OPTIONS.privateView) {
        viewLevel = LIVE_PAGE_VIEW_LEVELS.orgView;
      } else {
        viewLevel = LIVE_PAGE_VIEW_LEVELS.publicView;
      }
    }

    return {
      pageId: uuidv4(),
      name: pageName,
      pageGroupNumber: pageGroupNumber,
      status: category,
      locked: false,
      viewLevel: viewLevel,
      content: content,
      updated_by: "",
      updated_at: "",
      created_by: currentUserId,
      created_at: moment(new Date()).utc().format("YYYY-MM-DD HH:mm:ss"),
    };
  };

  const addNewOrgBookDraftPage = (formData) => {
    const highestPageIndex = getHighestPageGroupNumber();
    const newPageGroupNumber = highestPageIndex + 1;

    const newOrgBookPage = getNewOrgBookPage(
      formData.pagename,
      newPageGroupNumber,
      PAGE_CATEGORIES.draftCategory,
      getContentForNewPage(formData.pagename),
    );

    currentOrgBookPages.push(newOrgBookPage);
    setSelectedPage(newOrgBookPage);
    setPreselectedPage(newOrgBookPage);
    setSelectedPageDirty(false);
    let orgBookPages = {
      orgBookPages: currentOrgBookPages,
    };
    updateOrgBookPages(orgBookPages);
  };

  const handleOnRename = (formData) => {
    renameOrgBookPage(formData);
    setRenamePageFormVisible(false);
  };

  const renameOrgBookPage = (formData) => {
    const oldOrgBookPages = [...currentOrgBookPages];
    const newOrgBookPages = oldOrgBookPages.map((page) =>
      page.pageGroupNumber === selectedPage.pageGroupNumber
        ? {
            ...page,
            name: formData.pagename,
            updated_by: currentUserId,
            updated_at: moment(new Date()).utc().format("YYYY-MM-DD HH:mm:ss"),
          }
        : page,
    );
    const orgBookPages = {
      orgBookPages: newOrgBookPages,
    };
    setCurrentOrgBookPages(newOrgBookPages);
    setSelectedPage(
      newOrgBookPages.find((page) => page.pageId === selectedPage.pageId),
    );
    setPreselectedPage(
      newOrgBookPages.find((page) => page.pageId === selectedPage.pageId),
    );
    updateOrgBookPages(orgBookPages);
  };

  const updateOrgBookPages = async (orgBookPages) => {
    orgProfileDispatch(updateOrganisation());
    try {
      const res = await axios.patch(
        `/api/organisations/${organisationId}`,
        orgBookPages,
      );
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
      history.push(`/organisation/${organisation._id}`);
    } else {
      setNewPageFormVisible(false);
      setRenamePageFormVisible(false);
    }
  };

  const handleSuccessClose = () => {
    handleSuccess(false);
  };

  const handleNewPageClick = () => {
    setNewPageFormVisible(true);
  };

  const handleSelectPage = (page) => {
    setSelectedPage(currentOrgBookPages.find((p) => p.pageId === page.pageId));
    forceUpdate();
  };

  const handleOnClose = () => {
    setInfoModalVisible(false);
  };

  const handleUpdateAction = (
    action,
    targetPageId,
    editedpageContent,
    numberOfCharacters,
  ) => {
    setMaxContentExceeded(false);
    setMinContentNotMet(false);
    if (selectedPage) {
      selectedPage.content = editedpageContent;
    }
    setNoOfContentChars(numberOfCharacters);
    setTargetPageId(targetPageId);

    switch (action) {
      case UPDATE_ACTION_TYPES.saveProgressType:
      case UPDATE_ACTION_TYPES.republishType:
      case UPDATE_ACTION_TYPES.publishType:
        if (numberOfCharacters >= MAX_CHARACTERS_OF_CONTENT) {
          setMaxContentExceeded(true);
          setInfoModalVisible(true);
        } else {
          if (numberOfCharacters < MIN_CHARACTERS_OF_CONTENT) {
            setMinContentNotMet(true);
            setInfoModalVisible(true);
          } else {
            setCurrentUpdateAction(action);
            setConfirmModalVisible(true);
          }
        }
        break;

      case UPDATE_ACTION_TYPES.unpublishType:
        setCurrentUpdateAction(action);
        setConfirmModalVisible(true);
        break;

      case UPDATE_ACTION_TYPES.renamePageType:
        setRenamePageFormVisible(true);
        break;

      case UPDATE_ACTION_TYPES.deleteDraftType:
        setCurrentUpdateAction(action);
        setConfirmModalVisible(true);
        break;

      case UPDATE_ACTION_TYPES.changeLiveToPublicViewType:
      case UPDATE_ACTION_TYPES.changeLiveToPrivateViewType:
        setCurrentUpdateAction(action);
        setConfirmModalVisible(true);
        break;

      case UPDATE_ACTION_TYPES.deleteOrgBookType:
        setCurrentUpdateAction(action);
        setConfirmModalVisible(true);
        break;

      default:
        break;
    }
  };

  const handleOnConfirm = async (action, option = null) => {
    let orgBookPages = {};

    switch (action) {
      case UPDATE_ACTION_TYPES.saveProgressType:
      case UPDATE_ACTION_TYPES.republishType:
        orgBookPages = replaceContentForSelectedPage(orgBookPages, true);
        updateOrgBookPages(orgBookPages);

        break;

      case UPDATE_ACTION_TYPES.publishType:
        orgBookPages = replaceContentForSelectedPage(orgBookPages, false);
        orgBookPages = saveLivePageForPublish(orgBookPages, option);
        updateOrgBookPages(orgBookPages);

        break;

      case UPDATE_ACTION_TYPES.unpublishType:
        const draftPageExists = draftPageExistsForSelectedPage();

        if (!draftPageExists) {
          //if no draft exists, change status of live page to draft and keep content as is
          unPublishLiveToDraft();
        } else {
          const draftContent = currentOrgBookPages.find(
            (page) =>
              page.pageGroupNumber === selectedPage.pageGroupNumber &&
              page.status === PAGE_CATEGORIES.draftCategory,
          ).content;

          if (draftContent === selectedPage.content) {
            //If the content is the same on live and draft, just remove live page and keep draft content as is
            unpublishRemoveLive();
          } else {
            //If the content is different on live and draft, leave or replace draft content for option user chose
            unpublishHandleOption(option);
          }
        }

        break;

      case UPDATE_ACTION_TYPES.deleteDraftType:
        setConfirmModalVisible(false);
        orgBookPages = deleteSelectedPage(orgBookPages);
        await updateOrgBookAndCheckForReturn(orgBookPages);

        break;

      case UPDATE_ACTION_TYPES.changeLiveToPublicViewType:
      case UPDATE_ACTION_TYPES.changeLiveToPrivateViewType:
        orgBookPages = updateViewTypeForSelectedPage(orgBookPages, action);
        updateOrgBookPages(orgBookPages);

        break;

      case UPDATE_ACTION_TYPES.deleteOrgBookType:
        setConfirmModalVisible(false);
        orgBookPages = deleteOrgBook();
        await updateOrgBookAndCheckForReturn(orgBookPages);

        break;

      default:
        break;
    }
    setSelectedPageDirty(false);
    if (action !== UPDATE_ACTION_TYPES.deleteDraftType) {
      setConfirmModalVisible(false);
    }
    setCurrentUpdateAction(UPDATE_ACTION_TYPES.noAction);
  };

  const updateOrgBookAndCheckForReturn = async (orgBookPages) => {
    setCurrentOrgBookPages(orgBookPages);
    await updateOrgBookPages(orgBookPages);
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUpdateAction(UPDATE_ACTION_TYPES.noAction);
        if (orgBookPages.orgBookPages.length == 0) {
          history.push(`/organisation/${organisation._id}`);
        }
        resolve(null);
      }, 200);
    });
  };

  const replaceContentForSelectedPage = (orgBookPages, preSelectPage) => {
    const oldOrgBookPages = [...currentOrgBookPages];
    const newOrgBookPages = oldOrgBookPages.map((page) =>
      page.pageId === selectedPage.pageId
        ? {
            ...page,
            content: selectedPage.content,
            updated_by: currentUserId,
            updated_at: moment(new Date()).utc().format("YYYY-MM-DD HH:mm:ss"),
          }
        : page,
    );
    orgBookPages = {
      orgBookPages: newOrgBookPages,
    };
    setCurrentOrgBookPages(newOrgBookPages);
    setSelectedPage(
      newOrgBookPages.find((page) => page.pageId === selectedPage.pageId),
    );
    if (preSelectPage) {
      setPreselectedPage(
        newOrgBookPages.find((page) => page.pageId === selectedPage.pageId),
      );
    }
    return orgBookPages;
  };

  const livePageExistsForSelectedPage = () => {
    if (
      !currentOrgBookPages ||
      currentOrgBookPages.length === 0 ||
      !selectedPage
    ) {
      return false;
    }
    return currentOrgBookPages.some(
      (page) =>
        page.pageGroupNumber == selectedPage.pageGroupNumber &&
        page.status === PAGE_CATEGORIES.liveCategory,
    )
      ? true
      : false;
  };

  const draftPageExistsForSelectedPage = () => {
    if (
      !currentOrgBookPages ||
      currentOrgBookPages.length === 0 ||
      !selectedPage
    ) {
      return false;
    }
    return currentOrgBookPages.some(
      (page) =>
        page.pageGroupNumber == selectedPage.pageGroupNumber &&
        page.status === PAGE_CATEGORIES.draftCategory,
    )
      ? true
      : false;
  };

  const saveLivePageForPublish = (updatedOrgBookPages, option) => {
    let orgBookPages = {};
    const livePageExists = livePageExistsForSelectedPage();

    if (!livePageExists) {
      const newOrgBookPage = getNewOrgBookPage(
        selectedPage.name,
        selectedPage.pageGroupNumber,
        PAGE_CATEGORIES.liveCategory,
        selectedPage.content,
        option,
      );

      updatedOrgBookPages.orgBookPages.push(newOrgBookPage);
      setCurrentOrgBookPages(updatedOrgBookPages.orgBookPages);
      setSelectedPage(newOrgBookPage);
      setPreselectedPage(newOrgBookPage);
      orgBookPages = {
        orgBookPages: updatedOrgBookPages.orgBookPages,
      };
    } else {
      //overwrite existing live page
      const newOrgBookPages = updatedOrgBookPages.orgBookPages.map((page) =>
        page.pageGroupNumber === selectedPage.pageGroupNumber &&
        page.status === PAGE_CATEGORIES.liveCategory
          ? {
              ...page,
              viewLevel:
                option === PUBLISH_OPTIONS.privateView
                  ? LIVE_PAGE_VIEW_LEVELS.orgView
                  : LIVE_PAGE_VIEW_LEVELS.publicView,
              content: selectedPage.content,
              updated_by: currentUserId,
              updated_at: moment(new Date())
                .utc()
                .format("YYYY-MM-DD HH:mm:ss"),
            }
          : page,
      );
      orgBookPages = {
        orgBookPages: newOrgBookPages,
      };
      setCurrentOrgBookPages(newOrgBookPages);
      setSelectedPage(
        newOrgBookPages.find(
          (page) =>
            page.pageGroupNumber === selectedPage.pageGroupNumber &&
            page.status === PAGE_CATEGORIES.liveCategory,
        ),
      );
      setPreselectedPage(
        newOrgBookPages.find(
          (page) =>
            page.pageGroupNumber === selectedPage.pageGroupNumber &&
            page.status === PAGE_CATEGORIES.liveCategory,
        ),
      );
    }
    return orgBookPages;
  };

  const unPublishLiveToDraft = () => {
    const oldOrgBookPages = [...currentOrgBookPages];
    const newOrgBookPages = oldOrgBookPages.map((page) =>
      page.pageGroupNumber === selectedPage.pageGroupNumber
        ? {
            ...page,
            status: PAGE_CATEGORIES.draftCategory,
            updated_by: currentUserId,
            updated_at: moment(new Date()).utc().format("YYYY-MM-DD HH:mm:ss"),
          }
        : page,
    );
    const orgBookPages = {
      orgBookPages: newOrgBookPages,
    };
    setCurrentOrgBookPages(newOrgBookPages);
    setSelectedPage(
      newOrgBookPages.find((page) => page.pageId === selectedPage.pageId),
    );
    setPreselectedPage(
      newOrgBookPages.find((page) => page.pageId === selectedPage.pageId),
    );
    updateOrgBookPages(orgBookPages);
  };

  const unpublishRemoveLive = () => {
    const oldOrgBookPages = [...currentOrgBookPages];
    const newOrgBookPages = oldOrgBookPages.filter(
      (page) => page.pageId !== selectedPage.pageId,
    );
    const orgBookPages = {
      orgBookPages: newOrgBookPages,
    };
    setCurrentOrgBookPages(newOrgBookPages);
    setSelectedPage(
      newOrgBookPages.find(
        (page) =>
          page.pageGroupNumber === selectedPage.pageGroupNumber &&
          page.status === PAGE_CATEGORIES.draftCategory,
      ),
    );
    setPreselectedPage(
      newOrgBookPages.find(
        (page) =>
          page.pageGroupNumber === selectedPage.pageGroupNumber &&
          page.status === PAGE_CATEGORIES.draftCategory,
      ),
    );
    updateOrgBookPages(orgBookPages);
  };

  const unpublishHandleOption = (unpublishOption) => {
    switch (unpublishOption) {
      case UNPUBLISH_OPTIONS.leaveDraftContent:
        unpublishRemoveLive();

        break;

      case UNPUBLISH_OPTIONS.replaceDraftContent:
        const oldOrgBookPages = [...currentOrgBookPages];
        const updtOrgBookPages = oldOrgBookPages.map((page) =>
          page.pageGroupNumber == selectedPage.pageGroupNumber &&
          page.status === PAGE_CATEGORIES.draftCategory
            ? {
                ...page,
                content: selectedPage.content,
                updated_by: currentUserId,
                updated_at: moment(new Date())
                  .utc()
                  .format("YYYY-MM-DD HH:mm:ss"),
              }
            : page,
        );
        const newOrgBookPages = updtOrgBookPages.filter(
          (page) => page.pageId !== selectedPage.pageId,
        );
        const orgBookPages = {
          orgBookPages: newOrgBookPages,
        };
        setCurrentOrgBookPages(newOrgBookPages);
        setSelectedPage(
          newOrgBookPages.find(
            (page) =>
              page.pageGroupNumber === selectedPage.pageGroupNumber &&
              page.status === PAGE_CATEGORIES.draftCategory,
          ),
        );
        setPreselectedPage(
          newOrgBookPages.find(
            (page) =>
              page.pageGroupNumber === selectedPage.pageGroupNumber &&
              page.status === PAGE_CATEGORIES.draftCategory,
          ),
        );
        updateOrgBookPages(orgBookPages);

        break;

      default:
        break;
    }
  };

  const deleteSelectedPage = (orgBookPages) => {
    const oldOrgBookPages = [...currentOrgBookPages];
    const newOrgBookPages = oldOrgBookPages.filter(
      (page) => page.pageId !== selectedPage.pageId,
    );
    orgBookPages = {
      orgBookPages: newOrgBookPages,
    };
    setCurrentOrgBookPages(newOrgBookPages);
    setSelectedPage(null);
    return orgBookPages;
  };

  const updateViewTypeForSelectedPage = (orgBookPages, action) => {
    const oldOrgBookPages = [...currentOrgBookPages];
    const newOrgBookPages = oldOrgBookPages.map((page) =>
      page.pageId === selectedPage.pageId
        ? {
            ...page,
            viewLevel:
              action === UPDATE_ACTION_TYPES.changeLiveToPrivateViewType
                ? LIVE_PAGE_VIEW_LEVELS.orgView
                : LIVE_PAGE_VIEW_LEVELS.publicView,
            updated_by: currentUserId,
            updated_at: moment(new Date()).utc().format("YYYY-MM-DD HH:mm:ss"),
          }
        : page,
    );
    orgBookPages = {
      orgBookPages: newOrgBookPages,
    };
    setCurrentOrgBookPages(newOrgBookPages);
    setSelectedPage(
      newOrgBookPages.find((page) => page.pageId === selectedPage.pageId),
    );
    setPreselectedPage(
      newOrgBookPages.find((page) => page.pageId === selectedPage.pageId),
    );
    return orgBookPages;
  };

  const deleteOrgBook = () => {
    const newOrgBookPages = [];
    const orgBookPages = {
      orgBookPages: newOrgBookPages,
    };
    setCurrentOrgBookPages(newOrgBookPages);
    setSelectedPage(null);
    return orgBookPages;
  };

  const handleOnCancelConfirm = () => {
    setConfirmModalVisible(false);
    setCurrentUpdateAction(UPDATE_ACTION_TYPES.noAction);
  };

  const handleSelectedPageDirty = (toggle) => {
    setSelectedPageDirty(toggle);
  };

  const handleBackBtnClick = () => {
    history.goBack();
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
            preSelectedPage={preSelectedPage}
            handleBackBtnClick={handleBackBtnClick}
            selectedPageDirty={selectedPageDirty}
          ></OrgBookTableOfContents>
        </TableOfContentsSidebar>
      );
    }
  };

  const renderEditorSpace = () => {
    const livePageExists = selectedPage
      ? livePageExistsForSelectedPage()
      : false;

    if (organisation) {
      return (
        <OrgBookEditorSpace
          organisation={organisation}
          selectedPage={selectedPage || null}
          preSelectedPage={preSelectedPage}
          onClearPreselectedPage={() => setPreselectedPage(null)}
          PAGE_CATEGORIES={PAGE_CATEGORIES}
          UPDATE_ACTION_TYPES={UPDATE_ACTION_TYPES}
          onUpdateAction={handleUpdateAction}
          livePageExists={livePageExists}
          selectedPageDirty={selectedPageDirty}
          onSelectedPageDirty={handleSelectedPageDirty}
          LIVE_PAGE_VIEW_LEVELS={LIVE_PAGE_VIEW_LEVELS}
          isOwner={isOwner}
        ></OrgBookEditorSpace>
      );
    }
  };

  const renderConfirmModal = () => {
    let livePageExists = false;
    if (currentUpdateAction !== UPDATE_ACTION_TYPES.deleteOrgBookType) {
      livePageExists = livePageExistsForSelectedPage();
    }

    const showUnpublishOptions = () => {
      if (currentUpdateAction !== UPDATE_ACTION_TYPES.unpublishType)
        return false;

      const draftPageExists = draftPageExistsForSelectedPage();

      if (!draftPageExists) return false;
      if (draftPageExists) {
        const draftContent = currentOrgBookPages.find(
          (page) =>
            page.pageGroupNumber === selectedPage.pageGroupNumber &&
            page.status === PAGE_CATEGORIES.draftCategory,
        ).content;
        return draftContent !== selectedPage.content;
      }
    };

    return (
      <div>
        <OrgBookConfirmModal
          mask={false}
          getContainer="#modalMount"
          action={currentUpdateAction}
          selectedPage={selectedPage}
          visible={confirmModalVisible}
          onCancelConfirm={handleOnCancelConfirm}
          onConfirm={handleOnConfirm}
          UPDATE_ACTION_TYPES={UPDATE_ACTION_TYPES}
          livePageExists={livePageExists}
          UNPUBLISH_OPTIONS={UNPUBLISH_OPTIONS}
          PUBLISH_OPTIONS={PUBLISH_OPTIONS}
          showUnpublishOptions={showUnpublishOptions()}
        />
        <ModalMount>
          <OrgBookEditorContainer>
            {renderTableOfContents()}
            <OrgBookEditorContentBox>
              {renderEditorSpace()}
            </OrgBookEditorContentBox>
          </OrgBookEditorContainer>
        </ModalMount>
      </div>
    );
  };

  const renderInfoModal = () => {
    let title = "";
    let infoMsg1 = "";
    let infoMsg2 = "";
    let infoMsg3 = "";
    let infoMsg4 = "";
    if (maxContentExceeded) {
      title = t("orgBook.maxContentExceededTitle");
      const pageName = selectedPage.name;
      infoMsg1 = t("orgBook.maxContentsExceededFirstLine", { pageName });
      const maxChars = MAX_CHARACTERS_OF_CONTENT;
      infoMsg2 = t("orgBook.maxContentsExceededSecondLine", { maxChars });
      infoMsg3 = t("orgBook.maxContentsExceededThirdLine", {
        noOfContentChars,
      });
      infoMsg4 = t("orgBook.maxContentsExceededFourthLine");
    }

    if (minContentNotMet) {
      title = t("orgBook.minContentNotMetTitle");
      const pageName = selectedPage.name;
      infoMsg1 = t("orgBook.minContentNotMetFirstLine", { pageName });
      const minChars = MIN_CHARACTERS_OF_CONTENT;
      infoMsg2 = t("orgBook.minContentNotMetSecondLine", { minChars });
      infoMsg3 = t("orgBook.minContentNotMetThirdLine", { noOfContentChars });
      infoMsg4 = t("orgBook.minContentNotMetFourthLine");
    }

    return (
      <div>
        <OrgBookInfoModal
          mask={false}
          getContainer="#modalMount"
          title={title}
          okText={t("orgBook.ok")}
          visible={infoModalVisible}
          infoMsg1={infoMsg1}
          infoMsg2={infoMsg2}
          infoMsg3={infoMsg3}
          infoMsg4={infoMsg4}
          onClose={handleOnClose}
        />
        <ModalMount>
          <OrgBookEditorContainer>
            {renderTableOfContents()}
            <OrgBookEditorContentBox>
              {renderEditorSpace()}
            </OrgBookEditorContentBox>
          </OrgBookEditorContainer>
        </ModalMount>
      </div>
    );
  };

  const renderNewPageModal = () => {
    const highestPageIndex = getHighestPageGroupNumber();
    const newDefaultPageName =
      t("orgBook.page") + (highestPageIndex + 1).toString();

    return (
      <div>
        <OrgBookModal
          mask={false}
          getContainer="#modalMount"
          title={t("orgBook.newOrgBookPage")}
          okText={t("orgBook.add")}
          requiredPageNameMessage={t("orgBook.pleaseEnterPageNameAdd")}
          defaultPageName={newDefaultPageName}
          visible={newPageFormVisible}
          onCancel={handleOnCancel}
          onCreate={handleOnAdd}
          currentOrgBookPages={currentOrgBookPages}
        />
        <ModalMount>
          <OrgBookEditorContainer>
            {renderTableOfContents()}
            <OrgBookEditorContentBox>
              {renderEditorSpace()}
            </OrgBookEditorContentBox>
          </OrgBookEditorContainer>
        </ModalMount>
      </div>
    );
  };

  const renderRenamePageModal = () => {
    const pageName = selectedPage.name;
    const renameOrgBookPage = t("orgBook.renameOrgBookPage", { pageName });

    return (
      <div>
        <OrgBookModal
          mask={false}
          getContainer="#modalMount"
          title={renameOrgBookPage}
          okText={t("orgBook.rename")}
          requiredPageNameMessage={t("orgBook.pleaseEnterPageNameRename")}
          defaultPageName={t("orgBook.newPageName")}
          visible={renamePageFormVisible}
          onCancel={handleOnCancel}
          onCreate={handleOnRename}
          currentOrgBookPages={currentOrgBookPages}
        />
        <ModalMount>
          <OrgBookEditorContainer>
            {renderTableOfContents()}
            <OrgBookEditorContentBox>
              {renderEditorSpace()}
            </OrgBookEditorContentBox>
          </OrgBookEditorContainer>
        </ModalMount>
      </div>
    );
  };

  if (infoModalVisible) {
    return renderInfoModal();
  }

  if (newPageFormVisible) {
    return renderNewPageModal();
  }

  if (renamePageFormVisible) {
    return renderRenamePageModal();
  }

  if (confirmModalVisible) {
    return renderConfirmModal();
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
          mask={false}
          title={t("orgBook.newOrgBook")}
          okText={t("orgBook.create")}
          requiredPageNameMessage={t("orgBook.pleaseEnterPageNameCreate")}
          defaultPageName={t("orgBook.welcome")}
          visible={createFormVisible}
          onCancel={handleOnCancel}
          onCreate={handleOnCreate}
          currentOrgBookPages={null}
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
)(withUserContext(withOrganisationContext(OrgBookEditor)));
