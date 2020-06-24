import { Drawer, List, Button, WhiteSpace } from "antd-mobile";
import { Alert, Typography } from "antd";
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

const { royalBlue, tropicalBlue, white, orangeRed } = theme.colors;

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
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  color: ${white};
`;

const Space = styled.div`
  height: ${(props) => props.height ?? "1rem"};
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
  top: 4px;
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
    stroke-width: 2px;
    stroke: ${white};
  }
`;

const ErrorAlert = styled(Alert)`
  background-color: ${orangeRed};
  .ant-alert-message {
    color: ${white};
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
  font-size: 32.9px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
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

const NavigationLayout = (props) => {
  const { authLoading, mobiletabs, tabIndex, isAuthenticated, user } = props;
  const history = useHistory();
  const [drawerOpened, setDrawerOpened] = useState(false);

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

  const closeRatingModal = (ratingValue) => {
    if (drawerOpened) {
      toggleDrawer();
    }
    dispatchAction(SET_VALUE, "rating", ratingValue);
    toggleModal("ratingModal");
    toggleModal("textFeedbackModal");
  };

  const closeTextFeedbackModal = () => {
    toggleModal("textFeedbackModal");
    toggleModal("radioModal");
  };

  const closeRadioModal = () => {
    submitFeedbackForm();
    toggleModal("radioModal");
    if (!feedbackFormState.error) {
      toggleModal("thanksModal");
    }
  };

  const submitFeedbackForm = async () => {
    feedbackFormDispatch({ type: FEEDBACK_FORM_SUBMIT });
    try {
      await axios.post("/api/feedback", {
        rating,
        age,
        userId: 5,
        covidImpact,
        generalFeedback,
        mostValuableFeature,
        whatWouldChange,
      });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      feedbackFormDispatch({
        type: FEEDBACK_FORM_SUBMIT_ERROR,
        error: `Could not submit feedback, reason: ${message}`,
      });
    }
  };

  const renderThanksModal = () => {
    return (
      <ThanksModal
        onClose={() => toggleModal("thanksModal")}
        visible={thanksModal}
        transparent
      >
        <h2 className="title">Thank you!</h2>
        <p>
          Your input means a lot and helps us help you and others during and
          after the COVID-19 pandemic.
        </p>
        <Logo src={logo} alt="FightPandemics logo" />
      </ThanksModal>
    );
  };

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
        maskClosable={true}
        closable={true}
        visible={radioModal}
        onClose={() => closeRadioModal()}
        transparent
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
          onClick={closeRadioModal}
        />
      </RadioModal>
    );
  };

  const renderTextFeedbackModal = () => {
    return (
      <TextFeedbackModal
        maskClosable={true}
        closable={true}
        visible={textFeedbackModal}
        onClose={closeTextFeedbackModal}
        transparent
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
        <FeedbackSubmitButton title="Next" onClick={closeTextFeedbackModal} />
      </TextFeedbackModal>
    );
  };

  const renderRatingModal = () => {
    const ratingScale = [1, 2, 3, 4, 5];
    return (
      <RatingModal
        maskClosable={true}
        closable={false}
        visible={ratingModal}
        transparent
      >
        <h3 className="title">How well does FightPandemics meet your needs?</h3>
        <div className="rectangle">
          {ratingScale.map((rating, index) => (
            <div key={index} onClick={() => closeRatingModal(rating)}>
              {rating}
            </div>
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
        <Link to={`/profile/${user?.id}`}>Profile</Link>
      </NavItem>
      <NavItem>
        Organization
        {user?.organizations?.length > 0
          ? user?.organizations?.map((organization) => (
              <NavItemBrief history={history} key={organization._id}>
                <Link to={`/organization/${organization._id}`}>
                  {organization.name}
                </Link>
              </NavItemBrief>
            ))
          : null}
        <NavItemBrief>
          <Link to="/create-organization-profile">+ Add Organization</Link>
        </NavItemBrief>
      </NavItem>
      <NavItem history={history}>
        <Link
          to={{
            pathname: "/feed",
            user,
          }}
        >
          Feed
        </Link>
      </NavItem>
      <NavItem history={history}>
        <Link to="/about-us">About Us</Link>
      </NavItem>
      <Space height="12rem" />
      <NavItem history={history}>
        <BriefLink to="/auth/logout">Logout</BriefLink>
      </NavItem>
    </>
  );

  const UnAuthenticatedMenu = () => (
    <>
      <NavItem history={history}>
        <Link to="/auth/login">Login / Register</Link>
      </NavItem>
      <NavItem history={history}>
        <Link to="/about-us">About Us</Link>
      </NavItem>
      <NavItem
        size={"small"}
        margin={"8rem 0 0"}
        onClick={() => dispatchAction(TOGGLE_STATE, "ratingModal")}
      >
        Feedback
      </NavItem>
      {drawerOpened && <CloseNav onClick={toggleDrawer} />}
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
        <Drawer
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
          />
          {mobiletabs ? (
            <MobileTabs tabIndex={tabIndex} childComponent={props.children} />
          ) : null}
          <Main>
            <props.component {...props} />
            {renderRatingModal()}
            {renderTextFeedbackModal()}
            {renderRadioModal()}
            {renderThanksModal()}
            {feedbackFormState.error && (
              <ErrorAlert
                message={feedbackFormState.error}
                type="error"
                closable={true}
              />
            )}
          </Main>
          <Footnote />
          <CookieAlert />
        </Drawer>
      </div>
    );
  };

  return <>{renderNavigationBar()}</>;
};

export default NavigationLayout;
