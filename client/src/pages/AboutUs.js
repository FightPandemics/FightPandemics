import React from "react";
import styled from "styled-components";

import MissionAndVisionBanner from "assets/about-us-images/vision-and-mission.png";
import OurIdeaImage from "assets/about-us-images/our-idea.png";

// company supporter logos import
import airtableLogo from "assets/supporters-logos/airtable-logo.svg";
import algoliaLogo from "assets/supporters-logos/algolia-logo.svg"
import aut0Logo from "assets/supporters-logos/auth0-logo.svg"
import datasauraiLogo from "assets/supporters-logos/datasaurai-logo.svg"
import githubLogo from "assets/supporters-logos/github-logo.svg"
import gitkrakenLogo from "assets/supporters-logos/gitkraken-logo.svg"
import miroLogo from "assets/supporters-logos/miro-logo.svg"
import mongodbLogo from "assets/supporters-logos/mongodb-logo.svg"
import newrelicLogo from "assets/supporters-logos/newrelic-logo.svg"
import papertrailLogo from "assets/supporters-logos/papertrail-logo.svg"
import sendgridLogo from "assets/supporters-logos/sendgrid-logo.svg"
import sentryLogo from "assets/supporters-logos/sentry-logo.svg"
import slackLogo from "assets/supporters-logos/slack-logo.svg"
import socialbeeLogo from "assets/supporters-logos/socialbee-logo.svg"
import twilioLogo from "assets/supporters-logos/twilio-logo.svg"
import typeformLogo from "assets/supporters-logos/typeform-logo.svg"
import workableLogo from "assets/supporters-logos/workable-logo.svg"
import zeplinLogo from "assets/supporters-logos/zeplin-logo.svg"

const AboutUsContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 42px;
    text-align: center;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: normal;
    color: var(--color-primary-text);
  }
`;

const MissionAndVisionBannerContainer = styled.img`
  max-width: 100%; 
`;

const SupportersLogosContainer = styled.div`
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 1rem;
  }
`;

const TextContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  h2 {
    text-align: center;
  }
  text-align: left;
  justify-items: center;
`;

const OurIdeaImageContainer = styled.img`
  width: 100%; 
`;
const AboutUs = () => {
  return (

    <AboutUsContainer>
      <h1 className="text-primary display-6">About Us</h1>
      <MissionAndVisionBannerContainer src={MissionAndVisionBanner} />
      <TextContainer>
        <br />
        <h2 className="text-primary display-6">Our Story</h2>
        <p>
          FightPandemics is the brainchild of Manuel Gonzalez Alzuru, who was infected with COVID-19 in France.
          Upon returning home to Barcelona, he found he was unable to get help even though there were people who wanted to provide it.
          Telegram and WhatsApp groups were self-organizing in Manuel’s neighborhood, but without personally knowing anyone involved he
          ould not ask them for assistance. Inspired by so many coming together, Manuel launched the project with one mission in mind: to
          ensure that others could connect in time.
        </p>
       
        <br />
        <h2 className="text-primary display-6">Our Community</h2>
        <p>We are built by a team of 450+ volunteer developers, designers, scientists, health experts, and product managers from around the world</p>
        <p>Youtube video  </p>

        {/* Add buttons for Join as Ambassador and Join as a Volunteer here*/}

        <br />
        <h2 className="text-primary display-6">Our Idea</h2>
        <OurIdeaImageContainer src={OurIdeaImage} />
        <h2 className="text-primary display-6">Our Supporters</h2>
        {/* add supporter logos here */}
        
        
        <br />
        <h2 className="text-primary display-6">Follow us social media</h2>
        {/* Add social media here*/}
        <p>Or contact us at: admin@fightpandemics.com</p>
      </TextContainer>
    </AboutUsContainer>
  );
};

export default AboutUs;
