class AboutUs {
  linkedInButton = "#AU_LN";
  facebookButton = "#AU_FB";
  instagramButton = "#AU_IG";
  twitterButton = "#AU_TW";
  involvedCloseButton = ".ant-modal-close";
  involvedButton = "#AU_GI";
  joinAsVolunteerButton = "#AU_GI_JV";
  joinAsVolunteerLink = "https://apply.workable.com/fightpandemics";
  joinAsAmbassadorButton = "#AU_GI_JA";
  joinAsAmbassadorLink = "https://apply.workable.com/fightpandemics/j/46D6EF3B44/";
  joinStudentProgramButton = "#AU_GI_JSP";
  joinStudentProgramLink = "https://apply.workable.com/fightpandemics/j/58B157AAB2/";
  getToHelpBoardButton = "#AU_VHB";
  goToHelpBoardLink = "/feed";
  lifetimeSupportersContainerXpath = "//*[@id=\"root\"]/div/div/div[3]/main/div/div[8]/div[1]";
  currentSupportersContainerXpath = "//*[@id=\"root\"]/div/div/div[3]/main/div/div[8]/div[2]";
  pastSupportersContainerXpath = "//*[@id=\"root\"]/div/div/div[3]/main/div/div[8]/div[3]";


  constructor() {}

  getInvolvedButton() {
    return cy.get(this.involvedButton);
  }


  getInvolvedCloseButton() {
    return cy.get(this.involvedCloseButton);
  }

  getSupporterContainer(supporterContainerXpath) {
    return cy.xpath(supporterContainerXpath);
  }

}

export default AboutUs;
