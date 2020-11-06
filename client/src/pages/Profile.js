import { WhiteSpace } from "antd-mobile";
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

import Activity from "components/Profile/Activity";
import CreatePost from "components/CreatePost/CreatePost";
import ErrorAlert from "../components/Alert/ErrorAlert";
import FeedWrapper from "components/Feed/FeedWrapper";
import ProfilePic from "components/Picture/ProfilePic";
import UploadPic from "../components/Picture/UploadPic";

import {
  ProfileLayout,
  BackgroundHeader,
  MenuIcon,
  UserInfoContainer,
  EditIcon,
  UserInfoDesktop,
  NameDiv,
  PlaceholderIcon,
  EditEmptyIcon,
  DescriptionDesktop,
  LocationDesktopDiv,
  LocationMobileDiv,
  IconsContainer,
  HelpContainer,
  LocationIcon,
  SocialIcon,
  DescriptionMobile,
  SectionHeader,
  CreatePostDiv,
  CreatePostIcon,
  DrawerHeader,
  CustomDrawer,
  PhotoUploadButton,
  AvatarPhotoContainer,
  NamePara,
} from "../components/Profile/ProfileComponents";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_INDIVIDUAL_URL,
  TWITTER_URL,
  GITHUB_URL,
} from "constants/urls";
import {
  deletePostModalreducer,
  deletePostState,
} from "hooks/reducers/feedReducers";
import { SET_EDIT_POST_MODAL_VISIBILITY } from "hooks/actions/postActions";
import { selectPosts, postsActions } from "reducers/posts";
import {
  SET_DELETE_MODAL_VISIBILITY,
  DELETE_MODAL_POST,
  DELETE_MODAL_HIDE,
} from "hooks/actions/feedActions";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "hooks/actions/userActions";
import { UserContext, withUserContext } from "context/UserContext";
import { getInitialsFromFullName } from "utils/userInfo";
import GTM from "constants/gtm-tags";
import Loader from "components/Feed/StyledLoader";

// ICONS
import createPost from "assets/icons/create-post.svg";
import menu from "assets/icons/menu.svg";
import edit from "assets/icons/edit.svg";
import editEmpty from "assets/icons/edit-empty.svg";
import facebookIcon from "assets/icons/social-facebook.svg";
import instagramIcon from "assets/icons/social-instagram-unfilled.svg";
import githubIcon from "assets/icons/social-github.svg";
import linkedinBlue from "assets/icons/social-linkedin-blue.svg";
import twitterBlue from "assets/icons/social-twitter-blue.svg";
import locationIcon from "assets/icons/location.svg";
import websiteIcon from "assets/icons/social-website-blue.svg";

const URLS = {
  facebook: [facebookIcon, FACEBOOK_URL],
  instagram: [instagramIcon, INSTAGRAM_URL],
  linkedin: [linkedinBlue, LINKEDIN_INDIVIDUAL_URL],
  twitter: [twitterBlue, TWITTER_URL],
  github: [githubIcon, GITHUB_URL],
  website: [websiteIcon],
};

const getHref = (url) => (url.startsWith("http") ? url : `//${url}`);
const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;

