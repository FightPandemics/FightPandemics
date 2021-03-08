import React, { useEffect, useState } from "react";
import BaseSelector from "../Selector/Selector";
import SvgIcon from "../Icon/SvgIcon";
import downArrowSlim from "../../assets/icons/down-arrow-slim.svg";
import { useTranslation } from "react-i18next";

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
      value: "updatedAt",
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

  useEffect(() => {
    const stagedOptions = options.filter(
      (e) => e.value !== "proximity" && e.value !== "relevance",
    );
    if (!ignoreUserLocation || filterLocation) {
      stagedOptions.push({
        text: t("feed.filters.proximity"),
        value: "proximity",
      });
    }
    if (keywordUsed) {
      stagedOptions.push({
        text: t("feed.filters.relevance"),
        value: "relevance",
      });
    }
    setOptions(stagedOptions);
  }, [ignoreUserLocation, keywordUsed, filterLocation]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="visibility-post--selector">
      <BaseSelector
        suffixIcon={
          <SvgIcon
            src={downArrowSlim}
            style={{ width: "1.5rem", height: "auto" }}
          />
        }
        value={sortValue}
        options={options}
        onChange={handleSortDropdown}
        minWidth="13rem"
        minHeight="5rem"
      />
    </div>
  );
}
