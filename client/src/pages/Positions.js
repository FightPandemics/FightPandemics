import locationIcon from "assets/icons/location.svg";
import axios from "axios";
import Loader from "components/Feed/StyledLoader";
import ApplyButton from "components/Positions/PositionsButton";
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
import {
    PositionDescription, PositionsContainer,
    PositionTitle
} from "../components/Profile/PositionsComponents";
import {
    AvatarPhotoContainer, DescriptionDesktop, NameDiv,
    NamePara,
    ProfileBackgroup, ProfileLayout,
    UserInfoContainer,
    UserInfoDesktop
} from "../components/Profile/ProfileComponents";

const Positions = () => {

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
                        {// Position title and description to be pulled from backend / API. Placeholder text is being used below
                        }
                        <PositionTitle>Volunteer Position</PositionTitle>
                        <PositionDescription>
                            <p>Aliquam dictum et nulla gravida. A viverra nascetur malesuada sodales id scelerisque. Iaculis egestas odio felis cras risus. Sodales integer tempus elementum, arcu elit rutrum pharetra, tortor dolor.
                            <br /><br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mauris lectus, posuere at nunc non, bibendum iaculis dolor. Vivamus faucibus lacus nec malesuada volutpat.
                            <br /><br />
                            Aliquam dictum et nulla gravida. A viverra nascetur malesuada sodales id scelerisque. Iaculis egestas odio felis cras risus. Sodales integer tempus elementum, arcu elit rutrum pharetra, tortor dolor.</p>
                        </PositionDescription >
                        {//Button will connect applications page
                        }
                        <ApplyButton>{t("positions.apply")}</ApplyButton>
                    </PositionsContainer >
                </ProfileLayout>
            </>
        );
    }
}

export default withUserContext(withOrganisationContext(Positions));