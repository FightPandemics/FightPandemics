import { WhiteSpace } from "antd-mobile";
import axios from "axios";
import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
} from "react";
import { Link } from "react-router-dom";

import Activity from "components/Profile/Activity";
import CreatePost from "components/CreatePost/CreatePost";
import ErrorAlert from "../components/Alert/ErrorAlert";
import FeedWrapper from "components/Feed/FeedWrapper";
import ProfilePic from "components/Picture/ProfilePic";
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
} from "../components/Profile/ProfileComponents";
import {
  FACEBOOK_URL,
  LINKEDIN_INDIVIDUAL_URL,
  TWITTER_URL,
  GITHUB_URL,
} from "constants/urls";
import {
  postsReducer,
  postsState as initialPostsState,
} from "hooks/reducers/feedReducers";
import { SET_EDIT_POST_MODAL_VISIBILITY } from "hooks/actions/postActions";
import {
  SET_LIKE,
  SET_DELETE_MODAL_VISIBILITY,
  DELETE_MODAL_POST,
  DELETE_MODAL_HIDE,
  SET_LOADING,
  NEXT_PAGE,
  RESET_PAGE,
  ERROR_POSTS,
  FETCH_POSTS,
  SET_POSTS,
} from "hooks/actions/feedActions";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "hooks/actions/userActions";
import { UserContext, withUserContext } from "context/UserContext";
import { getInitialsFromFullName } from "utils/userInfo";
import GTM from "constants/gtm-tags";

// ICONS
import createPost from "assets/icons/create-post.svg";
import menu from "assets/icons/menu.svg";
import edit from "assets/icons/edit.svg";
import editEmpty from "assets/icons/edit-empty.svg";
import facebookIcon from "assets/icons/social-facebook.svg";
import githubIcon from "assets/icons/social-github.svg";
import linkedinBlue from "assets/icons/social-linkedin-blue.svg";
import twitterBlue from "assets/icons/social-twitter-blue.svg";
import locationIcon from "assets/icons/location.svg";
import websiteIcon from "assets/icons/social-website-blue.svg";

const URLS = {
  github: [githubIcon, GITHUB_URL],
  facebook: [facebookIcon, FACEBOOK_URL],
  linkedin: [linkedinBlue, LINKEDIN_INDIVIDUAL_URL],
  twitter: [twitterBlue, TWITTER_URL],
  website: [websiteIcon],
};

const getHref = (url) => (url.startsWith("http") ? url : `//${url}`);

