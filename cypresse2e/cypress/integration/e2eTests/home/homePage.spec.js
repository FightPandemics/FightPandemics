import HomePage from "../../../elements/pages/homePage";
import CookieBanner from "../../../elements/pages/cookieBanner";

describe("FightPandemics Home screen", () => {
  var h1HeadingText = "A place to offer and request help";
  var subHeading1Text = "Pandemics will continue to happen.";
  var subHeading2Text = "We help communities prepare and respond.";
  var requestHelpButtonText = "Request Help";
  var offerHelpButtonText = "Offer Help";

  const home = new HomePage();
  const cookieBanner = new CookieBanner();

  context("User opens Home screen ", () => {
    beforeEach(() => {
      home.visit();
    });

    it("Home screen contains headings", () => {
      home.getH1Heading().contains(h1HeadingText);
      home.getSubHeading1().contains(subHeading1Text);
      home.getSubHeading2().contains(subHeading2Text);
    });

    it("Link to Help Board screen - View Help Board is visible", () => {
      var linkToHelpBoard = home.getViewHelpBoardLink();
      linkToHelpBoard.should("be.visible");
      linkToHelpBoard.contains("a p", "View Help Board");
    });

    it("Buttons Request Help and Offer help are visible", () => {
      var requestHelpButton = home.getRequestHelpButton();
      requestHelpButton.should("be.visible");
      requestHelpButton
        .find("img")
        .should("have.attr", "alt", requestHelpButtonText);
      var offerHelpButton = home.getOfferHelpButton();
      offerHelpButton.should("be.visible");
      offerHelpButton
        .find("img")
        .should("have.attr", "alt", offerHelpButtonText);
    });

    it("Displays the cookie banner", () => {
      var cookieBannerModal = cookieBanner.getCookieBanner();
      cookieBannerModal.should("be.visible");
      cookieBannerModal.contains(
        "This site uses cookies to deliver our service and to show you relevant information. By using our site, you acknowledge that you have read and understand our Cookies Policy, Privacy Policy, and our Terms & Conditions. Your use of FightPandemics' Products is subject to these policies and terms.",
      );
    });

    it("Can close the cookie banner", () => {
      var closeCookieBanner = cookieBanner.getCookieBannerClose();
      closeCookieBanner.should("be.visible");
      closeCookieBanner.click();
      var cookieBannerModal = cookieBanner.getCookieBanner();
      cookieBannerModal.should("not.be.visible");
    });

    it("Can navigate to the cookies policy page via the cookie banner", () => {
      clickLink(cookieBanner.getCookieBannerCookiesPolicy(), "/cookies-policy");
    });

    it("Can navigate to the privacy policy page via the cookie banner", () => {
      clickLink(cookieBanner.getCookieBannerPrivacyPolicy(), "/privacy-policy");
    });

    it("Can navigate to the terms and conditions page via the cookie banner", () => {
      clickLink(
        cookieBanner.getCookieBannerTermsAndConditions(),
        "/terms-conditions",
      );
    });
  });

  function clickLink(getMethod, link) {
    getMethod.click();
    cy.location("pathname").should("eq", link);
  }
});
