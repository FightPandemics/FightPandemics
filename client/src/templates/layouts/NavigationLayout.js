import { Drawer, List, Button, WhiteSpace } from "antd-mobile";
import { Typography, Menu, Dropdown, Badge } from "antd";
import axios from "axios";
import React, { useState, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { getInitialsFromFullName } from "utils/userInfo";
import i18n from "../../i18n";
import { localization, languages } from "locales/languages";
import globe from "assets/icons/globe-white.svg";
import SvgIcon from "components/Icon/SvgIcon";
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
import ProfilePic from "../../components/Picture/ProfilePic";

const { royalBlue, tropicalBlue, white } = theme.colors;

const drawerStyles = {
  position: "relative",
  overflow: "hidden",
  WebkitOverflowScrolling: "touch",
};

const sidebarStyle = {
  background: `${royalBlue}`,
};

const GlobeIcon = styled(SvgIcon)`
  vertical-align: baseline;
`;

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

const LanguageSwitchItem = styled(List.Item)`
  background: unset;
  padding-left: 2.1rem;
  font-family: "Poppins", sans-serif;
  font-size: ${(props) => (props.size === "small" ? "2rem" : "2.4rem")};
  & .am-list-line {
    border-bottom: 0;
    &:after {
      height: 0 !important;
    }
    pointer-events: none;
    & .am-list-content {
      color: ${white};
      pointer: none;
      line-height: 6rem;
      padding: 0;
      margin: ${(props) =>
        typeof props.margin != undefined ? props.margin : "inherit"};
    }
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
  text-align: center;
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

const RatingWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const StyledDrawer = styled(Drawer)`
  .am-drawer-draghandle {
    visibility: hidden;
  }
`;

const NavigationLayout = (props) => {
  const { t } = useTranslation();
  const {
    authLoading,
    hideFooter,
    mobiletabs,
    navSearch,
    tabIndex,
    isAuthenticated,
    user,
    ws,
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

  const TEXT_FEEDBACK = [
    {
      stateKey: "mostValuableFeature",
      label: t("feedback.mostValuable"),
    },
    {
      stateKey: "whatWouldChange",
      label: t("feedback.oneChange"),
    },
    { stateKey: "generalFeedback", label: t("feedback.otherFeedback") },
  ];

  const displayAvatar = (user) => {
    if (user?.photo || (user?.firstName && user?.lastName)) {
      return (
        <ProfilePic
          user={user}
          initials={getInitialsFromFullName(
            `${user.firstName} ${user.lastName}`,
          )}
        />
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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    window.localStorage.setItem("locale", lng);
  };

  const languageMenu = (
    <Menu>
      {Object.entries(languages).map(([key, label]) => (
        <Menu.Item key={key}>
          <div
            style={
              i18n.language === key
                ? { fontWeight: "bold" }
                : { fontWeight: "normal" }
            }
            onClick={() => changeLanguage(key)}
            id={GTM.nav.prefix + GTM.nav.language + GTM.language[key]}
          >
            {label.text}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

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
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);
      feedbackFormDispatch({
        type: FEEDBACK_FORM_SUBMIT_ERROR,
        error: `${t(
          "error.failedSubmittingFeedback",
        )} ${translatedErrorMessage}`,
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
      <h2 className="title">{t("feedback.thankYou")}</h2>
      <p>{t("feedback.thankYouMessage")}</p>
      <Link to={isAuthenticated ? "/feed" : "/"}>
        <Logo src={logo} alt={t("alt.logo")} />
      </Link>
    </ThanksModal>
  );

  const renderRadioModal = () => {
    const inputLabelsText = [
      {
        stateKey: "age",
        label: t("feedback.radio.age"),
        type: "number",
      },
    ];

    const radioButtonOptions = [
      {
        stateKey: "covidImpact",
        value: t("feedback.radio.unaffected"),
      },
      {
        stateKey: "covidImpact",
        value: t("feedback.radio.quarantine"),
      },
      {
        stateKey: "covidImpact",
        value: t("feedback.radio.symptomaticUntested"),
      },
      {
        stateKey: "covidImpact",
        value: t("feedback.radio.diagnosed"),
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
        <h2 className="title">{t("feedback.almostFinished")}</h2>
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
            <RadioGroupWithLabel label={t("feedback.howImpacted")} />
          </>
        ))}
        <FeedbackSubmitButton
          title={t("onboarding.common.submit")}
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
        <h2 className="title">{t("feedback.thankYouEarly")}</h2>
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
          title={t("onboarding.common.next")}
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
        <h3 className="title">{t("feedback.howMeetNeeds")}</h3>
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
          <div>{t("feedback.poorly")}</div>
          <div className="spacer"></div>
          <div>{t("feedback.well")}</div>
        </div>
      </RatingModal>
    );
  };

  const AuthenticatedMenu = () => (
    <>
      <WhiteSpace size="lg" />
      <AvatarContainer>
        {displayAvatar(user)}
        <UserName>{displayFullName(user)}</UserName>
      </AvatarContainer>
      <DividerLine />
      <NavItem history={history}>
        <Link to={`/profile/${user?.id || user?._id}`}>
          {t("common.profile")}
        </Link>
      </NavItem>
      <NavItem>
        {t("post.organisation")}
        {user?.organisations?.length > 0
          ? user?.organisations?.map((organisation) => (
              <NavItemBrief
                history={history}
                key={organisation._id}
                onClick={toggleDrawer}
              >
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
            + {t("common.addOrg")}
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
          {t("feed.title")}
        </Link>
      </NavItem>
      <NavItem history={history}>
        <Link id={GTM.nav.prefix + GTM.nav.aboutUs} to="/about-us">
          {t("common.aboutUs")}
        </Link>
      </NavItem>
      <Space height="10vh" limitMobileHeight />
      <Dropdown overlay={languageMenu} trigger={["click"]}>
        <LanguageSwitchItem id={GTM.nav.prefix + GTM.nav.language}>
          <GlobeIcon src={globe} className="globe-icon-svg"></GlobeIcon>
          {" " + languages[localization[i18n.language]].value}
        </LanguageSwitchItem>
      </Dropdown>
      <FeedbackItem
        id={GTM.nav.prefix + GTM.nav.feedback}
        onClick={() => {
          dispatchAction(TOGGLE_STATE, "ratingModal");
          toggleDrawer();
        }}
        size="small"
      >
        {t("common.feedback")}
      </FeedbackItem>
      <NavItem history={history}>
        <BriefLink to="/auth/logout">{t("common.logout")}</BriefLink>
      </NavItem>
    </>
  );

  const UnAuthenticatedMenu = () => (
    <>
      <Space height="10rem" />
      <NavItem history={history}>
        <Link id={GTM.nav.prefix + GTM.nav.login} to="/auth/login">
          {t("auth.signIn")} / {t("auth.joinNow")}
        </Link>
      </NavItem>
      <NavItem history={history}>
        <Link id={GTM.nav.prefix + GTM.nav.feed} to="/feed">
          {t("feed.title")}
        </Link>
      </NavItem>
      <NavItem history={history}>
        <Link id={GTM.nav.prefix + GTM.nav.aboutUs} to="/about-us">
          {t("common.aboutUs")}
        </Link>
      </NavItem>
      <Space height="10vh" />
      <Dropdown overlay={languageMenu} trigger={["click"]}>
        <LanguageSwitchItem id={GTM.nav.prefix + GTM.nav.language}>
          <GlobeIcon src={globe} className="globe-icon-svg"></GlobeIcon>
          {" " + languages[localization[i18n.language]].value}
        </LanguageSwitchItem>
      </Dropdown>
      <FeedbackItem
        id={GTM.nav.prefix + GTM.nav.feedback}
        onClick={() => {
          dispatchAction(TOGGLE_STATE, "ratingModal");
          toggleDrawer();
        }}
        size="small"
      >
        {t("common.feedback")}
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
            ws={ws}
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
          <Main isProfile={props?.isProfile}>
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
          {!hideFooter && <Footnote />}
          <CookieAlert />
        </StyledDrawer>
      </div>
    );
  };

  return <>{renderNavigationBar()}</>;
};

export default NavigationLayout;
