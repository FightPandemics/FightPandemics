import locationIcon from "assets/icons/location.svg";
import axios from "axios";
import Loader from "components/Feed/StyledLoader";
import Application, { Title } from "components/Positions/Application";
import ProfilePic from "components/Picture/ProfilePic";
import {
  OrganisationContext,
  withOrganisationContext,
} from "context/OrganisationContext";
import { UserContext, withUserContext } from "context/UserContext";
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
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
import { useHistory } from "react-router-dom";
import ExitModal from "components/Positions/ExitModal";
import ApplicationIntro from "components/Positions/ApplicationIntro";
import { LOCAL_NOTIFICATION_MARK_AS_CLEARED } from "actions/wsActions";
import { applicantsActions, selectApplicants } from "reducers/applicants";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectOrganisationId } from "reducers/session";

const initialState = {
  applicant: { name: "-" },
  organization: { permissions: "" },
  intro: "",
  answers: {
    q1: "",
    q2: "",
    q3: "",
  },
};

const Apply = (props) => {
  // const { isAuthenticated, user } = props;
  const {
    userProfileState: { user },
    userProfileDispatch,
  } = useContext(UserContext);
  const [actorPermissionsLoaded, setActorPermissionsLoaded] = useState(false);
  const [currentUserPermissions, setCurrentUserPermissions] = useState();
  const actorId = user?.id;
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
      // setMemberstatus(applicants[0].status)
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
    // if (!actorPermissionsLoaded && actorId) {
    loadPermissions(actorId);
    // }
  }, [actorId, loadPermissions]);

  const [applicantState, setApplicantState] = useState(initialState);
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const handleExit = (e) => {
    history.goBack(-1);
  };

  const initialBackRequest = (e) => {
    setVisible(true);
  };

  const handleCancel = async (e) => {
    setVisible(false);
    window.history.pushState({}, "");
  };

  useEffect(() => {
    window.history.pushState({}, "");
    window.onpopstate = function () {
      initialBackRequest();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // let url = window.location.pathname.split("/");
  // const organisationId = url[url.length - 2];

  const { organisationId, userId } = useParams();
  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganisationContext,
  );
  const { error, loading, organisation } = orgProfileState;
  const actorOrganisationId = useSelector(selectOrganisationId);
  const isSelf = organisation && actorOrganisationId == organisation._id;

  const { t } = useTranslation();
  const { name, location = {}, about = "" } = organisation || {};

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

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

  const params = useParams();
  const [applicantName, setApplicantName] = useState();
  useEffect(() => {
    setApplicantName("params");
  }, [false]);

  const loadApplicant = async () => {
    const endpoint = `/api/applicants/${params.applicantId}`;
    try {
      const { data } = await axios.get(endpoint);
      setApplicantState(data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    loadApplicant();
  }, [applicantName, loadApplicant, params.applicantId]);

  const [intro, setIntro] = useState();
  const [introLoaded, setIntroLoaded] = useState(false);
  const loadApplicantUser = async () => {
    const endpoint = `/api/users/${userId}`;
    try {
      const { data } = await axios.get(endpoint);
      if (data) {
        setIntro(data.about);
        setIntroLoaded(true);
      }
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    if (!introLoaded) {
      loadApplicantUser();
    }
  }, [introLoaded, loadApplicantUser]);

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
          {isSelf || permissions?.isAdmin ? (
            <>
              <ApplicationIntro
                // applicantName={applicantName}
                applicantName={applicantState.applicant.name}
                initials={getInitialsFromFullName(
                  applicantState.applicant.name,
                )}
                permissions={applicantState.organization.permissions}
                intro={intro}
              />
              <PositionsContainer>
                <Application
                  orgName={name}
                  organisationId={organisationId}
                  application={applicantState}
                ></Application>
              </PositionsContainer>
              <ExitModal
                visible={visible}
                handleExit={handleExit}
                handleCancel={handleCancel}
              />
            </>
          ) : (
            <div
              style={{
                display: "flex",
                "justify-content": "center",
                "align-items": "center",
                "font-size": "2rem",
                height: "75%",
              }}
            >
              You do not have permission to view this page 😥{" "}
            </div>
          )}
        </ProfileLayout>
      </>
    );
  }
};

export default withUserContext(withOrganisationContext(Apply));
