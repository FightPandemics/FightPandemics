import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import GetInvButton from "components/Button/GetInvolvedButton";
import HelpBoardButton from "components/Button/HelpBoardButton";
import {
  AboutUsContainer,
  ImageContainer,
  MobileContentContainer,
  HeadingContainer,
  HowDoesThisWorkContainer,
  OurStoryContainer,
  ConnectContainer,
  SupporterContainer,
  SupportersLogosContainer,
  SocialContainer,
  AboutUsLink,
  Grid,
  FlexBox,
  Col,
  SocialStyle,
} from "components/AboutUs/AboutUsContainer";
import BlankImage from "assets/about-us-images/Blank.jpg";
import Group from "assets/about-us-images/group.svg";
import WorldMap from "assets/about-us-images/world-map.png";
import HelpBoard from "assets/how-does-work-images/Help-Board.gif";
import LocalGlobal from "assets/how-does-work-images/Local&Global.gif";
import RelevantContent from "assets/how-does-work-images/Relevant-content.gif";
import ConnectImage from "assets/about-us-images/weConnectPeople.png";

// company supporter logos import
import airtableLogo from "assets/supporters-logos/airtable-logo.svg";
import algoliaLogo from "assets/supporters-logos/algolia-logo.svg";
import aut0Logo from "assets/supporters-logos/auth0-logo.svg";
import calendlyLogo from "assets/supporters-logos/calendlyLogo2.png";
import gitkrakenLogo from "assets/supporters-logos/gitkraken-logo.png";
import hackoladeLogo from "assets/supporters-logos/hackoladeLogo.png";
import leypayLogo from "assets/supporters-logos/leypalLogo2.png";
import miroLogo from "assets/supporters-logos/miro-logo.svg";
import mongodbLogo from "assets/supporters-logos/mongodb-logo.png";
import notionLogo from "assets/supporters-logos/notionLogo.svg";
import sendgridLogo from "assets/supporters-logos/sendgrid-logo.svg";
import sentryLogo from "assets/supporters-logos/sentry-logo.svg";
import slackLogo from "assets/supporters-logos/slack-logo.svg";
import socialbeeLogo from "assets/supporters-logos/socialbee-logo.svg";
import twilioLogo from "assets/supporters-logos/twilio-logo.svg";
import typeformLogo from "assets/supporters-logos/typeform-logo.png";
import workableLogo from "assets/supporters-logos/workableLogo.png";
import zendeskLogo from "assets/supporters-logos/zendeskLogo.svg";
import zeplinLogo from "assets/supporters-logos/zeplin-logo.svg";
import pagerdutyLogo from "assets/supporters-logos/pagerduty.png";
import lokaliseLogo from "assets/supporters-logos/lokaliseLogos.png";
import saucelabsLogos from "assets/supporters-logos/saucelabsLogo.png";
import whitesourceLogo from "assets/supporters-logos/whitesourceLogo.png";
import lambdatestLogo from "assets/supporters-logos/lambdatestLogo.png";
import prowlyLogo from "assets/supporters-logos/prowlyLogo.png";
import seo4ajaxLogo from "assets/supporters-logos/seo4ajaxLogo.png";
import supermetricsLogo from "assets/supporters-logos/supermetricsLogo.png";
import figmaLogo from "assets/supporters-logos/figmaLogo.png";
import googleMapsLogo from "assets/supporters-logos/googleMapsLogo.png";
import awsLogo from "assets/supporters-logos/awsLogo.png";

// social icons
import instagramLogo from "assets/icons/social-instagram.png";
import linkedInLogo from "assets/icons/social-linkedin.png";
import facebookLogo from "assets/icons/social-facebook.png";
import twitterLogo from "assets/icons/social-twitter.png";
import { size } from "lodash";

const DemoBox = (props) => (
  <p className={`height-${props.value}`}>{props.children}</p>
);

let LogosMap = new Map([
  [algoliaLogo, "https://www.algolia.com/"],
  [hackoladeLogo, "https://hackolade.com/"],
  [lokaliseLogo, "https://lokalise.com"],
  [miroLogo, "http://www.miro.com"],
  [saucelabsLogos, "http://saucelabs.com"],
  [sentryLogo, "https://sentry.io/welcome"],
  [socialbeeLogo, "https://socialbee.io/"],
  [whitesourceLogo, "https://www.whitesourcesoftware.com"],
  [airtableLogo, "https://airtable.com"],
  [awsLogo, "http://aws.amazon.com"],
  [aut0Logo, "http://auth0.com"],
  [figmaLogo, "https://www.figma.com"],
  [gitkrakenLogo, "https://www.gitkraken.com"],
  [googleMapsLogo, "https://maps.google.com"],
  [lambdatestLogo, "https://www.lambdatest.com"],
  [mongodbLogo, "https://www.mongodb.com"],
  [notionLogo, "https://www.notion.so"],
  [pagerdutyLogo, "https://www.pagerduty.com"],
  [prowlyLogo, "https://prowly.com/en"],
  [sendgridLogo, "http://sendgrid.com"],
  [seo4ajaxLogo, "https://www.seo4ajax.com"],
  [slackLogo, "https://slack.com"],
  [supermetricsLogo, "http://supermetrics.com"],
  [twilioLogo, "http://www.twilio.com"],
  [typeformLogo, "http://www.typeform.com"],
  [zeplinLogo, "http://zeplin.io"],
  [zendeskLogo, "http://www.zendesk.com"],
  [workableLogo, "https://www.workable.com"],
  [leypayLogo, "https://www.leypal.com"],
  [calendlyLogo, "https://calendly.com"],
]);

