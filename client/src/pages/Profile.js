import { WhiteSpace } from "antd-mobile";
import { Menu } from "antd";
import axios from "axios";
import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { theme, mq } from "constants/theme";

import CreatePost from "components/CreatePost/CreatePost";
import ErrorAlert from "../components/Alert/ErrorAlert";
import {
  FeedWrapper,
  SeeAllTabsWrapper,
  SeeAllContentWrapper,
} from "components/Feed/FeedWrappers";
import ProfilePic from "components/Picture/ProfilePic";
import UploadPic from "../components/Picture/UploadPic";
import MessageModal from "../components/Feed/MessagesModal/MessageModal.js";
import CreatePostButton from "components/Feed/CreatePostButton";
import { ReactComponent as PlusIcon } from "assets/icons/pretty-plus.svg";
import Verification from "components/Verification/";
import VerificationTick from "components/Verification/Tick";
import SeeAllComp from "components/Profile/SeeAllComponent";
import { Tabs } from "antd";

import {
  ProfileLayout,
  ProfileBackgroup,
  UserInfoContainer,
  EditIcon,
  UserInfoDesktop,
  NameDiv,
  PlaceholderIcon,
  DescriptionDesktop,
  IconsContainer,
  HelpContainer,
  SocialIcon,
  SectionHeader,
  CreatePostDiv,
  CreatePostIcon,
  DrawerHeader,
  CustomDrawer,
  PhotoUploadButton,
  AvatarPhotoContainer,
  NamePara,
  MobileMenuWrapper,
  DesktopMenuWrapper,
} from "../components/Profile/ProfileComponents";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_INDIVIDUAL_URL,
  TWITTER_URL,
  GITHUB_URL,
} from "constants/urls";

import { selectPosts, postsActions } from "reducers/posts";

import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "hooks/actions/userActions";
import { UserContext, withUserContext } from "context/UserContext";
import { getInitialsFromFullName } from "utils/userInfo";
import GTM from "constants/gtm-tags";
import Loader from "components/Feed/StyledLoader";
import { selectOrganisationId, selectActorId } from "reducers/session";

// ICONS
import createPost from "assets/icons/create-post.svg";
import edit from "assets/icons/edit.svg";
import instagramIcon from "assets/icons/social-instagram.svg";
import linkedinBlue from "assets/icons/social-linkedin.svg";
import facebookIcon from "assets/icons/social-fb.svg";
import twitterBlue from "assets/icons/social-tw.svg";
import githubIcon from "assets/icons/social-github.svg";
import websiteIcon from "assets/icons/website-icon.svg";

import locationIcon from "assets/icons/status-indicator.svg";
import useWindowDimensions from "../utils/windowSize";

const URLS = {
  facebook: [facebookIcon, FACEBOOK_URL],
  instagram: [instagramIcon, INSTAGRAM_URL],
  linkedin: [linkedinBlue, LINKEDIN_INDIVIDUAL_URL],
  twitter: [twitterBlue, TWITTER_URL],
  github: [githubIcon, GITHUB_URL],
  website: [websiteIcon],
};

const getHref = (url) => (url.startsWith("http") ? url : `//${url}`);

