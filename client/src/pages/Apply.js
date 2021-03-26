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
    const [visible, setVisible] = useState(false);
    const handleBackRequest = async (e) => {
        history.goBack(-1);
    }
    const handleExit = (e) => {
        history.goBack(-1);
    }

    const initialBackRequest = (e) => {
        setVisible(true);
    }

    const handleCancel = async (e) => {
        setVisible(false);
        window.history.pushState({}, '',);
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

    }
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
        window.history.pushState({}, '',);
        window.onpopstate = function () {
            initialBackRequest();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



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
                    <div>test</div>

                    <PositionApplicationForm
                        orgName={name}
                    >
                        <ExitModal
                            visible={visible}
                            handleExit={handleExit}
                            handleCancel={handleCancel}
                        />
                        <div>{window.history.state.idx}</div>
                        <TestButton
                            onClick={handleBackRequest}
                        >
                            CLICK TEST
                        </TestButton>
                    </PositionApplicationForm>
                </PositionsContainer >
            </ProfileLayout>
        </>
    );
}


export default withUserContext(withOrganisationContext(Apply));