import React from "react";
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
import seo4AjaxLogo from "assets/supporters-logos/seo4ajax-logo.svg";

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
  seo4AjaxLogo,
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
  return (
    <AboutUsContainer>
      <MissionAndVisionBannerContainer>
        <h1 className="text-primary display-6">About Us</h1>
        <WebViewBannerContainer
          src={DesktopBanner}
          alt="Desktop Mission and Vision Banner"
        />
        <MobileViewBannerContainer
          src={MobileBanner}
          alt="Mobile Mission and Vision Banner"
        />
      </MissionAndVisionBannerContainer>
      <TextContainer>
        <br />
        <h2 className="text-primary display-6">Our Story</h2>
        <p>
          FightPandemics is the brainchild of Manuel Gonzalez Alzuru, who was
          infected with COVID-19 in France. Upon returning home to Barcelona, he
          found he was unable to get help even though there were people who
          wanted to provide it. Telegram and WhatsApp groups were
          self-organizing in Manuel’s neighborhood, but without personally
          knowing anyone involved he could not ask them for assistance. Inspired
          by so many coming together, Manuel launched the project with one
          mission in mind: to ensure that others could connect in time.
        </p>
        <br />
        <h2 className="text-primary display-6">Our Community</h2>
        <p>
          We are built by a team of 450+ volunteer developers, designers,
          scientists, health experts, and product managers from around the world
        </p>
        {/* Add FightPandemics Video */}
        {/* Add buttons for Join as Ambassador and Join as a Volunteer here*/}
        <br />
        <h2 className="text-primary display-6">Our Idea</h2>
        <OurIdeaImageContainer src={OurIdeaImage} alt="Our Idea Picture" />
      </TextContainer>
      <br />
      <h2 className="text-primary display-6">Our Supporters</h2>
      <SupportersLogosContainer>
        <LogosList supporterLogos={supporterLogos} />
      </SupportersLogosContainer>
      <h2 className="text-primary display-6">Follow us on social media</h2>
      <SocialContainer>
        <AboutUsLink href="https://www.linkedin.com/company/fightpandemics/">
          <img src={linkedInLogo} alt="FightPandemics LinkedIn Icon" />
        </AboutUsLink>
        <AboutUsLink href="https://www.facebook.com/FightPandemics/">
          <img src={facebookLogo} alt="FightPandemics Facebook Icon" />
        </AboutUsLink>
        <AboutUsLink href="https://www.instagram.com/fightpandemics/">
          <img src={instagramLogo} alt="FightPandemics Instagram Icon" />
        </AboutUsLink>
        <AboutUsLink href="https://twitter.com/FightPandemics">
          <img src={twitterLogo} alt="FightPandemics Twitter Icon" />
        </AboutUsLink>
        <p>
          Or contact us at:{" "}
          <AboutUsLink href="mailto:contact@fightpandemics.com">
            contact@fightpandemics.com
          </AboutUsLink>
        </p>
      </SocialContainer>
    </AboutUsContainer>
  );
};

export default AboutUs;