const Profile = ({
  isAuthenticated,
  match: {
    params: { id: pathUserId },
  },
}) => {
  const window = useWindowDimensions();
  const dispatch = useDispatch();
  const { userProfileState, userProfileDispatch } = useContext(UserContext);

  const posts = useSelector(selectPosts);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { t } = useTranslation();
  //react-virtualized loaded rows and row count.
  const [itemCount, setItemCount] = useState(0);
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const { error, loading, user } = userProfileState;
  const [sectionView, setSectionView] = useState(t("requests"));
  const [navMenu, setNavMenu] = useState([]);
  const {
    id: userId,
    about,
    firstName,
    lastName,
    location = {},
    needs = {},
    objectives = {},
    ownUser,
    urls = {},
    usesPassword = false,
    verified,
  } = user || {};
  const needHelp = Object.values(needs).some((val) => val === true);
  const offerHelp = Object.values(objectives).some((val) => val === true);
  const { address } = location;
  const {
    isLoading,
    loadMore,
    page,
    posts: postsList,
    error: postsError,
  } = posts;

  if (ownUser) sessionStorage.removeItem("msgModal");
  const userPosts = Object.entries(postsList);

  const actorId = useSelector(selectActorId);
  const isSelf = actorId === userId;

  const buildNavMenu = () => {
    const baseMenu = [
      {
        name: t("profile.views.activity"),
        disabled: true,
        gtm: "activity",
      },
      {
        name: t("profile.views.organizations"),
        disabled: true,
        gtm: "organizations",
      },
      {
        name: t("profile.views.badges"),
        disabled: true,
        gtm: "badges",
      },
      {
        name: t("profile.views.thanks"),
        disabled: true,
        gtm: "thanks",
      },
    ];
    if (isSelf) {
      baseMenu.splice(1, 0, {
        name: t("profile.views.requests"),
        disabled: false,
        gtm: "requests",
      });
      baseMenu.splice(2, 0, {
        name: t("profile.views.offers"),
        disabled: false,
        gtm: "offers",
      });
      setSectionView(t("profile.views.requests"));
    } else {
      baseMenu.splice(1, 0, {
        name: t("profile.views.posts"),
        disable: false,
        gtm: "posts",
      });
      setSectionView(t("profile.views.posts"));
    }
    setNavMenu(baseMenu);
  };

  useEffect(() => {
    buildNavMenu();
  }, [isSelf]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(postsActions.resetPageAction({}));
    (async function fetchProfile() {
      userProfileDispatch(fetchUser());
      try {
        const res = await axios.get(`/api/users/${pathUserId}`);
        userProfileDispatch(fetchUserSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        const translatedErrorMessage = t([
          `error.${message}`,
          `error.http.${message}`,
        ]);
        userProfileDispatch(
          fetchUserError(
            `${t("error.failedLoadingProfile")} ${translatedErrorMessage}`,
          ),
        );
      }
    })();
  }, [pathUserId, userProfileDispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const refetchPosts = (isLoading, loadMore) => {
    dispatch(postsActions.resetPageAction({ isLoading, loadMore }));
    if (page === 0) {
      setToggleRefetch(!toggleRefetch);
    }
  };

  useEffect(() => {
    setItemCount(loadMore ? userPosts.length + 1 : userPosts.length);
  }, [loadMore, userPosts.length]);

  const onToggleDrawer = () => setDrawer(!drawer);
  const onToggleCreatePostDrawer = () => setModal(!modal);

  if (error) {
    return <ErrorAlert message={error} type="error" />;
  }
  if (loading) return <Loader />;

  const handleMenuToggle = (e) => {
    setSectionView(e.key);
  };

  return (
    <>
      <ProfileBackgroup />
      <ProfileLayout>
        <UserInfoContainer>
          <AvatarPhotoContainer>
            <ProfilePic
              user={user}
              initials={getInitialsFromFullName(`${firstName} ${lastName}`)}
            />
            <PhotoUploadButton>
              {isSelf && (
                <UploadPic gtmPrefix={GTM.user.profilePrefix} user={user} />
              )}
            </PhotoUploadButton>
          </AvatarPhotoContainer>
          <UserInfoDesktop>
            <NameDiv>
              <div className="name-container">
                <NamePara>
                  {firstName} {lastName}
                  {verified && <VerificationTick />}
                </NamePara>
                {address && (
                  <div title={address} className="address-container">
                    <img src={locationIcon} alt={address} />
                    {address}
                  </div>
                )}
              </div>
              {isSelf && (
                <EditIcon
                  src={edit}
                  id={GTM.user.profilePrefix + GTM.profile.modify}
                  onClick={onToggleDrawer}
                />
              )}
              {!ownUser && (
                <MessageModal
                  isAuthenticated={isAuthenticated}
                  isFromUserCard={"USER"}
                  isFromProfile={true}
                  postAuthorName={`${firstName} ${lastName}`}
                  authorId={userId}
                />
              )}
            </NameDiv>
            {about && <DescriptionDesktop> {about} </DescriptionDesktop>}
            <IconsContainer>
              <HelpContainer>
                {needHelp && <div>{t("profile.individual.needHelp")}</div>}
                {offerHelp && <div> {t("profile.individual.wantHelp")}</div>}
              </HelpContainer>
              <div className="social-icons">
                {Object.entries(urls).map(([name, url]) => {
                  return (
                    url && (
                      <a
                        href={
                          name === "website"
                            ? getHref(url)
                            : `${URLS[name][1]}${url}`
                        }
                        key={name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SocialIcon src={URLS[name][0]} />
                      </a>
                    )
                  );
                })}
              </div>
            </IconsContainer>
          </UserInfoDesktop>
        </UserInfoContainer>
        <WhiteSpace />
        {isSelf && !verified && (
          <Verification gtmPrefix={GTM.user.profilePrefix} />
        )}
        <WhiteSpace />
        <SectionHeader>
          <PlaceholderIcon />
          {isSelf && (
            <>
              <CreatePostIcon
                id={GTM.user.profilePrefix + GTM.post.createPost}
                src={createPost}
                onClick={onToggleCreatePostDrawer}
              />
              <CreatePostButton
                onClick={onToggleCreatePostDrawer}
                id={GTM.user.profilePrefix + GTM.post.createPost}
                inline={true}
                icon={<PlusIcon />}
              >
                {t("post.create")}
              </CreatePostButton>
            </>
          )}
        </SectionHeader>
        {isSelf && (
          <CreatePost
            onCancel={onToggleCreatePostDrawer}
            loadPosts={refetchPosts}
            visible={modal}
            user={user}
            gtmPrefix={GTM.user.profilePrefix}
          />
        )}
        <div>
          {window.width <= parseInt(mq.phone.wide.maxWidth) ? (
            <MobileMenuWrapper
              defaultSelectedKeys={[sectionView]}
              selectedKeys={sectionView}
              onClick={handleMenuToggle}
            >
              {navMenu.map((item, index) => (
                <Menu.Item
                  key={item.name}
                  disabled={item.disabled}
                  id={GTM.user.profilePrefix + GTM.profile.item.gtm}
                >
                  {item.name}
                </Menu.Item>
              ))}
            </MobileMenuWrapper>
          ) : null}
          {window.width <= parseInt(mq.phone.wide.maxWidth) ? null : (
            <div style={{ display: "flex" }}>
              <DesktopMenuWrapper
                defaultSelectedKeys={[sectionView]}
                selectedKeys={sectionView}
                onClick={handleMenuToggle}
              >
                {navMenu.map((item, index) => (
                  <Menu.Item
                    key={item.name}
                    disabled={item.disabled}
                    id={GTM.user.profilePrefix + GTM.profile[item.gtm]}
                  >
                    {item.name}
                  </Menu.Item>
                ))}
              </DesktopMenuWrapper>

              {sectionView === "Requests" ||
              sectionView === "Offers" ||
              sectionView === "Posts" ? (
                <div style={{ width: "100%" }}>
                  <SeeAllTabsWrapper>
                    <SeeAllContentWrapper>
                      <FeedWrapper isProfile>
                        <WhiteSpace size={"xl"}></WhiteSpace>
                        <SeeAllComp
                          profileId={pathUserId}
                          user={user}
                          isOrg={false}
                          isAuthenticated={isAuthenticated}
                          menuView={sectionView.toUpperCase()}
                          isMobile={false}
                        ></SeeAllComp>
                      </FeedWrapper>
                    </SeeAllContentWrapper>
                  </SeeAllTabsWrapper>

                  {postsError && (
                    <ErrorAlert
                      message={t([
                        `error.${postsError.message}`,
                        `error.http.${postsError.message}`,
                      ])}
                    />
                  )}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {isSelf && (
          <CustomDrawer
            placement="bottom"
            closable={false}
            onClose={onToggleDrawer}
            visible={drawer}
            height="auto"
            key="bottom"
          >
            <DrawerHeader>
              <Link to="/edit-account">
                {t("profile.individual.editAccount")}
              </Link>
            </DrawerHeader>
            <DrawerHeader>
              <Link to="/edit-profile">
                {t("profile.individual.editProfile")}{" "}
              </Link>
            </DrawerHeader>
            {usesPassword && (
              <DrawerHeader>
                <Link to="/edit-security">
                  {t("profile.individual.editSecurity")}{" "}
                </Link>
              </DrawerHeader>
            )}
            <DrawerHeader>
              <Link to="/edit-notifications">
                {t("profile.individual.editNotification")}{" "}
              </Link>
            </DrawerHeader>
          </CustomDrawer>
        )}
      </ProfileLayout>
    </>
  );
};

export default withUserContext(Profile);
