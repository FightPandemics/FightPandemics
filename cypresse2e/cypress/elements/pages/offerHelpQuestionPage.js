class OfferHelpQuestionPage {
  questionNumberOne = "h5";
  questionOne = "h2";
  checkboxOptionOne = "div#OFS1_VO";
  checkboxOptionTwo = "div#OFS1_DI";
  checkboxOptionThree = "div#OFS1_ORG";
  nextButtonOne = "a#OF1_NE";
  backButtonOne = "a#OF1_BA";

  questionNumberTwo = "h5";
  questionTwo = "h2";
  infoText = "h2~p";
  locationInputLine = "input.ant-select-selection-search-input";
  locationInputInfo = "div small";
  locationDropdown = ".ant-select-item-option";
  shareMyLocationIcon = 'div#OFS2_SL img[alt = "Icon"]';
  shareMyLocationText = "div#OFS2_SL";
  showMePostLink = "a#OFS2_SA span";
  nextButtonTwo = "a#OF2_NE";
  backButtonTwo = "a#OF2_BA";

  constructor() {}

  visitOfferHelpOne() {
    cy.visit("offer-help");
  }

  visitOfferHelpTwo() {
    cy.visit("offer-help#Step2");
  }

  getQuestionNumberOne() {
    return cy.get(this.questionNumberOne);
  }

  getQuestionNumberTwo() {
    return cy.get(this.questionNumberTwo);
  }

  getQuestionOne() {
    return cy.get(this.questionOne);
  }

  getQuestionTwo() {
    return cy.get(this.questionTwo);
  }

  getCheckboxOptionOne() {
    return this.checkboxOptionOne;
  }

  getCheckboxOptionTwo() {
    return this.checkboxOptionTwo;
  }

  getCheckboxOptionThree() {
    return this.checkboxOptionThree;
  }

  getNextButtonOne() {
    return cy.get(this.nextButtonOne);
  }

  getBackButtonOne() {
    return cy.get(this.backButtonOne);
  }

  getInfoText() {
    return cy.get(this.infoText);
  }

  getLocationInputLine() {
    return cy.get(this.locationInputLine);
  }

  getLocationInputInfo() {
    return cy.get(this.locationInputInfo);
  }

  getLocationDropdown() {
    return cy.get(this.locationDropdown);
  }

  getShareMyLocationIcon() {
    return cy.get(this.shareMyLocationIcon);
  }

  getShareMyLocationText() {
    return cy.get(this.shareMyLocationText);
  }

  getShowMePostLink() {
    return cy.get(this.showMePostLink);
  }

  getNextButtonTwo() {
    return cy.get(this.nextButtonTwo);
  }

  getBackButtonTwo() {
    return cy.get(this.backButtonTwo);
  }
}

export default OfferHelpQuestionPage;
