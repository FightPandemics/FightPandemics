import filterOptions from "assets/data/filterOptions";
import locationIcon from "assets/icons/location.svg";
import axios from "axios";
import Loader from "components/Feed/StyledLoader";
import { setQueryKeysValue } from "components/Feed/utils";
import Applicants from "components/OrganisationProfile/Applicants";
import { ProfileTabPane, ProfileTabs } from "components/OrganisationProfile/ProfileTabs";
import ProfilePic from "components/Positions/ProfilePic";
import {
    OrganisationContext,
    withOrganisationContext
} from "context/OrganisationContext";
import { UserContext, withUserContext } from "context/UserContext";
import {
    ADD_OPTION,

    REMOVE_ALL_OPTIONS, REMOVE_OPTION,

    SET_OPTIONS,

    SET_VALUE, TOGGLE_STATE
} from "hooks/actions/feedActions";
//hooks, actions, reducers
import {
    fetchOrganisation,
    fetchOrganisationError,
    fetchOrganisationSuccess
} from "hooks/actions/organisationActions";
import {
    fetchUser,
    fetchUserError,
    fetchUserSuccess
} from "hooks/actions/userActions";
import {
    deletePostModalreducer,
    deletePostState, feedReducer, optionsReducer
} from "hooks/reducers/feedReducers";
import qs from "query-string";
import React, { useCallback, useContext, useEffect, useReducer, useRef, useState } from "react";
import TagManager from "react-gtm-module";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { applicantsActions, selectApplicants } from "reducers/applicants";
import { LOGIN } from "templates/RouteWithSubRoutes";
import { getInitialsFromFullName } from "utils/userInfo";
import ErrorAlert from "../components/Alert/ErrorAlert";
import { PositionsContainer } from "../components/Profile/PositionsComponents";
import {
    AvatarPhotoContainer, DescriptionDesktop, NameDiv,
    NamePara,
    ProfileBackgroup, ProfileLayout,
    UserInfoContainer,
    UserInfoDesktop
} from "../components/Profile/ProfileComponents";


// IMPORTED FROM Feed Page
const initialState = {
    showFilters: false,
    filterModal: true,
    showCreatePostModal: false,
    applyFilters: false,
    activePanel: null,
    // location: null,
    ignoreUserLocation: true,
};

const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;

export const FeedContext = React.createContext();

let HELP_TYPE = {
    ALL: "All posts",
    REQUEST: "Requesting help",
    OFFER: "Offering help",
};
// END OF FEED PAGE CODE

