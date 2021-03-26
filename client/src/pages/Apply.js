// // This is a test page for Apply copied from Positions

// import locationIcon from "assets/icons/location.svg";
// import axios from "axios";
// import Loader from "components/Feed/StyledLoader";
// import PositionApplicationForm from "components/Positions/PositionApplicationForm";
// import ProfilePic from "components/Positions/ProfilePic";
// import {
//     OrganisationContext,
//     withOrganisationContext
// } from "context/OrganisationContext";
// import { UserContext, withUserContext } from "context/UserContext";
// import {
//     fetchOrganisation,
//     fetchOrganisationError,
//     fetchOrganisationSuccess
// } from "hooks/actions/organisationActions";
// import {
//     fetchUser,
//     fetchUserError,
//     fetchUserSuccess
// } from "hooks/actions/userActions";
// import React, {
//     useContext, useEffect, useRef, useState
// } from "react";
// import { useTranslation } from "react-i18next";
// import { getInitialsFromFullName } from "utils/userInfo";
// import ErrorAlert from "../components/Alert/ErrorAlert";
// import { PositionsContainer } from "../components/Profile/PositionsComponents";
// import {
//     AvatarPhotoContainer, DescriptionDesktop, NameDiv,
//     NamePara,
//     ProfileBackgroup, ProfileLayout,
//     UserInfoContainer,
//     UserInfoDesktop
// } from "../components/Profile/ProfileComponents";
// import { useHistory } from "react-router-dom";
// import styled from "styled-components";
// import { Modal, Button } from "antd";
// import PositionSubmitButton from "components/Positions/PositionSubmitButton";
// import ExitModal from "components/Positions/ExitModal";
// import googleMapReact from "google-map-react";


// export const TestModal = styled(Modal)`
//     height: 50rem;
//     width: 100rem;
// `;

const TestButton = styled.button`
`;

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
            {/* 
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
                        ></PositionApplicationForm> */}
            <ExitModal
                visible={visible}
                handleExit={handleExit}
                handleCancel={handleCancel}
            />
            <div>{window.history.state.idx}</div>
            {/* <TestButton
                            onClick={handleBackRequest}
                        // handleBackRequest={handleBackRequest}

                        >CLICK TEST</TestButton>
                    </PositionsContainer >
                </ProfileLayout> */}
        </>
    );
}
}

export default withUserContext(withOrganisationContext(Apply));