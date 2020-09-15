import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "components/Button/LinkButton";
import GetInvButton from "components/Button/GetInvolvedButton";
import HelpBoardButton from "components/Button/HelpBoardButton";
import GridCard from "components/Card/GridCard";
import ConnectCard from "components/Card/ConnectPeopleCard";
import {
  AboutUsContainer,
  TextContainer,
  MobileViewBannerContainer,
  WebViewBannerContainer,
  ImageContainer,
  OurCommunity,
  HeadingContainer,
  OurStoryContainer,
  MissionAndVisionBannerContainer,
  SupportersLogosContainer,
  SocialContainer,
  AboutUsLink,
  Grid, Row, Col, SocialStyle
} from "components/AboutUs/AboutUsContainer";
import BlankImage from "assets/about-us-images/Blank.jpg"
//import DesktopBanner from "assets/about-us-images/vision-and-mission.png";
//import MobileBanner from "assets/about-us-images/vision-and-mission-mobile.png";

import Group from "assets/about-us-images/group.svg";
import WorldMap from "assets/about-us-images/world-map.png";

//import OurIdeaImage from "assets/about-us-images/our-idea.svg";

// company supporter logos import
import airtableLogo from "assets/supporters-logos/airtable-logo.svg";
//import akveoLogo from "assets/supporters-logos/akveoLogo.svg";
import algoliaLogo from "assets/supporters-logos/algolia-logo.svg";
import aut0Logo from "assets/supporters-logos/auth0-logo.svg";
//import awsLogo from "assets/supporters-logos/awsLogo.svg";
import calendlyLogo from "assets/supporters-logos/calendlyLogo2.png";
//import datasauraiLogo from "assets/supporters-logos/datasaurai-logo.svg";
//import figmaLogo from "assets/supporters-logos/figmaLogo.svg";
//import googleMapsLogo from "assets/supporters-logos/googleMapsLogo.svg";
//import githubLogo from "assets/supporters-logos/github-logo.svg";
import gitkrakenLogo from "assets/supporters-logos/gitkraken-logo.png";
import hackoladeLogo from "assets/supporters-logos/hackoladeLogo.png";
import leypayLogo from "assets/supporters-logos/leypalLogo2.png";
import miroLogo from "assets/supporters-logos/miro-logo.svg";
import mongodbLogo from "assets/supporters-logos/mongodb-logo.png";
//import newrelicLogo from "assets/supporters-logos/newrelic-logo.svg";
import notionLogo from "assets/supporters-logos/notionLogo.svg";
//import papertrailLogo from "assets/supporters-logos/papertrail-logo.svg";
import sendgridLogo from "assets/supporters-logos/sendgrid-logo.svg";
import sentryLogo from "assets/supporters-logos/sentry-logo.svg";
import slackLogo from "assets/supporters-logos/slack-logo.svg";
import socialbeeLogo from "assets/supporters-logos/socialbee-logo.svg";
import twilioLogo from "assets/supporters-logos/twilio-logo.svg";
import typeformLogo from "assets/supporters-logos/typeform-logo.png";
import workableLogo from "assets/supporters-logos/workableLogo.png";
import zendeskLogo from "assets/supporters-logos/zendeskLogo.svg";
import zeplinLogo from "assets/supporters-logos/zeplin-logo.svg";
//import datadogLogo from "assets/supporters-logos/datadog-logo.svg";
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

let LogosMap = new Map([
  [algoliaLogo,"https://www.algolia.com/" ],
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
  [prowlyLogo,"https://prowly.com/en"],
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
]
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
]
const supporterLogosPast = [
  leypayLogo,
  calendlyLogo,
]