const supporterLogosLifetime = [
  algoliaLogo,
  hackoladeLogo,
  lokaliseLogo,
  miroLogo,
  saucelabsLogos,
  sentryLogo,
  socialbeeLogo,
  whitesourceLogo,
];
const supporterLogosCurrent = [
  airtableLogo,
  awsLogo,
  aut0Logo,
  figmaLogo,
  gitkrakenLogo,
  googleMapsLogo,
  lambdatestLogo,
  mongodbLogo,
  notionLogo,
  pagerdutyLogo,
  prowlyLogo,
  sendgridLogo,
  seo4ajaxLogo,
  slackLogo,
  supermetricsLogo,
  twilioLogo,
  typeformLogo,
  zeplinLogo,
  zendeskLogo,
  workableLogo,
];
const supporterLogosPast = [leypayLogo, calendlyLogo];

function LogoItem(props) {
  return (
    <div>
      <a href={LogosMap.get(props.value)} target="_blank">
        <img src={props.value} alt="" />
      </a>
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

const i18nSCOPE = "aboutUs";

const AboutUs = () => {
  const { t: i18n } = useTranslation();
  const t = React.useCallback((id, absolute = false) =>
    i18n(absolute ? id : `${i18nSCOPE}.${id}`),
  );

  return (
    <AboutUsContainer>
      <HeadingContainer>
        <h2>{t("heading")}</h2>
        <p>{t("subHeading")}</p>
      </HeadingContainer>

      <ImageContainer
        img={Group}
        width={"100%"}
        height={"50rem"}
        mobileHeight={"40rem"}
        flexDirection={"row"}
      >
        <h2>{t("forWhoHeading")}</h2>
      </ImageContainer>

      <MobileContentContainer>
        <h2>{t("forWhoHeading")}</h2>
        <p>{t("forWho")}</p>
      </MobileContentContainer>

      <ImageContainer
        img={WorldMap}
        width={"831.7px"}
        height={"42.5rem"}
        background-color={"#fbfbfd"}
        background-blend-mode={"multiply"}
      >
        <h1>{t("ourCommunity")}</h1>
        <p>{t("community")}</p>
        <GetInvButton />
      </ImageContainer>

      <ConnectContainer>
        <FlexBox justify="center">
          <img src={ConnectImage} />
        </FlexBox>
        <FlexBox direction="column" justify="center" align="center">
          <h1>{t("connectPeople")}</h1>
          <p>{t("connect")}</p>
        </FlexBox>
      </ConnectContainer>

      <HowDoesThisWorkContainer>
        <h1>{t("howWork")}</h1>
        <>
          <FlexBox justify="center" wrap={"wrap"}>
            <FlexBox
              direction="column"
              align="center"
              style={{ marginTop: "3rem" }}
            >
              <h3>{t("helpBoard")}</h3>
              <img alt={t("helpBoard")} src={HelpBoard} />
              <p>{t("helpBoardDetail")}</p>
            </FlexBox>
            <FlexBox
              direction="column"
              align="center"
              style={{ marginTop: "3rem" }}
            >
              <h3>{t("localGlobal")}</h3>
              <img alt={t("localGlobal")} src={LocalGlobal} />
              <p>{t("localGlobalDetail")}</p>
            </FlexBox>
            <FlexBox
              direction="column"
              align="center"
              style={{ marginTop: "3rem" }}
            >
              <h3>{t("relevantContent")}</h3>
              <img
                style={{ objectPosition: "30px" }}
                alt={t("relevantContent")}
                src={RelevantContent}
              />
              <p>{t("relevantContentDetail")}</p>
            </FlexBox>
          </FlexBox>
          <HelpBoardButton type="primary">
            <Link to="/feed">{t("goToHelpBoard")}</Link>
          </HelpBoardButton>
        </>
      </HowDoesThisWorkContainer>

      <OurStoryContainer>
        <h1>{t("ourStory")}</h1>
        <h3>{t("FightPandemics")}</h3>
        <p>{t("story")}</p>
        <br />
        <p dangerouslySetInnerHTML={{ __html: t("storyInspired") }}></p>
        {/* TODO Add FightPandemics Video */}
        {/* <img src={BlankImage} alt="loading..." /> */}
      </OurStoryContainer>

      <SupporterContainer>
        <h1>{t("supporters")}</h1>
        <p>
          {t("thanksSupporters")}
          <br />
          <br />
          {t("becomeSupporter")}
          <AboutUsLink href="mailto:partnerships@fightpandemics.com">
            {" "}
            {t("becomePartnerEmail")}
          </AboutUsLink>
          <br />
          <br />
          {t("companyLogoInfo")}
        </p>
        <h3>{t("lifetimeSupporters")}</h3>
        <SupportersLogosContainer wide={"30rem"}>
          <LogosList supporterLogos={supporterLogosLifetime} />
        </SupportersLogosContainer>
        <br />
        <h3>{t("currentSupporters")}</h3>
        <SupportersLogosContainer wide={"25rem"}>
          <LogosList supporterLogos={supporterLogosCurrent} />
        </SupportersLogosContainer>
        <br />
        <h4>{t("pastSupporters")}</h4>
        <SupportersLogosContainer wide={"18rem"}>
          <LogosList supporterLogos={supporterLogosPast} />
        </SupportersLogosContainer>
      </SupporterContainer>

      <SocialStyle>
        <FlexBox direction="column">
          <h3>{t("followUs")}</h3>
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
          </SocialContainer>
        </FlexBox>
        <FlexBox direction="column">
          <p>
            <span>{t("hashtag")}</span>
          </p>
          <p>
            {t("contactUs")}
            <AboutUsLink href="mailto:admin@fightpandemics.com">
              {t("contactEmail")}
            </AboutUsLink>
          </p>
        </FlexBox>
      </SocialStyle>
    </AboutUsContainer>
  );
};

export default AboutUs;
