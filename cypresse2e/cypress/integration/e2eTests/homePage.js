class HomePage {
  visit() {
    cy.visit(Cypress.config().baseUrl);
  }

  getFirstLineText() {
    return cy.get('h1 ~ p:nth-child(2)');
  }

  getSecondLineText() {
    return cy.get('h1 ~ p:nth-child(3)');
  }

  getLogo() {
    return cy.get('div.am-navbar-left > a > img')
  }
  getNeedHelpElement() {
    return cy.get('div:nth-child(1) > a > div');
  }

  getGiveHelpElement() {
    return cy.get('div:nth-child(2) > a > div');
  }

}
export default HomePage;