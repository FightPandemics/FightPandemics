

import { WhiteSpace } from "antd-mobile";
import axios from "axios";
import React, {
    useState,
    useEffect,
    useContext,
    useCallback,
    useReducer,
    useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ICONS
import createPost from "assets/icons/create-post.svg";
import edit from "assets/icons/edit.svg";
import locationIcon from "assets/icons/location.svg";
import envelopeBlue from "assets/icons/social-envelope-blue.svg";
import playStoreIcon from "assets/icons/play-store-icon.svg";
import appStoreIcon from "assets/icons/app-store-icon.svg";
import BackIcon from "assets/icons/back.svg";



import instagramIcon from "assets/icons/social-instagram.svg";
import linkedinBlue from "assets/icons/social-linkedin.svg";
import facebookIcon from "assets/icons/social-fb.svg";
import twitterBlue from "assets/icons/social-tw.svg";
import githubIcon from "assets/icons/social-github.svg";
import websiteIcon from "assets/icons/website-icon.svg";

import Activity from "components/Profile/Activity";
import CreatePost from "components/CreatePost/CreatePost";
import ErrorAlert from "../components/Alert/ErrorAlert";
import { FeedWrapper } from "components/Feed/FeedWrappers";
import ProfilePic from "components/Positions/ProfilePic";
import UploadPic from "components/Picture/UploadPic";
import MessageModal from "../components/Feed/MessagesModal/MessageModal.js";
import Verification from "components/Verification/";
import VerificationTick from "components/Verification/Tick";
import SvgIcon from "components/Icon/SvgIcon";

import Loader from "components/Feed/StyledLoader";

//addded z to in order import constants with sanme name for banner styles from Org profile

import {
    PositionsContainer,
    PositionTitle,
    PositionDescription
} from "../components/Profile/PositionsComponents";
import { isAuthorOrg, isAuthorUser } from "pages/Feed";
import { getInitialsFromFullName } from "utils/userInfo";
import {
    FACEBOOK_URL,
    INSTAGRAM_URL,
    LINKEDIN_URL,
    TWITTER_URL,
    GITHUB_URL,
    APPSTORE_URL,
    PLAYSTORE_URL,
} from "constants/urls";
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
import {
    OrganisationContext,
    withOrganisationContext,
} from "context/OrganisationContext";
import { SET_EDIT_POST_MODAL_VISIBILITY } from "hooks/actions/postActions";
import {
    SET_DELETE_MODAL_VISIBILITY,
    DELETE_MODAL_POST,
    DELETE_MODAL_HIDE,
} from "hooks/actions/feedActions";
import { LOGIN } from "templates/RouteWithSubRoutes";
import {
    deletePostModalreducer,
    deletePostState,
} from "hooks/reducers/feedReducers";
import { UserContext, withUserContext } from "context/UserContext";
import GTM from "constants/gtm-tags";
import { selectPosts, postsActions } from "reducers/posts";
import { selectOrganisationId } from "reducers/session";
import CreatePostButton from "components/Feed/CreatePostButton";
import JoinOrgButton from "components/OrganisationProfile/JoinOrgButton";
import { ReactComponent as PlusIcon } from "assets/icons/pretty-plus.svg";
import ApplyButton from "components/Positions/PositionsButton";
import PositionSubmitButton from "components/Positions/PositionSubmitButton"

//Snippet from Organisation Profile to bring in banner design

import {
    ProfileLayout,
    UserInfoContainer,
    EditIcon,
    UserInfoDesktop,
    NameDiv,
    PlaceholderIcon,
    DescriptionDesktop,
    IconsContainer,
    SocialIcon,
    SectionHeader,
    CreatePostDiv,
    CreatePostIcon,
    DrawerHeader,
    CustomDrawer,
    PhotoUploadButton,
    AvatarPhotoContainer,
    NamePara,
    ProfileBackgroup,
} from "../components/Profile/ProfileComponents";


let url = window.location.pathname.split("/");
const organisationId = url[url.length - 2];
const getGTM = (id) => {
    return `${GTM?.aboutUs?.prefix}${GTM?.aboutUs?.[id]}`;
};

const Positions = () => {
    const { orgProfileState, orgProfileDispatch } = useContext(
        OrganisationContext,
    );
    const { error, loading, organisation } = orgProfileState;
    const address = "adress"
    // const about = "about"
    // const verified = "verified"
    // const renderURL = "renderURL"
    // const isSelf = "isSELF"
    // const name = "name"

    const {
        userProfileState: { user },
        userProfileDispatch,
    } = useContext(UserContext);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const {
        email,
        name,
        location = {},
        about = "",
        isOwner,
        urls = {},
        verified,
    } = organisation || {};

    useEffect(() => {
        dispatch(postsActions.resetPageAction({}));
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
    }, [orgProfileDispatch, organisationId, userProfileDispatch]);

    return (
        <>
            <ProfileBackgroup />
            <ProfileLayout>




                <PositionsContainer>
                    {//Old Desgin
                    }
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
                            <IconsContainer>
                                <div className="social-icons">{"renderURL()"}</div>
                            </IconsContainer>
                        </UserInfoDesktop>
                    </UserInfoContainer>
                    {// Position title and description to be pulled from backend / API
                    }
                    <PositionTitle>Volunteer Position</PositionTitle>
                    <PositionDescription>
                        <p>Aliquam dictum et nulla gravida. A viverra nascetur malesuada sodales id scelerisque. Iaculis egestas odio felis cras risus. Sodales integer tempus elementum, arcu elit rutrum pharetra, tortor dolor.
                <br /><br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mauris lectus, posuere at nunc non, bibendum iaculis dolor. Vivamus faucibus lacus nec malesuada volutpat.
                <br /><br />
                Aliquam dictum et nulla gravida. A viverra nascetur malesuada sodales id scelerisque. Iaculis egestas odio felis cras risus. Sodales integer tempus elementum, arcu elit rutrum pharetra, tortor dolor.</p>
                    </PositionDescription >
                    <ApplyButton>Apply</ApplyButton>
                    {
                        //Testing Position Submit
                    }
                    <PositionSubmitButton
                        getGTM={getGTM} t={t}>
                    </PositionSubmitButton>
                </PositionsContainer >
            </ProfileLayout>
        </>
    );
}

//TODO - add user context
export default withUserContext(withOrganisationContext(Positions));
