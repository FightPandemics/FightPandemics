import React, { useEffect, useState } from "react";
import BaseSelector from "../Selector/Selector";
import SvgIcon from "../Icon/SvgIcon";
import downArrowSlim from "../../assets/icons/down-arrow-slim.svg";
import { useTranslation } from "react-i18next";
import GTM from "constants/gtm-tags";
import styled from "styled-components";

const SelectorWrapper = styled.div`
  span.ant-select-selection-item {
    font-weight: 600;
    font-size: 1.4rem !important;
  }
`;

export default function SortSelector({
  handleSortDropdown,
  ignoreUserLocation,
  filterLocation,
  keywordUsed,
  sortValue,
}) {
  const { t } = useTranslation();
  const [options, setOptions] = useState([
    {
      text: t("feed.filters.latest"),
      value: "createdAt",
    },
    {
      text: t("feed.filters.trending"),
      value: "shares",
    },
    {
      text: t("feed.filters.mostViewed"),
      value: "views",
    },
    {
      text: t("feed.filters.mostLiked"),
      value: "likes",
    },
  ]);
  const [value, setValue] = useState();
  const gtmTag = (tag) => GTM.feed.prefix + GTM.feed.sort + GTM.feed[tag];

  useEffect(() => {
    if (sortValue === "proximity-near" || sortValue === "proximity-location") {
      setValue(t("feed.filters.proximity"));
    } else if (sortValue === "relevance") {
      setValue(t("feed.filters.relevance"));
    } else {
      setValue(sortValue);
    }
  }, [ignoreUserLocation, keywordUsed, filterLocation, sortValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SelectorWrapper>
      <BaseSelector
        suffixIcon={
          <SvgIcon
            src={downArrowSlim}
            style={{ width: "1.5rem", height: "auto" }}
          />
        }
        value={value}
        options={options}
        onChange={handleSortDropdown}
        minWidth="14.8rem"
        minHeight="5rem"
      />
    </SelectorWrapper>
  );
}
