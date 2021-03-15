class HealthAid {
  // shareLocationTextElement = " div.sc-gySEy.kVuBbU > h1";
  shareLocationTextElement = "//h1";
  adressSearchInput = "#NH_LS_EAZ";
  listOfNearestLocations = ".rc-virtual-list";
  nearestLocationsTagName = "div";
  enterAddressText = "//small";

  constructor() {}

  visit() {
    cy.visit("nearest-hospital");
  }

  getShareLocationTextElement() {
    return cy.xpath(this.shareLocationTextElement);
  }

  getAdressSearchInput() {
    return cy.get(this.adressSearchInput);
  }

  getListOfNearestLocations() {
    return cy.get(this.listOfNearestLocations);
  }

  getEnterAddressText() {
    return cy.xpath(this.enterAddressText);
  }
}
export default HealthAid;
