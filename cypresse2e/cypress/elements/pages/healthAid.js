class HealthAid {
  shareLocationTextElement = " div.sc-gySEy.kVuBbU > h1";
  // adressSearchContainer = "span.ant-select-selection-search";
  adressSearchInput = "#NH_LS_EAZ";
  //adressSearchInput = "#rc_select_3";
  listOfNearestLocations = ".rc-virtual-list";
  nearestLocationsTagName = "div";
  failedPredictionsMessage = "small[class='sc-ksluoS doFBMb']";
  //facilityAndLocationDiv = "div[class='sc-eYZppc eHSsiz']";
  // facilityDiv = ".sc-chKoCp.byftgK";
  // nearestHospitalsFacility = "#NH_FT0";
  //nearestDoctorsFacility = "#NH_FT1";
  // nearestPharmacies = "#NH_FT2";
  // moreSearchResultsLink = ".sc-hiNaWY.jVmBxt >div >div >a";
  // googleMap = ".sc-jldpZZ.gjOvfh > div > div > div > div > div:nth-child(1)";
  //locationDiv = "sc-kwxPTd eMNdDs";

  constructor() {}

  visit() {
    cy.visit("nearest-hospital");
  }

  getShareLocationTextElement() {
    return cy.get(this.shareLocationTextElement);
  }

  getAdressSearchContainer() {
    return cy.get(this.adressSearchContainer);
  }

  getAdressSearchInput() {
    return cy.get(this.adressSearchInput);
  }

  getListOfNearestLocations() {
    return cy.get(this.listOfNearestLocations);
  }

  getFailedPredictionsMessage() {
    return cy.get(this.failedPredictionsMessage);
  }
}
export default HealthAid;
