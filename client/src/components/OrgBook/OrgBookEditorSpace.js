import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import styled from "styled-components";
import { theme } from "../../constants/theme";
import { useTranslation } from "react-i18next";
import { WhiteSpace } from "antd-mobile";
import { getLang } from "i18n";
import { LANG_MAP } from "./OrgBookData";
import GTM from "../../constants/gtm-tags";
import UndoAllChangesButton from "./OrgBookUndoAllButton";
import OrgBookConfirmModal from "./OrgBookConfirmModal";
import SvgIcon from "../Icon/SvgIcon";
import privateIcon from "../../assets/icons/orgbook-private.svg";
import publicIcon from "../../assets/icons/orgbook-public.svg";
import deleteBookIcon from "../../assets/icons/orgbook-delete-book.svg";

const { colors } = theme;
const { white, royalBlue, black, red, mediumGray } = colors;

const OrgBookEditorSpaceWrapper = styled.div`
  height: 100%;
`;

const OrgBookEditorSpaceHeader = styled.div`
  background-color: ${royalBlue};
  color: ${white};
  padding: 1.4rem 1.4rem 1.4rem 1.4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderPageNameContainer = styled.div`
  img {
    width: 2.7rem !important;
    height: 2.7rem !important;
  }
`;

const HeaderSpacerContainer = styled.div`
  width: 50px;
`;

const HeaderSeePreviewContainer = styled.div`
  text-decoration: underline;
  padding: 0 0 0 1px;
`;

const HeaderRenamePageContainer = styled.div`
  text-decoration: underline;
  padding: 0 0 0 1px;
`;

const OrgBookContentChangedContainer = styled.div`
  background-color: #ffffcc;
  color: ${black};
  padding: 1.4rem 1.4rem 1.4rem 1.4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ChngdInEditorOnlyWrapper = styled.div`
  padding: 0.6rem 0rem 0rem 0rem !important;
`;

const ClickOrUndoWrapper = styled.div`
  padding: 0.6rem 0rem 0rem 0rem !important;
`;

const MainEditorContainer = styled.div`
  height: 85vh;
  max-width: 95rem;
  background-color: ${white};
  color: ${black};
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-color: light;
  padding: 0 0 0 0;
`;

const OrgBookEditorSpaceFooter = styled.div`
  background-color: #f0f0f0;
  color: ${black};
  height: 7vh;
  padding: 0 0 0 1.4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FooterDeleteOrgBookWrapper = styled.div`
  color: #f0f0f0;
  cursor: pointer;
`;

const FooterDeleteDraftContainer = styled.div`
  font-size: small;
  color: ${red};
  text-decoration: underline;
  padding: 0 0 0 0;
`;

const FooterChangeViewContainer = styled.div`
  font-size: small;
  color: ${black};
  text-decoration: underline;
  padding: 0 0 0 0;
`;

const FooterSaveProgressContainer = styled.div`
  font-size: medium;
  color: ${royalBlue};
  text-decoration: underline;
  padding: 0 0 0 2rem;
`;

const FooterSpacerContainer = styled.div`
  width: 50px;
`;

const PublishButtonContainer = styled.button`
  type: submit;
  width: 12rem;
  height: 100%;
  background-color: ${royalBlue};
  padding: 0 0 1.4rem 1rem;
`;

const PublishButtonLabel = styled.div`
  color: ${white};
  white-space: nowrap;
`;

export const Background = styled.div`
  width: 95%;
  background-color: ${mediumGray};
