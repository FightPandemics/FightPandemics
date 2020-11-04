import Footer from "../../../elements/pages/footer";

describe("FightPandemics Footer Section", () => {
  const footer = new Footer();

  context("Footer section is visible on bottom of home page", () => {
    beforeEach(() => {
      footer.visit();
    });

    it("FP copyright text is visible", () => {
      var copyright =
        "Copyright " + "2020" + " FightPandemics. All rights reserved.";
      footer.getCopyright().should("be.visible").contains(copyright);
    });

    it("About Us link is visible and clickable", () => {
      section(footer.getAboutUs(), "About Us");
    });

    it("FAQ link is visible and clickable", () => {
      section(footer.getFaq(), "FAQ");
    });

    it("Blog link is visible and clickable", () => {
      section(footer.getBlog(), "Blog");
    });

    it("Terms & Conditions link is visible and clickable", () => {
      section(footer.getTermsAndConditions(), "Terms & Conditions");
    });

    it("Privacy Policy link is visible and clickable", () => {
      section(footer.getPrivacyPolicy(), "Privacy Policy");
    });

    it("Cookies Policy link is visible and clickable", () => {
      section(footer.getCookiesPolicy(), "Cookies Policy");
    });
  });

  function section(getMethod, category) {
    getMethod.should("be.visible").contains(category).click({ force: true });
  }
});
