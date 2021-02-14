import React, {
  useEffect,
  useReducer,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { Menu } from "antd";
import { WhiteSpace } from "antd-mobile";
import qs from "query-string";

import {
  FeedWrapper,
  SiderWrapper,
  FiltersWrapper,
  /* MenuWrapper, */
  LayoutWrapper,
  ContentWrapper,
  HeaderWrapper,
  TabsWrapper,
  MobileSearchWrapper,
} from "components/Feed/FeedWrappers";

import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "hooks/actions/userActions";
import {
  fetchOrganisation,
  fetchOrganisationError,
  fetchOrganisationSuccess,
} from "hooks/actions/organisationActions";
import { UserContext, withUserContext } from "context/UserContext";
import {
  OrganisationContext,
  withOrganisationContext,
} from "context/OrganisationContext";

/* import { mq } from "constants/theme"; */
import GTM from "../constants/gtm-tags";
import { setQueryKeysValue } from "components/Feed/utils";
import { selectPosts, postsActions } from "reducers/posts";
import { selectOrganisationId, selectActorId } from "reducers/session";
import Activity from "components/Profile/Activity";
import CreatePost from "components/CreatePost/CreatePost";
import ErrorAlert from "../components/Alert/ErrorAlert";
import Posts from "components/Feed/Posts";
import { lowerCase } from "lodash";
import { theme, mq } from "constants/theme";
import SeeAllComp from "components/Profile/SeeAllComponent";

// ICONS
import LeftRightIconButton from "components/Button/LeftRightIconButton";
import SvgIcon from "components/Icon/SvgIcon";
import backIcon from "assets/icons/back.svg";

const gtmTagsMap = {
  // ALL: GTM.post.allPost,
  REQUESTS: `${GTM.profile.requests}`,
  OFFERS: `${GTM.profile.offers}`,
};

const gtmTag = (tag) => GTM.profile.viewProfilePrefix + tag;

let VIEW_TYPE = {
  POSTS: "Posts",
  REQUESTS: "Requests",
  OFFERS: "Offers",
};

const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;
// const [queryParams, setQueryParams] = useState({});

export const MenuWrapper = styled(Menu)`
  line-height: 40px;

  &.ant-menu {
    border-top: 0.2rem solid ${theme.colors.lightGray};
    border-bottom: 0.2rem solid ${theme.colors.lightGray};

    li.ant-menu-item {
      height: 3rem;
      padding-bottom: 1rem;
      border-left: 0.5rem solid ${theme.colors.white};
      color: ${theme.colors.darkerGray};
      font-size: ${theme.typography.size.large};
      line-height: 21px;
      width: 11.5rem;
      &:hover {
        color: ${theme.colors.darkerGray};
      }
      &:first-child {
        text-align: center;
        padding-left: 4rem;
        padding-right: 7rem;
      }
      &:nth-last-child(2) {
        text-align: center;
        color: purple;
        padding-left: 7rem;
        padding-right: 4.5rem;
      }
    }

    &.ant-menu .ant-menu-item-selected {
      background-color: transparent;
      border-bottom: solid #282828;
      font-weight: bold;
    }
  }
`;

export const BackButton = styled(LeftRightIconButton)`
  align-items: center;
  background-color: transparent;
  color: ${theme.colors.royalBlue};
  cursor: pointer;
  display: flex;
  height: 6.8rem;
  justify-content: center;
  width: 6.8rem;

  & span {
    display: none;
  }

  @media screen and (min-width: ${mq.tablet.narrow.minWidth}) {
    height: 4.8rem;
    width: 25rem;
    transition: all 0.1s;

    & span {
      display: inline;
    }

    &:hover {
      img {
        // values below are equivalent to royalBlue
        filter: invert(0.5) sepia(63) saturate(3) hue-rotate(207deg);
      }
    }

    &:active {
      transform: translateY(0.1rem);
    }
  }
`;

export const BackText = styled.span`
  margin-left: 1.3rem;
  font-size: 1.6rem;
  font-weight: bold;
`;

const SeeAll = ({
  isAuthenticated,
  isOrg = true,
  isProfile = false,
  match: {
    params: { id: pathUserId },
  },
}) => {
  const { t } = useTranslation();
  let orgId = "";
  const isMobile = window.screen.width <= parseInt(mq.phone.wide.maxWidth);
  if (isOrg) {
    orgId = pathUserId;
  }

  let [queryParams, setQueryParams] = useState(
    "POSTS",
  ); /* useState("REQUESTS"); */

  const handleViewChange = (e) => {
    setQueryParams(e.key);
  };

  return (
    <FeedWrapper>
      <LayoutWrapper>
        <WhiteSpace size={"lg"} />

        <Link to={`/profile/${pathUserId}`} style={{ "margin-left": "29px" }}>
          <SvgIcon src={backIcon} title="Navigate to the profile page" />
          <BackText>{t(VIEW_TYPE["OFFERS"])}</BackText>
        </Link>

        <WhiteSpace size={"lg"} />
        <SeeAllComp
          profileId={pathUserId}
          isOrg={isOrg}
          isAuthenticated={isAuthenticated}
          menuView={"OFFERS"}
        ></SeeAllComp>
      </LayoutWrapper>
    </FeedWrapper>
  );
};

export default withOrganisationContext(withUserContext(SeeAll));
