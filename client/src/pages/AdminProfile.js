import filterOptions from "assets/data/filterOptions";
import locationIcon from "assets/icons/location.svg";
import axios from "axios";
import Loader from "components/Feed/StyledLoader";
import ProfileList from "components/OrganisationProfile/ProfileList";
import { ProfileTabPane, ProfileTabs } from "components/OrganisationProfile/ProfileTabs";
// import ProfilePic from "components/Positions/ProfilePic";
import ProfilePic from "components/Picture/ProfilePic";
import {
    OrganisationContext,
    withOrganisationContext
} from "context/OrganisationContext";
import { UserContext, withUserContext } from "context/UserContext";
import {

    SET_VALUE
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
import { feedReducer, optionsReducer } from "hooks/reducers/feedReducers";
import React, { useCallback, useContext, useEffect, useReducer, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { applicantsActions, selectApplicants } from "reducers/applicants";
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
import { WhiteSpace } from "antd-mobile";
import UpArrow from "../components/Icon/up-arrow.js";
import { Link } from "react-router-dom";

const initialState = {
    showFilters: false,
    filterModal: true,
    showCreatePostModal: false,
    applyFilters: false,
    activePanel: null,
};

const PAGINATION_LIMIT = 10;
const ARBITRARY_LARGE_NUM = 10000;

export const FeedContext = React.createContext();

const AdminProfile = (props) => {
    const dispatch = useDispatch();
    const [feedState, feedDispatch] = useReducer(feedReducer, {
        ...initialState
    });
    const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});
    const applicants = useSelector(selectApplicants);
    //react-virtualized loaded rows and row count.
    const [itemCount, setItemCount] = useState(0);
    const [toggleRefetch, setToggleRefetch] = useState(false);
    const [totalApplicantCount, setTotalApplicantCount] = useState(ARBITRARY_LARGE_NUM);
    const [rawTotalApplicantCount, setRawTotalApplicants] = useState(0);
    const {
        filterModal,
        activePanel,
        showFilters,
    } = feedState;
    const filters = Object.values(filterOptions);
    const {
        error: applicantsError,
        isLoading,
        loadMore,
        page,
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

    const { history, isAuthenticated, user } = props;

    const dispatchAction = (type, key, value) =>
        feedDispatch({ type, key, value });

    const refetchApplicants = (isLoading, loadMore, softRefresh = false) => {
        if (!softRefresh) {
            dispatchAction(SET_VALUE, "applyFilters", true);
            dispatch(applicantsActions.resetPageAction({ isLoading, loadMore }));
            if (page === 0) {
                setToggleRefetch(!toggleRefetch);
            }
        }
    };

    const loadApplicants = async () => {
        const limit = PAGINATION_LIMIT;
        const skip = page * limit;
        let baseURL = getApplicantsBaseURL(organisationId, limit, skip);
        let endpoint = baseURL
        dispatch(applicantsActions.fetchApplicantsBegin());

        try {
            const {
                data: { data: applicants, meta },
            } = await axios.get(endpoint);

            if (applicants.length && meta.total) {
                if (prevTotalApplicantCount !== meta.total) {
                    setTotalApplicantCount(meta.total);
                    setRawTotalApplicants(meta.total)
                }

                const lastPage = Math.ceil(meta.total / limit) - 1;
                if (page === lastPage) {
                    dispatch(applicantsActions.finishLoadingAction());
                }

                let applicantsInState;
                if (history.location.state) {
                    const { keepApplicantsState, keepPageState } = history.location.state;
                    applicantsInState = keepApplicantsState;
                    if (keepPageState >= page) {
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
                } else if (Object.keys(applicantsList).length && page) {
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
            }
            else if (applicants) {
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


    useEffect(() => {
    }, [history.location.search]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        refetchApplicants(); // will trigger loadApplicants(if needed) (by toggling toggleRefetch)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        loadApplicants();
    }, [toggleRefetch, page]); // eslint-disable-line react-hooks/exhaustive-deps

    const isItemLoaded = useCallback((index) => !!feedApplicants[index], [feedApplicants]);

    const loadNextPage = useCallback(

        ({ stopIndex }) => {
            if (
                !isLoading &&
                loadMore &&
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
        [feedApplicants.length, isLoading, loadMore], // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(() => {
        setItemCount(loadMore ? feedApplicants.length + 1 : feedApplicants.length);
    }, [feedApplicants.length, loadMore]);

    const emptyFeed = () => applicantsList.length < 1 && !isLoading;

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        // const objDiv = document.getElementById('profile-list').offsetTop
        // console.log(objDiv)
    }, [])

    // useEffect(() => {

    //     // const getWindowWidth = async () => {
    //     //     window.innerWidth()
    //     //     // setWindowWidth(window.innerWidth())

    //     // }
    //     console.log(window.innerWidth)
    // }
    //     , [windowWidth])

    window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth)
        // console.log(windowWidth)
    });


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
        location = {},
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

    // const [scrollActive, setScrollActive] = useState(false);
    // // const prevScroll = usePrevious(scrollActive);

    // useEffect((() => {
    //     window.addEventListener('scroll', () => setScrollActive(true));
    // }), [scrollActive])

    // const activateArrow = scrollActive

    // console.log(activateArrow)

    // const objDiv = document.getElementById('profile-list').offsetTop
    // console.log(objDiv)

    // const [boxBottom, setBoxBottom] = useState()

    // const objDiv = document.getElementById('profile-list')

    // const height = useCallback(() => {

    //     setBoxBottom(objDiv)
    // }, [])

    // console.log()

    // const inputRef = useRef()
    // useEffect(() => {
    //     // const height = inputRef.current.offsetHeight;
    //     // console.log('Input height', height);
    //     console.log("test:" + JSON.stringify(inputRef.current.getBoundingClientRect().top))
    // }, [inputRef])

    const inputRef = useRef()

    const handleLoad = (e) => {
        console.log({ clientHeight: e.target.clientHeight })
        console.log({ inputRef: inputRef })
    }
    // useEffect(() => {
    //     // const height = inputRef.current.offsetHeight;
    //     // console.log('Input height', height);
    //     if (inputRef.current) {

    //     }
    //     console.log({ current: inputRef.current })
    // }, [inputRef])

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
                <img

                />
                <FeedContext.Provider
                    value={{
                        isAuthenticated,
                        filters,
                        filterModal,
                        activePanel,
                        location,
                        dispatchAction,
                        selectedOptions,
                        showFilters,
                        totalApplicantCount,
                    }}

                >
                    <ProfileBackgroup />
                    <ProfileLayout

                    >
                        <UserInfoContainer>
                            <AvatarPhotoContainer>
                                <ProfilePic
                                    user={organisation}
                                    initials={getInitialsFromFullName(name)}
                                    ref={inputRef}
                                />
                            </AvatarPhotoContainer>
                            <UserInfoDesktop>
                                <NameDiv>
                                    <div
                                        ref={inputRef}
                                        className="name-container">
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
                        <WhiteSpace />
                        <PositionsContainer>
                            {   // Position title and description to be pulled from backend / API
                                // Placeholder text for ONE position is being used below
                                // Component will be needed for multiple positions (based on backend schema / structure)
                            }

                            <ProfileTabs>
                                <ProfileTabPane
                                    className="single-tab"
                                    tab={t("profile.views.applicants") + (windowWidth < 767 ? ` ( ${rawTotalApplicantCount} )` : "")}
                                    key="members"
                                >
                                    {rawTotalApplicantCount == 0 ?
                                        <div style={{ textAlign: "center", marginTop: "5rem" }}>
                                            No Applicants to display.
                                        </div> :
                                        <ProfileList
                                            itemCount={itemCount}
                                            isItemLoaded={isItemLoaded}
                                            isNextPageLoading={isLoading}
                                            loadNextPage={loadNextPage}
                                            hasNextPage={loadMore}
                                            filteredApplicants={applicantsList}
                                            totalCount={totalApplicantCount}
                                            page={page}
                                            emptyFeed={emptyFeed}
                                            windowWidth={windowWidth}
                                            onLoad={handleLoad}
                                        />

                                    }
                                </ProfileTabPane>
                            </ProfileTabs>
                        </PositionsContainer >
                    </ProfileLayout>
                </FeedContext.Provider>
            </>
        );

    }
}

const getApplicantsBaseURL = (organisationId, limit, skip) => {
    return `/api/applicants?organisationId=${organisationId}&includeMeta=true&limit=${limit}&skip=${skip}`;
};

export default withUserContext(withOrganisationContext(AdminProfile));