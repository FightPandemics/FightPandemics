import { Drawer, List, Button, WhiteSpace } from "antd-mobile";
import { Typography } from "antd";
import axios from "axios";
import React, { useState, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getInitialsFromFullName } from "utils/userInfo";
import TextAvatar from "components/TextAvatar";
import CookieAlert from "components/CookieAlert";
import FeedbackSubmitButton from "components/Button/FeedbackModalButton";
import Footnote from "components/Footnote";
import Header from "components/Header";
import Main from "./Main";
import MobileTabs from "./MobileTabs";
import RadioGroup from "components/Feedback/RadioGroup";
import RadioModal from "components/Feedback/RadioModal";
import RatingModal from "components/Feedback/RatingModal";
import FormInput from "components/Input/FormInput";
import TextFeedbackModal from "components/Feedback/TextFeedbackModal";
import ThanksModal from "components/Feedback/ThanksModal";
import withLabel from "components/Input/with-label";
import ErrorAlert from "components/Alert/ErrorAlert";
import { theme } from "constants/theme";
import {
  TOGGLE_STATE,
  SET_VALUE,
  FEEDBACK_FORM_SUBMIT,
  FEEDBACK_FORM_SUBMIT_ERROR,
} from "hooks/actions/feedbackActions";
import {
  feedbackReducer,
  feedbackFormReducer,
  initialState,
} from "hooks/reducers/feedbackReducers";
import Logo from "components/Logo";
import logo from "assets/logo.svg";
import GTM from "constants/gtm-tags";

const { royalBlue, tropicalBlue, white } = theme.colors;

const drawerStyles = {
  position: "relative",
  overflow: "hidden",
  WebkitOverflowScrolling: "touch",
};

const sidebarStyle = {
  background: `${royalBlue}`,
};

const MenuContainer = styled.div`
  width: 63vw !important;
  overflow: hidden;
  @media screen and (min-width: 1024px) {
    width: 20vw !important;
  }
`;

const NavList = styled(List)`
  & .am-list-body {
    background: unset;
    border-width: 0 !important;
    position: absolute;
    width: 100%;
    & div:not(:last-child) {
      & .am-list-line {
        border-bottom: 0;
      }
    }
    &::after {
      height: 0px !important;
    }

    &::before {
      height: 0px !important;
    }
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedbackItem = styled(List.Item)`
  background: unset;
  padding-left: 2.1rem;
  cursor: pointer;
  height: ${(props) => props.height ?? "inherit"};
  & .am-list-line {
    border-bottom: 0;
    &:after {
      height: 0 !important;
    }
    pointer-events: none;
    & .am-list-content {
      color: ${white};
      pointer: none;
      font-family: "Poppins", sans-serif;
      font-size: ${(props) => (props.size === "small" ? "2rem" : "2.4rem")};
      font-weight: ${(props) => (props.size === "small" ? "400" : "600")};
      line-height: 6rem;
      padding: 0;
      margin: ${(props) =>
        typeof props.margin != undefined ? props.margin : "inherit"};
    }
  }

  &.am-list-item-active {
    background: ${tropicalBlue};
  }
`;

const NavItem = styled(List.Item)`
  background: unset;
  padding-left: 2.1rem;
  height: ${(props) => props.height ?? "inherit"};
  & .am-list-line {
    border-bottom: 0;
    &:after {
      height: 0 !important;
    }
    & .am-list-content {
      color: ${white};
      cursor: pointer;
      font-family: "Poppins", sans-serif;
      font-size: ${(props) => (props.size === "small" ? "2rem" : "2.4rem")};
      font-weight: ${(props) => (props.size === "small" ? "400" : "600")};
      line-height: 6rem;
      padding: 0;
      margin: ${(props) =>
        typeof props.margin != undefined ? props.margin : "inherit"};
    }
  }

  &.am-list-item-active {
    background: ${tropicalBlue};
  }
`;

const NavItemBrief = styled(NavItem)`
  padding-left: 2.75rem;
  & .am-list-line {
    border-bottom: 0;
    &:after {
      height: 0 !important;
    }
    & .am-list-content {
      font-size: 1.8rem;
      font-weight: normal;
      line-height: 3.5rem;
    }
  }
