import React, {
  useEffect,
  useReducer,
  useState,
  useCallback,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components";
import { Menu } from "antd";
import { WhiteSpace } from "antd-mobile";

import GTM from "constants/gtm-tags";
import { SeeAllWrapper } from "components/Feed/FeedWrappers";
import { ChildMenuWrapper } from "components/Profile/ProfileComponents";
import { theme, mq } from "constants/theme";
import Activity from "components/Profile/Activity";

const TAB_TYPE = {
  POSTS: {
    REQUESTS: "Requests",
    OFFERS: "Offers",
  },
  REQUESTS: {
    ACTIVE_REQS: "Active",
    ARCHIVED_REQS: "Archived",
    // DRAFTS_REQS: "Drafts",
  },
  OFFERS: {
    ACTIVE_OFRS: "Active",
    ARCHIVED_OFRS: "Archived",
    // DRAFTS_OFRS: "Drafts",
  },
};
const gtmTagsMap = {
  REQUESTS: `${GTM.profile.posts + GTM.profile.requests}`,
  OFFERS: `${GTM.profile.posts + GTM.profile.offers}`,
  ACTIVE_OFRS: `${GTM.profile.offers + GTM.profile.active}`,
  ACTIVE_REQS: `${GTM.profile.requests + GTM.profile.active}`,
  ARCHIVED_OFRS: `${GTM.profile.offers + GTM.profile.archived}`,
  ARCHIVED_REQS: `${GTM.profile.requests + GTM.profile.archived}`,
  DRAFTS_REQS: `${GTM.profile.requests + GTM.profile.draft}`,
  DRAFTS_OFRS: `${GTM.profile.offers + GTM.profile.draft}`,
};

const gtmTag = (tag) => GTM.user.profilePrefix + tag + GTM.profile.desktop;

const ProfileDesktop = ({
  isAuthenticated,
  isOrg,
  // profileId: pathUserId,
  setInternalTab,
  user,
  menuView: viewType,
  profilePost,
  postDispatch,
  postDelete,
  handlePostDelete,
  deleteModalVisibility,
  handleCancelPostDelete,
  loadNextPage,
  isLoading,
  isItemLoaded,
  itemCount,
  loadMore,
  totalPostCount,
  isMobile,
  isProfile,
}) => {
  const { t } = useTranslation();

  const defaultState = useCallback(() => {
    if (viewType === "POSTS") return "REQUESTS";
    else if (viewType === "REQUESTS") return "ACTIVE_REQS";
    else return "ACTIVE_OFRS";
  });
  const [childTab, setChildTab] = useState(defaultState);

  const handleTabChange = (e) => {
    setChildTab(e.key);
    setInternalTab(e.key);
  };

  useEffect(() => {
    setChildTab(defaultState);
    setInternalTab(defaultState);
  }, [viewType]); // eslint-disable-line react-hooks/exhaustive-deps

  const gtmIdPost = () => {
    const suffix = gtmTag(gtmTagsMap[childTab]) + GTM.profile.desktop;
    return suffix;
  };

  return (
    <SeeAllWrapper isMobile={false}>
      <ChildMenuWrapper
        defaultSelectedKeys={[defaultState]}
        selectedKeys={[childTab || defaultState]}
        onClick={handleTabChange}
        mode="horizontal"
        isMobile={isMobile}
      >
        {Object.keys(TAB_TYPE[viewType]).map((item, index) => (
          <Menu.Item
            id={gtmTag(gtmTagsMap[item])}
            key={item}
            disabled={item.toLowerCase().includes("draft")}
          >
            {t(TAB_TYPE[viewType][item])}
          </Menu.Item>
        ))}
      </ChildMenuWrapper>
      <WhiteSpace size={"lg"}></WhiteSpace>
      <Activity
        postDispatch={postDispatch}
        filteredPosts={profilePost}
        user={user}
        postDelete={postDelete}
        handlePostDelete={handlePostDelete}
        deleteModalVisibility={deleteModalVisibility}
        handleCancelPostDelete={handleCancelPostDelete}
        loadNextPage={loadNextPage}
        isNextPageLoading={isLoading}
        itemCount={itemCount}
        isItemLoaded={isItemLoaded}
        hasNextPage={loadMore}
        totalPostCount={totalPostCount}
        isProfile={isProfile}
        gtmIdPost={gtmIdPost}
      />
    </SeeAllWrapper>
  );
};

export default ProfileDesktop;