const Profile = ({
  match: {
    params: { id: pathUserId },
  },
  history,
  isAuthenticated,
}) => {
  const dispatch = useDispatch();
  const { userProfileState, userProfileDispatch } = useContext(UserContext);
  const [deleteModal, deleteModalDispatch] = useReducer(
    deletePostModalreducer,
    deletePostState,
  );
  const posts = useSelector(selectPosts);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { t } = useTranslation();
  //react-virtualized loaded rows and row count.
  const [itemCount, setItemCount] = useState(0);
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState(ARBITRARY_LARGE_NUM);
  const { error, loading, user } = userProfileState;
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
  const { deleteModalVisibility } = deleteModal;

  const prevTotalPostCount = usePrevious(totalPostCount);
  const userPosts = Object.entries(postsList);
  const prevUserId = usePrevious(userId);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
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
  }, [pathUserId, t, userProfileDispatch]);

  useEffect(() => {
    const fetchPosts = async () => {
      const limit = PAGINATION_LIMIT;
      const skip = page * limit;
      dispatch(postsActions.fetchPostsBegin());
      try {
        if (userId) {
          const endpoint = `/api/posts?ignoreUserLocation=true&includeMeta=true&limit=${limit}&skip=${skip}&authorId=${userId}`;
          const {
            data: { data: posts, meta },
          } = await axios.get(endpoint);

          if (prevUserId !== userId) {
            dispatch(
              postsActions.fetchPostsSuccess({
                posts: [],
              }),
            );
          }
          if (posts.length && meta.total) {
            if (prevTotalPostCount !== meta.total) {
              setTotalPostCount(meta.total);
            }
            if (posts.length < limit) {
              dispatch(postsActions.finishLoadingAction());
            } else if (meta.total === limit) {
              dispatch(postsActions.finishLoadingAction());
            }
            const loadedPosts = posts.reduce((obj, item) => {
              obj[item._id] = item;
              return obj;
            }, {});

            if (prevUserId === userId && postsList) {
              dispatch(
                postsActions.fetchPostsSuccess({
                  posts: { ...postsList, ...loadedPosts },
                }),
              );
            } else {
              dispatch(
                postsActions.fetchPostsSuccess({
                  posts: { ...loadedPosts },
                }),
              );
            }
          } else if (prevUserId === userId && posts) {
            dispatch(
              postsActions.fetchPostsSuccess({
                posts: { ...postsList },
              }),
            );
            dispatch(postsActions.finishLoadingAction());
          } else {
            dispatch(postsActions.finishLoadingAction());
          }
        }
      } catch (error) {
        dispatch(postsActions.fetchPostsError(error));
      }
    };
    fetchPosts();
  }, [userId, page, toggleRefetch]); // eslint-disable-line react-hooks/exhaustive-deps

  const refetchPosts = (isLoading, loadMore) => {
    dispatch(postsActions.resetPageAction({ isLoading, loadMore }));
    if (page === 0) {
      setToggleRefetch(!toggleRefetch);
    }
  };

  const isItemLoaded = useCallback((index) => !!userPosts[index], [userPosts]);

  const loadNextPage = useCallback(
    ({ stopIndex }) => {
      if (
        !isLoading &&
        loadMore &&
        stopIndex >= userPosts.length &&
        userPosts.length
      ) {
        return new Promise((resolve) => {
          dispatch(postsActions.setNextPageAction());
          resolve();
        });
      } else {
        return Promise.resolve();
      }
    },
    [dispatch, isLoading, loadMore, userPosts.length],
  );

  useEffect(() => {
    setItemCount(loadMore ? userPosts.length + 1 : userPosts.length);
  }, [loadMore, userPosts.length]);

  const postDelete = async (post) => {
    let deleteResponse;
    const endPoint = `/api/posts/${post._id}`;
    if (user && (user._id === post.author.id || user.id === post.author.id)) {
      try {
        deleteResponse = await axios.delete(endPoint);
        if (deleteResponse && deleteResponse.data.success === true) {
          const allPosts = {
            ...postsList,
          };
          delete allPosts[post._id];
          setTotalPostCount(totalPostCount - 1);
          if (totalPostCount <= PAGINATION_LIMIT) {
            const isLoading = true;
            const loadMore = false;
            refetchPosts(isLoading, loadMore);
          } else {
            refetchPosts();
          }
        }
      } catch (error) {
        console.log({
          error,
        });
      }
    }
  };

  const handlePostDelete = () => {
    deleteModalDispatch({
      type: SET_DELETE_MODAL_VISIBILITY,
      visibility: DELETE_MODAL_POST,
    });
  };

  const handleCancelPostDelete = () => {
    deleteModalDispatch({
      type: SET_DELETE_MODAL_VISIBILITY,
      visibility: DELETE_MODAL_HIDE,
    });
  };

  const handleEditPost = () => {
    if (deleteModal.editPostModalVisibility) {
      deleteModalDispatch({
        type: SET_EDIT_POST_MODAL_VISIBILITY,
        visibility: false,
      });
    } else {
      deleteModalDispatch({
        type: SET_EDIT_POST_MODAL_VISIBILITY,
        visibility: true,
      });
    }
  };

  const emptyFeed = () => Object.keys(postsList).length < 1 && !isLoading;
  const onToggleDrawer = () => setDrawer(!drawer);
  const onToggleCreatePostDrawer = () => setModal(!modal);

  if (error) {
    return <ErrorAlert message={error} type="error" />;
  }
  if (loading) return <Loader />;
  return (
    <ProfileLayout>
      <BackgroundHeader>
        <MenuIcon src={menu} />
      </BackgroundHeader>
      <UserInfoContainer>
        {ownUser && (
          <EditIcon
            src={edit}
            id={GTM.user.profilePrefix + GTM.profile.modify}
            onClick={onToggleDrawer}
          />
        )}
        <div>
          <AvatarPhotoContainer>
            <ProfilePic
              user={user}
              initials={getInitialsFromFullName(`${firstName} ${lastName}`)}
            />
            <PhotoUploadButton>
              {ownUser && (
                <UploadPic gtmPrefix={GTM.user.profilePrefix} user={user} />
              )}
            </PhotoUploadButton>
          </AvatarPhotoContainer>
        </div>
        <UserInfoDesktop>
          <NameDiv>
            <NamePara>
              {firstName} {lastName}
            </NamePara>

            <PlaceholderIcon />
            {ownUser && (
              <EditEmptyIcon
                src={editEmpty}
                id={GTM.user.profilePrefix + GTM.profile.modify}
                onClick={onToggleDrawer}
              />
            )}
          </NameDiv>
          <DescriptionDesktop> {about} </DescriptionDesktop>
          {address ? (
            <LocationMobileDiv>{address}</LocationMobileDiv>
          ) : (
            <WhiteSpace />
          )}
          <IconsContainer>
            <HelpContainer>
              {needHelp && t("profile.individual.needHelp")}
              {offerHelp && t("profile.individual.wantHelp")}
            </HelpContainer>
            <LocationDesktopDiv>
              {address && <LocationIcon src={locationIcon} />}
              {needHelp && t("profile.individual.needHelp")}
              {offerHelp && t("profile.individual.wantHelp")}{" "}
              {address && `• ${address}`}
            </LocationDesktopDiv>
            <PlaceholderIcon />
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
          </IconsContainer>
        </UserInfoDesktop>
      </UserInfoContainer>
      <WhiteSpace />
      <div style={{ margin: "0 2.5rem" }}>
        <WhiteSpace />
        <DescriptionMobile>
          <SectionHeader> {t("profile.org.about")}</SectionHeader>
          {about}
        </DescriptionMobile>
        <WhiteSpace />
        <SectionHeader>
          {ownUser
            ? t("profile.individual.myActivity")
            : t("profile.individual.userActivity")}
          <PlaceholderIcon />
          {ownUser && (
            <>
              <CreatePostDiv>{t("post.create")}</CreatePostDiv>
              <CreatePostIcon
                id={GTM.user.profilePrefix + GTM.post.createPost}
                src={createPost}
                onClick={onToggleCreatePostDrawer}
              />
            </>
          )}
        </SectionHeader>
        <FeedWrapper>
          <Activity
            filteredPosts={postsList}
            user={user}
            postDelete={postDelete}
            handlePostDelete={handlePostDelete}
            handleEditPost={handleEditPost}
            deleteModalVisibility={deleteModalVisibility}
            handleCancelPostDelete={handleCancelPostDelete}
            loadNextPage={loadNextPage}
            isNextPageLoading={isLoading}
            itemCount={itemCount}
            isItemLoaded={isItemLoaded}
            hasNextPage={loadMore}
            totalPostCount={totalPostCount}
          />
          {postsError && (
            <ErrorAlert
              message={t([
                `error.${postsError.message}`,
                `error.http.${postsError.message}`,
              ])}
            />
          )}
          {emptyFeed() && <></>}
          {ownUser && (
            <CreatePost
              onCancel={onToggleCreatePostDrawer}
              loadPosts={refetchPosts}
              visible={modal}
              user={user}
              gtmPrefix={GTM.user.profilePrefix}
            />
          )}
        </FeedWrapper>
      </div>
      {ownUser && (
        <CustomDrawer
          placement="bottom"
          closable={false}
          onClose={onToggleDrawer}
          visible={drawer}
          height="150px"
          key="bottom"
        >
          <DrawerHeader>
            <Link to="/edit-account">{t("profile.org.editAccount")}</Link>
          </DrawerHeader>
          <DrawerHeader>
            <Link to="/edit-profile">
              {t("profile.individual.editProfile")}{" "}
            </Link>
          </DrawerHeader>
        </CustomDrawer>
      )}
      <WhiteSpace />
    </ProfileLayout>
  );
};

export default withUserContext(Profile);
