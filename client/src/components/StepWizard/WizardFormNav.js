import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import backArrow from "assets/icons/back-arrow.svg";
import { FEED } from "../../templates/RouteWithSubRoutes";
import {
  StyledWizardNav,
  BackButton,
  BackText,
} from "components/StepWizard/WizardNav";
import { useHistory } from "react-router-dom";
import StepWizard from "react-step-wizard";
import SvgIcon from "components/Icon/SvgIcon";
import { mq } from "constants/theme";
import GTM from "constants/gtm-tags";
const desktopBreakpoint = mq.tablet.narrow.maxWidth;

export const StyledButtonWizard = styled(StepWizard)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10rem;
  margin: 0 auto 1rem;
  width: 25rem;
  max-width: 100%;
  & + div {
    display: flex;
    flex-flow: row wrap;
    max-height: calc(100% - 8rem); /* align-items: stretch; */

    & > div {
      min-height: 100%;
    }
  }

  @media screen and (min-width: ${desktopBreakpoint}) {
    width: 50rem;
  }

  @media only screen and (max-width: ${mq.phone.narrow.maxWidth}) {
    padding-left: 7rem;
  }
`;

const WizardFormNav = ({ gtmPrefix = "" }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const fullPath = (from, pathname) => from.slice(from.indexOf(pathname) - 1);
  const [isBrowserBackClicked, setBrowserBackClicked] = useState(false);

  useEffect(() => {
    const { state, pathname } = history.location;
    history.push(pathname, {
      ...state,
      keepScroll: true,
    });
    window.addEventListener("popstate", onBrowserBack);
    return () => {
      window.removeEventListener("popstate", onBrowserBack);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onBrowserBack = (e) => {
    e.preventDefault();
    const { state } = history.location;
    if (!isBrowserBackClicked) {
      setBrowserBackClicked(true);
      if (typeof state.from !== "object") {
        if (state.from.indexOf("feed") > -1) {
          history.push(fullPath(state.from, "feed"), {
            ...state,
            keepScroll: true,
          });
        } else {
          history.goBack();
        }
      } else {
        history.push(FEED);
      }
    } else {
      setBrowserBackClicked(false);
    }
  };

  const handleClick = () => {
    if (history?.location?.state?.from) {
      const { state } = history.location;
      if (typeof state.from !== "object") {
        if (state.from.indexOf("feed") > -1) {
          history.push(fullPath(state.from, "feed"), {
            ...state,
            keepScroll: true,
          });
        } else {
          history.goBack();
        }
      } else {
        history.push(FEED);
      }
    } else {
      history.push(FEED);
    }
  };

  return (
    <StyledWizardNav>
      <BackButton onClick={handleClick} id={gtmPrefix + GTM.wizardNav.back}>
        <SvgIcon src={backArrow} title="Navigate to previous page or feed" />
        <BackText>{t("onboarding.common.previous")}</BackText>
      </BackButton>
    </StyledWizardNav>
  );
};

export default WizardFormNav;