`;

const UserName = styled(Typography.Text)`
  padding: 1.2rem 1.2rem;
  font-family: Poppins;
  font-size: 1.6rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  color: ${white};
`;

const Space = styled.div`
  height: ${(props) => props.height ?? "1rem"};

  @media (max-height: 699px) {
    height: ${(props) => props.limitMobileHeight && 0};
  }
`;

const CloseNav = styled(Button).attrs(() => ({
  inline: true,
  icon: "cross",
  size: "lg",
}))`
  background: unset;
  border-width: 0 !important;
  border-radius: 0;
  color: ${white};
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  z-index: 300;

  &.am-button-active {
    background: none;
    color: ${white};
  }
  &::before {
    display: none;
  }

  .am-icon {
    stroke-width: 0.2rem;
    stroke: ${white};
  }
`;

const BriefLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: normal;
  line-height: 4.5rem;
`;

const DividerLine = styled.div`
  height: 0.1px;
  background-color: ${white};
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const AvatarInitials = styled(Typography.Text)`
  font-family: Poppins;
  font-size: 3.29rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
`;

const RatingWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const TEXT_FEEDBACK = [
  {
    stateKey: "mostValuableFeature",
    label: "Which features are the most valuable to you?",
  },
  {
    stateKey: "whatWouldChange",
    label:
      "If you could change one thing about FightPandemics, what would it be?",
  },
  { stateKey: "generalFeedback", label: "Any other feedback for us?" },
];

const StyledDrawer = styled(Drawer)`
  .am-drawer-draghandle {
    visibility: hidden;
  }
