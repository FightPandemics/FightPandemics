import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import { useTranslation } from "react-i18next";
import { WhiteSpace } from "antd-mobile";
import { Avatar } from "components/Avatar";
import { getInitialsFromFullName } from "utils/userInfo";
import SvgIcon from "../Icon/SvgIcon";
import eyeClosedIcon from "../../assets/icons/orgbook-eye-closed.svg";
import eyeOpenIcon from "../../assets/icons/orgbook-eye-open.svg";
import lockClosedIcon from "../../assets/icons/orgbook-lock-closed.svg";
import lockOpenIcon from "../../assets/icons/orgbook-lock-open.svg";
import pageIcon from "../../assets/icons/orgbook-page.svg";
import plusIcon from "../../assets/icons/orgbook-plus.svg";

const { colors, typography } = theme;
const { white, black, lightGray } = colors;

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  height: 4vh;
  margin: 1.4rem 1.4rem 1.4rem 6.4rem;
  cursor: pointer;
  :hover {
    background-color: ${lightGray};
    color: ${black};
  }
  border: ${(props) => (props.selected ? "1px solid white" : "none")};
`;

const AddNewPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  height: 4vh;
  margin: 1.4rem 1.4rem 1.4rem 0rem;
  cursor: pointer;
  :hover {
    background-color: ${lightGray};
    color: ${black};
  }
`;

const NewPageIconContainer = styled.div`
  margin-left: 6.4rem;
`;

const PageIconAndNameContainer = styled.div`
  display: flex;
  alignitems: center;
`;

const PageSvgIcon = styled(SvgIcon)`
  margin-right: 10px;
`;

const EyeIconContainer = styled.div`
  margin-left: 5%;
  justify-content: flex-end;
`;

const EyeSvgIcon = styled(SvgIcon)`
  margin-right: 2px;
`;

const OrgBookTableOfContents = (props) => {
  const {
    organisation,
    currentOrgBookPages,
    handleNewPageClick,
    showAddNewPage,
    selectPage,
  } = props;
  const { t } = useTranslation();
  const [selectedPage, setSelectedPage] = useState(null);

  const LIVE_PAGE_VIEW_TYPES = {
    //correspond to private, public
    orgView: "org",
    publicView: "public",
  };
  const PAGE_CATEGORIES = {
    liveCategory: "live",
    draftCategory: "draft",
  };

  const handlePageClick = (page) => (e) => {
    setSelectedPage(page);
    selectPage(page);
  };

  const renderEyeIcon = (page) => {
    const eyeIcon =
      page.status === PAGE_CATEGORIES.draftCategory
        ? eyeClosedIcon
        : eyeOpenIcon;

    return (
      <EyeIconContainer>
        <EyeSvgIcon src={eyeIcon} />
      </EyeIconContainer>
    );
  };

  const isSelectedPage = (page) => {
    return selectedPage
      ? Object.keys(selectedPage).every((p) => selectedPage[p] === page[p])
      : false;
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
        {currentOrgBookPages.map((page, idx) => (
          <PageListContainer
            key={idx}
            selected={isSelectedPage(page)}
            onClick={handlePageClick(page)}
          >
            <PageIconAndNameContainer>
              <PageSvgIcon src={pageIcon} />
              {page.name}
            </PageIconAndNameContainer>
            <WhiteSpace visibility="hidden" />
            <WhiteSpace visibility="hidden" />
            {renderEyeIcon(page)}
          </PageListContainer>
        ))}
        {showAddNewPage ? (
          <AddNewPageContainer
            key={"add-new-page"}
            onClick={handleNewPageClick}
          >
            <NewPageIconContainer>
              <PageSvgIcon src={plusIcon} />
            </NewPageIconContainer>
            {t("orgBook.addNewPage")}
          </AddNewPageContainer>
        ) : (
          ""
        )}
      </MainNavigationContainer>
    </>
  );
};

export default OrgBookTableOfContents;
