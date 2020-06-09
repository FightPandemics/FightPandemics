import React from "react";
import styled from "styled-components";

import MissionAndVisionBanner from "assets/about-us-images/Vision_and_Mission.png";
import OurIdeaImage from "assets/about-us-images/Our_Idea.png";

const AboutContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MissionAndVisionBannerContainer = styled.img`
  width: 100%; 
`;

const OurIdeaImageContainer = styled.img`
  width: 100%;
`;


const TextContainer = styled.div`
  max-width: 600px;
  text-align: center;
`;

const AboutUs = () => {
  return (
    <AboutContainer>
      <TextContainer>
      <h1 className="text-primary display-6">About Us</h1>
        <MissionAndVisionBannerContainer src={MissionAndVisionBanner} />
        
        <h2 className="text-primary display-6">Our Story</h2>
        <p>
        FightPandemics is the brainchild of Manuel Gonzalez Alzuru, who was infected with COVID-19 in France. 
        Upon returning home to Barcelona, he found he was unable to get help even though there were people who wanted to provide it. 
        Telegram and WhatsApp groups were self-organizing in Manuel’s neighborhood, but without personally knowing anyone involved he 
        ould not ask them for assistance. Inspired by so many coming together, Manuel launched the project with one mission in mind: to 
        ensure that others could connect in time.
        </p>
        <h2 className="text-primary display-6">Our Community</h2>
        <p>We are built by a team of 450+ volunteer developers, designers, scientists, health experts, and product managers from around the world</p>
        <p>Youtube video  </p>
  
       {/* Add buttons for Join as Ambassador and Join as a Volunteer here*/}
        
        <h2 className="text-primary display-6">Our Idea</h2>
        <OurIdeaImageContainer src={OurIdeaImage} />        
        <h2 className="text-primary display-6">Our Supporters</h2>
        {/* add supporter logos here */}
        
        <h2 className="text-primary display-6">Follow us social media</h2>
        {/* Add social media here*/}
        <p>Or contact us at: admin@fightpandemics.com</p>

      </TextContainer>
    </AboutContainer>
  );
};

export default AboutUs;
