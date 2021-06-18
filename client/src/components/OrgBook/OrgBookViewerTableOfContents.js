import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import { useTranslation } from "react-i18next";
import { WhiteSpace } from "antd-mobile";
import GTM from "../../constants/gtm-tags";

const { colors, typography } = theme;
const { white, black, lightGray, mediumGray, royalBlue } = colors;

const MainNavigationContainer = styled.div`
  color: ${black};
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-color: light;
  padding: 1.4rem 1.4rem 3.4rem 1.4rem;
`;

const LearnMoreContainer = styled.div`
  font-size: ${typography.size.large};
  font-weight: bold;
`;

const PageListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  height: 4vh;
  margin: 1.4rem 1.4rem 2.4rem 0.4rem;
  cursor: pointer;
  :hover {
    background-color: ${lightGray};
    color: ${black};
  }
  font-size: ${(props) =>
    props.selected ? typography.size.xlarge : typography.size.large};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  color: ${black};
  text-decoration-line: ${(props) => (props.selected ? "underline" : "none")};
`;

export const Background = styled.div`
  width: 95%;
  background-color: ${mediumGray};
`;

const OrgBookViewerTableOfContents = (props) => {
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

  const handlePageClick = (e, page) => {
    e.persist();
    e.stopPropagation();
    setSelectedPage(page);
    selectPage(page);
  };

  const isSelectedPage = (page) => {
    return selectedPage
      ? Object.keys(selectedPage).every((p) => selectedPage[p] === page[p])
      : false;
  };

  return (
    sortedFilteredOrgBookPages && (
      <MainNavigationContainer>
        <WhiteSpace />
        <LearnMoreContainer>{t("orgBook.learnMore")}</LearnMoreContainer>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        {sortedFilteredOrgBookPages.map((page, idx) => (
          <PageListContainer
            key={idx}
            selected={isSelectedPage(page)}
            onClick={(e) => {
              handlePageClick(e, page);
            }}
            id={GTM.orgBook.prefix + GTM.orgBook.pageContainer + idx}
          >
            {page.name}
          </PageListContainer>
        ))}
      </MainNavigationContainer>
    )
  );
};

export default OrgBookViewerTableOfContents;
