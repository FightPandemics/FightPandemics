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
    DRAFTS_REQS: "Drafts",
  },
  OFFERS: {
    ACTIVE_OFRS: "Active",
    ARCHIVED_OFRS: "Archived",
    DRAFTS_OFRS: "Drafts",
  },
};
const gtmTagsMap = {
  REQUESTS: `${GTM.profile.requests}`,
  OFFERS: `${GTM.profile.offers}`,
};

const gtmTag = (tag) => GTM.profile.viewProfilePrefix + tag;

const ProfileDesktop = ({
  isAuthenticated,
  isOrg,
  // profileId: pathUserId,
  setInternalTab,
  user,
  menuView: viewType,
  profilePost,
  postDispatch,
  loadNextPage,
  isLoading,
  isItemLoaded,
  itemCount,
  loadMore,
  totalPostCount,
  isMobile,
}) => {
  const { t } = useTranslation();

  const defaultState = useCallback(() => {
    if (viewType === "POSTS") return "REQUESTS";
    else if (viewType === "REQUESTS") return "ACTIVE_REQS";
    else return "ACTIVE_OFRS";
  });
  const [childTab, setChildTab] = useState(defaultState);

  const handleTabChange = (e) => {
    console.log("tab Change", e.key);
    setChildTab(e.key);
    setInternalTab(e.key);
    // currentActiveTab = e.key;
  };

  useEffect(() => {
    setChildTab(defaultState);
    // setInternalTab(defaultState);
  }, [viewType]); // eslint-disable-line react-hooks/exhaustive-deps

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
        // postDelete={postDelete}
        // handlePostDelete={handlePostDelete}
        // // handleEditPost={handleEditPost}
        // deleteModalVisibility={deleteModalVisibility}
        // handleCancelPostDelete={handleCancelPostDelete}
        loadNextPage={loadNextPage}
        isNextPageLoading={isLoading}
        itemCount={itemCount}
        isItemLoaded={isItemLoaded}
        hasNextPage={loadMore}
        totalPostCount={totalPostCount}
      />
      {/* {postsError && (
        <ErrorAlert
          message={t([
            `error.${postsError.message}`,
            `error.http.${postsError.message}`,
          ])}
        />
      )} */}
      {/* {emptyFeed() && <>"No Posts matching your crieteria."</>} */}
    </SeeAllWrapper>
  );
};

export default ProfileDesktop;
