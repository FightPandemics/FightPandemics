import { WhiteSpace } from "antd-mobile";
import { Tabs, Switch, Col, Row } from "antd";
import {
  ProfileTabs,
  ProfileTabPane,
} from "components/OrganisationProfile/ProfileTabs";
import axios from "axios";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useReducer,
  useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ICONS
import createPost from "assets/icons/create-post.svg";
import edit from "assets/icons/edit.svg";
import locationIcon from "assets/icons/location.svg";
import envelopeBlue from "assets/icons/social-envelope-blue.svg";
import playStoreIcon from "assets/icons/play-store-icon.svg";
import appStoreIcon from "assets/icons/app-store-icon.svg";
import applicationConfirmation from "assets/icons/application-received.svg";

import instagramIcon from "assets/icons/social-instagram.svg";
import linkedinBlue from "assets/icons/social-linkedin.svg";
import facebookIcon from "assets/icons/social-fb.svg";
import twitterBlue from "assets/icons/social-tw.svg";
import githubIcon from "assets/icons/social-github.svg";
import websiteIcon from "assets/icons/website-icon.svg";

import Activity from "components/Profile/Activity";
import CreatePost from "components/CreatePost/CreatePost";
import ErrorAlert from "../components/Alert/ErrorAlert";
import { FeedWrapper } from "components/Feed/FeedWrappers";
import ProfilePic from "components/Picture/ProfilePic";
import UploadPic from "components/Picture/UploadPic";
import MessageModal from "../components/Feed/MessagesModal/MessageModal.js";
import Verification from "components/Verification/";
import VerificationTick from "components/Verification/Tick";

import { theme, mq } from "../constants/theme";
import styled from "styled-components";
import { Modal, Button } from "antd";

import Loader from "components/Feed/StyledLoader";
import {
  ProfileLayout,
  UserInfoContainer,
  EditIcon,
  PositionEditIcon,
  UserInfoDesktop,
  NameDiv,
  PlaceholderIcon,
  DescriptionDesktop,
  IconsContainer,
  SeeOrgBookLink,
  SocialIcon,
  SectionHeader,
  CreatePostDiv,
  CreatePostIcon,
  DrawerHeader,
  CustomDrawer,
  PhotoUploadButton,
  AvatarPhotoContainer,
  NamePara,
  ProfileBackgroup,
} from "../components/Profile/ProfileComponents";
import {
  getInitialsFromFullName,
  isAuthorOrg,
  isAuthorUser,
} from "utils/userInfo";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  TWITTER_URL,
  GITHUB_URL,
  APPSTORE_URL,
  PLAYSTORE_URL,
} from "constants/urls";
import {
  fetchOrganisation,
  fetchOrganisationError,
  fetchOrganisationSuccess,
} from "hooks/actions/organisationActions";
import {
  fetchUser,
  fetchUserError,
  fetchUserSuccess,
} from "hooks/actions/userActions";
import {
  OrganisationContext,
  withOrganisationContext,
} from "context/OrganisationContext";
import { SET_EDIT_POST_MODAL_VISIBILITY } from "hooks/actions/postActions";
import {
  SET_DELETE_MODAL_VISIBILITY,
  DELETE_MODAL_POST,
  DELETE_MODAL_HIDE,
  SET_VALUE,
} from "hooks/actions/feedActions";
import {
  deletePostModalreducer,
  deletePostState,
  feedReducer,
  optionsReducer,
} from "hooks/reducers/feedReducers";
import { UserContext, withUserContext } from "context/UserContext";
import GTM from "constants/gtm-tags";
import { selectPosts, postsActions } from "reducers/posts";
import { applicantsActions, selectApplicants } from "reducers/applicants";
import { selectOrganisationId } from "reducers/session";
import CreatePostButton from "components/Feed/CreatePostButton";
import { ReactComponent as PlusIcon } from "assets/icons/pretty-plus.svg";
import JoinOrgButton, {
  JoinOrgContainer,
} from "components/OrganisationProfile/JoinOrgButton";
import { LOGIN } from "templates/RouteWithSubRoutes";

