import { Menu } from "antd";
import { WhiteSpace } from "antd-mobile";
// ICONS
import createPost from "assets/icons/create-post.svg";
import edit from "assets/icons/edit.svg";
import { ReactComponent as PlusIcon } from "assets/icons/pretty-plus.svg";
import facebookIcon from "assets/icons/social-fb.svg";
import githubIcon from "assets/icons/social-github.svg";
import instagramIcon from "assets/icons/social-instagram.svg";
import linkedinBlue from "assets/icons/social-linkedin.svg";
import twitterBlue from "assets/icons/social-tw.svg";
import locationIcon from "assets/icons/status-indicator.svg";
import websiteIcon from "assets/icons/website-icon.svg";
import axios from "axios";
import CreatePost from "components/CreatePost/CreatePost";
import CreatePostButton from "components/Feed/CreatePostButton";
import {
  FeedWrapper, SeeAllContentWrapper, SeeAllContentWrapperOrg, SeeAllTabsWrapper, SeeAllTabsWrapperOrg
} from "components/Feed/FeedWrappers";
import PostTabCard from "components/Feed/PostTabCard";
import Loader from "components/Feed/StyledLoader";
import { isPostExpired } from "components/Feed/utils";
import ProfilePic from "components/Picture/ProfilePic";
import NoJoinOrg from "components/Profile/NoJoinOrg";
import ProfileDesktop from "components/Profile/ProfileDesktop";
import ProfileList from "components/Profile/ProfileList";
import Verification from "components/Verification/";
import VerificationTick from "components/Verification/Tick";
import GTM from "constants/gtm-tags";
import { mq } from "constants/theme";
import {
  FACEBOOK_URL, GITHUB_URL, INSTAGRAM_URL,
  LINKEDIN_INDIVIDUAL_URL,
  TWITTER_URL
} from "constants/urls";
import { UserContext, withUserContext } from "context/UserContext";
import {
  DELETE_MODAL_HIDE, DELETE_MODAL_POST, SET_DELETE_MODAL_VISIBILITY, SET_VALUE
} from "hooks/actions/feedActions";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess
} from "hooks/actions/userActions";
//delete post
import {
  deletePostModalreducer,
  deletePostState,
  feedReducer,
  optionsReducer
} from "hooks/reducers/feedReducers";
import { lowerCase } from "lodash";
import React, {
  useCallback, useContext,
  useEffect,
  useReducer, useRef, useState
} from "react";
import TagManager from "react-gtm-module";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { applicantsActions, selectApplicants } from "reducers/applicants";
import {
  getProfileModeProp, getProfileObjectiveProp, postsActions, selectPosts
} from "reducers/posts";
import {
  selectActorId,
  selectAuthStatus, selectOrganisationId
} from "reducers/session";
import { getInitialsFromFullName } from "utils/userInfo";
import ErrorAlert from "../components/Alert/ErrorAlert";
import MessageModal from "../components/Feed/MessagesModal/MessageModal.js";
import UploadPic from "../components/Picture/UploadPic";
import {
  AvatarPhotoContainer, CreatePostIcon, CustomDrawer, DescriptionDesktop, DesktopLocation, DesktopMenuWrapper, DrawerHeader, EditIcon, IconsContainer, MobileLocation,
  MobileMenuWrapper, NameDiv, NamePara, PhotoUploadButton, PlaceholderIcon, ProfileBackgroup, ProfileLayout, SectionHeader, SocialIcon, StyledMobileMenuContainer, UserInfoContainer, UserInfoDesktop
} from "../components/Profile/ProfileComponents";
import useWindowDimensions from "../utils/windowSize";

const URLS = {
  facebook: [facebookIcon, FACEBOOK_URL],
  instagram: [instagramIcon, INSTAGRAM_URL],
  linkedin: [linkedinBlue, LINKEDIN_INDIVIDUAL_URL],
  twitter: [twitterBlue, TWITTER_URL],
  github: [githubIcon, GITHUB_URL],
  website: [websiteIcon],
};

const initialState = {
  showFilters: false,
  filterModal: true,
  showCreatePostModal: false,
  applyFilters: false,
  activePanel: null,
};

const getHref = (url) => (url.startsWith("http") ? url : `//${url}`);

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
const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;

