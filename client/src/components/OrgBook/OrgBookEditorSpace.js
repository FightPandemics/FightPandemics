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
  const { organisation, selectedPage, PAGE_CATEGORIES } = props;
  const { t } = useTranslation();
  const tinyMce = useRef();

  const onInit = useCallback(
    (editor) => {
      tinyMce.current = editor;
    },
    [selectedPage?.content],
  );

  useEffect(() => {
    if (
      tinyMce.current &&
      tinyMce.current.getContent() !== selectedPage?.content
    ) {
      tinyMce.current.setContent(selectedPage?.content, { no_events: true });
    }
  }, [selectedPage.content]);

  const getHeaderPageName = () => {
    const status =
      selectedPage.status === PAGE_CATEGORIES.draftCategory
        ? t("orgBook.draft")
        : t("orgBook.live");
    return `${organisation.name}\xa0\xa0\xa0/\xa0\xa0\xa0${selectedPage.name}\xa0\xa0\xa0-\xa0\xa0\xa0${status}`;
  };

  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };

  const renderEditor = () => {
    return (
      <Editor
        apiKey="6wsqfx2q8gaxfha3k31vw5hivcu9rp3su7q4o2kuy8p9qavt"
        initialValue={selectedPage.content}
        value={selectedPage.content}
        init={{
          oninit: onInit,
          setup: onInit,
          height: 700,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          fontsize_formats: "14px 16px 18px 20px 24px 36px",
          toolbar:
            "undo redo | formatselect | bold italic backcolor | fontsizeselect \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
          formats: {
            alignleft: {
              selector: "span,em,i,b,strong",
              block: "span",
              styles: { display: "block", "text-align": "left" },
            },
            aligncenter: {
              selector: "span,em,i,b,strong",
              block: "span",
              styles: { display: "block", "text-align": "center" },
            },
            alignright: {
              selector: "span,em,i,b,strong",
              block: "span",
              styles: { display: "block", "text-align": "right" },
            },
            alignjustify: {
              selector: "span,em,i,b,strong",
              block: "span",
              styles: { display: "block", "text-align": "full" },
            },
          },
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
                console.log("clicked rename page");
              }}
            >
              <span>{t("orgBook.renamePage")}</span>
            </Link>
          ) : (
            ""
          )}
        </HeaderRenamePageContainer>
      </OrgBookEditorSpaceHeader>
      <MainEditorContainer>
        {selectedPage ? renderEditor() : <WhiteSpace />}
      </MainEditorContainer>
      <OrgBookEditorSpaceFooter>
        <FooterDeleteDraftContainer>
          {selectedPage &&
          selectedPage.status === PAGE_CATEGORIES.draftCategory ? (
            <Link
              onClick={() => {
                console.log("clicked delete draft");
              }}
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
                console.log("clicked save progress");
              }}
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
              console.log("clicked publish");
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