import { JoinPositionStyles } from "../components/Positions/JoinPositionStyles";
import { PostPositionButton } from "../components/EditProfile/EditComponents";
import TextInput from "../components/Input/PositionInput";
import { TestMembers } from "components/OrganisationProfile/TestMembers";
import ProfileList from "components/OrganisationProfile/ProfileList";
import {
  TestMembersList,
  FilteredApplicants,
  Applicants,
  Meta,
} from "utils/TestMembersList";

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
const OrganisationProfile = ({ isAuthenticated }) => {
  const [activeTab, setActiveTab] = useState("applicants");
  const [tab, setTab] = useState();
  const locationLink = useLocation(false);
  useEffect(() => {
    if (locationLink.state) {
      setTab(locationLink.state.tab);
    }
  }, [locationLink.state]);

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

  const FPSwitch = styled(Switch)`
    background-color: ${(props) =>
      props?.checked ? theme.colors.royalBlue : theme.colors.mediumGray};
    margin: 40px 50px 63px 0px;
  `;

  const DescContainer = styled.div`
    width: 100%;
    height: 200px;
    padding: 20px 16px 30px 16px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);
    border: solid 0 #979797;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
  `;

  const HeaderTitle = styled.div`
    font-family: Poppins;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: black;
    margin-bottom: 31px;
  `;

  const StyledTextarea = styled.textarea`
    width: 100%;
    height: 100%;
  `;

  const Label = styled.label`
    cursor: pointer;
    color: #425af2;
    float: right;
  `;

  const DisplayText = styled.label`
    display: block;
    overflow: auto;
  `;

  const StyledPostButton = styled(Button)`
    color: blue;
    font-weight: ${({ name }) => {
      switch (name) {
        case "post":
          return "bold";
      }
    }};
  `;

  const StyledPositionModal = styled(Modal)`
    .ant-modal-title {
      text-align: center;
    }
    .ant-modal-footer {
      border-top: 0px;
    }
    .ant-modal-header {
      border-bottom: 0px;
    }
  `;

  const StyledConfirmModal = styled(Modal)`
    .ant-modal-header,
    .ant-modal-footer {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .ant-modal-body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .ant-modal-footer {
      border-top: 0px;
    }
    .ant-modal-header {
      border-bottom: 0px;
    }
    p:first-child {
      font-weight: bold;
    }
  `;

  const ConfirmButton = styled(Button)`
    width: 195px;
    height: 43px;
    flex-grow: 0;
    padding: 12px 76px 12px;
    border-radius: 100px;
    background-color: #425af2;
  `;

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

  useEffect(() => {
    dispatch(postsActions.resetPageAction({}));
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

  useEffect(() => {
    const fetchOrganisationPosts = async () => {
      const limit = PAGINATION_LIMIT;
      const skip = page * limit;
      dispatch(postsActions.fetchPostsBegin());
      try {
        if (organisationId) {
          const endpoint = `/api/posts?ignoreUserLocation=true&includeMeta=true&limit=${limit}&skip=${skip}&authorId=${organisationId}${getActorQuery()}`;
          const {
            data: { data: posts, meta },
          } = await axios.get(endpoint);
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
  }, [organisationId, page, toggleRefetch, activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

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
    [dispatch, isLoading, loadMore, organisationPosts.length],
  );

  useEffect(() => {
    setItemCount(
      loadMore ? organisationPosts.length + 1 : organisationPosts.length,
    );
  }, [loadMore, organisationPosts.length]);

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
  const onToggleDrawer = () => setDrawer(!drawer);
  const onToggleCreatePostDrawer = () => setModal(!modal);
  const { TabPane } = Tabs;
  // const filteredMembers = TestMembersList

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
  const [switchOnOff, setSwitchOnOff] = useState(false);
  const [checksEnabled, setChecksEnabled] = useState(true);
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
  // const filters = Object.values(filterOptions);
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

  // const {
  //   // history,
  //   isAuthenticated,
  //   // user
  // } = props;

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
  const [currentUserPermissions, setCurrentUserPermissions] = useState();
  const [memberstatus, setMemberstatus] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const loadPermissions = async (actorId) => {
    const endpoint = `/api/applicants/${organisationId}/status?status=accepted&userId=${actorId}&includeMeta=true`; // &userId=${user.id}

    try {
      const {
        data: { data: applicants, meta },
      } = await axios.get(endpoint);
      // console.log({ "APPLICANTS!!!": applicants[0].organization.permissions })
      // console.log({ "META!!!": meta })
      setActorPermissionsLoaded(true);
      setCurrentUserPermissions(applicants[0].organization.permissions);
      setMemberstatus(applicants[0].status);
    } catch (error) {
      return error;
    }
  };

  const permissions = {
    isVolunteer:
      currentUserPermissions == "Volunteer" || "WikiEditor" || "Admin",
    isWikiEditor: currentUserPermissions == "WikiEditor" || "Admin",
    isAdmin: currentUserPermissions == "Admin",
  };

  useEffect(() => {
    if (memberstatus == "accepted") {
      setIsMember(true);
    }
  }, [memberstatus]);

  // console.log(permissions)

  // if (userId) {
  //   console.log("user id true!!!!")
  // }

  const [actorPermissionsLoaded, setActorPermissionsLoaded] = useState(false);

  // const preSetActiveTab = (e) => {
  //   // if (e = "members") {
  //   //   setActiveTab(e)
  //   // }
  //   // else if (e = "applicants") {
  //   //   setActiveTab(e)
  //   // }
  //   // else {
  //   //   setActiveTab(e)
  //   // }
  //   setActiveTab(e)
  // }

  useEffect(() => {
    // if (!actorPermissionsLoaded && actorId) {
    loadPermissions(actorId);
    // preSetActiveTab()
    // }
  }, [actorId, activeTab, loadPermissions]);

  const handleOk = () => {
    setPostLoading(true);
    setTimeout(() => {
      setPostLoading(false);
      setIsModalVisible(false);
      setConfirmModalVisible(true);
    }, 3000);

    //TODO pass data to backend pending
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
    const getMembersBaseURL = (organisationId, limit, skip) => {
      return `/api/applicants/${organisationId}/status?status=accepted&includeMeta=true&limit=${limit}&skip=${skip}`;
    };

    if (activeTab == "members") {
      baseURL = getMembersBaseURL(organisationId, limit, skip);
    }

    if (activeTab == "applicants") {
      baseURL = getApplicantsBaseURL(organisationId, limit, skip);
    }

    let endpoint = baseURL;
    dispatch(applicantsActions.fetchApplicantsBegin());

    try {
      const {
        data: { data: applicants, meta },
      } = await axios.get(endpoint);

      // TEST DATA
      // const applicants = Applicants
      // const meta = Meta

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

  useEffect(() => {}, [history.location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setChecksEnabled(switchOnOff);
  }, [switchOnOff]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    refetchApplicants(); // will trigger loadApplicants(if needed) (by toggling toggleRefetchApplicants)
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadApplicants();
  }, [toggleRefetchApplicants, pageApplicants, activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setDisplayText(t("position.text1") + name + t("position.text2"));
  }, [name, t]);

  const textField = () => {
    if (textCount > 0) return <DisplayText>{displayText}</DisplayText>;
    else return <div style={{ color: "red" }}>Add a description</div>;
  };

  const isApplicantLoaded = useCallback((index) => !!feedApplicants[index], [
    feedApplicants,
  ]);
  const loadNextPageApplicant = useCallback(
    ({ stopIndex }) => {
      if (
        !isLoadingApplicants &&
        loadMoreApplicants &&
        stopIndex >= feedApplicants.length &&
        feedApplicants.length
      ) {
        return new Promise((resolve) => {
          dispatch(applicantsActions.setNextPageAction());
          dispatchAction(SET_VALUE, "applyFilters", true);
          resolve();
        });
      } else {
        return Promise.resolve();
      }
    },
    [feedApplicants.length, isLoadingApplicants, loadMoreApplicants, activeTab], // eslint-disable-line react-hooks/exhaustive-deps
  );

  console.log({ "activeTab!!!!": activeTab });

  useEffect(() => {
    setItemCountApplicants(
      loadMoreApplicants ? feedApplicants.length + 1 : feedApplicants.length,
    );
  }, [feedApplicants.length, loadMoreApplicants]);

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

              {/* <IconsContainer>
                <div className="social-icons">{renderURL()}</div>
              </IconsContainer> */}
              {
                <SeeOrgBookLink>
                  <a href={orgBookURL()} target="_blank">
                    See Org Book
                  </a>
                </SeeOrgBookLink>
              }
            </UserInfoDesktop>
          </UserInfoContainer>
          {
            // TODO - REMOVE ORG WORKSPACE TEST LINK
          }
          {/* <Link
            to={`/applicants/${organisationId}`}
          ><div style={{ color: "red", "font-weight": "bold" }}>TEST ORG APPLICANTS PAGE (6.1)</div></Link> */}

          {/* <Link
            style={{ color: "red", "font-weight": "bold" }}
            to={`/orgworkspace/${organisationId}`}
          //   LINK THAT GOES IN ORG WORKSPACE
          //   to={{
          //   pathname: "/organisation/603be1140789a03df4bdb17c",
          //   state: {
          //     tab: "members"
          //   }
          // }}
          >TEST ORG WORKSPACE PAGE (8.1)</Link> */}

          {isSelf && !verified && <Verification />}

          <WhiteSpace />
          {
            // Only show JoinOrgButton if user is not Member, Wiki Editor, or Admin
          }

          {!isOwner ? (
            <JoinOrgContainer>
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
          ) : null}
          {
            // TABS
          }

          <ProfileTabs
            defaultActiveKey="activity"
            // retrieve activeKey from incoming link
            // activeKey={activeTab ? activeTab : "activity"}
            activeKey={tab ? tab : undefined}
            onChange={async (e) => setActiveTab(e)}
          >
            <ProfileTabPane tab={t("profile.views.activity")} key="activity">
              <div>
                <SectionHeader>
                  {/* {t("profile.org.activity")} */}
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
              </div>
            </ProfileTabPane>
            {
              <ProfileTabPane tab={t("profile.views.members")} key="members">
                {rawTotalApplicantCount == 0 ? (
                  <div style={{ textAlign: "center", marginTop: "5rem" }}>
                    No members to display.
                  </div>
                ) : (
                  <ProfileList
                    // TODO -conditionally show role / permissions and permissions link
                    filteredMembers={applicantsList}
                    itemCount={itemCountApplicants}
                    isItemLoaded={isApplicantLoaded}
                    isNextPageLoading={isLoading}
                    loadNextPage={loadNextPageApplicant}
                    hasNextPage={loadMoreApplicants}
                    filteredApplicants={applicantsList}
                    totalCount={totalApplicantCount}
                    page={pageApplicants}
                    emptyFeed={emptyFeed}
                    isOwner={isOwner}
                    isMember={isMember}
                    isAdmin={permissions.isAdmin}
                    isWiki={permissions.isWiki}
                    isVolunteer={permissions.isVolunteer}
                    activeTab={activeTab}
                  />
                )}
              </ProfileTabPane>
            }
            {isOwner || permissions.isAdmin || isSelf ? (
              <ProfileTabPane
                tab={t("profile.views.applicants")}
                key="applicants"
              >
                {
                  rawTotalApplicantCount == 0 ? (
                    <div style={{ textAlign: "center", marginTop: "5rem" }}>
                      No applicants to display.
                    </div>
                  ) : (
                    // activeTab == "applicants" ?
                    <ProfileList
                      filteredMembers={applicantsList}
                      itemCount={itemCountApplicants}
                      isItemLoaded={isApplicantLoaded}
                      isNextPageLoading={isLoading}
                      loadNextPage={loadNextPageApplicant}
                      hasNextPage={loadMoreApplicants}
                      totalCount={totalApplicantCount}
                      page={pageApplicants}
                      emptyFeed={emptyFeed}
                      isOwner={isOwner}
                      isMember={isMember}
                      isAdmin={permissions.isAdmin}
                      isWiki={permissions.isWiki}
                      isVolunteer={permissions.isVolunteer}
                      activeTab={activeTab}
                    />
                  )
                  // : null
                }
              </ProfileTabPane>
            ) : null}
            <ProfileTabPane tab={t("profile.views.positions")} key="positions">
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
                    onChange={(checked) => setSwitchOnOff(checked)} //TODO Join Us CTA
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
                          setIsEditable(!isEditable);
                        }}
                      />
                    ) : (
                      <Label
                        onClick={() => {
                          if (inputRef.current) {
                            setDisplayText(inputRef.current.value);
                            setTextCount(inputRef.current.value.length);
                          }
                          setIsEditable(!isEditable);
                        }}
                      >
                        Done
                      </Label>
                    )}
                  </HeaderTitle>
                  {isEditable ? (
                    <StyledTextarea
                      type="text"
                      defaultValue={displayText}
                      ref={inputRef}
                      maxLength="500"
                    />
                  ) : (
                    textField()
                  )}
                </DescContainer>
              </Row>
              <Row justify="center">
                <PostPositionButton
                  disabled={!checksEnabled}
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
                <Link to={`/edit-organisation-account/${organisationId}`}>
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
          )}
        </ProfileLayout>
      </>
    );
  }
};

export default withUserContext(withOrganisationContext(OrganisationProfile));
