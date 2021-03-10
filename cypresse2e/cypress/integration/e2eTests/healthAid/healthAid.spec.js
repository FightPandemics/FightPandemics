import HealthAid from "../../../elements/pages/healthAid";
import Logo from "../../../elements/pages/fpLogo";
import inputValues from "../../../fixtures/inputValues.json";

describe("FightPandemics Health Aid Page for  user", () => {
  const healthAid = new HealthAid();
  const logo = new Logo();
  var shareLocationText =
    "Share your location if you want to see your nearest health facilities";
  var enterAddressSmallText = "Enter address, zip code, or city";

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

    it("location search input textbox is visible and clickable", () => {
      healthAid.getAdressSearchInput().should("be.visible").click();
    });

    it("enter adress to search nearest health facility, list of nearest locations should be visible and clickable", () => {
      healthAid
        .getAdressSearchInput()
        .click()
        .type(inputValues.searchHealthFacilityByAdress);

      healthAid
        .getListOfNearestLocations()
        .find(healthAid.nearestLocationsTagName)
        .contains(inputValues.searchHealthFacilityByAdress)
        .click();
    });

    it("'Enter address, zip code, or city' is visible", () => {
      healthAid
        .getEnterAddressText()
        .should("be.visible")
        .contains(enterAddressSmallText);
    });
  });
});