const Profile = ({
  isAuthenticated,
  match: {
    params: { id: pathUserId },
  },
}) => {
  const window = useWindowDimensions();
  const dispatch = useDispatch();
  const { userProfileState, userProfileDispatch } = useContext(UserContext);
  const authLoading = useSelector(selectAuthStatus);

  const posts = useSelector(selectPosts);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { t } = useTranslation();

  //react-virtualized loaded rows and row count.
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState(ARBITRARY_LARGE_NUM);

  const { error, loading, user } = userProfileState;
  const [sectionView, setSectionView] = useState(t("requests"));
  const [navMenu, setNavMenu] = useState([]);
  const [internalTab, setInternalTab] = useState("Active");
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
  const [deleteModal, deleteModalDispatch] = useReducer(
    deletePostModalreducer,
    deletePostState,
  );
  const { deleteModalVisibility } = deleteModal;

  const prevTotalPostCount = usePrevious(totalPostCount);
  const prevUserId = usePrevious(userId);
  const organisationId = useSelector(selectOrganisationId);
  const [isInit, setIsInit] = useState(false);

  const actorId = useSelector(selectActorId);
  const isSelf = actorId === userId;
  let filteredPost = [];

  const convertToObjectPost = useCallback((postArray) => {
    let temp = postArray.reduce((map, obj) => {
      map[obj._id] = obj;
      return map;
    }, {});
    return temp;
  }, []);

  const getView = useCallback(() => {
    return sectionView.toUpperCase() !== "POSTS"
      ? lowerCase(sectionView).slice(0, -1)
      : lowerCase(internalTab).slice(0, -1);
  }, [sectionView, internalTab]);

  const getMode = useCallback(() => {
    if (sectionView.toUpperCase() !== "POSTS") {
      return lowerCase(internalTab).includes("archived")
        ? "IA"
        : lowerCase(internalTab).includes("active")
          ? "A"
          : "D";
    }
    return undefined;
  }, [sectionView, internalTab]);

  const isItemLoaded = useCallback((index) => !!filteredPost[index], [
    filteredPost,
  ]);

  const pushTag = (tag) => {
    TagManager.dataLayer({
      dataLayer: {
        event: "ENV_PR_NAV_CLICK",
        clickId:
          GTM.user.profilePrefix +
          GTM.profile[sectionView.toLowerCase()] +
          GTM.profile[tag.toLowerCase()],
      },
    });
    // clear dataLayer
    TagManager.dataLayer({
      dataLayer: {
        event: null,
        clickId: null,
      },
    });
  };
  const buildNavMenu = () => {
    if (
      authLoading == null ||
      authLoading === true ||
      (!isAuthenticated && userId == null) ||
      (isAuthenticated && (userId == null || actorId == null))
    ) {
      return;
    }

    const baseMenu = [
      // TODO:Future feature tabs when ready
      // {
      //   name: t("profile.views.activity"),
      //   disabled: true,
      //   gtm: "activity",
      // },
      // {
      //   name: t("profile.views.organizations"),
      //   disabled: true,
      //   gtm: "organizations",
      // },
      // {
      //   name: t("profile.views.badges"),
      //   disabled: true,
      //   gtm: "badges",
      // },
      // {
      //   name: t("profile.views.thanks"),
      //   disabled: true,
      //   gtm: "thanks",
      // },
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
      baseMenu.splice(3, 0, {
        name: "Organisations",
        disable: false,
        gtm: "organisations",
      });
      setSectionView(t("profile.views.requests"));
      setInternalTab(t("profile.views.active"));
    } else {
      baseMenu.splice(1, 0, {
        name: t("profile.views.posts"),
        disable: false,
        gtm: "posts",
      });
      setSectionView(t("profile.views.posts"));
      setInternalTab(t("profile.views.requests"));
      baseMenu.splice(3, 0, {
        name: "Organisations",
        disable: false,
        gtm: "organisations",
      });

    }
    setNavMenu(baseMenu);
    setIsInit(true);
  };

  useEffect(() => {
    buildNavMenu();
  }, [isSelf, actorId, userId, authLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const getActorQuery = () => {
    return organisationId ? `&actorId=${organisationId}` : "";
  };

  useEffect(() => {
    if (sectionView.toUpperCase() == "POSTS" ||
      sectionView.toUpperCase() == "REQUESTS" ||
      sectionView.toUpperCase() == "OFFERS") {
      let _isMounted = false;
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      const fetchPosts = async () => {
        if (!isInit) {
          return;
        }

        const limit = PAGINATION_LIMIT;
        const skip = page * limit;
        if (!shouldRefetchPost()) {
          return;
        }

        dispatch(postsActions.fetchPostsBegin());
        try {
          if (userId) {

            let baseURL = `/api/posts?ignoreUserLocation=true&includeMeta=true&limit=${limit}&skip=${skip}&authorId=${userId}${getActorQuery()}`;
            const view = getView();

            const objURL = `&objective=${view}`;

            const mode = getMode();

            const modeURL = `&postMode=${mode}`;
            const endpoint = `${baseURL}${objURL}${modeURL}`;

            const {
              data: { data: posts, meta },
            } = await axios.get(endpoint);
            if (!_isMounted) {
              dispatch(
                postsActions.fetchProfilePostSuccess({
                  posts: [...filteredPost, ...posts],
                  userId,
                  objective: view,
                  mode: mode,
                }),
              );

              //desktop fetch
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
          }
        } catch (error) {
          console.log("Error - ", error);
          dispatch(postsActions.fetchPostsError(error));
          if (axios.isCancel(error)) {
            console.log(`request cancelled:${error.message}`);
          } else {
            console.log("Error:" + error.message);
          }
        }
      };
      fetchPosts();
      return () => {
        _isMounted = true;
        source.cancel("Cancelling is cleanup");
      };
    }
  }, [userId, page, toggleRefetch, isInit, sectionView]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const shouldRefetchPost = () => {
    const view = getView();
    const filterView = getProfileObjectiveProp(view);
    const mode = getMode();
    const filterMode = getProfileModeProp(mode);
    return posts.profilePosts?.[userId]?.[filterView]?.[filterMode] == null;
  };

  useEffect(() => {
    refetchPosts();
  }, [internalTab, sectionView]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    refetchApplicants();
  }, [internalTab, sectionView]); // eslint-disable-line react-hooks/exhaustive-deps

  const refetchPosts = (isLoading, loadMore) => {
    dispatch(postsActions.resetPageAction({ isLoading, loadMore }));
    if (page === 0) {
      if (shouldRefetchPost()) {
        setToggleRefetch(!toggleRefetch);
      }
    }
  };

  const loadNextPage = useCallback(
    ({ stopIndex }) => {
      if (
        !isLoading &&
        loadMore &&
        stopIndex >= filteredPost.length &&
        filteredPost.length
      ) {
        return new Promise((resolve) => {
          dispatch(postsActions.setNextPageAction());
          resolve();
        });
      } else {
        return Promise.resolve();
      }
    },
    [dispatch, isLoading, loadMore, filteredPost.length],
  );

  const postDelete = async (post) => {
    let deleteResponse;
    const endPoint = `/api/posts/${post._id}`;
    if (user && (user._id === post.author.id || user.id === post.author.id)) {
      try {
        deleteResponse = await axios.delete(endPoint);
        if (deleteResponse && deleteResponse.data.success === true) {
          handleDeletePostSuccess(post);
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

  const handleCreatePostSuccess = (post) => {
    const objective = getProfileObjectiveProp(post.objective);
    dispatch(
      postsActions.fetchProfilePostSuccess({
        posts: [post, ...posts.profilePosts?.[userId]?.[objective]?.active],
        userId,
        objective: post.objective,
        mode: "A",
      }),
    );
    dispatch(
      postsActions.fetchProfilePostSuccess({
        posts: [post, ...posts.profilePosts?.[userId]?.[objective]?.all],
        userId,
        objective: post.objective,
      }),
    );
  };

  const handleDeletePostSuccess = (post) => {
    if (isPostExpired(post)) {
      dispatch(
        postsActions.fetchProfilePostSuccess({
          posts: filteredPost.filter((curr) => curr._id != post._id),
          userId,
          objective: post.objective,
          mode: "IA",
        }),
      );
    } else {
      dispatch(
        postsActions.fetchProfilePostSuccess({
          posts: filteredPost.filter((curr) => curr._id != post._id),
          userId,
          objective: post.objective,
          mode: "A",
        }),
      );
    }
    dispatch(
      postsActions.fetchProfilePostSuccess({
        posts: filteredPost.filter((curr) => curr._id != post._id),
        userId,
        objective: post.objective,
      }),
    );
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

  const onToggleDrawer = () => setDrawer(!drawer);
  const onToggleCreatePostDrawer = () => setModal(!modal);

  const view = getView();
  const filterView = getProfileObjectiveProp(view);
  const mode = getMode();
  const filterMode = getProfileModeProp(mode);
  filteredPost = posts.profilePosts[userId]?.[filterView]?.[filterMode] ?? [];

  const [feedState, feedDispatch] = useReducer(feedReducer, {
    ...initialState,
  });
  const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});
  const applicants = useSelector(selectApplicants);
  //react-virtualized loaded rows and row count.
  const [itemCountApplicants, setItemCountApplicants] = useState(0);
  const [toggleRefetchApplicants, setToggleRefetchApplicants] = useState(false);
  const [totalApplicantCount, setTotalApplicantCount] = useState(
    ARBITRARY_LARGE_NUM,
  );
  const [rawTotalApplicantCount, setRawTotalApplicants] = useState(0);
  const { filterModal, activePanel, showFilters } = feedState;
  const {
    error: applicantsError,
    isLoadingApplicants,
    loadMoreApplicants,
    pageApplicants,
    applicants: applicantsList,
  } = applicants;
  const feedApplicants = Object.entries(applicantsList);
  const prevTotalApplicantCount = usePrevious(totalApplicantCount);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const history = useHistory();

  const dispatchAction = (type, key, value) =>
    feedDispatch({ type, key, value });

  const refetchApplicants = (
    isLoadingApplicants,
    loadMoreApplicants,
    softRefresh = false,
  ) => {
    if (!softRefresh) {
      dispatchAction(SET_VALUE, "applyFilters", true);
      dispatch(
        applicantsActions.resetPageAction({
          isLoadingApplicants,
          loadMoreApplicants,
        }),
      );
      if (pageApplicants === 0) {
        setToggleRefetchApplicants(!toggleRefetchApplicants);
      }
    }
  };
  const loadApplicants = async () => {
    const limit = PAGINATION_LIMIT;
    const skip = pageApplicants * limit;
    const getApplicantsBaseURL = (userId, limit, skip) => {
      return `/api/applicants?userId=${userId}&status=accepted&includeMeta=true&limit=${limit}&skip=${skip}`;
    };
    let baseURL = getApplicantsBaseURL(userId, limit, skip);
    let endpoint = baseURL;
    dispatch(applicantsActions.fetchApplicantsBegin());
    try {
      const {
        data: { data: applicants, meta },
      } = await axios.get(endpoint);
      if (applicants.length && meta.total) {
        if (prevTotalApplicantCount !== meta.total) {
          setTotalApplicantCount(meta.total);
          setRawTotalApplicants(meta.total);
        }

        const lastPage = Math.ceil(meta.total / limit) - 1;
        if (pageApplicants === lastPage) {
          dispatch(applicantsActions.finishLoadingAction());
        }

        let applicantsInState;
        if (history.location.state) {
          const { keepApplicantsState, keepPageState } = history.location.state;
          applicantsInState = keepApplicantsState;
          if (keepPageState >= pageApplicants) {
            dispatch(applicantsActions.setPageAction(keepPageState));
          }
        }
        if (applicantsInState) {
          if (Object.keys(applicantsInState).length === meta.total) {
            dispatch(applicantsActions.finishLoadingAction());
          }
        }

        const loadedApplicants = applicants.reduce((obj, item) => {
          obj[item._id] = item;
          return obj;
        }, {});

        if (applicantsInState) {
          dispatch(
            applicantsActions.fetchApplicantsSuccess({
              applicants: { ...applicantsInState, ...loadedApplicants },
            }),
          );
        } else if (Object.keys(applicantsList).length && pageApplicants) {
          dispatch(
            applicantsActions.fetchApplicantsSuccess({
              applicants: { ...applicantsList, ...loadedApplicants },
            }),
          );
        } else {
          dispatch(
            applicantsActions.fetchApplicantsSuccess({
              applicants: { ...loadedApplicants },
            }),
          );
        }
      } else if (applicants) {
        dispatch(
          applicantsActions.fetchApplicantsSuccess({
            applicants: { ...applicantsList },
          }),
        );
        dispatch(applicantsActions.finishLoadingAction());
      } else {
        dispatch(applicantsActions.finishLoadingAction());
      }
    } catch (error) {
      dispatch(applicantsActions.fetchApplicantsError(error));
    }
  };

  const [listOrgs, setOrganisations] = useState([]);
  const loadOrganisations = async () => {
    let endpoint = `/api/organisations`;
    try {
      const { data: organisations } = await axios.get(endpoint);
      setOrganisations(organisations);
      const listOrgs = organisations.reduce((objOrg, itemOrg) => {
        objOrg[itemOrg._id] = itemOrg;
        return objOrg;
      }, {});
      setOrganisations(listOrgs);
    } catch (error) {
      console.log({
        error,
      });
    }
  };

  useEffect(() => { }, [history.location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userId) {
      loadApplicants();
    }
  }, [userId, toggleRefetchApplicants, pageApplicants, internalTab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadOrganisations();
  }, []);



  const isApplicantLoaded = useCallback((index) => !!feedApplicants[index], [
    feedApplicants,
  ]);

  useEffect(() => {
    setItemCountApplicants(
      loadMoreApplicants ? feedApplicants.length + 1 : feedApplicants.length,
    );
  }, [feedApplicants.length, loadMoreApplicants]);

  const [orgsLoaded, setOrgsLoaded] = useState(false)
  useEffect(() => {
    if (orgsLoaded == false) {
      setOrgsLoaded(true)
    } else {
      return
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps
  const loadNextPageApplicant = useCallback(
    async () => {
      dispatch(applicantsActions.setNextPageAction());
    }, [], // eslint-disable-line react-hooks/exhaustive-deps
  );
  if (error) {
    return <ErrorAlert message={error} type="error" />;
  }
  if (loading) return <Loader />;

  const handleMenuToggle = (e) => {
    setSectionView(e.key);
    if (sectionView.toUpperCase() == "POSTS") {
      setInternalTab("Requests");
    } else {
      setInternalTab("Active");
    }
  };

  const setTab = (childTab) => {
    if (
      childTab.toUpperCase() === t("profile.views.requests").toUpperCase() ||
      childTab.toUpperCase() === t("profile.views.offers").toUpperCase() ||
      childTab.toUpperCase() === t("profile.views.active").toUpperCase() ||
      childTab.toUpperCase() === t("profile.views.archived").toUpperCase()
    ) {
      pushTag(childTab);
      setInternalTab(childTab);
    }
  };

  const emptyFeedApplicants = () =>
    Object.keys(applicantsList).length < 1 && !isLoadingApplicants;
  const emptyFeed = () => filteredPost.length < 1 && !isLoading;

  if (authLoading == null || authLoading === true) {
    return <></>;
  }

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
                <DesktopLocation>
                  {address && (
                    <div title={address} className="address-container">
                      <img src={locationIcon} alt={address} />
                      {address}
                    </div>
                  )}
                </DesktopLocation>
              </div>
              {isSelf && (
                <EditIcon
                  src={edit}
                  id={GTM.user.profilePrefix + GTM.profile.modify}
                  onClick={onToggleDrawer}
                />
              )}
              {!ownUser && (
                <>
                  <MessageModal
                    isAuthenticated={isAuthenticated}
                    isFromUserCard={"USER"}
                    isFromProfile={true}
                    postAuthorName={`${firstName} ${lastName}`}
                    authorId={userId}
                  />
                </>
              )}
            </NameDiv>
            {about && <DescriptionDesktop> {about} </DescriptionDesktop>}
            <MobileLocation>
              {address && (
                <div title={address} className="address-container">
                  <img src={locationIcon} alt={address} />
                  {address}
                </div>
              )}
            </MobileLocation>
            <IconsContainer>
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
          {isSelf &&
            (sectionView === "Requests" ||
              sectionView === "Offers" ||
              sectionView === "Posts") && (
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
            onSuccess={handleCreatePostSuccess}
            gtmPrefix={GTM.user.profilePrefix}
          />
        )}
        <div>
          {window.width <= parseInt(mq.phone.wide.maxWidth) ? (
            <StyledMobileMenuContainer>
              <MobileMenuWrapper
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
              </MobileMenuWrapper>
              <div style={{ width: "100%" }}>

                {sectionView === "Requests" && (
                  <PostTabCard
                    initialPage={internalTab}
                    cardContents={[
                      {
                        title: t("profile.views.active"),
                        posts:
                          posts.profilePosts[userId]?.requests?.active ?? [],
                      },
                      {
                        title: t("profile.views.archived"),
                        posts:
                          posts.profilePosts[userId]?.requests?.inactive ?? [],
                      },
                    ]}
                    user={user}
                    isAuthenticated={isAuthenticated}
                    onTabClick={setTab}
                    handlePostDelete={postDelete}
                    viewType={sectionView.toUpperCase()}
                  />
                )}
                {sectionView === "Offers" && (
                  <PostTabCard
                    initialPage={internalTab}
                    cardContents={[
                      {
                        title: t("profile.views.active"),
                        posts: posts.profilePosts[userId]?.offers?.active ?? [],
                      },
                      {
                        title: t("profile.views.archived"),
                        posts:
                          posts.profilePosts[userId]?.offers?.inactive ?? [],
                      },
                    ]}
                    user={user}
                    isAuthenticated={isAuthenticated}
                    onTabClick={setTab}
                    handlePostDelete={postDelete}
                    viewType={sectionView.toUpperCase()}
                  />
                )}
                {sectionView === "Posts" && (
                  <PostTabCard
                    initialPage={internalTab}
                    cardContents={[
                      {
                        title: t("profile.views.requests"),
                        posts: posts.profilePosts[userId]?.requests?.all ?? [],
                      },
                      {
                        title: t("profile.views.offers"),
                        posts: posts.profilePosts[userId]?.offers?.all ?? [],
                      },
                    ]}
                    user={user}
                    isAuthenticated={isAuthenticated}
                    onTabClick={setTab}
                    fromPage={false}
                    handlePostDelete={postDelete}
                    viewType={sectionView.toUpperCase()}
                  />
                )}
                {sectionView === "Organisations" ? (
                  rawTotalApplicantCount == 0 ? (
                    <NoJoinOrg isSelf={isSelf} />
                  ) : (
                    <SeeAllTabsWrapperOrg>
                      <SeeAllContentWrapperOrg>
                        <ProfileList
                          filteredOrgs={applicantsList}
                          itemCount={itemCountApplicants}
                          isItemLoaded={isApplicantLoaded}
                          isNextPageLoading={isLoading}
                          loadNextPage={loadNextPageApplicant}
                          hasNextPage={loadMoreApplicants}
                          totalCount={totalApplicantCount}
                          page={pageApplicants}
                          emptyFeed={emptyFeedApplicants}
                          type="orgs"
                          isSelf={isSelf}
                          listOrgs={listOrgs}
                          listInitialized={orgsLoaded}
                        />
                      </SeeAllContentWrapperOrg>
                    </SeeAllTabsWrapperOrg>
                  )
                ) : null}
              </div>
            </StyledMobileMenuContainer>
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

              {sectionView === "Organisations" ? (
                rawTotalApplicantCount == 0 ? (
                  <NoJoinOrg isSelf={isSelf} />
                ) : (
                  <SeeAllTabsWrapperOrg>
                    <SeeAllContentWrapperOrg>
                      <ProfileList
                        filteredOrgs={applicantsList}
                        itemCount={itemCountApplicants}
                        isItemLoaded={isApplicantLoaded}
                        isNextPageLoading={isLoading}
                        loadNextPage={loadNextPageApplicant}
                        hasNextPage={loadMoreApplicants}
                        filteredApplicants={applicantsList}
                        totalCount={totalApplicantCount}
                        page={pageApplicants}
                        emptyFeed={emptyFeedApplicants}
                        type="orgs"
                        isSelf={isSelf}
                        listOrgs={listOrgs}
                      />
                    </SeeAllContentWrapperOrg>
                  </SeeAllTabsWrapperOrg>
                )
              ) : null}
              {sectionView === "Requests" ||
                sectionView === "Offers" ||
                sectionView === "Posts"
                && !isLoading ? (
                <div style={{ width: "100%" }}>
                  <SeeAllTabsWrapper>
                    <SeeAllContentWrapper>
                      <FeedWrapper isProfile>
                        <WhiteSpace size={"xl"}></WhiteSpace>
                        <ProfileDesktop
                          setInternalTab={setTab}
                          isOrg={false}
                          isAuthenticated={isAuthenticated}
                          menuView={sectionView.toUpperCase()}
                          isMobile={false}
                          postDispatch={dispatch}
                          profilePost={convertToObjectPost(filteredPost)}
                          user={user}
                          postDelete={postDelete}
                          handlePostDelete={handlePostDelete}
                          deleteModalVisibility={deleteModalVisibility}
                          handleCancelPostDelete={handleCancelPostDelete}
                          loadNextPage={loadNextPage}
                          isNextPageLoading={isLoading}
                          itemCount={filteredPost.length}
                          isItemLoaded={isItemLoaded}
                          hasNextPage={loadMore}
                          totalPostCount={totalPostCount}
                          isProfile={true}
                        ></ProfileDesktop>
                      </FeedWrapper>
                    </SeeAllContentWrapper>
                  </SeeAllTabsWrapper>

                  {postsError && !isLoading && !loadMore && (
                    <ErrorAlert
                      message={t([
                        `error.${postsError.message}`,
                        `error.http.${postsError.message}`,
                      ])}
                    />
                  )}
                  <div style={{ textAlign: "center" }}>
                    {emptyFeed() && <>"No Posts to display."</>}
                  </div>
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
