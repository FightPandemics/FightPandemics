import React from "react";

import {
  FaqContainer,
  QuestionsContainer,
  AnswerContainer,
} from "components/Faq/FaqContainer";

import { TermsLink as FaqLink} from "components/PolicyPages/TermsLink";

const Faq = () => {
  return (
    <FaqContainer>
      <QuestionsContainer>
        <h1 className="text-primary display-6">Frequently Asked Questions</h1>

        <h2 className="text-primary display-5">About FightPandemics / General</h2>

        <AnswerContainer>
        <h3 className="text-primary">What is FightPandemics?</h3>
          <p>FightPandemics is a platform created amid the COVID-19 outbreak with the aim to be a go-to place for people affected in many ways by the pandemic.</p>
          <p>Our main mission is to connect individuals and organisations offering and requesting help amid pandemic crisis, in a local and global level. No matter if you seek medical help, facial masks, legal help, groceries, someone to walk your dog or support with any other day-to-day activities, you can look for it here [LINK TO HELP BOARD].</p>
          <p>If you are sick and think you may have coronavirus disease, you can also find relevant local information [LINK] and check your symptoms [LINK].</p>
          <p>We strive to gather essential information that is highly fragmented, connecting in one network individuals, communities and organisations working on pandemic-related issues or projects. Our vision is to create a world where everyone is more resilient to emergencies, by helping communities respond more quickly and effectively to health emergencies and humanitarian crises.</p>
        </AnswerContainer>
        <h3 className="text-primary">Who is FightPandemics?</h3>
        <AnswerContainer>
        <p>FightPandemics is an all-volunteer, global team with a mission to serve as a go-to place for help. Our team is made up of [NUMBER] engaged volunteers from [NUMBER] countries striving to make a difference. The platform was built in an innovative collaborative effort, bringing together a diverse group of problem solvers with a wide range of skills willing to co-create and learn with one another.</p>
        </AnswerContainer>
        <h3 className="text-primary ">In which cities does FightPandemics operate?</h3>
        <AnswerContainer>
        <p>FightPandemics is a global platform. Our first version has launched English, but we have plans to add other languages soon. </p>
        </AnswerContainer>
        <h3 className="text-primary">Who is FightPandemics for?</h3>
        <AnswerContainer>
        <p>FightPandemics is a global platform. Our first version has launched English, but we have plans to add other languages soon. </p>
        </AnswerContainer>
        <h3 className="text-primary">Who is a Donor/Investor? (include contact point for who wants to become one)</h3>
        <AnswerContainer>
        <p></p>
        </AnswerContainer>
        <h3 className="text-primary"> What do you mean by an organisation?</h3>
        <AnswerContainer>
        <p></p>
        </AnswerContainer>
        <h3 className="text-primary">How can I post an offer or request for help on FightPandemics?</h3>
        <AnswerContainer>
        <p>As a registered user you have unlimited access to view and create posts and comments on FightPandemics platform. </p>
        <p>To sign up as a user click the menu button and select the "Register/Log in" option. There you will be able to sign up with your email or social media credentials. </p>
        <p>Once you have completed your profile, select the menu button, select view my profile and click on the plus bottom to create your first post.</p>
        </AnswerContainer>
        <h3 className="text-primary">How can I keep up to date with FightPandemics news?</h3>
        <AnswerContainer>
        <p>Please follow us on social media! We post regular updates to{" "}
        <FaqLink href="https://www.facebook.com/FightPandemics/">
                  Facebook
        </FaqLink>{", "}
        <FaqLink href="https://twitter.com/fightpandemics?lang=en">
                  Twitter
        </FaqLink>{", "}
        <FaqLink href="https://www.linkedin.com/company/fightpandemics/">
                  LinkedIn
        </FaqLink>{", and "}
        <FaqLink href="https://www.instagram.com/fightpandemics/">
                  Instagram
        </FaqLink>{"."}
        </p>
        </AnswerContainer>
        <h3 className="text-primary">Do I have to pay to use FightPandemics?</h3>
        <AnswerContainer>
        <p>No, FightPandemics is a completely free platform run by volunteers. </p>
        </AnswerContainer>
      </QuestionsContainer>
    </FaqContainer>
  );
};

export default Faq;
