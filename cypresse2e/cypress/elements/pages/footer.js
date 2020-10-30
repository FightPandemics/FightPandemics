class Footer {
  copyright = 'footer div:nth-child(1)'
  aboutUs = 'footer a:nth-child(1)'
  faq = 'footer a:nth-child(2)'
  blog = 'footer a:nth-child(3)'
  termsAndConditions = 'footer a:nth-child(4)'
  privacyPolicy = 'footer a:nth-child(5)'
  cookiesPolicy = 'footer a:nth-child(6)'

  constructor() {}

  visit() {
    cy.visit('')
  }

  getCopyright() {
    return cy.get(this.copyright)
  }

  getAboutUs() {
    return cy.get(this.aboutUs)
  }

  getFaq() {
    return cy.get(this.faq)
  }

  getBlog() {
    return cy.get(this.blog)
  }

  getTermsAndConditions() {
    return cy.get(this.termsAndConditions)
  }

  getPrivacyPolicy() {
    return cy.get(this.privacyPolicy)
  }

  getCookiesPolicy() {
    return cy.get(this.cookiesPolicy)
  }
}

export default Footer