const AdminProfile = (props) => {
    //IMPORTED FROM Feed Page
    const dispatch = useDispatch();
    const { id } = useParams();
    const [feedState, feedDispatch] = useReducer(feedReducer, {
        ...initialState,
        showCreatePostModal: id === "create-post",
    });
    const [deleteModal, deleteModalDispatch] = useReducer(
        deletePostModalreducer,
        deletePostState,
    );
    //   const organisationId = useSelector(selectOrganisationId);
    const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});
    const applicants = useSelector(selectApplicants);
    //react-virtualized loaded rows and row count.
    const [itemCount, setItemCount] = useState(0);
    const [toggleRefetch, setToggleRefetch] = useState(false);
    const [totalPostCount, setTotalPostCount] = useState(ARBITRARY_LARGE_NUM);
    const [sortValue, setSortValue] = useState("createdAt");
    const {
        filterModal,
        showCreatePostModal,
        activePanel,
        location,
        applyFilters,
        showFilters,
        ignoreUserLocation,
    } = feedState;
    const filters = Object.values(filterOptions);
    const {
        error: postsError,
        isLoading,
        loadMore,
        page,
        applicants: applicantsList,
    } = applicants;

    const { deleteModalVisibility } = deleteModal;
    const feedPosts = Object.entries(applicantsList);
    const prevTotalPostCount = usePrevious(totalPostCount);
    const [queryParams, setQueryParams] = useState({});
    const SEARCH_OPTIONS = [
        { name: "feed.search.options.applicants", id: "POSTS", default: true },
        {
            name: "feed.search.options.orgs",
            id: "ORGANISATIONS",
            mobile_display: "feed.search.options.orgsShort",
        },
        { name: "feed.search.options.people", id: "INDIVIDUALS" },
    ];

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const { history, isAuthenticated, user } = props;

    const dispatchAction = (type, key, value) =>
        feedDispatch({ type, key, value });

    const getStateFromQuery = () => {
        const query = qs.parse(history.location.search);
        // search category (Tab)
        query.s_category = SEARCH_OPTIONS[query.s_category]?.id || null;
        changeHelpType(query.s_category);

        // ignoreUserLocation
        if (query.near_me) {
            dispatchAction(SET_VALUE, "ignoreUserLocation", false);
        } else {
            dispatchAction(SET_VALUE, "ignoreUserLocation", true);
        }

        // location
        if (query.location) {
            query.location = JSON.parse(atob(query.location));
            dispatchAction(SET_VALUE, "location", query.location);
            sessionStorage.setItem("feedLocation", JSON.stringify(query.location));
        } else {
            dispatchAction(SET_VALUE, "location", "");
            sessionStorage.removeItem("feedLocation");
        }

        // filters / help type (objective)
        if (query.filters || query.objective) {
            let selectedFilters = {};
            if (query.filters) {
                if (!query.s_category) {
                    query.filters = JSON.parse(atob(query.filters));
                    selectedFilters = query.filters;
                } else delete query.filters;
            }
            if (query.objective) {
                let indexOfHelpType = Object.keys(HELP_TYPE).indexOf(
                    query.objective.toUpperCase(),
                );
                if (indexOfHelpType > 0)
                    selectedFilters["lookingFor"] = [
                        filters[3].options[indexOfHelpType - 1]?.value,
                    ];
                else query.objective = "ALL";
            } else {
                delete selectedFilters["lookingFor"];
            }
            optionsDispatch({
                type: SET_OPTIONS,
                payload: { option: selectedFilters },
            });
        } else {
            optionsDispatch({ type: REMOVE_ALL_OPTIONS, payload: {} });
        }
        // will trigger => refetchPosts() =(if needed)> loadPosts()
        setQueryParams(query);
    };

    // Sets query state for filters
    const setQueryFromState = () => {
        const newQuery = {};
        const oldFiltersLength =
            (queryParams.filters?.type || []).length +
            (queryParams.filters?.providers || []).length +
            (queryParams.filters?.workMode || []).length;
        const newFiltersLength =
            (selectedOptions?.type || []).length +
            (selectedOptions?.providers || []).length +
            (selectedOptions?.workMode || []).length;
        if (applyFilters && location) {
            newQuery.location = btoa(JSON.stringify(location));
        }
        if (applyFilters && selectedOptions.lookingFor?.length) {
            const selectedType =
                (selectedOptions["lookingFor"][1] ||
                    selectedOptions["lookingFor"][0]) === "Request Help"
                    ? "REQUEST"
                    : "OFFER";
            newQuery.objective = selectedType;
            if (selectedOptions.lookingFor.length > 1) {
                optionsDispatch({
                    type: REMOVE_OPTION,
                    payload: {
                        option: selectedOptions.lookingFor[0],
                        label: "lookingFor",
                    },
                });
                return;
            }
        }

        if (newFiltersLength) {
            if (applyFilters || oldFiltersLength > newFiltersLength) {
                newQuery.filters = btoa(JSON.stringify(selectedOptions));
            }
        } else if (queryParams.filters && !newFiltersLength)
            newQuery.filters = null;
        setQueryKeysValue(history, newQuery);
    };

    const handleFilterModal = () => {
        dispatchAction(TOGGLE_STATE, "filterModal");
        dispatchAction(SET_VALUE, "applyFilters", false);
    };

    const refetchPosts = (isLoading, loadMore, softRefresh = false) => {
        if (filterModal) {
            dispatchAction(TOGGLE_STATE, "filterModal");
        }

        if (showFilters) {
            dispatchAction(TOGGLE_STATE, "showFilters");
        }

        // softRefresh = only close filter modal etc.. but not RESET_PAGE and refetch posts
        if (!softRefresh) {
            dispatchAction(SET_VALUE, "applyFilters", true);
            dispatch(applicantsActions.resetPageAction({ isLoading, loadMore }));
            if (page === 0) {
                setToggleRefetch(!toggleRefetch);
            }
        }
    };

    const handleQuit = (e) => {
        e.preventDefault();
        optionsDispatch({ type: REMOVE_ALL_OPTIONS, payload: {} });
        dispatchAction(SET_VALUE, "location", null);
        sessionStorage.removeItem("feedLocation");
        setQueryKeysValue(history, { location: null });

        setTimeout(() => {
            dispatchAction(SET_VALUE, "activePanel", null);
        }, 500);
        // perform soft refetch to only close filter modal etc.. but not actually refetch posts
        refetchPosts(null, null, true);
    };

    const changeHelpType = (selectedValue) => {
        switch (selectedValue) {
            case "INDIVIDUALS":
                HELP_TYPE = {
                    ALL: "feed.allPeople",
                };
                break;
            case "ORGANISATIONS":
                HELP_TYPE = {
                    ALL: "feed.allOrgs",
                };
                break;
            default:
                HELP_TYPE = {
                    ALL: "feed.allPosts",
                    REQUEST: "feed.request",
                    OFFER: "feed.offer",
                };
                break;
        }
    };

    const handleOption = (label, option) => (e) => {
        const options = selectedOptions[label] || [];
        const hasOption = options.includes(option);
        optionsDispatch({
            type: hasOption ? REMOVE_OPTION : ADD_OPTION,
            payload: { option, label },
        });
        if (hasOption && label === "lookingFor") {
            const selectedFilters = selectedOptions;
            delete selectedFilters["lookingFor"];
            setQueryKeysValue(history, {
                objective: null,
                filters: btoa(JSON.stringify(selectedFilters)),
            });
        }
    };

    const handleCreatePost = (trigger) => {
        if (isAuthenticated) {
            dispatchAction(TOGGLE_STATE, "showCreatePostModal");
            sessionStorage.removeItem("createPostAttemptLoggedOut");
        } else {
            //prevent redirect if function was triggered by useEffect(on component mount)
            if (trigger === "useEffect") return;
            sessionStorage.setItem("createPostAttemptLoggedOut", "/feed");
            history.push(LOGIN);
        }
    };

    
    const handleOnClose = () => {
        dispatchAction(SET_VALUE, "filterModal", false);
        dispatchAction(TOGGLE_STATE, "showFilters");
        dispatchAction(SET_VALUE, "applyFilters", true);
        dispatchAction(SET_VALUE, "location", null);
    };

    const loadPosts = async () => {
        if (!applyFilters) return;
        dispatchAction(SET_VALUE, "applyFilters", false);
        const filterURL = () => {
            const filterObj = { ...(queryParams.filters || {}) };
            delete filterObj["lookingFor"];
            if (location) filterObj.location = location;
            return Object.keys(filterObj).length === 0
                ? ""
                : `&filter=${encodeURIComponent(JSON.stringify(filterObj))}`;
        };

        const objectiveURL = () => {
            let objective = queryParams.objective;
            if (
                selectedOptions["lookingFor"] &&
                selectedOptions["lookingFor"].length < 2
            ) {
                objective =
                    selectedOptions["lookingFor"][0] === "Request Help"
                        ? "REQUEST"
                        : "OFFER";
            }
            switch (objective) {
                case "REQUEST":
                    return "&objective=request";
                case "OFFER":
                    return "&objective=offer";
                default:
                    return "";
            }
        };
        const searchKeyword = queryParams.s_keyword;
        const sortQuery = () => {
            if (
                sortValue === "proximity-location" ||
                sortValue === "proximity-near"
            ) {
                return `&ignoreUserLocation=${ignoreUserLocation}`;
            } else if (sortValue === t("feed.filters.sortBy")) {
                return "";
            } else if (sortValue === "relevance") {
                if (searchKeyword)
                    return `&keywords=${encodeURIComponent(searchKeyword)}`;
                else return "";
            } else {
                return `&sortValue=${sortValue}`;
            }
        };
        const limit = PAGINATION_LIMIT;
        const skip = page * limit;
        let baseURL = getPostsBaseURL(organisationId, limit, skip);
        let endpoint = baseURL
        dispatch(applicantsActions.fetchPostsBegin());


        try {
            const {
                data: { data: applicants, meta },
                // } = await axios.get(endpoint);
            } = await axios.get(endpoint);
            if (searchKeyword) {
                TagManager.dataLayer({
                    dataLayer: {
                        event: "SEARCH_KEYWORD",
                        keyword: searchKeyword,
                        category: queryParams.s_category || "POSTS",
                        resultsCount: meta.total,
                    },
                });
                // clear the DataLayer
                TagManager.dataLayer({
                    dataLayer: {
                        event: -1,
                        keyword: -1,
                        category: -1,
                        resultsCount: -1,
                    },
                });

            }
            if (applicants.length && meta.total) {
                if (prevTotalPostCount !== meta.total) {
                    setTotalPostCount(meta.total);
                }

                const lastPage = Math.ceil(meta.total / limit) - 1;
                if (page === lastPage) {
                    dispatch(applicantsActions.finishLoadingAction());
                }

                let postsInState;
                if (history.location.state) {
                    const { keepPostsState, keepPageState } = history.location.state;
                    postsInState = keepPostsState;
                    if (keepPageState >= page) {
                        dispatch(applicantsActions.setPageAction(keepPageState));
                    }

                }
                if (postsInState) {
                    if (Object.keys(postsInState).length === meta.total) {
                        dispatch(applicantsActions.finishLoadingAction());
                    }
                }

                const loadedPosts = applicants.reduce((obj, item) => {
                    obj[item._id] = item;
                    return obj;
                }, {});


                if (postsInState) {
                    dispatch(
                        applicantsActions.fetchPostsSuccess({
                            applicants: { ...postsInState, ...loadedPosts },
                        }),
                    );
                } else if (Object.keys(applicantsList).length && page) {
                    dispatch(
                        applicantsActions.fetchPostsSuccess({
                            applicants: { ...applicantsList, ...loadedPosts },
                        }),
                    );
                } else {
                    dispatch(
                        applicantsActions.fetchPostsSuccess({
                            applicants: { ...loadedPosts },
                        }),
                    );
                }
            }

            else if (applicants) {
                dispatch(
                    applicantsActions.fetchPostsSuccess({
                        applicants: { ...applicantsList },
                    }),
                );
                dispatch(applicantsActions.finishLoadingAction());
            } else {
                dispatch(applicantsActions.finishLoadingAction());
            }
        } catch (error) {
            dispatch(applicantsActions.fetchPostsError(error));
        }

    };

    useEffect(() => { }, [ignoreUserLocation]);

    useEffect(() => {
        getStateFromQuery();
    }, [history.location.search]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setQueryFromState();
    }, [applyFilters, selectedOptions, location]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (typeof queryParams.s_keyword !== "undefined") {
            setQueryKeysValue(history, {
                location: null,
                near_me: false,
            });
            dispatchAction(SET_VALUE, "location", null);
            setSortValue("relevance");
        } else if (location) {
            if (ignoreUserLocation) {
                setQueryKeysValue(history, {
                    near_me: false,
                });
            }
            setSortValue("proximity-location");
        } else if (!ignoreUserLocation) {
            if (location) {
                setQueryKeysValue(history, {
                    location: null,
                });
            }
            dispatchAction(SET_VALUE, "location", null);
            setSortValue("proximity-near");
        } else if (
            sortValue !== "views" &&
            sortValue !== "shares" &&
            sortValue !== "likes"
        ) {
            setSortValue("createdAt");
        }
    }, [queryParams, ignoreUserLocation]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        refetchPosts(); // will trigger loadPosts(if needed) (by toggling toggleRefetch)
    }, [sortValue, queryParams]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        loadPosts();
    }, [toggleRefetch, page]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const createPostAttemptLoggedOut = sessionStorage.getItem(
            "createPostAttemptLoggedOut",
        );
        if (createPostAttemptLoggedOut) {
            handleCreatePost("useEffect");
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const isItemLoaded = useCallback((index) => !!feedPosts[index], [feedPosts]);

    const loadNextPage = useCallback(

        ({ stopIndex }) => {
            console.log("loadNextPage")
            if (
                !isLoading &&
                loadMore &&
                stopIndex >= feedPosts.length &&
                feedPosts.length
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
        [feedPosts.length, isLoading, loadMore], // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(() => {
        setItemCount(loadMore ? feedPosts.length + 1 : feedPosts.length);
        console.log("item count:" + itemCount)
    }, [feedPosts.length, loadMore]);

    const emptyFeed = () => Object.keys(applicantsList).length < 1 && !isLoading;
    const handleSortDropdown = (value) => {
        setQueryKeysValue(history, {
            s_keyword: null,
            location: null,
            near_me: false,
        });
        setSortValue(value);
    };

    let url = window.location.pathname.split("/");
    const organisationId = url[url.length - 1];
    const { orgProfileState, orgProfileDispatch } = useContext(
        OrganisationContext,
    );
    const { error, loading, organisation } = orgProfileState;
    const {
        userProfileDispatch,
    } = useContext(UserContext);
    const { t } = useTranslation();
    const {
        name,
        // location = {},
        about = "",
    } = organisation || {};

    useEffect(() => {
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
    if (error) {
        return <ErrorAlert message={error} type="error" />;
    }
    if (loading) return <Loader />;

    if (!organisation) {
        return <Loader />;
    }
    else {
        const { address } = location;
        return (
            // Header and class/component container for position info will be needed from new profile design to be consistent
            <>
                <FeedContext.Provider
                    value={{
                        isAuthenticated,
                        filters,
                        filterModal,
                        activePanel,
                        location,
                        ignoreUserLocation,
                        dispatchAction,
                        selectedOptions,
                        handleFilterModal,
                        showFilters,
                        totalPostCount,
                    }}
                >
                    <ProfileBackgroup />
                    <ProfileLayout>
                        <PositionsContainer>
                            <UserInfoContainer>
                                <AvatarPhotoContainer>
                                    <ProfilePic
                                        user={organisation}
                                        initials={getInitialsFromFullName(name)}
                                    />
                                </AvatarPhotoContainer>
                                <UserInfoDesktop>
                                    <NameDiv>
                                        <div className="name-container">
                                            <NamePara>
                                                {name}
                                            </NamePara>
                                            {address && (
                                                <div title={address} className="address-container">
                                                    <img src={locationIcon} alt={address} />
                                                    {address}
                                                </div>
                                            )}
                                        </div>
                                    </NameDiv>
                                    {about && <DescriptionDesktop> {about} </DescriptionDesktop>}
                                </UserInfoDesktop>
                            </UserInfoContainer>
                            {   // Position title and description to be pulled from backend / API
                                // Placeholder text for ONE position is being used below
                                // Component will be needed for multiple positions (based on backend schema / structure)
                            }
                            <ProfileTabs>
                                <ProfileTabPane tab={t("profile.views.applicants")} key="members">
                                    <Applicants
                                        itemCount={itemCount}
                                        isItemLoaded={isItemLoaded}
                                        isNextPageLoading={isLoading}
                                        loadNextPage={loadNextPage}
                                        hasNextPage={loadMore}
                                        filteredPosts={applicantsList}
                                        totalPostCount={totalPostCount}
                                        page={page}

                                    />
                                </ProfileTabPane>
                            </ProfileTabs>
                        </PositionsContainer >
                    </ProfileLayout>
                </FeedContext.Provider>
            </>
        );

    }

}

const getPostsBaseURL = (organisationId, limit, skip) => {
    const actorId = organisationId ? `&actorId=${organisationId}` : "";
    return `/api/applicants?&includeMeta=true&limit=${limit}&skip=${skip}`;
};

export default withUserContext(withOrganisationContext(AdminProfile));