const Profile = ({
  match: {
    params: { id: pathUserId },
  },
}) => {
  const { userProfileState, userProfileDispatch } = useContext(UserContext);
  const [postsState, postsDispatch] = useReducer(
    postsReducer,
    initialPostsState,
  );
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  //react-virtualized loaded rows and row count.
  const [itemCount, setItemCount] = useState(0);
  const [loadedRows, setLoadedRows] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [toggleRefetch, setToggleRefetch] = useState(false);
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
    deleteModalVisibility,
  } = postsState;
  const userPosts = Object.entries(postsList);

  useEffect(() => {
    (async function fetchProfile() {
      userProfileDispatch(fetchUser());
      try {
        const res = await axios.get(`/api/users/${pathUserId}`);
        userProfileDispatch(fetchUserSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        userProfileDispatch(
          fetchUserError(`Failed loading profile, reason: ${message}`),
        );
      }
    })();
  }, [pathUserId, userProfileDispatch]);

  useEffect(() => {
    const fetchPosts = async () => {
      const limit = 10;
      const skip = page * limit;
      let response = {};

      postsDispatch({ type: FETCH_POSTS });
      try {
        if (userId) {
          const endpoint = `/api/posts?ignoreUserLocation=true&limit=${limit}&skip=${skip}&authorId=${userId}`;
          response = await axios.get(endpoint);
          if (response && response.data && response.data.length) {
            if (response.data.length < limit) {
              setHasNextPage(false);
            } else {
              setHasNextPage(true);
            }

            const loadedPosts = response.data.reduce((obj, item) => {
              obj[item._id] = item;
              return obj;
            }, {});
            if (postsList) {
              postsDispatch({
                type: SET_POSTS,
                posts: { ...postsList, ...loadedPosts },
              });
            } else {
              postsDispatch({
                type: SET_POSTS,
                posts: { ...loadedPosts },
              });
            }
          } else if (response && response.data) {
            postsDispatch({
              type: SET_POSTS,
              posts: { ...postsList },
            });
            postsDispatch({
              type: SET_LOADING,
              isLoading: false,
              loadMore: false,
            });
          } else {
            postsDispatch({ type: SET_LOADING });
          }
        }
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        postsDispatch({
          type: ERROR_POSTS,
          error: `Failed loading activity, reason: ${message}`,
        });
      }
    };
    fetchPosts();
  }, [userId, page, toggleRefetch]); // eslint-disable-line react-hooks/exhaustive-deps

  const refetchPosts = () => {
    postsDispatch({ type: RESET_PAGE });
    if (page === 0) {
      setToggleRefetch(!toggleRefetch);
    }
  };

  const isItemLoaded = useCallback(
    (index) => {
      if (!!userPosts[index]) {
        setLoadedRows(false);
      } else {
        setLoadedRows(true);
      }
      return !!userPosts[index];
    },
    [userPosts],
  );

  const loadNextPage = useCallback(() => {
    if (!isLoading && loadMore && loadedRows) {
      return new Promise((resolve) => {
        postsDispatch({ type: NEXT_PAGE });
        resolve();
      });
    } else {
      return Promise.resolve();
    }
  }, [isLoading, loadMore, loadedRows]); // eslint-disable-line react-hooks/exhaustive-deps

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
          await postsDispatch({
            type: SET_POSTS,
            posts: allPosts,
          });
        }
      } catch (error) {
        console.log({
          error,
        });
      }
    }
  };

  const handlePostDelete = () => {
    postsDispatch({
      type: SET_DELETE_MODAL_VISIBILITY,
      visibility: DELETE_MODAL_POST,
    });
  };

  const handleCancelPostDelete = () => {
    postsDispatch({
      type: SET_DELETE_MODAL_VISIBILITY,
      visibility: DELETE_MODAL_HIDE,
    });
  };

  const handleEditPost = () => {
    if (postsState.editPostModalVisibility) {
      postsDispatch({
        type: SET_EDIT_POST_MODAL_VISIBILITY,
        visibility: false,
      });
    } else {
      postsDispatch({
        type: SET_EDIT_POST_MODAL_VISIBILITY,
        visibility: true,
      });
    }
  };

  const handlePostLike = async (postId, liked, create) => {
    sessionStorage.removeItem("likePost");
    const endPoint = `/api/posts/${postId}/likes/${user?.id || user?._id}`;
    let response = {};

    if (user) {
      if (liked) {
        try {
          response = await axios.delete(endPoint);
        } catch (error) {
          console.log({ error });
        }
      } else {
        try {
          response = await axios.put(endPoint);
        } catch (error) {
          console.log({ error });
        }
      }

      if (response.data) {
        postsDispatch({
          type: SET_LIKE,
          postId,
          count: response.data.likesCount,
        });
      }
    }
  };

  const onToggleDrawer = () => setDrawer(!drawer);
  const onToggleCreatePostDrawer = () => setModal(!modal);

  if (error) {
    return <ErrorAlert message={error} type="error" />;
  }
  if (loading) return <div>"loading"</div>;
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
        <ProfilePic
          noPic={true}
          initials={getInitialsFromFullName(`${firstName} ${lastName}`)}
        />
        <UserInfoDesktop>
          <NameDiv>
            {firstName} {lastName}
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
              {needHelp && "I need help "}
              {offerHelp && "I want to help"}
            </HelpContainer>
            <LocationDesktopDiv>
              {address && <LocationIcon src={locationIcon} />}
              {needHelp && "I need help "}
              {offerHelp && "I want to help "} {address && `• ${address}`}
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
          <SectionHeader> About</SectionHeader>
          {about}
        </DescriptionMobile>
        <WhiteSpace />
        <SectionHeader>
          {ownUser ? "My Activity" : "User Activity"}
          <PlaceholderIcon />
          {ownUser && (
            <>
              <CreatePostDiv>Create a post</CreatePostDiv>
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
            handlePostLike={handlePostLike}
            loadNextPage={loadNextPage}
            isNextPageLoading={isLoading}
            itemCount={itemCount}
            isItemLoaded={isItemLoaded}
            hasNextPage={hasNextPage}
          />
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
            <Link to="/edit-account">Edit Account Information</Link>
          </DrawerHeader>
          <DrawerHeader>
            <Link to="/edit-profile">Edit Profile </Link>
          </DrawerHeader>
        </CustomDrawer>
      )}
      <WhiteSpace />
    </ProfileLayout>
  );
};

export default withUserContext(Profile);
