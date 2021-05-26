// import React from "react";
import { Radio } from "antd";
import PermissionsRadioGroup, {
  PermissionsApplyButton,
} from "components/AdminProfile/PermissionsRadioGroup";
import locationIcon from "assets/icons/location.svg";
import axios from "axios";
import Loader from "components/Feed/StyledLoader";
// import Application, { Title } from "components/Positions/Application";
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
import { useHistory, Link } from "react-router-dom";
import ExitModal from "components/Positions/ExitModal";
import ApplicationIntro from "components/Positions/ApplicationIntro";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectOrganisationId } from "reducers/session";

const MemberPermissions = (props, applicantId) => {
  // const { isAuthenticated, user } = props;
  const initialState = {
    applicant: { name: "-" },
    intro: "",
    organization: { permissions: "" },
  };


  const [visible, setVisible] = useState(false);
  const { applicationId, id } = useParams();
  const history = useHistory();

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

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  let url = window.location.pathname.split("/");
  // const organisationId = url[url.length - 3];
  const { organisationId } = useParams()

  const { orgProfileState, orgProfileDispatch } = useContext(
    OrganisationContext,
  );
  const { error, loading, organisation } = orgProfileState;
  const {
    userProfileState: { user },
    userProfileDispatch,
  } = useContext(UserContext);
  const [intro, setIntro] = useState()
  const [introLoaded, setIntroLoaded] = useState(false)
  const [actorPermissionsLoaded, setActorPermissionsLoaded] = useState(false)
  const [memberPermissionsLoaded, setMemberPermissionsLoaded] = useState(false)
  const [currentUserPermissions, setCurrentUserPermissions] = useState()
  const [currentMemberPermissions, setMemberPermissions] = useState()
  const actorId = user?.id
  const actorOrganisationId = useSelector(selectOrganisationId);
  const isSelf = organisation && actorOrganisationId == organisation._id;

  const { t } = useTranslation();
  const {
    name,
    location = {},
    about = "",
  } = organisation || {};

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const loadPermissions = async (actorId) => {
    const endpoint = `/api/applicants/${organisationId}/status?status=accepted&userId=${actorId}&includeMeta=true` // &userId=${user.id}

    try {
      const {
        data: { data: applicants, meta }
      } = await axios.get(endpoint);
      setActorPermissionsLoaded(true)
      setCurrentUserPermissions(applicants[0].organization.permissions)
      // setMemberstatus(applicants[0].status)
    } catch (error) {
      return error
    }
  }

  const actorPermissions = {
    isVolunteer: currentUserPermissions == "Volunteer" || "WikiEditor" || "Admin",
    isWikiEditor: currentUserPermissions == "WikiEditor" || "Admin",
    isAdmin: currentUserPermissions == "Admin"
  }

  useEffect(() => {
    loadPermissions(actorId)
  }, [actorId])

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

  const [applicantState, setApplicantState] = useState(initialState);

  const [applicantLoaded, setApplicantLoaded] = useState(false);

  const loadApplicant = async () => {
    const endpoint = `/api/applicants/${applicationId}`;
    try {
      const { data } = await axios.get(endpoint);
      if (data) {
        setApplicantState(data);
        setApplicantLoaded(true);
      }
    } catch (error) {
      return error;
    }
  };

  const loadApplicantUser = async () => {
    const endpoint = `/api/users/${id}`;
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

  useEffect(() => {
    if (!applicantLoaded) {
      loadApplicant();
    }
  }, [applicantLoaded, loadApplicant]);
  const [updatePermissions, setUpdatePermissions] = useState();
  const onChange = (data) => {
    setUpdatePermissions(data);
  };

  const handleApply = async () => {
    // TODO - pull applicantId from state in Org Profile ProfileListItem link
    const endpoint = `/applicants/${applicantId}?permissions=${updatePermissions}`;
    try {
      const res = await axios.patch(endpoint);
    } catch (error) {
      return error;
    }
  };

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
          {isSelf || actorPermissions?.isAdmin ?
            <>
              <ApplicationIntro
                initials={getInitialsFromFullName(applicantState.applicant.name)}
                applicantName={applicantState.applicant.name}
                intro={intro}
              />
              <PositionsContainer>
                <PermissionsRadioGroup
                  onChange={(e) => { onChange(e) }}
                  permissions={applicantState?.organization?.permissions}
                />
                {// TODO - add button text to en_us
                }
                <div style={{ display: "flex" }}>
                  <Link
                    style={{ width: "fit-content", margin: "auto" }}
                    onClick={handleApply}
                    // TODO - redirect to Org Page
                    to={`/organisation/${organisationId}`}
                  >
                    <PermissionsApplyButton
                      style={{ margin: 0 }}

                    >Apply</PermissionsApplyButton>
                  </Link>
                </div>
              </PositionsContainer >
              <ExitModal
                visible={visible}
                handleExit={handleExit}
                handleCancel={handleCancel}
              />
            </> :
            <div
              style={{ "display": "flex", "justify-content": "center", "align-items": "center", "font-size": "2rem", "height": "75%" }}
            >You do not have permission to view this page 😥 </div>
          }
        </ProfileLayout>
      </>
    )
  }
}

export default withUserContext(withOrganisationContext(MemberPermissions));