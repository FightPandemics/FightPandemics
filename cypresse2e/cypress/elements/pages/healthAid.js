class HealthAid {
  shareLocationTextElement = " div.sc-gySEy.kVuBbU > h1";
  enterAdressSpace = "#NH_LS_EAZ";
  nearestHospitalsFacility = "#NH_FT0";
  nearestDoctorsFacility = "#NH_FT1";
  nearestPharmacies = "#NH_FT2";
  moreResultsLink = ".sc-hiNaWY.jVmBxt >div >div >a";
  showGoogleMap =
    ".sc-jldpZZ.gjOvfh > div > div > div > div > div:nth-child(1)";
  locationTextbox = "#NH_LC_EAZ";

  constructor() {}

  visit() {
    cy.visit("nearest-hospital");
  }

  getShareLocationTextElement() {
    return cy.get(this.shareLocationTextElement);
  }

  getEnterAdressSpace() {
    return cy.get(this.enterAdressSpace);
  }

  getNearestHospitalsFacility() {
    return cy.get(this.nearestHospitalsFacility);
  }

  getNearestDoctorssFacility() {
    return cy.get(this.nearestDoctorsFacility);
  }

  getNearestPharmaciesFacility() {
    return cy.get(this.nearestPharmaciesFacility);
  }

  getMoreResultsLink() {
    return cy.get(this.moreResultsLink);
  }
}
export default HealthAid;