`;

const NavigationLayout = (props) => {
  const {
    authLoading,
    mobiletabs,
    navSearch,
    tabIndex,
    isAuthenticated,
    user,
  } = props;
  const history = useHistory();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState(false);

  const handleSearchSubmit = (inputValue) => {
    setSearchKeywords(inputValue);
  };

  const handleSearchClear = () => {
    setSearchKeywords("");
  };

  const displayInitials = (user) => {
    if (user?.firstName && user?.lastName) {
      return (
        <AvatarInitials>
          {getInitialsFromFullName(`${user.firstName} ${user.lastName}`)}
        </AvatarInitials>
      );
    }
  };

  const displayFullName = (user) =>
    user ? `${user?.firstName} ${user?.lastName}` : "";

  const [feedbackState, feedbackDispatch] = useReducer(
    feedbackReducer,
    initialState.feedbackReducer,
  );

  const [feedbackFormState, feedbackFormDispatch] = useReducer(
    feedbackFormReducer,
    initialState.feedbackFormReducer,
  );

  const {
    ratingModal,
    textFeedbackModal,
    radioModal,
    thanksModal,
    rating,
    mostValuableFeature,
    whatWouldChange,
    generalFeedback,
    age,
    covidImpact,
  } = feedbackState;

  const dispatchAction = (type, key, value) => {
    feedbackDispatch({ type, key, value });
  };

  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };

  const toggleModal = (modalName) => {
    dispatchAction(TOGGLE_STATE, modalName);
  };

  const closeModalandReset = (modalName, actionNames = null) => {
    if (actionNames) {
      actionNames.forEach((action) => dispatchAction(SET_VALUE, action, ""));
    }

    toggleModal(modalName);
  };

  const nextModal = (currentModal, nextModal, actionName, value) => {
    if (actionName && value) {
      dispatchAction(SET_VALUE, actionName, value);
    }

    toggleModal(currentModal);
    toggleModal(nextModal);
  };

  const submitFeedbackForm = async () => {
    feedbackFormDispatch({ type: FEEDBACK_FORM_SUBMIT });

    try {
      const res = await axios.post("/api/feedback", {
        rating,
        age,
        ...(user && { userId: user.id }),
        covidImpact,
        generalFeedback,
        mostValuableFeature,
        whatWouldChange,
      });

      if (res) {
        toggleModal("thanksModal");
        setTimeout(() => dispatchAction(SET_VALUE, "thanksModal", false), 3000);
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      feedbackFormDispatch({
        type: FEEDBACK_FORM_SUBMIT_ERROR,
        error: `Could not submit feedback, reason: ${message}`,
      });
    }
  };

  const renderThanksModal = () => (
    <ThanksModal
      onClose={() => closeModalandReset("thanksModal")}
      visible={thanksModal}
      transparent
      closable
    >
      <h2 className="title">Thank you!</h2>
      <p>
        Your input means a lot and helps us improve our services during and
        after the COVID-19 pandemic.
      </p>
      <Link to={isAuthenticated ? "/feed" : "/"}>
        <Logo src={logo} alt="FightPandemics logo" />
      </Link>
    </ThanksModal>
  );

  const renderRadioModal = () => {
    const inputLabelsText = [
      {
        stateKey: "age",
        label: "What is your age?",
        type: "number",
      },
    ];

    const radioButtonOptions = [
      {
        stateKey: "covidImpact",
        value: "I go to work/school normally",
      },
      {
        stateKey: "covidImpact",
        value: "I am healthy but in a stay-at-home quarantine",
      },
      {
        stateKey: "covidImpact",
        value: "I have mild symptoms but haven't been tested",
      },
      {
        stateKey: "covidImpact",
        value: "I am diagnosed with Covid-19",
      },
    ];

    const RadioGroupWithLabel = withLabel(() => (
      <RadioGroup
        onChange={(e) =>
          dispatchAction(SET_VALUE, "covidImpact", e.target.value)
        }
        options={radioButtonOptions}
        value={covidImpact}
        padding="1rem 1rem"
      />
    ));
    return (
      <RadioModal
        visible={radioModal}
        onClose={() => closeModalandReset("radioModal", ["covidImpact", "age"])}
        transparent
        closable
      >
        <h2 className="title">We are almost done!</h2>
        {inputLabelsText.map(({ label, stateKey, type }) => (
          <>
            <FormInput
              type={type}
              key={stateKey}
              inputTitle={label}
              onChange={(e) =>
                dispatchAction(SET_VALUE, stateKey, parseInt(e.target.value))
              }
            />
            <RadioGroupWithLabel label="How has COVID-19 impacted you?" />
          </>
        ))}
        <FeedbackSubmitButton
          title="Submit Feedback"
          onClick={() => {
            toggleModal("radioModal");
            submitFeedbackForm();
          }}
        />
      </RadioModal>
    );
  };

  const renderTextFeedbackModal = () => {
    return (
      <TextFeedbackModal
        visible={textFeedbackModal}
        onClose={() => {
          closeModalandReset(
            "textFeedbackModal",
            TEXT_FEEDBACK.map(({ stateKey }) => stateKey),
          );
        }}
        transparent
        closable
      >
        <h2 className="title">
          Thank you for being an early user of FightPandemics!
        </h2>
        {TEXT_FEEDBACK.map(({ label, stateKey }) => (
          <FormInput
            key={stateKey}
            inputTitle={label}
            onChange={(e) =>
              dispatchAction(SET_VALUE, stateKey, e.target.value)
            }
          />
        ))}
        <FeedbackSubmitButton
          title="Next"
          onClick={() => nextModal("textFeedbackModal", "radioModal")}
        />
      </TextFeedbackModal>
    );
  };

  const renderRatingModal = () => {
    const ratingScale = [1, 2, 3, 4, 5];
    return (
      <RatingModal
        onClose={() => closeModalandReset("ratingModal", ["rating"])}
        visible={ratingModal}
        closable
        transparent
      >
        <h3 className="title">How well does FightPandemics meet your needs?</h3>
        <div className="rectangle">
          {ratingScale.map((rating, index) => (
            <RatingWrapper
              key={index}
              onClick={() =>
                nextModal("ratingModal", "textFeedbackModal", "rating", rating)
              }
            >
              {rating}
            </RatingWrapper>
          ))}
        </div>
        <div className="scale-text">
          <div>Poorly</div>
          <div className="spacer"></div>
          <div>Very well</div>
        </div>
      </RatingModal>
    );
  };

  const AuthenticatedMenu = () => (
    <>
      <WhiteSpace size="lg" />
      <AvatarContainer>
        <NavItem history={history}>
          <TextAvatar size={80} alt="avatar">
            {displayInitials(user)}
          </TextAvatar>
        </NavItem>
        <UserName>{displayFullName(user)}</UserName>
      </AvatarContainer>
      <DividerLine />
      <NavItem history={history}>
        <Link to={`/profile/${user?.id || user?._id}`}>Profile</Link>
      </NavItem>
      <NavItem>
        Organisation
        {user?.organisations?.length > 0
          ? user?.organisations?.map((organisation) => (
              <NavItemBrief history={history} key={organisation._id}>
                <Link to={`/organisation/${organisation._id}`}>
                  {organisation.name}
                </Link>
              </NavItemBrief>
            ))
          : null}
        <NavItemBrief>
          <Link
            id={GTM.nav.prefix + GTM.nav.addOrg}
            to="/create-organisation-profile"
          >
            + Add Organisation
          </Link>
        </NavItemBrief>
      </NavItem>
      <NavItem history={history}>
        <Link
          id={GTM.nav.prefix + GTM.nav.feed}
          to={{
            pathname: "/feed",
            user,
          }}
        >
          Help Board
        </Link>
      </NavItem>
      <NavItem history={history}>
        <Link id={GTM.nav.prefix + GTM.nav.aboutUs} to="/about-us">
          About Us
        </Link>
      </NavItem>
      <Space height="10vh" limitMobileHeight />
      <FeedbackItem
        id={GTM.nav.prefix + GTM.nav.feedback}
        onClick={() => {
          dispatchAction(TOGGLE_STATE, "ratingModal");
          toggleDrawer();
        }}
        size="small"
      >
        Feedback
      </FeedbackItem>
      <NavItem history={history}>
        <BriefLink to="/auth/logout">Sign Out</BriefLink>
      </NavItem>
    </>
  );

  const UnAuthenticatedMenu = () => (
    <>
      <Space height="10rem" />
      <NavItem history={history}>
        <Link id={GTM.nav.prefix + GTM.nav.login} to="/auth/login">
          Sign In / Join Now
        </Link>
      </NavItem>
      <NavItem history={history}>
        <Link id={GTM.nav.prefix + GTM.nav.aboutUs} to="/feed">
          Help Board
        </Link>
      </NavItem>
      <NavItem history={history}>
        <Link id={GTM.nav.prefix + GTM.nav.aboutUs} to="/about-us">
          About Us
        </Link>
      </NavItem>
      <Space height="33vh" />
      <FeedbackItem
        id={GTM.nav.prefix + GTM.nav.feedback}
        onClick={() => {
          dispatchAction(TOGGLE_STATE, "ratingModal");
          toggleDrawer();
        }}
        size="small"
      >
        Feedback
      </FeedbackItem>
    </>
  );

  const DrawerMenu = () => (
    <MenuContainer>
      {drawerOpened && <CloseNav onClick={toggleDrawer} />}
      <NavList>
        {!authLoading && isAuthenticated ? (
          <AuthenticatedMenu />
        ) : (
          <UnAuthenticatedMenu />
        )}
      </NavList>
    </MenuContainer>
  );

  const renderNavigationBar = () => {
    return (
      <div>
        <StyledDrawer
          style={{
            minHeight: document.documentElement.clientHeight,
            ...drawerStyles,
          }}
          enableDragHandle
          open={drawerOpened}
          onOpenChange={toggleDrawer}
          position="right"
          sidebar={DrawerMenu()}
          sidebarStyle={sidebarStyle}
          className="app-drawer"
        >
          <Header
            authLoading={authLoading}
            onMenuClick={toggleDrawer}
            isAuthenticated={isAuthenticated}
            user={user}
            onFeedbackIconClick={() =>
              dispatchAction(TOGGLE_STATE, "ratingModal")
            }
            navSearch={navSearch}
            onSearchSubmit={handleSearchSubmit}
            onSearchClear={handleSearchClear}
          />

          {mobiletabs ? (
            <MobileTabs tabIndex={tabIndex} childComponent={props.children} />
          ) : null}
          <Main>
            <props.component {...props} searchKeywords={searchKeywords} />
            {feedbackFormState.error && (
              <ErrorAlert
                message={feedbackFormState.error}
                type="error"
                closable={true}
                fullWidthBanner={true}
              />
            )}
            {renderRatingModal()}
            {renderTextFeedbackModal()}
            {renderRadioModal()}
            {renderThanksModal()}
          </Main>
          <Footnote />
          <CookieAlert />
        </StyledDrawer>
      </div>
    );
  };

  return <>{renderNavigationBar()}</>;
};

export default NavigationLayout;
