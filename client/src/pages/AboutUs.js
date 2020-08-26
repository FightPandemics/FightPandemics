import React from "react";
import { useTranslation } from "react-i18next";
import {
  AboutUsContainer,
  TextContainer,
  MobileViewBannerContainer,
  WebViewBannerContainer,
  OurIdeaImageContainer,
  MissionAndVisionBannerContainer,
  SupportersLogosContainer,
  SocialContainer,
  AboutUsLink,
} from "components/AboutUs/AboutUsContainer";

import DesktopBanner from "assets/about-us-images/vision-and-mission.png";
import MobileBanner from "assets/about-us-images/vision-and-mission-mobile.png";

import OurIdeaImage from "assets/about-us-images/our-idea.svg";

// company supporter logos import
import airtableLogo from "assets/supporters-logos/airtable-logo.svg";
import akveoLogo from "assets/supporters-logos/akveoLogo.svg";
import algoliaLogo from "assets/supporters-logos/algolia-logo.svg";
import aut0Logo from "assets/supporters-logos/auth0-logo.svg";
import awsLogo from "assets/supporters-logos/awsLogo.svg";
import calendlyLogo from "assets/supporters-logos/calendlyLogo.png";
import datasauraiLogo from "assets/supporters-logos/datasaurai-logo.svg";
import figmaLogo from "assets/supporters-logos/figmaLogo.svg";
import googleMapsLogo from "assets/supporters-logos/googleMapsLogo.svg";
import githubLogo from "assets/supporters-logos/github-logo.svg";
import gitkrakenLogo from "assets/supporters-logos/gitkraken-logo.svg";
import hackoladeLogo from "assets/supporters-logos/hackoladeLogo.svg";
import leypayLogo from "assets/supporters-logos/leypalLogo.png";
import miroLogo from "assets/supporters-logos/miro-logo.svg";
import mongodbLogo from "assets/supporters-logos/mongodb-logo.svg";
import newrelicLogo from "assets/supporters-logos/newrelic-logo.svg";
import notionLogo from "assets/supporters-logos/notionLogo.svg";
import papertrailLogo from "assets/supporters-logos/papertrail-logo.svg";
import sendgridLogo from "assets/supporters-logos/sendgrid-logo.svg";
import sentryLogo from "assets/supporters-logos/sentry-logo.svg";
import slackLogo from "assets/supporters-logos/slack-logo.svg";
import socialbeeLogo from "assets/supporters-logos/socialbee-logo.svg";
import twilioLogo from "assets/supporters-logos/twilio-logo.svg";
import typeformLogo from "assets/supporters-logos/typeform-logo.png";
import workableLogo from "assets/supporters-logos/workableLogo.png";
import zendeskLogo from "assets/supporters-logos/zendeskLogo.svg";
import zeplinLogo from "assets/supporters-logos/zeplin-logo.svg";
import datadogLogo from "assets/supporters-logos/datadog-logo.svg";
import pagerdutyLogo from "assets/supporters-logos/pagerduty.svg";

// social icons
import instagramLogo from "assets/icons/social-instagram-unfilled.svg";
import linkedInLogo from "assets/icons/social-linkedin-unfilled.svg";
import facebookLogo from "assets/icons/social-facebook-unfilled.svg";
import twitterLogo from "assets/icons/social-twitter-unfilled.svg";

const supporterLogos = [
  airtableLogo,
  akveoLogo,
  algoliaLogo,
  aut0Logo,
  awsLogo,
  calendlyLogo,
  datadogLogo,
  datasauraiLogo,
  figmaLogo,
  googleMapsLogo,
  githubLogo,
  gitkrakenLogo,
  hackoladeLogo,
  leypayLogo,
  miroLogo,
  mongodbLogo,
  newrelicLogo,
  notionLogo,
  pagerdutyLogo,
  papertrailLogo,
  sendgridLogo,
  sentryLogo,
  slackLogo,
  socialbeeLogo,
  twilioLogo,
  typeformLogo,
  workableLogo,
  zendeskLogo,
  zeplinLogo,
];

function LogoItem(props) {
  return (
    <div>
      <img src={props.value} alt="" />
    </div>
  );
}

function LogosList(props) {
  const supporterLogos = props.supporterLogos;
  const logoItems = supporterLogos.map((logo) => (
    <LogoItem key={logo.toString()} value={logo} />
  ));
  return logoItems;
}

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <AboutUsContainer>
      <MissionAndVisionBannerContainer>
        <h1 className="text-primary display-6">{t("common.aboutUs")}</h1>
        <WebViewBannerContainer
          src={DesktopBanner}
          alt={t("alt.desktopBanner")}
        />
        <MobileViewBannerContainer
          src={MobileBanner}
          alt={t("alt.mobileBanner")}
        />
      </MissionAndVisionBannerContainer>
      <TextContainer>
        <br />
        <h2 className="text-primary display-6">{t("aboutUs.ourStory")}</h2>
        <p>{t("aboutUs.story")}</p>
        <br />
        <h2 className="text-primary display-6">{t("aboutUs.ourCommunity")}</h2>
        <p>{t("aboutUs.community")}</p>
        {/* Add FightPandemics Video */}
        {/* Add buttons for Join as Ambassador and Join as a Volunteer here*/}
        <br />
        <h2 className="text-primary display-6">{t("aboutUs.ourIdea")}</h2>
        <OurIdeaImageContainer src={OurIdeaImage} alt={t("alt.ideaImage")} />
      </TextContainer>
      <br />
      <h2 className="text-primary display-6">{t("aboutUs.ourSupporters")}</h2>
      <SupportersLogosContainer>
        <LogosList supporterLogos={supporterLogos} />
      </SupportersLogosContainer>
      <h2 className="text-primary display-6">{t("followUs")}</h2>
      <SocialContainer>
        <AboutUsLink href="https://www.linkedin.com/company/fightpandemics/">
          <img src={linkedInLogo} alt={t("alt.linkedinIcon")} />
        </AboutUsLink>
        <AboutUsLink href="https://www.facebook.com/FightPandemics/">
          <img src={facebookLogo} alt={t("alt.facebookIcon")} />
        </AboutUsLink>
        <AboutUsLink href="https://www.instagram.com/fightpandemics/">
          <img src={instagramLogo} alt={t("alt.instagramIcon")} />
        </AboutUsLink>
        <AboutUsLink href="https://twitter.com/FightPandemics">
          <img src={twitterLogo} alt={t("alt.twitterIcon")} />
        </AboutUsLink>
        <p>
          {t("aboutUs.contactUs")}:{" "}
          <AboutUsLink href="mailto:contact@fightpandemics.com">
            contact@fightpandemics.com
          </AboutUsLink>
        </p>
      </SocialContainer>
    </AboutUsContainer>
  );
};

export default AboutUs;
