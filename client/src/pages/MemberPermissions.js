// import React from "react";
import { Radio } from "antd";
import PermissionsRadioGroup, { PermissionsApplyButton } from "components/AdminProfile/PermissionsRadioGroup";
import locationIcon from "assets/icons/location.svg";
import axios from "axios";
import Loader from "components/Feed/StyledLoader";
// import Application, { Title } from "components/Positions/Application";
import ProfilePic from "components/Picture/ProfilePic";
import {
    OrganisationContext,
    withOrganisationContext
} from "context/OrganisationContext";
import { UserContext, withUserContext } from "context/UserContext";
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
import React, {
    useContext, useEffect, useRef, useState
} from "react";
import { useTranslation } from "react-i18next";
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
import { useHistory, Link } from "react-router-dom";
import ExitModal from "components/Positions/ExitModal";
import ApplicationIntro from "components/Positions/ApplicationIntro";
import { useParams } from "react-router-dom";


const MemberPermissions = (props, applicantId) => {
    // const { isAuthenticated, user } = props;
    const initialState = {
        applicant: { name: "-" },
        intro: "",
    }



    const { applicationId } = useParams()
    const history = useHistory();
    const [visible, setVisible] = useState(false);

    const handleExit = (e) => {
        history.goBack(-1);
    }

    const initialBackRequest = (e) => {
        setVisible(true);
    }

    const handleCancel = async (e) => {
        setVisible(false);
        window.history.pushState({}, '',);
    }

    useEffect(() => {
        window.history.pushState({}, '',);
        window.onpopstate = function () {
            initialBackRequest();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


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

    const [applicantLoaded, setApplicantLoaded] = useState(false)

    const loadApplicant = async () => {
        const endpoint = `/api/applicants/${applicationId}`
        try {
            const {
                data
            } = await axios.get(endpoint);
            if (data) {
                setApplicantState(data)
                setApplicantLoaded(true)
            }
        } catch (error) {
            return error
        }
    }
    useEffect(() => {
        if (!applicantLoaded) {
            loadApplicant()
        }
    }, [applicantLoaded])
    const [permissions, setPermissions] = useState()

    const onChange = (data) => {
        setPermissions(data)
    }

    const handleApply = async () => {
        // TODO - pull applicantId from state in Org Profile ProfileListItem link
        const endpoint = `/applicants/${applicantId}?permissions=${permissions}`
        try {
            const res = await axios.patch(endpoint)
        } catch (error) {
            return error
        }
    }

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
                    <ApplicationIntro
                        // TODO GET MEMBER INFO FROM STATE (6.1)
                        // TODO GET INTRO FROM BACKEND
                        initials={getInitialsFromFullName(applicantState.applicant.name)}
                        applicantName={applicantState.applicant.name}
                    />
                    <PositionsContainer>
                        <PermissionsRadioGroup
                            onChange={(e) => { onChange(e) }}
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
                </ProfileLayout>
            </>
        );
    }
}

export default withUserContext(withOrganisationContext(MemberPermissions));