`;

const OrgBookEditorSpace = (props) => {
  const {
    organisation,
    selectedPage,
    preSelectedPage,
    onClearPreselectedPage,
    PAGE_CATEGORIES,
    UPDATE_ACTION_TYPES,
    onUpdateAction,
    livePageExists,
    selectedPageDirty,
    onSelectedPageDirty,
    LIVE_PAGE_VIEW_LEVELS,
    isOwner,
  } = props;
  const { t } = useTranslation();
  const tinyMce = useRef();
  const [numberOfCharacters, setNumberOfCharacters] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [currentLanguageUrl, setCurrentLanguageUrl] = useState("");
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [originalContent, setOriginalContent] = useState("");

  const onInit = useCallback(
    (editor) => {
      tinyMce.current = editor;
      if (selectedPage) {
        const withoutSpace = selectedPage.content.replace(/ /g, "");
        setNumberOfCharacters(withoutSpace.length);
      }
    },
    [selectedPage],
  );

  useEffect(() => {
    setTinyMceLanguage();
    if (selectedPage) {
      setOriginalContent(selectedPage.content);
    }
  }, [selectedPage]);

  const setTinyMceLanguage = () => {
    const { language } = getLang();
    let tinyMceLang = LANG_MAP.find((l) => l.localeLang === language)
      ?.tinyMceLang;
    if (tinyMceLang === undefined) {
      tinyMceLang = LANG_MAP.find((l) => l.default === true).tinyMceLang;
    }
    setCurrentLanguage(tinyMceLang);
    const langUrl = `https://maskowe.github.io/tinymce_translations/${tinyMceLang}.js`;
    setCurrentLanguageUrl(langUrl);
  };

  useEffect(() => {
    if (
      tinyMce.current &&
      tinyMce.current.getContent() !== selectedPage?.content
    ) {
      tinyMce.current.setContent(selectedPage?.content, { no_events: true });
    }
  }, [selectedPage?.content]); // eslint-disable-line react-hooks/exhaustive-deps

  const getHeaderPageName = () => {
    const status =
      selectedPage.status === PAGE_CATEGORIES.draftCategory
        ? t("orgBook.draft")
        : t("orgBook.live");

    if (selectedPage.status === PAGE_CATEGORIES.draftCategory) {
      return `${organisation.name}\xa0\xa0\xa0/\xa0\xa0\xa0${selectedPage.name}\xa0\xa0\xa0-\xa0\xa0\xa0${status}`;
    } else {
      let viewLevel = "";
      if (selectedPage.viewLevel === LIVE_PAGE_VIEW_LEVELS.orgView) {
        viewLevel = t("orgBook.orgViewOnly");
      } else {
        viewLevel = t("orgBook.publicView");
      }
      return `${organisation.name}\xa0\xa0\xa0/\xa0\xa0\xa0${selectedPage.name}\xa0\xa0\xa0-\xa0\xa0\xa0${status}\xa0\xa0\xa0-\xa0\xa0\xa0${viewLevel}\xa0\xa0\xa0-\xa0\xa0\xa0`;
    }
  };

  const handleUndoAllBtnClick = () => {
    setConfirmModalVisible(true);
  };

  const handleOnConfirm = async () => {
    if (tinyMce.current) {
      tinyMce.current.setContent(originalContent, { no_events: true });
    }
    onSelectedPageDirty(false);
    setConfirmModalVisible(false);
  };

  const handleOnCancelConfirm = () => {
    setConfirmModalVisible(false);
  };

  const handleEditorChange = (content, editor) => {
    const wordcount = editor.plugins.wordcount;
    setNumberOfCharacters(wordcount.body.getCharacterCountWithoutSpaces());

    if (preSelectedPage) {
      setOriginalContent(preSelectedPage.content);
      onClearPreselectedPage();
    }
    const selPageWithoutNewline = selectedPage.content
      .replace(/ /g, "")
      .trim()
      .replace("\n", "");
    const contentWithoutNewline = content
      .replace(/ /g, "")
      .trim()
      .replace("\n", "");

    if (contentWithoutNewline !== selPageWithoutNewline) {
      onSelectedPageDirty(true);
    } else {
      onSelectedPageDirty(false);
    }
  };

  const showPublishBtn = () => {
    if (selectedPage.status === PAGE_CATEGORIES.draftCategory) {
      return true;
    }
    if (
      selectedPage.status === PAGE_CATEGORIES.liveCategory &&
      selectedPage.name === t("orgBook.welcome")
    ) {
      return false;
    } else {
      return true;
    }
  };

  const renderDistractionFreeEditor = () => {
    //quickbars_insert_toolbar appears on clicking on a new line (empty line following previously set/entered content)
    //quickbars_selection_toolbar appears after double-clicking (selecting) existing content or empty space
    //contextmenu appears after right-clicking on editable content
    return (
      <Editor
        apiKey="6wsqfx2q8gaxfha3k31vw5hivcu9rp3su7q4o2kuy8p9qavt"
        initialValue={selectedPage?.content}
        value={selectedPage?.content}
        init={{
          oninit: onInit,
          setup: onInit,
          height: 700,
          max_height: 700,
          menubar: false,
          inline: true,
          resize: false,
          language: currentLanguage,
          language_url: currentLanguageUrl,
          plugins: [
            "quickbars advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen table spellchecker",
            "insertdatetime media table paste code help wordcount autoresize imagetools",
          ],
          quickbars_insert_toolbar: "undo redo | link image | help",
          quickbars_selection_toolbar:
            "undo redo | styleselect | fontselect | formatselect | \
            alignleft aligncenter alignright alignjustify | bold italic underline backcolor | \
            fontsizeselect | bullist numlist outdent indent | link image | removeformat | help",
          contextmenu:
            "undo redo | link | inserttable | cell row column deletetable | help",
          powerpaste_word_import: "clean",
          powerpaste_html_import: "clean",
          fontsize_formats: "14px 16px 18px 20px 24px 36px",
          toolbar: false,
          content_style: `.tox .tox-button { border-radius: 3.8rem; background-color: ${royalBlue} !important; } 
          .tox .tox-button--icon, .tox .tox-button.tox-button--icon, .tox .tox-button.tox-button--secondary.tox-button--icon { 
            background-color: ${white} !important; } body { font-family: Arial; } `,
        }}
        onEditorChange={handleEditorChange}
      />
    );
  };

  const renderConfirmModal = () => {
    return (
      <div>
        <OrgBookConfirmModal
          mask={false}
          action={UPDATE_ACTION_TYPES.undoAllChangesType}
          selectedPage={selectedPage}
          visible={confirmModalVisible}
          onCancelConfirm={handleOnCancelConfirm}
          onConfirm={handleOnConfirm}
          UPDATE_ACTION_TYPES={UPDATE_ACTION_TYPES}
          livePageExists={false}
          UNPUBLISH_OPTIONS={{}}
          PUBLISH_OPTIONS={{}}
          showUnpublishOptions={false}
        />
        <Background />
      </div>
    );
  };

  if (confirmModalVisible) {
    return renderConfirmModal();
  }

  return (
    <OrgBookEditorSpaceWrapper>
      <OrgBookEditorSpaceHeader>
        <HeaderPageNameContainer>
          {selectedPage ? getHeaderPageName() : t("orgBook.clickPageOnLeft")}
          {selectedPage &&
          selectedPage.status === PAGE_CATEGORIES.liveCategory &&
          selectedPage.viewLevel === LIVE_PAGE_VIEW_LEVELS.orgView ? (
            <SvgIcon
              src={privateIcon}
              title={t("orgBook.orgViewOnly")}
              width={"3rem !important"}
              height={"3rem !important"}
            />
          ) : (
            ""
          )}
          {selectedPage &&
          selectedPage.status === PAGE_CATEGORIES.liveCategory &&
          selectedPage.viewLevel === LIVE_PAGE_VIEW_LEVELS.publicView ? (
            <SvgIcon src={publicIcon} title={t("orgBook.publicView")} />
          ) : (
            ""
          )}
        </HeaderPageNameContainer>
        <HeaderSpacerContainer />
        <HeaderSpacerContainer />
        <HeaderSpacerContainer />
        <HeaderSpacerContainer />
        <HeaderSeePreviewContainer>
          {selectedPage ? (
            <Link
              onClick={() => {
                tinyMce.current.execCommand("mcePreview");
              }}
              to="#"
              id={GTM.orgBook.prefix + GTM.orgBook.seePreview}
            >
              <span>{t("orgBook.seePreview")}</span>
            </Link>
          ) : (
            ""
          )}
        </HeaderSeePreviewContainer>
        <HeaderRenamePageContainer>
          {selectedPage && selectedPage.name !== t("orgBook.welcome") ? (
            <Link
              onClick={() => {
                onUpdateAction(
                  UPDATE_ACTION_TYPES.renamePageType,
                  selectedPage.pageId,
                  tinyMce.current.getContent(),
                  numberOfCharacters,
                );
              }}
              to="#"
              id={GTM.orgBook.prefix + GTM.orgBook.renamePage}
            >
              <span>{t("orgBook.renamePage")}</span>
            </Link>
          ) : (
            ""
          )}
        </HeaderRenamePageContainer>
      </OrgBookEditorSpaceHeader>
      {selectedPage && selectedPageDirty ? (
        <OrgBookContentChangedContainer>
          <ChngdInEditorOnlyWrapper>
            {t("orgBook.contentChanged")}
          </ChngdInEditorOnlyWrapper>
          <HeaderSpacerContainer />
          <HeaderSpacerContainer />
          <HeaderSpacerContainer />
          <HeaderSpacerContainer />
          <ClickOrUndoWrapper>
            <span>{t("orgBook.click")}</span>
            <span>
              {selectedPage.status === PAGE_CATEGORIES.draftCategory
                ? t("orgBook.saveProgress")
                : t("orgBook.republish")}
            </span>
            <span>{t("orgBook.belowOr")}</span>
          </ClickOrUndoWrapper>
          <UndoAllChangesButton
            handleClick={handleUndoAllBtnClick}
            id={GTM.orgBook.prefix + GTM.orgBook.undoAll}
            label={t("orgBook.undoAllMyChanges")}
            title={t("orgBook.undoAllMyChanges")}
            color={black}
            bgcolor="transparent"
          ></UndoAllChangesButton>
        </OrgBookContentChangedContainer>
      ) : (
        <WhiteSpace />
      )}
      <MainEditorContainer>
        {selectedPage ? renderDistractionFreeEditor() : <WhiteSpace />}
      </MainEditorContainer>
      <OrgBookEditorSpaceFooter>
        <FooterDeleteOrgBookWrapper>
          {isOwner ? (
            <SvgIcon
              src={deleteBookIcon}
              title={t("orgBook.deleteOrgBook")}
              id={GTM.orgBook.prefix + GTM.orgBook.deleteOrgBook}
              onClick={() => {
                onUpdateAction(
                  UPDATE_ACTION_TYPES.deleteOrgBookType,
                  "",
                  "",
                  0,
                );
              }}
            />
          ) : (
            <WhiteSpace />
          )}
        </FooterDeleteOrgBookWrapper>
        <FooterDeleteDraftContainer>
          {selectedPage &&
          livePageExists === false &&
          selectedPage.status === PAGE_CATEGORIES.draftCategory ? (
            <Link
              onClick={() => {
                onUpdateAction(
                  UPDATE_ACTION_TYPES.deleteDraftType,
                  selectedPage.pageId,
                  tinyMce.current.getContent(),
                  numberOfCharacters,
                );
              }}
              to="#"
              id={GTM.orgBook.prefix + GTM.orgBook.deleteDraft}
            >
              <span>{t("orgBook.deleteDraft")}</span>
            </Link>
          ) : (
            <WhiteSpace />
          )}
        </FooterDeleteDraftContainer>
        <FooterChangeViewContainer>
          {selectedPage &&
          selectedPage.name !== t("orgBook.welcome") &&
          selectedPage.status === PAGE_CATEGORIES.liveCategory ? (
            <Link
              onClick={() => {
                onUpdateAction(
                  selectedPage.viewLevel === LIVE_PAGE_VIEW_LEVELS.orgView
                    ? UPDATE_ACTION_TYPES.changeLiveToPublicViewType
                    : UPDATE_ACTION_TYPES.changeLiveToPrivateViewType,
                  selectedPage.pageId,
                  tinyMce.current.getContent(),
                  numberOfCharacters,
                );
              }}
              to="#"
              id={GTM.orgBook.prefix + GTM.orgBook.changeLiveViewType}
            >
              <span>
                {selectedPage.viewLevel === LIVE_PAGE_VIEW_LEVELS.orgView
                  ? t("orgBook.changeToPublicView")
                  : t("orgBook.changeToPrivateView")}
              </span>
            </Link>
          ) : (
            <WhiteSpace />
          )}
        </FooterChangeViewContainer>
        <FooterSpacerContainer />
        <FooterSpacerContainer />
        <FooterSpacerContainer />
        <FooterSpacerContainer />
        <FooterSpacerContainer />
        <FooterSaveProgressContainer>
          {selectedPage ? (
            <Link
              onClick={() => {
                onUpdateAction(
                  selectedPage.status === PAGE_CATEGORIES.draftCategory
                    ? UPDATE_ACTION_TYPES.saveProgressType
                    : UPDATE_ACTION_TYPES.republishType,
                  selectedPage.pageId,
                  tinyMce.current.getContent(),
                  numberOfCharacters,
                );
              }}
              to="#"
              id={GTM.orgBook.prefix + GTM.orgBook.saveContent}
            >
              <span>
                {selectedPage.status === PAGE_CATEGORIES.draftCategory
                  ? t("orgBook.saveProgress")
                  : t("orgBook.republish")}
              </span>
            </Link>
          ) : (
            <WhiteSpace />
          )}
        </FooterSaveProgressContainer>
        {selectedPage && showPublishBtn() ? (
          <PublishButtonContainer
            onClick={(e) => {
              onUpdateAction(
                selectedPage.status === PAGE_CATEGORIES.draftCategory
                  ? UPDATE_ACTION_TYPES.publishType
                  : UPDATE_ACTION_TYPES.unpublishType,
                selectedPage.pageId,
                tinyMce.current.getContent(),
                numberOfCharacters,
              );
            }}
            id={GTM.orgBook.prefix + GTM.orgBook.pubOrUnpublish}
          >
            <PublishButtonLabel>
              {selectedPage.status === PAGE_CATEGORIES.draftCategory
                ? t("orgBook.publish")
                : t("orgBook.unpublish")}
            </PublishButtonLabel>
          </PublishButtonContainer>
        ) : (
          <WhiteSpace />
        )}
      </OrgBookEditorSpaceFooter>
    </OrgBookEditorSpaceWrapper>
  );
};

export default OrgBookEditorSpace;
