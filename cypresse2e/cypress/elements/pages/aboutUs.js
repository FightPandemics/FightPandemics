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
  getToPressKitButton = "#AU_PR";
  goToPressKitLink = "https://www.notion.so/fightpandemics/Press-Kit-7146b85a49c848ec8395c0cadf3371b5";
  currentCommunityPartnerXpath = "//*[@id=\"root\"]/div/div/div[3]/main/div/div[8]/div";
  lifetimeSupportersContainer = "#AU_LS";
  currentSupportersContainer = "#AU_CS";
  pastSupportersContainer = "#AU_PS";


  constructor() {
  }

  getInvolvedButton() {
    return cy.get(this.involvedButton);
  }


  getInvolvedCloseButton() {
    return cy.get(this.involvedCloseButton);
  }

  getSupporterContainerXpath(supporterContainer) {
    return cy.xpath(supporterContainer);
  }

  getSupporterContainer(supporterContainer) {
    return cy.get(supporterContainer);
  }

}

export default AboutUs;
