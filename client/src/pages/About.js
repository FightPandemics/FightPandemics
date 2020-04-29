import React from "react";
import styled from "styled-components";

import Emoji from "../components/Emoji";

const AboutContainer = styled.div`
  margin: 30px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  max-width: 600px;
  text-align: center;
`;

const About = () => {
  return (
    <AboutContainer>
      <TextContainer>
        <h2 className="text-primary display-6">About Us</h2>
        <p>
          We're here to help people connect in times of need, find resources
          they need, people that can support them and inspiration to volunteer
          their time and skills to help others. If you're interested read on to
          see what you can do.
        </p>
        <h3 className="text-primary display-6">For Investors</h3>
        <p>
          Find active projects and startups focused on fighting COVID-19 and
          working on solutions to prevent any future pandemic.
        </p>
        <p>
          Explore investment opportunities, connect with founders, and support
          projects that matter to you.
          <Emoji emoji="👇" label="point_down" />
        </p>
        <h3 className="text-primary display-6">
          For Institutions and Organizations
        </h3>
        <p>
          Tough times require that we all gather around the mutual enemy which,
          for now, is COVID-19.
          <Emoji emoji="😷" label="mask" />
        </p>
        <p>
          Thus, we’re calling all companies, ventures, and official institutions
          who want to support makers creating solutions and fighting on the
          front line.
        </p>
        <p>
          If your company is offering <Emoji emoji="💰" label="moneybag" />{" "}
          grants or <Emoji emoji="💵" labe="dollar" />
          funding for startups and projects that aim to solve the problem of
          pandemics, list yourself on FightPandemics.com{" "}
          <Emoji emoji="🔽" label="arrow_down_small" />
        </p>
        <p>
          This is a platform focused on gathering information and collective
          intelligence around the current COVID-19 outbreak, as well as,
          fighting all future pandemics.
        </p>
        <p>
          Put your offer in front of the most active community of makers,
          innovators, founders, and investors determined to make the world{" "}
          <Emoji emoji="🌎" label="earth_americas" /> a better place.
        </p>
        <h3 className="text-primary display-6">For Entrepreneurs</h3>
        <p>
          <Emoji emoji="📣" label="mega" />
          Calling all entrepreneurs, makers, and creators who are taking the
          lead in a fight against COVID-19.
        </p>
        <p>
          If you’re looking for the most relevant tools, resources, and
          whitepapers that would help you build or expand your project head over
          to FightPandemics.com <Emoji emoji="⏩" label="fast_forward" />
        </p>
        <p>
          This is a platform that gathers curated resources on fighting COVID-19
          and future pandemics for entrepreneurs to help you collect accurate
          information, data, and advice to make your next big thing happen.{" "}
          <Emoji emoji="🌟" label="star2" />
        </p>
        <h3 className="text-primary display-6">For Every Human Concerned</h3>
        <p>If you’re looking for:</p>
        <p>
          <Emoji emoji="⚖" label="scales" /> ️Legal help as you’ve lost your
          job,
        </p>
        <p>
          <Emoji emoji="🏘" label="house_buildings" />
          ️How to help others in your community,
        </p>
        <p>
          <Emoji emoji="🛠️" label="hammer_and_wrench" />
          What to do and how to act during the current pandemic,
        </p>
        <p>
          <Emoji emoji="💊" label="pill" />
          Health information on what to do if you’re located in an affected
          area,
        </p>
        <h2>Join us.</h2>
      </TextContainer>
    </AboutContainer>
  );
};

export default About;
