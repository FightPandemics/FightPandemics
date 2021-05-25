// PRE MERGE
import filterOptions from "assets/data/filterOptions";
import locationIcon from "assets/icons/location.svg";
import axios from "axios";
import Loader from "components/Feed/StyledLoader";
import ProfileList from "components/OrganisationProfile/ProfileList";
import {
  ProfileTabPane,
  ProfileTabs,
} from "components/OrganisationProfile/ProfileTabs";
// import ProfilePic from "components/Positions/ProfilePic";
import ProfilePic from "components/Picture/ProfilePic";
import {
  OrganisationContext,
  withOrganisationContext,
} from "context/OrganisationContext";
import { UserContext, withUserContext } from "context/UserContext";
import { SET_VALUE } from "hooks/actions/feedActions";
//hooks, actions, reducers
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
import { feedReducer, optionsReducer } from "hooks/reducers/feedReducers";
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { applicantsActions, selectApplicants } from "reducers/applicants";
import { getInitialsFromFullName } from "utils/userInfo";
import ErrorAlert from "../components/Alert/ErrorAlert";
import { PositionsContainer } from "../components/Profile/PositionsComponents";
import {
  AvatarPhotoContainer,
  DescriptionDesktop,
  NameDiv,
  NamePara,
  ProfileBackgroup,
  ProfileLayout,
  UserInfoContainer,
  UserInfoDesktop,
} from "../components/Profile/ProfileComponents";
import { WhiteSpace } from "antd-mobile";
import styled from "styled-components";

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

const OrgWorkSpace = (props) => {
  const dispatch = useDispatch();
  const [feedState, feedDispatch] = useReducer(feedReducer, {
    ...initialState,
  });
  const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});
  const applicants = useSelector(selectApplicants);

  //react-virtualized loaded rows and row count.
  const [itemCount, setItemCount] = useState(0);
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const [totalApplicantCount, setTotalApplicantCount] = useState(
    ARBITRARY_LARGE_NUM,
  );
  const [rawTotalApplicantCount, setRawTotalApplicants] = useState();
  const { filterModal, activePanel, showFilters } = feedState;
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
    let endpoint = baseURL;
    dispatch(applicantsActions.fetchApplicantsBegin());

    try {
      const {
        data: { data: applicants, meta },
      } = await axios.get(endpoint);

      const { data } = await axios.get(endpoint);

      console.log({ data: data });
      // console.log({ applicants: applicants })
      console.log({ meta2: meta });
      if (!meta.total) {
        setRawTotalApplicants(0);
      }
      if (applicants.length && meta.total) {
        if (prevTotalApplicantCount !== meta.total) {
          setTotalApplicantCount(meta.total);
          setRawTotalApplicants(meta.total);
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
    refetchApplicants(); // will trigger loadApplicants(if needed) (by toggling toggleRefetch)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadApplicants();
  }, [toggleRefetch, page]); // eslint-disable-line react-hooks/exhaustive-deps

  const isItemLoaded = useCallback((index) => !!feedApplicants[index], [
    feedApplicants,
  ]);

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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  let url = window.location.pathname.split("/");
  const organisationId = url[url.length - 1];
  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganisationContext,
  );
  const { error, loading, organisation } = orgProfileState;
  const { userProfileDispatch } = useContext(UserContext);
  const { t } = useTranslation();
  const { name, location = {}, about = "" } = organisation || {};

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
  } else {
    const { address } = location;
    return (
      <>
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
          <ProfileLayout className="profile-list-page">
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
                    <NamePara>{name}</NamePara>
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
              {
                // Position title and description to be pulled from backend / API
                // Placeholder text for ONE position is being used below
                // Component will be needed for multiple positions (based on backend schema / structure)
              }

              <ProfileTabs>
                {/* 
                                <ContentContainer
                                    className="content-container"
                                /> */}

                <ProfileTabPane
                  className="single-tab"
                  tab={
                    t("profile.views.members") +
                    (windowWidth < 767 ? ` ( ${rawTotalApplicantCount} )` : "")
                  }
                  key="members"
                >
                  {rawTotalApplicantCount == 0 ? (
                    <div style={{ textAlign: "center", marginTop: "5rem" }}>
                      No members to display.
                    </div>
                  ) : (
                    <ProfileList
                      itemCount={itemCount}
                      isItemLoaded={isItemLoaded}
                      isNextPageLoading={isLoading}
                      loadNextPage={loadNextPage}
                      hasNextPage={loadMore}
                      filteredMembers={applicantsList}
                      totalCount={totalApplicantCount}
                      page={page}
                      emptyFeed={emptyFeed}
                    />
                  )}
                </ProfileTabPane>
              </ProfileTabs>
            </PositionsContainer>
          </ProfileLayout>
        </FeedContext.Provider>
      </>
    );
  }
};

const getApplicantsBaseURL = (organisationId, limit, skip) => {
  return `/api/applicants?organisationId=${organisationId}&status="accepted"&includeMeta=true&limit=${limit}&skip=${skip}`;
};

export default withUserContext(withOrganisationContext(OrgWorkSpace));