function LogoItem(props) {
  console.log(LogosMap.get(props.value));
  return (
    <div>
      <a  href={LogosMap.get(props.value)} target="_blank">
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

const AboutUs = () => {
  return (
    <AboutUsContainer>
      <MissionAndVisionBannerContainer>
        <div>
       <HeadingContainer>
         <h1>We want to create a world where humans are more resilient to emergencies</h1>
         <p>By helping communities respond more quickly and effectively to crises.</p>
        </HeadingContainer>
        <br/>
        </div>
        <ImageContainer img={Group} width={"100%"}height={"501.8px"}>
        <div className="heading">Who is this for?</div> 
        </ImageContainer>
      </MissionAndVisionBannerContainer>
        <div>
        <ImageContainer img={WorldMap} width={"831.7px"} height={"425px"}>
      <h1>Our Community</h1>
        <p>
          We are built by a team of 1100+ volunteer developers, designers,
          scientists, health experts, and product managers from around the world.
        </p>
        <GetInvButton />
        </ImageContainer>
        </div>
        <div><ConnectCard/></div>
        <div>
        <h1 className="text-primary display-6">How does this work?</h1>
        <GridCard/>
        <HelpBoardButton type="primary">
        <Link to="/feed" target="_blank">
          Go to Help Board
          </Link>
        </HelpBoardButton>
        </div>
        <div>
       <OurStoryContainer>
        <h1 >Our Story</h1>
        <h2>FightPandemics</h2>
        <p>
          is the brainchild of Manuel Gonzalez Alzuru, who was
          infected with COVID-19 in France. Upon returning home to Barcelona, he
          found he was unable to get help even though there were people who
          wanted to provide it.<br/><br />
          Inspired by so many coming together, Manuel launched the project with one
          mission in mind: <span className="text-style-2">to ensure that others could connect in time.
          </span>
         </p>
        <img src={BlankImage} alt="loading..." 
        style={{ width: "1031px", height:"354px","margin-bottom": "260px","margin-top": "80px"}}
        /> 
         {/* Add FightPandemics Video */}
        </OurStoryContainer>
        </div>
     <div>
        <OurStoryContainer style={{backgroundColor: "#f6f7fb", "padding-bottom": "60px","padding-top": "60px" }}> 
      <h1>Supporters</h1>
      <p> Thank You to our supporters, without them we would not be able to help communities prepare and respond to pandemics.
        <br/><br/>
          To learn more about how your business can become a supporter, please contact our 
        partnerships team at {" "}
       <AboutUsLink href ="partnerships@fightpandamics.com">  partnerships@fightpandamics.com</AboutUsLink>
       <br/><br/>
      Click on the company logo below to go to the supporter's website.</p>
      <h3>Lifetime supporters</h3>
      <SupportersLogosContainer wide = {"30rem"}>
        <LogosList supporterLogos={supporterLogosLifetime} />
      </SupportersLogosContainer><br/>
      <h3>Current supporters</h3>
      <SupportersLogosContainer wide = {"25rem"}>    
        <LogosList supporterLogos={supporterLogosCurrent} />
      </SupportersLogosContainer><br/>
      <h4>Past supporters</h4>
      <SupportersLogosContainer wide = {"18rem"}>
        <LogosList supporterLogos={supporterLogosPast} />
      </SupportersLogosContainer>
      </OurStoryContainer>
      </div>
      <div>
      {/* <p >Follow us on social media</p> */}
     <SocialStyle>
       <Grid>
         <Row>
           <Col size = {8}><h3>Follow us on social media</h3></Col>
           <Col size = {8}><p><span className="text-style-2">#ForCommunitiesByCommunities</span></p></Col>
         </Row>
         <Row>
           <Col size = {8}>
      <SocialContainer>     
     <AboutUsLink href="https://www.linkedin.com/company/fightpandemics/" target="_blank">
       <img src={linkedInLogo} alt="FightPandemics LinkedIn Icon" />
     </AboutUsLink>
     <AboutUsLink href="https://www.facebook.com/FightPandemics/" target="_blank">
       <img src={facebookLogo} alt="FightPandemics Facebook Icon" />
     </AboutUsLink>
     <AboutUsLink href="https://www.instagram.com/fightpandemics/" target="_blank">
       <img src={instagramLogo} alt="FightPandemics Instagram Icon" />
     </AboutUsLink>
     <AboutUsLink href="https://twitter.com/FightPandemics">
       <img src={twitterLogo} alt="FightPandemics Twitter Icon" target="_blank"/>
     </AboutUsLink>           
        </SocialContainer>
        </Col>
        <Col size = {8}><p>
          Contact us at:{" "}<AboutUsLink href="admin@fightpandemics.com">admin@fightpandemics.com</AboutUsLink>
          </p></Col>
         </Row>
       </Grid>
       </SocialStyle>
      </div>
    </AboutUsContainer>
  );
};

export default AboutUs;
