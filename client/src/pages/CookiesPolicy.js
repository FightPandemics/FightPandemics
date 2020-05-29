import React from "react";

import {
  PolicyContainer,
  TextContainer,
} from "components/PolicyPages/PolicyContainer";
import { ListNoIndent } from "components/PolicyPages/ListStyles";
import { TermsLink } from "components/PolicyPages/TermsLink";
import { Date } from "components/PolicyPages/Date";

const CookiesPolicy = () => {
  return (
    <PolicyContainer>
      <TextContainer>
        <h2 className="text-primary display-6">Cookies Policy</h2>
        <ListNoIndent>
          <li>
            WHAT ARE COOKIES?
            <ol type="I">
              <li>
                <br />
                This Website uses ¨Cookies¨, and other similar mechanisms
                (hereinafter, Cookies). Cookies are files sent to a browser
                through a web server to record the activities of the User on a
                specific website or on all websites, apps and / or services on
                this website. The first purpose of Cookies is to provide the
                User with faster and more personalized access to the services
                offered. Cookies are associated only with an anonymous User and
                his/her computer and do not provide references that allow the
                deduction of the User's personal data.
              </li>
              <li>
                The User may configure his/her browser to notify and reject the
                installation of Cookies sent by this website, without prejudice
                to the User's ability to access the Contents. However, we note
                that, in any case, the performance of the website may decrease.
                This website makes use of Web Bugs, which are tiny and
                transparent images inserted in the emails. When the User opens a
                newsletter of the Website, this image is downloaded along with
                the rest of the email content and allows to know if a specific
                email has been opened or not, as well as the IP address from
                which it was downloaded. FightPandemics uses this information to
                obtain statistics and carry out analytical studies on the
                reception of its emails by Users.
              </li>
            </ol>
          </li>
          <li>
            TYPE, PURPOSE AND FUNCTIONING OF COOKIES
            <ol type="I">
              <li>
                Cookies, depending on their permanence, can be divided into
                session or permanent Cookies. The first ones expire when the
                User closes the browser. The second ones expire depending on
                when the objective for which they serve is fulfilled or when
                they are manually deleted. Additionally, depending on your
                objective, the Cookies used by this Website can be classified as
                follows:
                <ol type="a">
                  <li>
                    Technical cookies: These allow the user to navigate through
                    a web page, platform or application and use the different
                    options or services that exist there, such as, for example,
                    control traffic and data communication, identify the
                    session, access restricted access parts, remember the
                    elements that make up an order, make the purchase process of
                    an order, make the request for registration or participation
                    in an event, use security elements during navigation, store
                    content for dissemination of videos or sound or share
                    content through social networks.
                  </li>
                  <li>
                    Personalization cookies: These allow the user to access the
                    service with some predefined general characteristics based
                    on a series of criteria in the user's terminal such as the
                    language, the type of browser through which the service is
                    accessed , the regional configuration from where you access
                    the service, etc.
                  </li>
                  <li>
                    Analysis cookies: Those that are processed by us or by third
                    parties, which allow to quantify the number of users and
                    thus perform the measurement and statistical analysis of the
                    use made by users of the services offered. For this, your
                    browsing on our website is analyzed in order to improve the
                    offer of products or services that we offer.
                  </li>
                  <li>
                    Advertising cookies: Are those that are processed by us or
                    by third parties, allowing us to manage in the most
                    efficient way possible the offer of the advertising spaces
                    that are on the website, adapting the content of the
                    advertisement to the content of the requested service or to
                    the use that you make from our website. For this we can
                    analyze your browsing habits on the Internet, and we can
                    show you advertising related to your browsing profile.
                  </li>
                  <li>
                    Behavioral advertising cookies: These allow the management,
                    in the most efficient way possible, of the advertising
                    spaces that, where appropriate, the editor has included in a
                    web page, application or platform from which it provides the
                    requested service. These cookies store information on the
                    behavior of users obtained through the continuous
                    observation of their browsing habits, which allows
                    developing a specific profile to display advertising based
                    on it.
                  </li>
                </ol>
              </li>
              <li>
                The Website may use third-party services that may require the
                installation of Cookies on Users and that on behalf of
                FightPandemics, and will collect information for statistical
                purposes on the use of the Website by the user and for the
                provision of other services related to Website activity and
                other Internet services.
              </li>
            </ol>
          </li>
          <li>
            HOW TO DISABLE COOKIES AND WEB BUGS IN THE MAIN BROWSERS?
            <ol type="I">
              It is normally possible to stop accepting browser cookies or stop
              accepting cookies from a particular service. All modern browsers
              allow you to change the configuration of Cookies. These settings
              are usually found in the ‘options’ or ‘Preferences’ of your
              browser menu. You can also configure your browser or email
              manager, as well as install free add-ons to prevent Web Bugs from
              downloading when opening an email. Use the following instructions
              according to your internet browser to change cookie preferences:
              <ul>
                <li>
                  <TermsLink
                    href="https://support.google.com/chrome/answer/95647?hl=en"
                    target="_blank"
                  >
                    Chrome
                  </TermsLink>
                </li>
                <li>
                  <TermsLink
                    href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies"
                    target="_blank"
                  >
                    Explorer
                  </TermsLink>
                </li>
                <li>
                  <TermsLink
                    href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectlocale=en-US&redirectslug=enable-and-disable-cookies-website-preferences"
                    target="_blank"
                  >
                    Firefox
                  </TermsLink>
                </li>
                <li>
                  <TermsLink
                    href="https://support.apple.com/en-za/guide/safari/sfri11471/mac"
                    target="_blank"
                  >
                    Safari
                  </TermsLink>
                </li>
              </ul>
            </ol>
          </li>
          <li>
            UPDATE OF COOKIES POLICY
            <ol type="I">
              <li>
                FightPandemics may modify this Cookies Policy based on
                legislative, regulatory requirements, or with the purpose of
                adapting said policy to the instructions issued by the Spanish
                Data Protection Agency, therefore Users are advised to
                periodically visit this page to know the changes suffered in
                them. When there are significant changes in this Cookies Policy,
                Users will be notified either through the web or through email
                to the Users registered in the newsletter service.
              </li>
            </ol>
          </li>
        </ListNoIndent>

        <Date>April 23rd, 2020</Date>
      </TextContainer>
    </PolicyContainer>
  );
};

export default CookiesPolicy;
