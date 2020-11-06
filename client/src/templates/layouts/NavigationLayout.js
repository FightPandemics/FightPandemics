import React, { useState, useReducer } from "react";
import { Drawer } from "antd-mobile";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
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
import DrawerMenu from "components/DrawerMenu";

const { royalBlue } = theme.colors;

const drawerStyles = {
  position: "relative",
  overflow: "hidden",
  WebkitOverflowScrolling: "touch",
};

const sidebarStyle = {
  background: `${royalBlue}`,
};

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
    mobiletabs,
    navSearch,
    tabIndex,
    isAuthenticated,
    user,
    organisationId,
  } = props;
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
          <React.Fragment key={stateKey}>
            <FormInput
              type={type}
              inputTitle={label}
              onChange={(e) =>
                dispatchAction(SET_VALUE, stateKey, parseInt(e.target.value))
              }
            />
            <RadioGroupWithLabel label={t("feedback.howImpacted")} />
          </React.Fragment>
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

  const drawerMenu = drawerOpened && (
    <DrawerMenu
      user={user}
      show={drawerOpened}
      toggleDrawer={toggleDrawer}
      authLoading={authLoading}
      isAuthenticated={isAuthenticated}
      dispatchAction={dispatchAction}
      organisationId={organisationId}
    />
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
          sidebar={drawerMenu}
          sidebarStyle={sidebarStyle}
          className="app-drawer"
        >
          <Header
            authLoading={authLoading}
            onMenuClick={toggleDrawer}
            isAuthenticated={isAuthenticated}
            user={user}
            organisationId={organisationId}
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
