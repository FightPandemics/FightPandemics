import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import { useTranslation } from "react-i18next";
import { WhiteSpace } from "antd-mobile";
import SvgIcon from "../Icon/SvgIcon";
import eyeClosedIcon from "../../assets/icons/orgbook-eye-closed.svg";
import eyeOpenIcon from "../../assets/icons/orgbook-eye-open.svg";
import { set } from "lodash";

const { colors, typography } = theme;
const { white, royalBlue, black, red } = colors;

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

const HeaderPageNameContainer = styled.div``;

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

const MainEditorContainer = styled.div`
  height: 85vh;
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

const FooterDeleteDraftContainer = styled.div`
  font-size: small;
  color: ${red};
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

const OrgBookEditorSpace = (props) => {
  const {
    organisation,
    selectedPage,
    PAGE_CATEGORIES,
    UPDATE_ACTION_TYPES,
    onUpdateAction,
  } = props;
  const { t } = useTranslation();
  const tinyMce = useRef();
  const [numberOfCharacters, setNumberOfCharacters] = useState(0);

  const onInit = useCallback(
    (editor) => {
      tinyMce.current = editor;
      if (!(selectedPage === null)) {
        setNumberOfCharacters(selectedPage.content.length);
      }
    },
    [selectedPage],
  );

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
    return `${organisation.name}\xa0\xa0\xa0/\xa0\xa0\xa0${selectedPage.name}\xa0\xa0\xa0-\xa0\xa0\xa0${status}`;
  };

  const handleEditorChange = (content, editor) => {
    const wordcount = editor.plugins.wordcount;
    setNumberOfCharacters(wordcount.body.getCharacterCountWithoutSpaces());
  };

  const renderDistractionFreeEditor = () => {
    //quickbars_insert_toolbar appears on clicking on a new line (empty line following previously set/entered content)
    //quickbars_selection_toolbar appears after double-clicking (selecting) existing content or empty space
    //contextmenu appears after right-clicking on editable content
    return (
      <Editor
        apiKey="6wsqfx2q8gaxfha3k31vw5hivcu9rp3su7q4o2kuy8p9qavt"
        initialValue={selectedPage.content}
        value={selectedPage.content}
        init={{
          oninit: onInit,
          setup: onInit,
          height: 700,
          max_height: 700,
          menubar: false,
          inline: true,
          contextmenu: false,
          resize: false,
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
        }}
        onEditorChange={handleEditorChange}
      />
    );
  };

  return (
    <OrgBookEditorSpaceWrapper>
      <OrgBookEditorSpaceHeader>
        <HeaderPageNameContainer>
          {selectedPage ? getHeaderPageName() : t("orgBook.clickPageOnLeft")}
        </HeaderPageNameContainer>
        <HeaderSpacerContainer />
        <HeaderSpacerContainer />
        <HeaderSpacerContainer />
        <HeaderSpacerContainer />
        <HeaderSeePreviewContainer>
          {selectedPage ? (
            <Link
              onClick={() => {
                console.log("clicked see preview");
              }}
              to="#"
            >
              <span>{t("orgBook.seePreview")}</span>
            </Link>
          ) : (
            ""
          )}
        </HeaderSeePreviewContainer>
        <HeaderRenamePageContainer>
          {selectedPage ? (
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
            >
              <span>{t("orgBook.renamePage")}</span>
            </Link>
          ) : (
            ""
          )}
        </HeaderRenamePageContainer>
      </OrgBookEditorSpaceHeader>
      <MainEditorContainer>
        {selectedPage ? renderDistractionFreeEditor() : <WhiteSpace />}
      </MainEditorContainer>
      <OrgBookEditorSpaceFooter>
        <FooterDeleteDraftContainer>
          {selectedPage &&
          selectedPage.status === PAGE_CATEGORIES.draftCategory ? (
            <Link
              onClick={() => {
                console.log("clicked delete draft");
              }}
              to="#"
            >
              <span>{t("orgBook.deleteDraft")}</span>
            </Link>
          ) : (
            <WhiteSpace />
          )}
        </FooterDeleteDraftContainer>
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
        {selectedPage ? (
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
