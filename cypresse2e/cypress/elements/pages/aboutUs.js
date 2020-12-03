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
  getToPressKitButton = "#root > div > div > div.am-drawer-content > main > div > div.sc-jOFreG.dCiTET > div > a";
  goToPressKitLink = "https://www.notion.so/fightpandemics/Press-Kit-7146b85a49c848ec8395c0cadf3371b5";
  currentCommunityPartnerCSS = "#root > div > div > div.am-drawer-content > main > div > div:nth-child(8) > div";
  lifetimeSupportersContainerCSS = "#root > div > div > div.am-drawer-content > main > div > div:nth-child(9) > div:nth-child(4)";
  currentSupportersContainerCSS = "#root > div > div > div.am-drawer-content > main > div > div:nth-child(9) > div:nth-child(7)";
  pastSupportersContainerCSS = "#root > div > div > div.am-drawer-content > main > div > div:nth-child(9) > div:nth-child(10)";


  constructor() {
  }

  getInvolvedButton() {
    return cy.get(this.involvedButton);
  }


  getInvolvedCloseButton() {
    return cy.get(this.involvedCloseButton);
  }

  getSupporterContainer(supporterContainerCSS) {
    return cy.get(supporterContainerCSS);
  }

}

export default AboutUs;
