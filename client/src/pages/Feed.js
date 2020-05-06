import {
    ADD_OPTION,
    REMOVE_ALL_OPTIONS,
    REMOVE_OPTION,
    SET_VALUE,
    TOGGLE_STATE,
} from "../hooks/actions/feedActions";
import React, { useReducer } from "react";
import { feedReducer, optionsReducer } from "../hooks/reducers/feedReducers";

import ButtonModal from "../components/Feed/ButtonModal";
import FeedWrapper from "../components/Feed/FeedWrapper";
import FilterBox from "../components/Feed/FilterBox";
import { Link } from "react-router-dom";
import Posts from "../components/Feed/Posts";
import SvgIcon from "../components/Icon/SvgIcon";
import creatPost from "~/assets/icons/create-post.svg";
import fakePosts from "../assets/data/fakePosts";
import filterOptions from "../assets/data/filterOptions";

// ICONS

export const FeedContext = React.createContext();

const initialState = {
    filterModal: false,
    createPostModal: false,
    activePanel: null,
    location: "",
};

const Feed = () => {
    const [feedState, feedDispatch] = useReducer(feedReducer, initialState);
    const [selectedOptions, optionsDispatch] = useReducer(optionsReducer, {});
    const { filterModal, createPostModal, activePanel, location } = feedState;
    const filters = Object.values(filterOptions);

    const dispatchAction = (type, key, value) =>
        feedDispatch({ type, key, value });

    const handleFilterModal = (panelIdx) => (e) => {
        e.preventDefault();
        dispatchAction(TOGGLE_STATE, "filterModal");
        dispatchAction(
            SET_VALUE,
            "activePanel",
            panelIdx > -1 ? `${panelIdx}` : null,
        );
    };

    const handleQuit = (e) => {
        e.preventDefault();
        dispatchAction(TOGGLE_STATE, "filterModal");
        dispatchAction(SET_VALUE, "location", "");
        dispatchAction(SET_VALUE, "activePanel", null);
        optionsDispatch({ type: REMOVE_ALL_OPTIONS, payload: {} });
    };

    const handleLocation = (value) =>
        dispatchAction(SET_VALUE, "location", value);

    const handleOption = (label, option) => (e) => {
        e.preventDefault();
        const options = selectedOptions[label] || [];
        const hasOption = options.includes(option);
        return optionsDispatch({
            type: hasOption ? REMOVE_OPTION : ADD_OPTION,
            payload: { option, label },
        });
    };

    const handleCreatePost = () => {
        dispatchAction(TOGGLE_STATE, "createPostModal");
    };

    const renderCreatePostModal = () => {
        return (
            <ButtonModal
                onClose={() => dispatchAction(TOGGLE_STATE, "createPostModal")}
                maskClosable={true}
                closable={false}
                visible={createPostModal}
                transparent
            >
                <h2 className="title">Continue Posting As</h2>
                <div className="links">
                    <Link className="primary" to="/create-post">
            Individual
                    </Link>

                    <Link className="outline" to="/create-post">
            Organization
                    </Link>
                </div>
            </ButtonModal>
        );
    };

    return (
        <FeedContext.Provider
            value={{
                filters,
                filterModal,
                activePanel,
                location,
                dispatchAction,
                selectedOptions,
                handleOption,
                handleFilterModal,
                handleQuit,
                handleLocation,
            }}
        >
            <FeedWrapper>
                <FilterBox />
                <Posts filteredPosts={fakePosts} />
                <SvgIcon
                    src={creatPost}
                    onClick={handleCreatePost}
                    className="create-post"
                />
                {renderCreatePostModal()}
            </FeedWrapper>
        </FeedContext.Provider>
    );
};

export default Feed;
