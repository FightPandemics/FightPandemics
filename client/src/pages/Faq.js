import React from "react";

import {
  FaqContainer,
  QuestionsContainer,
  AnswerContainer,
} from "components/Faq/FaqContainer";

import { TermsLink as FaqLink } from "components/PolicyPages/TermsLink";

const Faq = () => {
  return (
    <FaqContainer>
      <QuestionsContainer>
        <h1 className="text-primary display-6">Frequently Asked Questions</h1>

        <h2 className="text-primary display-5">About FightPandemics / General</h2>
        <AnswerContainer>
          <details>
            <summary>What is FightPandemics?</summary>
            <p>FightPandemics is a platform created amid the COVID-19 outbreak with the aim to be a go-to place for people affected in many ways by the pandemic.</p>
            <p>Our main mission is to connect individuals and organisations offering and requesting help amid pandemic crisis, in a local and global level. No matter if you seek medical help, facial masks, legal help, groceries, someone to walk your dog or support with any other day-to-day activities, you can look for it here [LINK TO HELP BOARD].</p>
            <p>If you are sick and think you may have coronavirus disease, you can also find relevant local information [LINK] and check your symptoms [LINK].</p>
            <p>We strive to gather essential information that is highly fragmented, connecting in one network individuals, communities and organisations working on pandemic-related issues or projects. Our vision is to create a world where everyone is more resilient to emergencies, by helping communities respond more quickly and effectively to health emergencies and humanitarian crises.</p>
          </details>
        </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>Who is FightPandemics?</summary>
            <p>FightPandemics is an all-volunteer, global team with a mission to serve as a go-to place for help. Our team is made up of [NUMBER] engaged volunteers from [NUMBER] countries striving to make a difference. The platform was built in an innovative collaborative effort, bringing together a diverse group of problem solvers with a wide range of skills willing to co-create and learn with one another.</p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>In which cities does FightPandemics operate?</summary>
            <p>FightPandemics is a global platform. Our first version has launched English, but we have plans to add other languages soon. </p>
          </details></AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>Who is FightPandemics for?</summary>
            <p>FightPandemics is a global platform. Our first version has launched English, but we have plans to add other languages soon. </p>
          </details>  </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>Who is a Donor/Investor? (include contact point for who wants to become one)</summary>
            <p></p>
          </details>  </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary> What do you mean by an organisation?</summary>
            <p></p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>How can I post an offer or request for help on FightPandemics?</summary>
            <p>As a registered user you have unlimited access to view and create posts and comments on FightPandemics platform. </p>
            <p>To sign up as a user click the menu button and select the "Register/Log in" option. There you will be able to sign up with your email or social media credentials. </p>
            <p>Once you have completed your profile, select the menu button, select view my profile and click on the plus bottom to create your first post.</p>
          </details></AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>How can I keep up to date with FightPandemics news?</summary>

            <p>Please follow us on social media! We post regular updates to{" "}
              <FaqLink href="https://www.facebook.com/FightPandemics/" target="_blank">
                Facebook
        </FaqLink>{", "}
              <FaqLink href="https://twitter.com/fightpandemics?lang=en" target="_blank">
                Twitter
        </FaqLink>{", "}
              <FaqLink href="https://www.linkedin.com/company/fightpandemics/" target="_blank">
                LinkedIn
        </FaqLink>{", and "}
              <FaqLink href="https://www.instagram.com/fightpandemics/" target="_blank">
                Instagram
        </FaqLink>{"."}
            </p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>Do I have to pay to use FightPandemics?</summary>
            <p>No, FightPandemics is a completely free platform run by volunteers. </p>
          </details> </AnswerContainer>

        <h2 className="text-primary display-5">Offering and Requesting Help</h2>
        <AnswerContainer>
          <details>
            <summary>What kind of help can I offer/ request on FightPandemics?</summary>
            <p>You're welcome to ask for and offer any type of help to support individuals and organisations cope during the COVID-19 pandemic. Here is a list with some examples of the type of help you can offer or request:</p>
            <ul>
              <li>Groceries</li>
              <li>Medical supplies </li>
              <li>Legal assistance</li>
              <li>Tech support </li>
              <li>Information</li>
              <li>Funding</li>
              <li>Events and activities</li>
              <li>Education</li>
              <li>Wellness</li>
              <li>Research and development</li>
            </ul>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>How can I find help?</summary>
            <p>From the FightPandemics homepage [LINK], select "Need help." You will then be prompted to indicate the type of help you are looking for:</p>
            <h4>Medical help </h4>
            <p>If you click on "Medical help", you'll enter your location and be able to see the nearest health care facilities and the emergency number in your region.</p>
            <h4>Other help</h4>
            <p>If you choose "Other help", you'll enter your location and be directed to a page with the help offers in the selected area. You can then filter the postings that you want to see also by provider and type. Alternatively, you can select "View community postings" from the main page to view all postings and apply the desired filters.</p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>How can I offer help?</summary>
            <p>From the homepage, select "Give help"</p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>Do I need to be signed in to view help requests and offers?</summary>
            <p>You do not need to be signed to view any of the postings on the feed, but you will need to sign in to comment or like a post.</p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>Do I need to be signed in to create/edit posts?</summary>
            <p>Yes, you need to create an account and sign in if you want to create or edit posts </p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>Do I need to be signed up as an individual to create organisation profiles?</summary>
            <p>Yes, once you are signed up as an individual, you can create one or multiple organizational profile linked to your account.</p>
          </details>  </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>Will my name/ organisation's name be displayed to other users?</summary>
            <p>Currently, the individual's name and organization's name will be displayed </p>
          </details>  </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>How can I trust that the posts are reliable?</summary>
            <p>Unfortunately we cannot ensure that all postings are reliable. However we make our best to keep the content relevant, by doing regular data cleansing and by deactivating posts after their expiration.</p>
          </details>  </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>Can you help me with medical issues?</summary>
            <p>FightPandemics is not a medical care provider. If you need to seek medical care, you can look for medical facilities in our map [LINK TO PAGE].</p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>Do I need to share my current location? What if I don't want to share my location?</summary>
            <p>We use location to show you the most relevant results, however, you may also view all postings. Since FightPandemics has thousands of postings from all over, we suggest you enter a location near you to best tailor results.</p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>There is no help listed in my area. What do I do?</summary>
            <p>Our community is always growing. You're welcome to be the first one on your area to create a post and ask for help. Please also take a look in the services that are accessible to anyone independently of their location. </p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>The help I am looking for/ offering is remote. What should I put for my location?</summary>
            <p></p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>How can I edit my previous post?</summary>
            <p></p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>I found a bug on the website. How do I report that?</summary>
            <p>Please send us an email at {" "}
              <FaqLink href="mailto:help@fightpandemics.com" target="_blank">
                help@fightpandemics.com
            </FaqLink>{"."}
            </p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>I'm no longer permitted to use FightPandemics - what do I do?</summary>
            <p></p>
          </details>  </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>What information do you store?</summary>
            <p>FightPandemics collects and processes users personal data only for the purposes described in our{" "}
              <FaqLink href="https://fightpandemics.com/privacy-policy">
                privacy policy.
            </FaqLink> In no case we will provide access or share your personal data with any third party, except with the relevant persons set forth in this policy.</p>
          </details>  </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>Can I give/receive help from my city or state? How long will the post be visible?</summary>
            <p>he post to give/receive help can be at a zip code, city, state or country level for a duration of a day, a week, a month or forever. By default, the posts will be set to city level for one month.</p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>My question is not listed. Whom can I reach out to?</summary>
            <p>For general questions and other issues not listed here, reach out to {" "}
              <FaqLink href="mailto:contact@fightpandemics.com" target="_blank">
                contact@fightpandemics.com
    </FaqLink>.</p>
          </details></AnswerContainer>

        <h2 className="text-primary display-5">Profile and Account</h2>

        <AnswerContainer>
          <details>
            <summary>How do I sign up?</summary>
            <p>To sign up as a registered user, click the "Menu" button and select "Register/Log in". There you will be able to sign up with your choice of email or social media credentials. </p>
            <p>As a registered user, you have unlimited access to view and create posts and comments on the FightPandemics platform. </p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>What is the difference between an individual and an organisation profile?</summary>
            <p></p>
          </details></AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>What is the difference between an individual and an organisation profile?</summary>
            <p>An organisational profile is tied to your individual profile. Once you create your individual profile, you can add as many organisational profiles as you'd like tied to the person. Your login will continue to be the email and password you used to sign up for the individual profile.</p>
          </details>  </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>How can I change my individual profile to an organisation profile?</summary>
            <p>An organisational profile is tied to your individual profile. Once you create your individual profile, you can add as many organisational profiles as you'd like tied to that individual profile. Your login will continue to be the email and password you used to sign up for the individual profile.</p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>How can I reset my password?</summary>
            <p>Click on "Login" from the homepage and then click on "Forgot password" and follow the instructions</p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>Why is my password not valid?</summary>
            <p></p>
          </details> </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>How do I delete/ cancel my account?</summary>
            <p>If you wish to delete your account, please reach out to us at {" "}
              <FaqLink href="mailto:help@fightpandemics.com" target="_blank">
                help@fightpandemics.com
            </FaqLink>{"."}</p>
          </details></AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>I no longer have access to my email address. Can I change my email address for the account?</summary>
            <p></p>
          </details></AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>Where can I see all my recent posts and activities?</summary>
            <p></p>
          </details>
        </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>How can I update my profile information?</summary>
            <p>From the menu in the upper right-hand corner, select "My Profile," then click on the pen icon at the top of your profile. You will be taken to a screen where you will be able to edit your profile information and select "Save Changes" when you are complete.</p>
          </details>
        </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>How can I report an incorrect or offensive post?</summary>
            <p>How can I report an incorrect or offensive post?</p>
          </details>
        </AnswerContainer>

        <h2 className="text-primary display-5">Links</h2>
        <AnswerContainer>
          <details>
            <summary>Code of Conduct</summary>
            <p>[LINK here]</p>
          </details>
        </AnswerContainer>
        <h2 className="text-primary display-5">Contacts</h2>
        <AnswerContainer>
          <details>
            <summary>I want to become a partner or sponsor.</summary>
            <p>Please get in touch with our partnerships team at {" "}
              <FaqLink href="mailto:partnerships@fightpandemics.com" target="_blank">
                partnerships@fightpandemics.com
            </FaqLink>.</p>
          </details>
        </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>I am from the press/ media.</summary>

            <p>Please contact us at {" "}
            <FaqLink href="mailto:press@fightpandemics.com" target="_blank">
                press@fightpandemics.com
            </FaqLink>.</p>
          </details>
        </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>I need technical support.</summary>
            <p>We are sorry for that. Send us an email at {" "}
              <FaqLink href="mailto:help@fightpandemics.com" target="_blank">
                help@fightpandemics.com
            </FaqLink>{"."}. Since we are an all volunteer team, please expect at least 48 hours for a response.</p>
          </details>
        </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary>I want to reach out to FindPandemics for other reasons.</summary>
            <p>We are sorry for that. Send us an email at {" "}
              <FaqLink href="mailto:help@fightpandemics.com" target="_blank">
                help@fightpandemics.com
            </FaqLink>. Since we are an all volunteer team, please expect at least 48 hours for a response.</p>
          </details>
        </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary></summary>
            <p></p>
          </details>
        </AnswerContainer>
        <AnswerContainer>
          <details>
            <summary></summary>
            <p></p>
          </details>
        </AnswerContainer>

      </QuestionsContainer>
    </FaqContainer>
  );
};

export default Faq;
