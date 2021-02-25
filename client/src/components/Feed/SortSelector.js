import React from "react";
import BaseSelector from "../Selector/Selector";
import SvgIcon from "../Icon/SvgIcon";
import downArrowSlim from "../../assets/icons/down-arrow-slim.svg";
import { useTranslation } from "react-i18next";

export default function SortSelector({ handleSortDropdown }) {
  const { t } = useTranslation();
  return (
    <div className="visibility-post--selector">
      <BaseSelector
        suffixIcon={
          <SvgIcon
            src={downArrowSlim}
            style={{ width: "1.5rem", height: "auto" }}
          />
        }
        defaultValue={t("feed.filters.sortBy")}
        options={[
          {
            text: t("feed.filters.latest"),
            value: "latest",
          },
          {
            text: t("feed.filters.trending"),
            value: "trending",
          },
          {
            text: t("feed.filters.mostViewed"),
            value: "mostViewed",
          },
          {
            text: t("feed.filters.mostLiked"),
            value: "mostLiked",
          },
        ]}
        onChange={handleSortDropdown}
        minWidth="13rem"
        minHeight="5rem"
      />
    </div>
  );
}
