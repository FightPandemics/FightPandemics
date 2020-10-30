class Header {
  aboutUsLink = 'li #NAV_AU'
  helpBoardLink = 'li #NAV_HB'
  signInLink = 'li #NAV_SI'
  joinNowLink = 'li #NAV_JN'
  feedbackButton = 'button#NAV_FDB'
  globeIconLanguages = 'img#NAV_LS'

  constructor() {}

  visit() {
    cy.visit('')
  }

  getAboutUsLink() {
    return cy.get(this.aboutUsLink)
  }

  getHelpBoardLink() {
    return cy.get(this.helpBoardLink)
  }

  getSignInLink() {
    return cy.get(this.signInLink)
  }

  getJoinNowLink() {
    return cy.get(this.joinNowLink)
  }

  getFeedbackButton() {
    return cy.get(this.feedbackButton)
  }

  getGlobeIconLanguages() {
    return cy.get(this.globeIconLanguages)
  }
}
export default Header
