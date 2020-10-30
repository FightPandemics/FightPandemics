class CookieBanner {
  cookieBanner = '#cookie-banner-text'
  cookieBannerClose = '#cookie-banner-close'
  cookieBannerCookiesPolicy = '#cookie-banner-cookies-policy'
  cookieBannerPrivacyPolicy = '#cookie-banner-privacy-policy'
  cookieBannerTermsAndConditions = '#cookie-banner-terms-and-conditions'

  constructor() {}

  getCookieBanner() {
    return cy.get(this.cookieBanner)
  }

  getCookieBannerClose() {
    return cy.get(this.cookieBannerClose)
  }

  getCookieBannerCookiesPolicy() {
    return cy.get(this.cookieBannerCookiesPolicy)
  }

  getCookieBannerPrivacyPolicy() {
    return cy.get(this.cookieBannerPrivacyPolicy)
  }

  getCookieBannerTermsAndConditions() {
    return cy.get(this.cookieBannerTermsAndConditions)
  }
}

export default CookieBanner
