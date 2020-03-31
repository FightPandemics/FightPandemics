import React from 'react';

const CONTAINER_STYLES = {
    marginTop: "30px",
    width: "600px",
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
};

export const About = () => {
  return (
      <div className="text-center mx-auto" style={CONTAINER_STYLES}>
          <h3 className="text-primary display-6">About Us</h3>
          <p>We're here to help people connect in times of need, find resources they need, people that can support them and inspiration to volunteer their time and skills to help others. If you're interested read on to see what you can do.</p>
          <p className="text-primary display-6">For Investors</p>
          <p>Find active projects and startups focused on fighting COVID-19 and working on solutions to prevent any future pandemic.</p>
          <p>Explore investment opportunities, connect with founders, and support projects that matter to you.👇</p>
          <p className="text-primary display-6">For Institutions and Organizations</p>
          <p>Tough times require that we all gather around the mutual enemy which, for now, is COVID-19.😷</p>
          <p>Thus, we’re calling all companies, ventures, and official institutions who want to support makers creating solutions and fighting on the front line.</p>
          <p>If your company is offering 💰grants or 💵funding for startups and projects that aim to solve the problem of pandemics, list yourself on FightPandemics.com 🔽</p>
          <p>This is a platform focused on gathering information and collective intelligence around the current COVID-19 outbreak, as well as, fighting all future pandemics.</p>
          <p>Put your offer in front of the most active community of makers, innovators, founders, and investors determined to make the world 🌎 a better place.</p>
          <p className="text-primary display-6">For Entrepreneurs</p>
          <p>📣Calling all entrepreneurs, makers, and creators who are taking the lead in a fight against COVID-19.</p>
          <p>If you’re looking for the most relevant tools, resources, and whitepapers that would help you build or expand your project head over to FightPandemics.com ⏩</p>
          <p>This is a platform that gathers curated resources on fighting COVID-19 and future pandemics for entrepreneurs to help you collect accurate information, data, and advice to make your next big thing happen.🌟</p>
          <p className="text-primary display-6">For Every Human Concerned</p>
          <p>If you’re looking for:</p>
          <p>⚖️Legal help as you’ve lost your job,</p>
          <p>🏘️How to help others in your community,</p>
          <p>🛠️What to do and how to act during the current pandemic,</p>
          <p>💊Health information on what to do if you’re located in an affected area,</p>
          <p>Join us.</p>
      </div>
  );
}
