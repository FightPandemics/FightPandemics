import HealthAid from "../../../elements/pages/healthAid";
import Logo from "../../../elements/pages/fpLogo";
import inputValues from "../../../fixtures/inputValues.json";

describe("FightPandemics Health Aid Page for  user", () => {
  const healthAid = new HealthAid();
  const logo = new Logo();
  var shareLocationText =
    "Share your location if you want to see your nearest health facilities";

  context("User opens Health Aid page", () => {
    beforeEach(() => {
      healthAid.visit();
    });

    it("FP logo is visible and clickable", () => {
      cy.checkFpLogoIsVisibleAndClickable(logo.getFpLogoLocator());
    });

    it("'share your location to see nearest health care facility' is visible", () => {
      healthAid
        .getShareLocationTextElement()
        .should("be.visible")
        .contains(shareLocationText);
    });
  });
});
