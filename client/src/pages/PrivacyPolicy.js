import React from "react";

import {
  PolicyContainer,
  TextContainer,
  Paragraph,
} from "components/PolicyPages/PolicyContainer";
import { ListNoIndent } from "components/PolicyPages/ListStyles";
import { TermsLink } from "components/PolicyPages/TermsLink";
import { Date } from "components/PolicyPages/Date";
import {
  DataTableHead,
  TrLine,
  ThLeft,
  ThRight,
  TdLeft,
  TdRight,
} from "components/PolicyPages/TableStyles";

const PrivacyPolicy = () => {
  return (
    <PolicyContainer>
      <TextContainer>
        <h2 className="text-primary display-6">Privacy Policy</h2>
        <Paragraph>
          <strong>Fightpandemics, INC.</strong> (the <strong>“Company”</strong>,{" "}
          <strong>“We”</strong> or/and <strong>“Us”</strong>) is the manager of
          this website and hereby informs YOU how We will collect and process
          your Personal Data (as defined below) when YOU use our services,
          websites and applications (the <strong>"Services"</strong>).
        </Paragraph>
        <Paragraph>
          By using the Services, YOU consent that we can collect and process
          your Personal Data. For the avoidance of doubt, We will only use your
          Personal Data for the purposes described in this Privacy Policy, and
          in no case, We will provide access or share your Personal Data with
          any third party, except with the relevant persons set forth in this
          Privacy Policy.
        </Paragraph>
        <Paragraph>
          <strong>“Personal data”</strong> means any information relating to an
          identified or identifiable natural person. An identifiable natural
          person is one who can be identified, directly or indirectly, in
          particular by reference to an identifier such as a name, an
          identification number, location data, an online identifier or to one
          or more factors specific to the physical, physiological, genetic,
          mental, economic, cultural or social identity of that natural person.
        </Paragraph>
        <Paragraph>
          On the basis of the above, the Company herein provides YOU with a
          detailed explanation about the treatment of your data when YOU use our
          Services, as well as an explanation about your rights regarding your
          Personal Data and how YOU can exercise them:
        </Paragraph>
        <ol>
          <li>
            <strong>Who We are and how YOU can contact Us</strong>
            <Paragraph>
              We are the Controller of the Services, and our address is at 9 E
              Loockerman Street Suite 311, Dover, Delaware (19901).
            </Paragraph>
            <Paragraph>
              If YOU have any questions about our practices or this Privacy
              Policy, please contact Us at{" "}
              <TermsLink href="mailto:legal@fightpandemics.com">
                legal@fightpandemics.com
              </TermsLink>
              .
            </Paragraph>
          </li>
          <li>
            <strong>Your rights relating your Personal Data</strong>
            <Paragraph>
              The Company recognises that YOU have the following rights:
              <ListNoIndent type="a">
                <li>
                  <u>Access to your Personal Data:</u> YOU can request Us a copy
                  of the Personal Data we hold about YOU and to check that we
                  are lawfully processing it.
                </li>
                <li>
                  <u>Correction of your Personal Data:</u> YOU can request that
                  We correct any information that we hold about YOU if it is
                  incomplete or inaccurate.
                </li>
                <li>
                  <u>Erasure of your Personal Data:</u> YOU can request Us to
                  delete or remove your Personal Data when it is not necessary
                  that we continue to process it. YOU also have the right if YOU
                  are within the EU to ask Us to delete or remove your Personal
                  Data where YOU have exercised your right to object to
                  processing (see below).
                </li>
                <li>
                  <u>Object to processing of your Personal Data:</u> This right
                  exists where we are relying on a legitimate interest as the
                  legal basis for our processing and there is something about
                  your particular situation, which makes YOU want to object to
                  the processing of your Personal Data on this ground. YOU also
                  have the right to object where we are processing your Personal
                  Data for direct marketing purposes.
                </li>
                <li>
                  <u>Restriction of processing of your Personal Data:</u>{" "}
                  enables YOU to ask Us to suspend the processing of your
                  Personal Data.
                </li>
                <li>
                  <u>Transfer of your Personal Data:</u> If YOU are in certain
                  jurisdictions, we will provide YOU, or a third party that you
                  chose, your Personal Data in a structured, commonly used,
                  machine-readable format. Note that this right only applies to
                  automated information which YOU initially provided consent for
                  Us to use or where we used the information to perform a
                  contract with YOU.
                </li>
                <li>
                  <u>Withdraw of consent:</u> This right only exists where we
                  are relying on consent to process your Personal Data. If YOU
                  withdraw your consent, we may not be able to provide YOU with
                  access to certain specific functionalities of our Services.
                </li>
              </ListNoIndent>
            </Paragraph>
          </li>
          <li>
            <strong>How to exercise your rights</strong>
            <Paragraph>
              If YOU want to exercise any of the rights described above, please
              contact Us using the contact details in Clause 1.
            </Paragraph>
            <Paragraph>
              We may need to request specific information from YOU to help Us
              confirm your identity and ensure your right to access your
              Personal Data (or to exercise any of your other rights). This is a
              security measure to ensure that Personal Data is not disclosed to
              any person who has no right to receive it. We may also contact YOU
              to ask YOU for further information in relation to your request to
              speed up our response.
            </Paragraph>
          </li>
          <li>
            <Paragraph>
              If YOU would like to submit a complaint regarding this Privacy
              Policy or our practices in relation to your Personal Data, please
              contact Us at:{" "}
              <TermsLink href="mailto:legal@fightpandemics.com">
                legal@fightpandemics.com
              </TermsLink>
              .
            </Paragraph>
            <Paragraph>
              After we have analysed your request, We will reply to your
              complaint as prompt as possible, always trying to provide the best
              possible assistance. Notwithstanding, if YOU feel that your
              complaint has not been adequately resolved, please note that if
              YOU are in the EU the GDPR gives YOU the right to contact your
              local data protection supervisory authority.
            </Paragraph>
          </li>
          <li>
            <strong>Why We collect your Personal Data</strong>
            <Paragraph>
              We collect and process your Personal Data with the aim to provide
              YOU with the Services, personalize content, remember information
              to help YOU efficiently access your account, analyse how the
              Services are used, diagnose service or technical problems,
              maintain security, monitor aggregate metrics such as total number
              of visitors, traffic, and demographic patterns.
            </Paragraph>
          </li>
          <li>
            <strong>What Personal Data We collect</strong>
            <Paragraph>
              There are many occasions when YOU provide information that may
              enable Us to identify YOU personally while using the Services. The
              Personal Data we may collect from YOU is described in the
              following table:
            </Paragraph>
            <table>
              <DataTableHead>
                <tr>
                  <ThLeft>Category of Personal Data </ThLeft>
                  <ThRight>What it includes</ThRight>
                </tr>
              </DataTableHead>
              <tbody>
                <TrLine>
                  <TdLeft>
                    <u>Identity Data</u>
                  </TdLeft>
                  <TdRight>
                    First name, surname, maiden name, last name, username, date
                    of birth, gender, picture, signature, etc.
                  </TdRight>
                </TrLine>
                <TrLine>
                  <TdLeft>
                    <u>Contact Data</u>
                  </TdLeft>
                  <TdRight>
                    Your home address, work address, email address and telephone
                    numbers.
                  </TdRight>
                </TrLine>
                <TrLine>
                  <TdLeft>
                    <u>Professional Background</u>
                  </TdLeft>
                  <TdRight>
                    Educational and professional history, interests and
                    accomplishments and projects completed.
                  </TdRight>
                </TrLine>
                <TrLine>
                  <TdLeft>
                    <u>Online Presence Data</u>
                  </TdLeft>
                  <TdRight>
                    Links to your public account pages at social media websites,
                    links to personal websites, and other online materials
                    related to YOU.
                  </TdRight>
                </TrLine>
                <TrLine>
                  <TdLeft>
                    <u>Content Data</u>
                  </TdLeft>
                  <TdRight>
                    Any content YOU post to the Services not already included in
                    another category, including without limitation, your
                    profiles, questions, preference settings, answers, messages,
                    comments and other contributions on the Services.
                  </TdRight>
                </TrLine>
                <TrLine>
                  <TdLeft>
                    <u>Communications Preferences</u>
                  </TdLeft>
                  <TdRight>
                    Your preferences in receiving marketing from Us and our
                    third parties and your communication preferences. If YOU
                    correspond with Us by email or messaging through the
                    Services, we may retain the content of such messages and our
                    responses.
                  </TdRight>
                </TrLine>
                <TrLine>
                  <TdLeft>
                    <u>Behavioural Data</u>
                  </TdLeft>
                  <TdRight>
                    Inferred or assumed information relating to your behaviour
                    and interests, based on your online activity.
                  </TdRight>
                </TrLine>
                <TrLine>
                  <TdLeft>
                    <u>Technical Data</u>
                  </TdLeft>
                  <TdRight>
                    Internet protocol (IP) address, your login data, browser
                    type and version, time zone setting and location, browser
                    plug-in types and versions, operating system and platform
                    and other technology on the devices YOU use to access this
                    website or use our services.
                  </TdRight>
                </TrLine>
                <tr>
                  <TdLeft>
                    <u>Health Data</u>
                  </TdLeft>
                  <TdRight>
                    Health conditions from You, when accessing the
                    questionnaire.
                  </TdRight>
                </tr>
              </tbody>
            </table>
          </li>
          <li>
            <strong>Aggregated Data</strong>
            <Paragraph>
              We may also collect, process and recollect statistical or
              demographic data <strong>“Aggregated Data”</strong>.
            </Paragraph>
            <Paragraph>
              Aggregated Data may be derived from your Personal Data, but once
              in aggregated form it will not constitute Personal Data as this
              data does not directly or indirectly reveal your identity.
              However, if we combine or connect Aggregated Data with your
              Personal Data, We can directly or indirectly identify YOU. In this
              sense, we will treat the combined data as Personal Data which will
              be used in accordance with this Privacy Policy.
            </Paragraph>
          </li>
          <li>
            <strong>How We Use Your Personal Data and Why</strong>
            <Paragraph>
              We generally use Personal Data for the following: to deliver and
              improve our Services; to manage your account and provide YOU with
              customer support; to send YOU Newsletters or other communication
              in which YOU can be interested on; to perform research and
              analysis about your use of the Services; to develop, display, and
              track Content and advertising tailored to your interests on the
              Services and other sites; website or mobile application analytics;
              to diagnose or fix technology problems; to automatically update
              the Services on your device; to verify your identify and prevent
              fraud or other unauthorized or illegal activity.
            </Paragraph>
            <Paragraph>
              In addition, We inform YOU that We collect and use your Personal
              Data only when:
              <ListNoIndent type="a">
                <li>
                  We need to provide YOU the Services, including to operate the
                  Services, provide customer support and personalized features
                  and to protect the safety and security of the Services;
                </li>
                <li>It satisfies a legitimate interest; or</li>
                <li>
                  We need to process your data to comply with a legal or
                  regulatory obligation.
                </li>
              </ListNoIndent>
            </Paragraph>
            <Paragraph>
              WE may also rely on your consent as a legal basis for using your
              Personal Data where we have expressly sought it for a specific
              purpose. If we do rely on your consent to a use of your Personal
              Data, YOU have the right to change your mind at any time (but this
              will not affect any processing that has already taken place) and
              YOU can contact Us to the email{" "}
              <TermsLink href="mailto:legal@fightpandemics.com">
                legal@fightpandemics.com
              </TermsLink>{" "}
              in order to exercise your rights stated in clause 2 of the present
              Privacy Policy. In this sense, some detailed examples of relevant
              purposes for which we may use your Personal Data are the
              following:
              <ListNoIndent type="a">
                <li>
                  <u>Maintenance of the Services and Customer Support:</u> we
                  will process your data in order to deliver the Services YOU
                  have requested, including, for example, registering YOU as a
                  user, managing your account and profile, and authenticating
                  YOU when YOU log in, as well as to resolve technical issues
                  YOU encounter, to respond to your requests for assistance.
                </li>
                <li>
                  <u>Processing investments and payments:</u> as the purpose of
                  the Company is to assist people affected by the COVID-19 it
                  could be necessary hat YOU make donations and we will have to
                  process your financial data.
                </li>
                <li>
                  <u>Research and development:</u> WE will use your information
                  in order to understand your usage, activity patterns, areas
                  for additional features and improvement of the Services and
                  other insights.
                </li>
                <li>
                  <u>Communicating with users about the Services:</u> to send
                  communications via email and within the Services, including,
                  for example, responding to your comments, questions and
                  requests, sending Newsletters, informing about our events,
                  etc.
                </li>
                <li>
                  <u>
                    To comply with applicable law, legal process and regulations
                    and protect legitimate business interests:
                  </u>{" "}
                  We will be able to share your personal data with a Law
                  enforcement agency, court, regulator, government authority or
                  other third party with compelling authority: where we believe
                  this is necessary to comply with a legal or regulatory
                  obligation, or otherwise to protect our rights or the rights
                  of any third party.
                </li>
              </ListNoIndent>
            </Paragraph>
          </li>
          <li>
            <strong>
              What happens when YOU do not provide necessary Personal Data?
            </strong>
            <Paragraph>
              WE may not be able to perform the contract We have or are trying
              to enter into with YOU.
            </Paragraph>
          </li>
          <li>
            <strong>With Whom We Share Your Personal Data?</strong>
            <Paragraph>
              The Company will be able to share your personal data with third
              parties under the following circumstances:
              <ListNoIndent type="a">
                <li>
                  <u>Service providers and business partners:</u> We could share
                  anonymized data to our service providers and business partners
                  that perform amongst others, to process maintenance and other
                  IT services, marketing and communication, accounting, finance,
                  legal and audit and other business operations for Us, and in
                  order to be able to provide our service.
                </li>
                <li>
                  <u>
                    Law enforcement agency, court, regulator, government
                    authority or other third party with compelling authority:
                  </u>{" "}
                  We will be able to share your personal data with these parties
                  where We believe this is necessary to comply with a legal or
                  regulatory obligation, or otherwise to protect our rights or
                  the rights of any third party.
                </li>
                <li>
                  <u>
                    Asset purchasers, merger, reorganization, dissolution or
                    similar event:
                  </u>{" "}
                  We may also transfer your Personal Data as part of the
                  transferred assets without notifying YOU.
                </li>
                <li>
                  <u>Third parties:</u> We will share your personal data with
                  third parties for the fulfillment of the relationship YOU have
                  with Us.
                </li>
              </ListNoIndent>
            </Paragraph>
          </li>
          <li>
            <strong>How long We store your Personal Data</strong>
            <Paragraph>
              We will retain your information for as long as your account is
              active and We have a relationship with YOU. Once our relationship
              with YOU has come to an end, We will retain your personal data for
              a period of time that enables Us to:
              <ListNoIndent tyoe="a">
                <li>
                  Maintain business records for analysis and/or audit purposes;
                </li>
                <li>Comply with law’s requirements;</li>
                <li>Defend or present legal claims;</li>
                <li>Deal with any complaints regarding the Services.</li>
              </ListNoIndent>
            </Paragraph>
            <Paragraph>
              We will delete your personal data when it is no longer required
              for these purposes. If there is any information that We are
              unable, for technical reasons, to delete entirely from our
              systems, We will put in place appropriate measures to prevent any
              further processing or use of the data.
            </Paragraph>
          </li>
          <li>
            <strong>Where We Store Your Personal Data</strong>li>
            <Paragraph>
              The Services are provided in the United States of America.
              Notwithstanding, your Personal Data will be stored, processed in
              the EU.
            </Paragraph>
          </li>
          <li>
            <strong>How We Protect Your Personal Data</strong>
            <Paragraph>
              We have put in place procedures to respond to any actual or
              suspected Personal Data breach. In the event that Personal Data is
              compromised as a result of such breach of security, the Company
              will promptly notify by e-mail to those persons whose personal
              information has been compromised. WE cannot ensure that your
              Personal Data will be protected, controlled or otherwise managed
              pursuant to this Privacy Policy if YOU share your login and
              password information with any third party.
            </Paragraph>
          </li>
          <li>
            <strong>Contact Us</strong>
            <Paragraph>
              If YOU have questions or concerns regarding the way in which your
              personal data has been used, please contact{" "}
              <TermsLink href="mailto:legal@fightpandemics.com">
                legal@fightpandemics.com.
              </TermsLink>
            </Paragraph>
          </li>
          <li>
            <strong>Changes to Our Privacy Policy</strong>
            <Paragraph>
              We reserve the right, in our sole discretion, to change, modify,
              add, or remove portions of this Privacy Policy at any time. Any
              changes or updates will be effective immediately upon posting to
              this page. YOU should review this Privacy Policy regularly.
            </Paragraph>
          </li>
        </ol>
        <Date>April 23rd, 2020</Date>
      </TextContainer>
    </PolicyContainer>
  );
};

export default PrivacyPolicy;
