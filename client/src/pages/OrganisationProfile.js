import { Col, Input, Row, Tabs } from "antd";
import appStoreIcon from "assets/icons/app-store-icon.svg";
import applicationConfirmation from "assets/icons/application-received.svg";
// ICONS
import createPost from "assets/icons/create-post.svg";
import edit from "assets/icons/edit.svg";
import locationIcon from "assets/icons/location.svg";
import playStoreIcon from "assets/icons/play-store-icon.svg";
import { ReactComponent as PlusIcon } from "assets/icons/pretty-plus.svg";
import envelopeBlue from "assets/icons/social-envelope-blue.svg";
import facebookIcon from "assets/icons/social-fb.svg";
import githubIcon from "assets/icons/social-github.svg";
import instagramIcon from "assets/icons/social-instagram.svg";
import linkedinBlue from "assets/icons/social-linkedin.svg";
import twitterBlue from "assets/icons/social-tw.svg";
import websiteIcon from "assets/icons/website-icon.svg";
import axios from "axios";
import CreatePost from "components/CreatePost/CreatePost";
import CreatePostButton from "components/Feed/CreatePostButton";
import { FeedWrapper } from "components/Feed/FeedWrappers";
import Loader from "components/Feed/StyledLoader";
import JoinOrgButton, {
  JoinOrgContainer
} from "components/OrganisationProfile/JoinOrgButton";
import { DescriptionInput } from "components/OrganisationProfile/Positions";
import ProfileList from "components/OrganisationProfile/ProfileList";
import {
  ProfileTabPane, ProfileTabs
} from "components/OrganisationProfile/ProfileTabs";
import ProfilePic from "components/Picture/ProfilePic";
import UploadPic from "components/Picture/UploadPic";
import Activity from "components/Profile/Activity";
import VerificationTick from "components/Verification/Tick";
import GTM from "constants/gtm-tags";
import {
  APPSTORE_URL, FACEBOOK_URL,
  GITHUB_URL, INSTAGRAM_URL,
  LINKEDIN_URL,
  PLAYSTORE_URL, TWITTER_URL
} from "constants/urls";
import {
  OrganisationContext,
  withOrganisationContext
} from "context/OrganisationContext";
import { UserContext, withUserContext } from "context/UserContext";
import {
  DELETE_MODAL_HIDE, DELETE_MODAL_POST, SET_DELETE_MODAL_VISIBILITY
} from "hooks/actions/feedActions";
import {
  fetchOrganisation,
  fetchOrganisationError,
  fetchOrganisationSuccess
} from "hooks/actions/organisationActions";
import { SET_EDIT_POST_MODAL_VISIBILITY } from "hooks/actions/postActions";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess
} from "hooks/actions/userActions";
import {
  deletePostModalreducer,
  deletePostState,
  feedReducer,
  optionsReducer
} from "hooks/reducers/feedReducers";
import React, {
  useCallback, useContext, useEffect,
  useReducer,
  useRef, useState
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { applicantsActions, selectApplicants } from "reducers/applicants";
import { membersActions, selectMembers } from "reducers/members";
import { postsActions, selectPosts } from "reducers/posts";
import { selectOrganisationId } from "reducers/session";
import styled from "styled-components";
import { LOGIN } from "templates/RouteWithSubRoutes";
import {
  getInitialsFromFullName,
  isAuthorOrg,
  isAuthorUser
} from "utils/userInfo";
import ErrorAlert from "../components/Alert/ErrorAlert";
import { PostPositionButton } from "../components/EditProfile/EditComponents";
import MessageModal from "../components/Feed/MessagesModal/MessageModal.js";
import {
  ConfirmButton, DescContainer,
  DisplayText, FPSwitch,
  HeaderTitle, JoinPositionStyles,
  Label, StyledConfirmModal, StyledPositionModal, StyledPostButton
} from "../components/Positions/JoinPositionStyles";
import {
  AvatarPhotoContainer, CreatePostIcon,
  CustomDrawer, DescriptionDesktop,
  DrawerHeader, EditIcon,
  NameDiv,
  NamePara, PhotoUploadButton, PlaceholderIcon, PositionEditIcon,
  ProfileBackgroup, ProfileLayout,
  SectionHeader, SeeOrgBookLink,
  SocialIcon, UserInfoContainer,
  UserInfoDesktop
} from "../components/Profile/ProfileComponents";

const Error = styled.span`
  color: red;
`;

const { TextArea } = Input;
const URLS = {
  playStore: [playStoreIcon, PLAYSTORE_URL],
  appStore: [appStoreIcon, APPSTORE_URL],
  facebook: [facebookIcon, FACEBOOK_URL],
  instagram: [instagramIcon, INSTAGRAM_URL],
  linkedin: [linkedinBlue, LINKEDIN_URL],
  twitter: [twitterBlue, TWITTER_URL],
  github: [githubIcon, GITHUB_URL],
  website: [websiteIcon],
  email: [envelopeBlue],
};

const initialState = {
  showFilters: false,
  filterModal: true,
  showCreatePostModal: false,
  applyFilters: false,
  activePanel: null,
};

const getHref = (url) => (url.startsWith("http") ? url : `//${url}`);
const getOrgBookLink = (orgBookLink) =>
  orgBookLink.startsWith("http")
    ? orgBookLink
    : window.location.pathname + `/${orgBookLink}`;
const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;

const OrganisationProfile = ({ isAuthenticated, organisationId: currentUserOrgId }) => {
  const [activeTab, setActiveTab] = useState("applicants");
  const [tab, setTab] = useState("activity");
  const preSetActiveTab = (e) => {
    setTab(e);
    setActiveTab(e);
  };
  const locationLink = useLocation(false);
  useEffect(() => {
    setTab(locationLink?.state?.tab);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let url = window.location.pathname.split("/");
  const organisationId = url[url.length - 1];
  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganisationContext,
  );
  const { error, loading, organisation } = orgProfileState;
  const [deleteModal, deleteModalDispatch] = useReducer(
    deletePostModalreducer,
    deletePostState,
  );
  const posts = useSelector(selectPosts);
  const applicants = useSelector(selectApplicants);

  const {
    userProfileState: { user },
    userProfileDispatch,
  } = useContext(UserContext);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState(ARBITRARY_LARGE_NUM);
  const {
    email,
    name,
    location = {},
    about = "",
    isOwner,
    urls = {},
    verified,
    orgBookLink,
    isJoinOrg,
    positions: { description } = { position: { description: "" } },
  } = organisation || {};

  const urlsAndEmail = { ...urls, email: isOwner ? null : email };
  if (isOwner) sessionStorage.removeItem("msgModal");
  const {
    isLoading,
    loadMore,
    page,
    posts: postsList,
    error: postsError,
  } = posts;

  const { deleteModalVisibility } = deleteModal;
  const prevTotalPostCount = usePrevious(totalPostCount);
  const prevOrgId = usePrevious(organisationId);
  const organisationPosts = Object.entries(postsList);
  const actorOrganisationId = useSelector(selectOrganisationId);
  const isSelf = organisation && actorOrganisationId == organisation._id;
  const [doneLoadingApplicants, setDoneLoadingApplicants] = useState(false)
  const [applicantsLoaded, setApplicantsLoaded] = useState(false)
  const [membersLoaded, setMembersLoaded] = useState(false)
  const [postsLoaded, setPostsLoaded] = useState(false)
  const actorId = user?.id;
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const getActorQuery = () => {
    return actorOrganisationId ? `&actorId=${actorOrganisationId}` : "";
  };
  console.log("yoo")
  useEffect(() => {
    dispatch(postsActions.resetPageAction({}));
    dispatch(applicantsActions.resetPageAction({}));
    dispatch(membersActions.resetPageAction({}));
    (async function fetchOrgProfile() {
      orgProfileDispatch(fetchOrganisation());
      userProfileDispatch(fetchUser());
      try {
        const res = await axios.get(`/api/organisations/${organisationId}`);
        orgProfileDispatch(fetchOrganisationSuccess(res.data));
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        const translatedErrorMessage = t([
          `error.${message}`,
          `error.http.${message}`,
        ]);
        orgProfileDispatch(
          fetchOrganisationError(
            `${t("error.failedLoadingProfile")} ${translatedErrorMessage}`,
          ),
        );
      }
    })();

    (async function fetchUserProfile() {
      userProfileDispatch(fetchUser());
      try {
        const res = await axios.get("/api/users/current");
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
  }, [orgProfileDispatch, organisationId, userProfileDispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const [currentUserPermissions, setCurrentUserPermissions] = useState();
  const [memberStatus, setMemberStatus] = useState(null);
  const [appliedStatus, setAppliedStatus] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [loadingPermissions, setLoadingPermissions] = useState(true)
  const loadPermissions = async () => {
    const endpoint = `/api/applicants/${organisationId}/status?userId=${actorId}&includeMeta=true`;
    if (isAuthenticated) {
      setAppliedStatus(true);
      try {
        const {
          data: { data: applicants, meta },
        } = await axios.get(endpoint);
        if (applicants) {
          setMemberStatus(applicants[0].status);
          setCurrentUserPermissions(applicants[0].organization.permissions);
          setActorPermissionsLoaded(true)

        }
        // if (actorId) {
        //   setActorPermissionsLoaded(true)
        // }
        setLoadingPermissions(false)
      } catch (error) {
        return error;
      }
      // setActorPermissionsLoaded(true)
    }
    if (!isAuthenticated) {
      setMemberStatus(undefined)
      setCurrentUserPermissions(undefined)
      // setActorPermissionsLoaded(true)
    }
  };
  const permissions = {
    isVolunteer:
      currentUserPermissions == "Volunteer" || "WikiEditor" || "Admin",
    isWikiEditor: currentUserPermissions == "WikiEditor" || "Admin",
    isAdmin: currentUserPermissions == "Admin",
  };
  const [actorPermissionsLoaded, setActorPermissionsLoaded] = useState(false);

  const setStatus = () => {
    // if (actorPermissionsLoaded) {
    if (memberStatus == "accepted") {
      setIsMember(true);
    }

    if (memberStatus == "applied" || memberStatus == "accepted") {
      setAppliedStatus(false);
    }
    if (memberStatus == "rejected"
      || memberStatus == undefined
      || !isAuthenticated
    ) {
      setAppliedStatus(true);
    }

    // }
  }
  useEffect(() => {
    loadPermissions();
  }, [actorId, organisationId, tab, isAuthenticated]);
  useEffect(() => {
    setStatus()
  }, [memberStatus, organisationId, actorId, actorPermissionsLoaded, loadingPermissions, tab]);

  useEffect(() => {
    const fetchOrganisationPosts = async () => {
      const limit = PAGINATION_LIMIT;
      const skip = page * limit;
      dispatch(postsActions.fetchPostsBegin());
      setPostsLoaded(false)
      try {
        if (organisationId) {
          const endpoint = `/api/posts?ignoreUserLocation=true&includeMeta=true&limit=${limit}&skip=${skip}&authorId=${organisationId}${getActorQuery()}`;
          const {
            data: { data: posts, meta },
          } = await axios.get(endpoint);
          setTotalPostCount(meta.total);
          if (prevOrgId !== organisationId) {
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

            if (prevOrgId === organisationId && postsList) {
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
          } else if (prevOrgId === organisationId && posts) {
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

    fetchOrganisationPosts();
    setPostsLoaded(true)

  }, [organisationId, page, toggleRefetch, tab, activeTab]);

  const refetchPosts = (isLoading, loadMore) => {
    dispatch(postsActions.resetPageAction({ isLoading, loadMore }));
    if (page === 0) {
      setToggleRefetch(!toggleRefetch);
    }
  };

  const isItemLoaded = useCallback((index) => !!organisationPosts[index], [
    organisationPosts,
  ]);

  const loadNextPage = useCallback(
    ({ stopIndex }) => {
      if (
        !isLoading &&
        loadMore &&
        stopIndex >= organisationPosts.length &&
        organisationPosts.length
      ) {
        return new Promise((resolve) => {
          dispatch(postsActions.setNextPageAction());
          resolve();
        });
      } else {
        return Promise.resolve();
      }
    },
    [isLoading, loadMore, organisationPosts.length],
  );

  useEffect(() => {
    setItemCount(
      loadMore ? organisationPosts.length + 1 : organisationPosts.length,
    );
  }, [loadMore, organisationPosts.length,]);

  const postDelete = async (post) => {
    let deleteResponse;
    const endPoint = `/api/posts/${post._id}`;
    if (
      user &&
      (isAuthorUser(user, post) || isAuthorOrg(user.organisations, post.author))
    ) {
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
  const renderURL = () => {
    if (organisation) {
      if (urlsAndEmail.length !== 0) {
        return Object.entries(urlsAndEmail).map(([name, url]) => {
          let href;
          if (name === "website") {
            href = getHref(url);
          } else if (name === "email") {
            href = `mailto:${url}`;
          } else {
            href = `${URLS[name][1]}${url}`;
          }

          return (
            url && (
              <a
                href={href}
                key={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon
                  src={URLS[name][0]}
                  alt={name}
                  id={
                    name === "email"
                      ? GTM.organisation.orgPrefix + GTM.organisation.email
                      : ""
                  }
                />
              </a>
            )
          );
        });
      } else {
        return;
      }
    }
  };

  const orgBookURL = () => {
    if (organisation) {
      if (orgBookLink) {
        return getOrgBookLink(orgBookLink);
      } else {
        return;
      }
    }
  };

  const emptyFeed = () => Object.keys(postsList).length < 1 && !isLoading;
  const emptyFeedApplicants = () => Object.keys(applicantsList).length < 1 && !isLoadingApplicants;
  const emptyFeedMembers = () => Object.keys(membersList).length < 1 && !isLoadingMembers;
  const onToggleDrawer = () => setDrawer(!drawer);
  const onToggleCreatePostDrawer = () => setModal(!modal);
  const { TabPane } = Tabs;

  const [feedState, feedDispatch] = useReducer(feedReducer, {
    ...initialState,
  });
  const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});

  const members = useSelector(selectMembers);
  //react-virtualized loaded rows and row count.
  const [itemCountApplicants, setItemCountApplicants] = useState(0);
  const [toggleRefetchApplicants, setToggleRefetchApplicants] = useState(false);
  const [totalApplicantCount, setTotalApplicantCount] = useState(
    ARBITRARY_LARGE_NUM,
  );
  const [rawTotalApplicantCount, setRawTotalApplicants] = useState(0);
  const [itemCountMembers, setItemCountMembers] = useState(0);
  const [toggleRefetchMembers, setToggleRefetchMembers] = useState(false);
  const [totalMemberCount, setTotalMemberCount] = useState(
    ARBITRARY_LARGE_NUM,
  );
  const [rawTotalMemberCount, setRawTotalMembers] = useState(0);
  const [switchOnOff, setSwitchOnOff] = useState();

  useEffect(() => {
    setSwitchOnOff(isJoinOrg);
    //setPosDescription(description)
  }, [isJoinOrg, organisation, setSwitchOnOff]);

  const [newPosDescription, setPosDescription] = useState(description);
  const [descriptionLoaded, setDescriptionLoaded] = useState(false);

  const posRef = useRef();
  const handleDescription = (event) => {
    setPosDescription(event.target.value);
    setTextCount(event.target.value.length);
  };

  const [checksEnabled, setChecksEnabled] = useState(true);
  const [done, setDone] = useState(false);
  const [displayText, setDisplayText] = useState(
    t("position.text1") + name + t("position.text2"),
  );
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [textCount, setTextCount] = useState(1);

  const { filterModal, activePanel, showFilters } = feedState;
  const {
    error: applicantsError,
    // isLoading: isLoadingApplicants,
    // loadMore: loadMoreApplicants,
    isLoadingApplicants,
    loadMoreApplicants,
    // page: pageApplicants,
    pageApplicants,
    applicants: applicantsList,
  } = applicants;

  const feedApplicants = Object.entries(applicantsList);
  const prevTotalApplicantCount = usePrevious(totalApplicantCount);
  const {
    error: membersError,
    isLoading: isLoadingMembers,
    loadMore: loadMoreMembers,
    // page: pageMembers,
    pageMembers,
    members: membersList,
  } = members;

  const feedMembers = Object.entries(membersList);
  const prevTotalMemberCount = usePrevious(totalMemberCount);
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

  const refetchMembers = (
    isLoadingMembers,
    loadMoreMembers,
  ) => {
    dispatch(
      membersActions.resetPageAction({
        isLoadingMembers,
        loadMoreMembers,
      }),
    );
    if (pageMembers === 0) {
      setToggleRefetchMembers(!toggleRefetchMembers);
    }
  };


  const handleIsJoinOrg = async (e) => {
    if (typeof switchOnOff !== undefined) {
      setSwitchOnOff(e);
      sendIsJoinOrg(e);
    } else {
      setSwitchOnOff(isJoinOrg);
    }
  };

  const sendIsJoinOrg = async (joinorg) => {
    try {
      const res = await axios.patch(`/api/organisations/${organisationId}`, {
        isJoinOrg: joinorg,
      });
    } catch (err) {
      return error;
    }
  };

  const sendPositionDescription = async (joinorg) => {
    try {
      const res = await axios.patch(`/api/organisations/${organisationId}`, {
        positions: { description: newPosDescription },
      });
    } catch (err) {
      return error;
    }
  };

  const handleOk = () => {
    sendPositionDescription();
    setPostLoading(true);
    setTimeout(() => {
      setPostLoading(false);
      setIsModalVisible(false);
      setConfirmModalVisible(true);
    }, 3000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const loadApplicants = async () => {
    const limit = PAGINATION_LIMIT;
    const skip = pageApplicants * limit;
    let baseURL;
    const getApplicantsBaseURL = (organisationId, limit, skip) => {
      return `/api/applicants/${organisationId}/status?includeMeta=true&limit=${limit}&skip=${skip}&status=applied`;
    };

    baseURL = getApplicantsBaseURL(organisationId, limit, skip);
    const endpoint = `/api/applicants/${organisationId}/status?includeMeta=true&limit=${limit}&skip=${skip}&status=applied`;
    dispatch(applicantsActions.fetchApplicantsBegin());
    setApplicantsLoaded(false)
    try {
      if (organisationId) {
        const {
          data: { data: applicants, meta },
        } = await axios.get(endpoint);
        setRawTotalApplicants(meta.total);
        if (applicants.length && meta.total) {
          if (prevTotalApplicantCount !== meta.total) {
            setTotalApplicantCount(meta.total);
            setRawTotalApplicants(meta.total);
          }
          if (applicants.length < limit) {
            dispatch(applicantsActions.finishLoadingAction());
          } else if (meta.total === limit) {
            dispatch(applicantsActions.finishLoadingAction());
          }
          if (prevOrgId !== organisationId) {
            dispatch(
              applicantsActions.fetchApplicantsSuccess({
                applicants: [],
              }),
            );
          }

          const loadedApplicants = applicants.reduce((obj, item) => {
            obj[item._id] = item;
            return obj;
          }, {});

          if (prevOrgId === organisationId && applicantsList) {
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
        } else if (prevOrgId === organisationId && applicants) {
          dispatch(
            applicantsActions.fetchApplicantsSuccess({
              applicants: { ...applicantsList },
            }),
          );
        } else {
          dispatch(applicantsActions.finishLoadingAction());
        }
      }
    }
    catch (error) {
      dispatch(applicantsActions.fetchApplicantsError(error));
    }
    // if (applicantsLoaded == false) {
    setApplicantsLoaded(true)
    // }
  };
  const loadMembers = async () => {
    const limit = PAGINATION_LIMIT;
    const skip = pageMembers * limit;
    let baseURL;
    const getMembersBaseURL = (organisationId, limit, skip) => {
      return `/api/applicants/${organisationId}/status?status=accepted&includeMeta=true&limit=${limit}&skip=${skip}`;
    };

    baseURL = getMembersBaseURL(organisationId, limit, skip);
    let endpoint = baseURL;
    dispatch(membersActions.fetchMembersBegin());
    setMembersLoaded(false)
    try {
      if (organisationId) {
        const {
          data: { data: members, meta },
        } = await axios.get(endpoint);
        setRawTotalMembers(meta.total);
        if (members.length && meta.total) {
          if (prevTotalMemberCount !== meta.total) {
            setTotalMemberCount(meta.total);
            setRawTotalMembers(meta.total);
          }

          const lastPage = Math.ceil(meta.total / limit) - 1;
          if (pageMembers === lastPage) {
            dispatch(membersActions.finishLoadingAction());
          }

          let membersInState;
          if (history.location.state) {
            const { keepMembersState, keepMembersPageState } = history.location.state;
            membersInState = keepMembersState;
            if (keepMembersPageState >= pageMembers) {
              dispatch(membersActions.setPageAction(keepMembersState));
            }
          }
          if (membersInState) {
            if (Object.keys(membersInState).length === meta.total) {
              dispatch(membersActions.finishLoadingAction());
            }
          }

          const loadedApplicants = members.reduce((obj, item) => {
            obj[item._id] = item;
            return obj;
          }, {});

          if (membersInState) {
            dispatch(
              membersActions.fetchMembeuccess({
                members: { ...membersInState, ...loadedApplicants },
              }),
            );
          } else if (Object.keys(membersList).length && pageMembers) {
            dispatch(
              membersActions.fetchMembersSuccess({
                members: { ...membersList, ...loadedApplicants },
              }),
            );
          } else {
            dispatch(
              membersActions.fetchMembersSuccess({
                members: { ...loadedApplicants },
              }),
            );
          }
        } else if (members) {
          dispatch(
            membersActions.fetchMembersSuccess({
              members: { ...membersList },
            }),
          );
          dispatch(membersActions.finishLoadingAction());
        } else {
          dispatch(membersActions.finishLoadingAction());
        }
      }

    }
    catch (error) {
      dispatch(membersActions.fetchMembersError(error));
    }
    setMembersLoaded(true)
  };
  useEffect(() => { }, [history.location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setChecksEnabled(switchOnOff);
  }, [switchOnOff]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (postsLoaded) {
      loadApplicants();
    }
  }, [organisationId, pageApplicants, tab, postsLoaded]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (postsLoaded) {
      loadMembers();
    }
  }, [organisationId, pageMembers, tab, postsLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setPosDescription(description);
  }, [description, name, t]);

  const descField = () => {
    if (textCount > 0) return <DisplayText>{newPosDescription}</DisplayText>;
    else return <div style={{ color: "red" }}>Add a description</div>;
  };

  const isApplicantLoaded = useCallback((index) => !!feedApplicants[index], [
    feedApplicants,
  ]);
  const isMemberLoaded = useCallback((index) => !!feedMembers[index], [
    feedMembers,
  ]);

  const loadNextPageApplicant = useCallback(
    async () => {
      dispatch(applicantsActions.setNextPageAction());
      setToggleRefetchApplicants(!toggleRefetchApplicants)
    },
  );
  const loadNextPageMember = useCallback(
    async () => {
      dispatch(membersActions.setNextPageAction());
      setToggleRefetchMembers(!toggleRefetchMembers)
    },
  );
  useEffect(() => {
    setItemCountApplicants(
      loadMoreApplicants ? feedApplicants.length + 1 : feedApplicants.length,
    );
  }, [feedApplicants.length, loadMoreApplicants, tab]);
  useEffect(() => {
    setItemCountMembers(
      loadMoreMembers ? feedMembers.length + 1 : feedMembers.length,
    );
  }, [feedMembers.length, loadMoreMembers, tab]);

  if (error) {
    return <ErrorAlert message={error} type="error" />;
  }
  if (loading) return <Loader />;

  if (!organisation) {
    return <Loader />;
  } else {
    const { address } = location;
    return (
      <>
        <ProfileBackgroup />
        <ProfileLayout>

          <UserInfoContainer>
            <AvatarPhotoContainer>
              <ProfilePic
                user={organisation}
                initials={getInitialsFromFullName(name)}
              />
              <PhotoUploadButton>
                {isSelf && (
                  <UploadPic
                    gtmPrefix={GTM.organisation.orgPrefix}
                    user={organisation}
                  />
                )}
              </PhotoUploadButton>
            </AvatarPhotoContainer>
            <UserInfoDesktop>
              <NameDiv>
                <div className="name-container">
                  <NamePara>
                    {name} {verified && <VerificationTick />}
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
                    id={GTM.organisation.orgPrefix + GTM.profile.modify}
                    onClick={onToggleDrawer}
                  />
                )}
                {!isOwner &&
                  !/Sourced by FightPandemics\ \(.*?\)/.test(name) && (
                    <MessageModal
                      isAuthenticated={isAuthenticated}
                      isFromProfile={true}
                      isFromUserCard={"ORG"}
                      postAuthorName={name}
                      authorId={organisationId}
                    />
                  )}
              </NameDiv>
              {about && <DescriptionDesktop> {about} </DescriptionDesktop>}

              <SeeOrgBookLink>
                <a href={orgBookURL()} target="_blank">
                  See Org Book
                </a>
              </SeeOrgBookLink>
            </UserInfoDesktop>
          </UserInfoContainer>

          {
            !appliedStatus || !appliedStatus ? null :
              (isOwner ? null :
                isJoinOrg && appliedStatus && !currentUserOrgId && actorPermissionsLoaded || !isAuthenticated
              ) && (
                < JoinOrgContainer >
                  <Link
                    onClick={() =>
                      sessionStorage.setItem(
                        "postredirect",
                        window.location.pathname,
                      )
                    }
                    to={
                      isAuthenticated
                        ? `/organisation/${organisationId}/positions`
                        : {
                          pathname: LOGIN,
                          state: { from: window.location.pathname },
                        }
                    }
                  >
                    <JoinOrgButton id={GTM.organisation.joinOrg}>
                      {t("profile.individual.joinOrg")}
                    </JoinOrgButton>
                  </Link>
                </JoinOrgContainer>
              )
          }
          < ProfileTabs
            defaultActiveKey="activity"
            activeKey={tab}
            onChange={(e) => preSetActiveTab(e)}
          >
            <ProfileTabPane id="test-tab" tab={t("profile.views.activity")} key="activity">
              {postsLoaded &&
                <div>
                  <SectionHeader>
                    <PlaceholderIcon />
                    {isSelf || isMember ? (
                      <>
                        <CreatePostIcon
                          id={GTM.organisation.orgPrefix + GTM.post.createPost}
                          src={createPost}
                          onClick={onToggleCreatePostDrawer}
                        />
                        <CreatePostButton
                          onClick={onToggleCreatePostDrawer}
                          id={GTM.organisation.orgPrefix + GTM.post.createPost}
                          inline={true}
                          icon={<PlusIcon />}
                        >
                          {t("post.create")}
                        </CreatePostButton>
                      </>
                    ) : null}
                  </SectionHeader>
                  <FeedWrapper isProfile>
                    <Activity
                      postDispatch={dispatch}
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
                      activeTab={activeTab}
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
                    {isSelf || isMember ? (
                      <CreatePost
                        gtmPrefix={GTM.organisation.orgPrefix}
                        onCancel={onToggleCreatePostDrawer}
                        loadPosts={refetchPosts}
                        visible={modal}
                        user={user}
                      />
                    ) : null}
                  </FeedWrapper>
                </div>}
            </ProfileTabPane>
            {
              <ProfileTabPane
                tab={`${t("profile.views.members")} ${membersLoaded ? "( " + rawTotalMemberCount + " )" : ""} `} key="members">
                {
                  rawTotalMemberCount == 0 && !isLoadingMembers ? (
                    < div style={{ textAlign: "center", marginTop: "5rem" }}>
                      No members to display.
                    </div>
                  ) : (
                    <ProfileList
                      filteredMembers={membersList}
                      itemCount={itemCountMembers}
                      isItemLoaded={isMemberLoaded}
                      isNextPageLoading={isLoadingMembers}
                      loadNextPage={loadNextPageMember}
                      hasNextPage={loadMoreMembers}
                      totalCount={totalMemberCount}
                      page={pageMembers}
                      emptyFeed={emptyFeedMembers}
                      isOwner={isOwner}
                      isMember={isMember}
                      isAdmin={permissions.isAdmin}
                      isWiki={permissions.isWiki}
                      isVolunteer={permissions.isVolunteer}
                      activeTab={activeTab}
                      listInitialized={membersLoaded}
                    />
                  )}
              </ProfileTabPane>
            }
            {
              isOwner || permissions.isAdmin || isSelf ? (
                <ProfileTabPane
                  tab={`${t("profile.views.applicants")} ${applicantsLoaded ? "( " + (rawTotalApplicantCount) + " )" : ""} `}
                  key="applicants"
                >
                  {
                    rawTotalApplicantCount == 0 && !isLoadingApplicants ? (
                      <div style={{ textAlign: "center", marginTop: "5rem" }}>
                        No applicants to display.
                      </div>
                    ) : (
                      <ProfileList
                        filteredApplicants={applicantsList}
                        itemCount={itemCountApplicants}
                        isItemLoaded={isApplicantLoaded}
                        isNextPageLoading={isLoadingApplicants}
                        hasNextPage={loadMoreApplicants}
                        loadNextPage={loadNextPageApplicant}
                        totalCount={totalApplicantCount}
                        page={pageApplicants}
                        emptyFeed={emptyFeedApplicants}
                        isOwner={isOwner}
                        isMember={isMember}
                        isAdmin={permissions.isAdmin}
                        isWiki={permissions.isWiki}
                        isVolunteer={permissions.isVolunteer}
                        activeTab={activeTab}
                        listInitialized={applicantsLoaded}
                      />
                    )
                  }
                </ProfileTabPane>
              )
                : null
            }
            {
              isSelf || permissions.isAdmin || isOwner ?
                (<ProfileTabPane tab={t("profile.views.positions")} key="positions">
                  <Row>
                    <Col flex={1}>
                      {
                        <JoinPositionStyles>
                          {t("position.allowVolunteer")}
                        </JoinPositionStyles>
                      }
                    </Col>
                    <Col flex={5}>
                      <FPSwitch
                        checkedChildren={t("profile.common.on")}
                        unCheckedChildren={t("profile.common.off")}
                        onClick={(checked) => handleIsJoinOrg(checked)} //TODO Join Us CTA
                        checked={switchOnOff}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <DescContainer>
                      <HeaderTitle>
                        {t("position.volunteerposition")} *

                      {!isEditable ? (
                          <PositionEditIcon
                            src={edit}
                            onClick={() => {
                              if (!checksEnabled) return;
                              if (inputRef.current) {
                                setDisplayText(inputRef.current.value);
                              }
                              setIsEditable((s) => !s);
                              setDone(false);
                            }}
                          />
                        ) : (
                          <Label
                            onClick={() => {
                              if (inputRef.current) {
                                setDisplayText(inputRef.current.value);
                                setTextCount(inputRef.current.value.length);
                              }
                              setIsEditable((s) => !s);
                              setDone(true);
                            }}
                          >
                            Done
                          </Label>
                        )}
                      </HeaderTitle>
                      {isEditable ? (
                        <DescriptionInput
                          id="description"
                          name="description"
                          key="description"
                          ref={posRef}
                          value={newPosDescription}
                          maxLength="500"
                          onChange={(e) => handleDescription(e)}
                        />
                      ) : (
                        descField()
                      )}
                    </DescContainer>
                  </Row>
                  <Row justify="center">
                    <PostPositionButton
                      disabled={checksEnabled && done ? false : true}
                      primary="true"
                      onClick={() => setIsModalVisible(true)}
                    >
                      {t("position.title")}
                    </PostPositionButton>
                  </Row>
                  <StyledPositionModal
                    closable={false}
                    visible={isModalVisible}
                    title={t("position.title")}
                    footer={[
                      <StyledPostButton
                        name="cancel"
                        type="text"
                        onClick={handleCancel}
                      >
                        {t("position.cancel")}
                      </StyledPostButton>,
                      <StyledPostButton
                        name="post"
                        type="text"
                        loading={postLoading}
                        onClick={handleOk}
                      >
                        {t("position.post")}
                      </StyledPostButton>,
                    ]}
                  >
                    <p>{t("position.content")}</p>
                  </StyledPositionModal>
                  <StyledConfirmModal
                    closable={false}
                    visible={isConfirmModalVisible}
                    title={<img src={applicationConfirmation} />}
                    footer={[
                      <ConfirmButton
                        key="submit"
                        type="primary"
                        onClick={() => setConfirmModalVisible(false)}
                      >
                        {t("position.Okay")}
                      </ConfirmButton>,
                    ]}
                  >
                    <p>{t("position.confirmTitle")}</p>
                    <p>{t("position.confirmDescription")}</p>
                  </StyledConfirmModal>
                </ProfileTabPane>
                ) : null}
          </ProfileTabs>

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
                <Link to={`/ edit - organisation - account / ${organisationId}`}>
                  {t("profile.org.editOrgAccount")}
                </Link>
              </DrawerHeader>
              <DrawerHeader>
                <Link to={`/edit-organisation-profile/${organisationId}`}>
                  {t("profile.org.editOrgProfile") + " "}
                </Link>
              </DrawerHeader>
              <DrawerHeader>
                <Link to={`/edit-organisation-notifications/${organisationId}`}>
                  {t("profile.org.editOrgNotification")}{" "}
                </Link>
              </DrawerHeader>
            </CustomDrawer>
          )
          }
        </ProfileLayout >
      </>
    );
  }
};

export default withUserContext(withOrganisationContext(OrganisationProfile));
