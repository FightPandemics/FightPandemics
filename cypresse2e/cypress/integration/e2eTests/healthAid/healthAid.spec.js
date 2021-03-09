import HealthAid from "../../../elements/pages/healthAid";
import Logo from "../../../elements/pages/fpLogo";
import inputValues from "../../../fixtures/inputValues.json";
import errorMessages from "../../../fixtures/errorMessages.json";

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

    it("location search input textbox is visible and clickable", () => {
      healthAid.getAdressSearchInput().should("be.visible").click();
      //.and("have.attr", "type", "search");
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
      //cy.get(" div[role='presentation'].am-drawer-overlay").should(
      //  "be.visible",
      //      );
    });

    /* it("enter adress to search nearest health facility, hospitals, doctors, pharmacies tags  should be visible", () => {
      healthAid
        .getAdressSearchInput()
        .click()
        .type(inputValues.searchHealthFacilityByAdress + "{enter}");
      healthAid.getNearestHospitalsFacility().should("be.visible");
      healthAid.nearestDoctorsFacility().should("be.visible");
      healthAid.nearestPharmacies().should("be.visible");
      // healthAid.getMoreSearchResultsLink().should("be.visible");
      // healthAid.getGoogleMap().should("be.visible");
    });*/

    it("entering adress that doesn't exist, will not show facilities", () => {
      // healthAid.getAdressSearchContainer().click();
      healthAid
        .getAdressSearchInput()
        .click()
        .type(inputValues.searchHealthFacilityByAdressDoesnotExist);
      healthAid
        .getFailedPredictionsMessage()
        .should("be.visible")
        .contains("small", errorMessages.failedPredictionsTextMessage);
    });
  });
});
