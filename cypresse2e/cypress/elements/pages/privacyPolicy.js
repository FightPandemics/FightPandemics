class privacyPolicy {
  privacyPolicyH2 = '//*[@id="root"]/div/div/div[3]/main/div/div/h2';

  constructor() {}

  visit() {
    cy.visit("privacy-policy");
  }

  getPrivacyPolicyH2() {
    return cy.xpath(this.privacyPolicyH2);
  }

  getPolicyContent() {
    return cy.get(this.policyContent);
  }
}
export default privacyPolicy;
