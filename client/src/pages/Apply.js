// This is a test page for Apply copied from Positions

import locationIcon from "assets/icons/location.svg";
import axios from "axios";
import Loader from "components/Feed/StyledLoader";
import PositionApplicationForm from "components/Positions/PositionApplicationForm";
import ProfilePic from "components/Positions/ProfilePic";
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
    useContext, useEffect, useRef
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
import { useHistory } from "react-router-dom";

const Apply = () => {
    const history = useHistory();
    useEffect(() => {

        // window.addEventListener("popstate", (e) => {
        //     window.stop()
        //     e.preventDefault();
        //     alert(window.location);
        //     // history.go(1);
        // }, true);
        const yo = false
        window.history.pushState(null, null,);
        window.onpopstate = function () {


            if (!yo) { history.go(1); }

        };


    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    // const history = useHistory();

    // window.addEventListener('keydown', (e) => {
    //     e.preventDefault();
    //     alert("e")

    // }
    // )

    // window.onpopstate = (e) => { e.preventDefault() }




    // window.addEventListener('popstate', (e) => {
    //     e.preventDefault();
    //     alert("TEST2!")

    // }
    // )


    // const history = useHistory();

    // useEffect(() => {
    //     const { state, pathname } = history.location;
    //     history.push(pathname, {
    //         ...state,
    //         keepScroll: true,
    //     });
    //     window.addEventListener("popstate", onBrowserBack);
    //     return () => {
    //         window.removeEventListener("popstate", onBrowserBack);
    //     };
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // const onBrowserBack = (e) => {
    //     alert("TEST!")
    //     e.preventDefault();
    // };


    let url = window.location.pathname.split("/");
    const organisationId = url[url.length - 2];
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
                        <PositionApplicationForm
                            orgName={name}
                        ></PositionApplicationForm>
                    </PositionsContainer >
                </ProfileLayout>
            </>
        );
    }
}

export default withUserContext(withOrganisationContext(Apply));