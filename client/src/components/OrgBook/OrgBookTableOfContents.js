import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import { useTranslation } from "react-i18next";
import { WhiteSpace } from "antd-mobile";
import { Avatar } from "components/Avatar";
import { getInitialsFromFullName } from "utils/userInfo";
import eyeClosedIcon from "../../assets/icons/orgbook-eye-closed.svg";
import eyeOpenIcon from "../../assets/icons/orgbook-eye-open.svg";
import lockClosedIcon from "../../assets/icons/orgbook-lock-closed.svg";
import lockOpenIcon from "../../assets/icons/orgbook-lock-open.svg";
import pageIcon from "../../assets/icons/orgbook-page.svg";
import plusIcon from "../../assets/icons/orgbook-plus.svg";

const { colors, typography } = theme;
const { darkerGray, white, royalBlue, black, offWhite, darkishGray } = colors;

const OrgBookTOCHeader = styled.div`
  background-color: rgb(120, 120, 120);
  color: ${white};
  height: 3vh;
  padding: 1.4rem 1.4rem 3.4rem 1.4rem;
`;

const MainNavigationContainer = styled.div`
  color: ${white};
  overflow-y: auto;
  height: 600px;
  scroll-behavior: smooth;
  scrollbar-color: light;
  padding: 1.4rem 1.4rem 3.4rem 1.4rem;
`;

const OrgAvatarAndNameContainer = styled.div`
  display: inline-block;
  height: 2vh;
  padding: 2.4rem 1.4rem 3.4rem 2.4rem;
`;

const PageListContainer = styled.div`
  height: 3vh;
  margin: 1.4rem 1.4rem 1.4rem 6.4rem;
  cursor: pointer;
  :hover {
    background-color: gray;
  }
`;

const OrgBookTableOfContents = (props) => {
  const { organisation, editOrgBookMode } = props;
  const { t } = useTranslation();
  const [selectedPage, setSelectedPage] = useState(null);
  //const [currentEditOrgBookMode, setCurrentEditOrgBookMode] = useState(editOrgBookMode);

  // const LIVE_PAGE_VIEW_TYPES = [ //correspond to private, public
  //   {"orgType": "ORG"},
  //   {"publicType": "PUBLIC"}
  // ];
  const PAGE_CATEGORIES = [
    //correspond to published, in progress
    { liveCategory: "LIVE" },
    { draftCategory: "DRAFT" },
  ];
  // const ORGBOOK_EDIT_MODES = [
  //   {"createMode": "create"},
  //   {"editMode": "edit"}
  // ];

  // const starterCreateOrgBookPages = [
  //   { name: "AboutUs_Draft",
  //     displayName: t("orgBook.aboutUsDraftDisplayName"),
  //     content:'<p><span style="font-size:11pt;font-family: Arial;">About Us</span></p>',
  //     category: PAGE_CATEGORIES.draftCategory
  //   },
  //   { name: "Employees_Draft",
  //     displayName: t("orgBook.employeesDraftDisplayName"),
  //     content:'<p><span style="font-size:11pt;font-family: Arial;">Employees</span></p>',
  //     category: PAGE_CATEGORIES.draftCategory
  //   }
  // ];

  const handlePageClick = (page) => (e) => {
    console.log("clicked on : " + JSON.stringify(page));
  };

  return (
    <>
      <OrgBookTOCHeader>{t("orgBook.editorSpaceTOCHeader")}</OrgBookTOCHeader>
      <MainNavigationContainer>
        <WhiteSpace />
        <OrgAvatarAndNameContainer>
          <Avatar>{getInitialsFromFullName(`${organisation.name}`)}</Avatar>
          {organisation.name}
        </OrgAvatarAndNameContainer>
      </MainNavigationContainer>
    </>
  );
};

export default OrgBookTableOfContents;
