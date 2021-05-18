import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import { useTranslation } from "react-i18next";
import { Menu } from "antd";
import SvgIcon from "../Icon/SvgIcon";
import menuIcon from "assets/icons/menu.svg";
import { WhiteSpace } from "antd-mobile";
import GTM from "../../constants/gtm-tags";

const { colors, typography } = theme;
const { darkerGray, offWhite, black } = colors;

const MainMobileTOCContainer = styled.div`
  width: 20rem;
  position: absolute;
  top: 3rem;
  bottom: 35rem;
  z-index: 5;
`;

const StyledMobileTOCMenuContainer = styled.div`
  border: solid 1px black;
  width: 20rem;
`;

export const MobileTOCMenuWrapper = styled(Menu)`
  background-color: ${offWhite};

  &.ant-menu {
    li.ant-menu-item {
      margin: 0.8rem 0;
      height: 2.4rem;
      padding-bottom: 1rem;

      color: ${theme.colors.darkerGray};
      font-size: ${theme.typography.size.medium};
      line-height: 2.1rem;
      width: 100%;
      &:hover {
        color: ${theme.colors.darkerGray};
      }
      text-align: left;
      font-size: ${(props) =>
        props.selected ? typography.size.xlarge : typography.size.large};
      font-weight: ${(props) => (props.selected ? "bold" : "normal")};
      color: ${black};
      text-decoration-line: ${(props) =>
        props.selected ? "underline" : "none"};
    }

    // &.ant-menu .ant-menu-item-selected {
    //   background-color: ${darkerGray};
    //   border-bottom: 0.2rem solid ${theme.colors.black};
    //   font-weight: bold;
    // }

    // .ant-menu-item-selected.customclass {             //new
    //   background-color: green; /*Overriden property*/
    // }
  }
`;

const OrgBookViewerTOCMobile = (props) => {
  const {
    organisation,
    filteredOrgBookPages,
    selectPage,
    preSelectedPage,
  } = props;
  const { t } = useTranslation();
  const [selectedPage, setSelectedPage] = useState(preSelectedPage || null);
  const [sortedFilteredOrgBookPages, setSortedFilteredOrgBookPages] = useState(
    null,
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const initialize = () => {
    //sort ascending pageGroupNumber, then descending by create_at date
    const sortedPages = filteredOrgBookPages.sort(
      (a, b) =>
        a.pageGroupNumber - b.pageGroupNumber ||
        Date.parse(b.created_at) - Date.parse(a.created_at),
    );
    setSortedFilteredOrgBookPages(sortedPages);
    if (preSelectedPage) {
      setSelectedPage(preSelectedPage);
      selectPage(preSelectedPage);
    }
  };

  useEffect(initialize, []);

  const toggleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handlePageClick = (page) => {
    console.log("clicked on page: " + page.name);
    setSelectedPage(page);
    setMenuOpen(false);
    selectPage(page);
  };

  const isSelectedPage = (page) => {
    return selectedPage
      ? Object.keys(selectedPage).every((p) => selectedPage[p] === page[p])
      : false;
  };

  return (
    sortedFilteredOrgBookPages && (
      <MainMobileTOCContainer>
        {!menuOpen ? (
          <SvgIcon
            src={menuIcon}
            id={GTM.orgBook.prefix + GTM.orgBook.openOrgBookTOCMenu}
            onClick={(e) => {
              toggleMenuOpen();
            }}
          />
        ) : (
          <StyledMobileTOCMenuContainer>
            <MobileTOCMenuWrapper mode="vertical">
              {sortedFilteredOrgBookPages.map((page, idx) => (
                <Menu.Item
                  selected={isSelectedPage(page)}
                  key={page.name}
                  id={GTM.orgBook.prefix + GTM.orgBook.pageContainer + idx}
                  onClick={() => {
                    handlePageClick(page);
                  }}
                >
                  {page.name}
                </Menu.Item>
              ))}
            </MobileTOCMenuWrapper>
          </StyledMobileTOCMenuContainer>
        )}
      </MainMobileTOCContainer>
    )
  );
};

export default OrgBookViewerTOCMobile;
