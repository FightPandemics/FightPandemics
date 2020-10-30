class HomePage {
  requestHelpButton = '#HP_RE'
  offerHelpButton = '#HP_OF'
  viewHelpBoardLink = '#HP_VHB'
  viewHelpBoardLinkParent = '#HP_VHB'
  h1Heading = 'h1'
  subHeading1 = 'div > p:nth-child(3)'
  subHeading2 = 'div > p:nth-child(4)'

  constructor() {}

  visit() {
    cy.visit('')
  }

  getRequestHelpButton() {
    return cy.get(this.requestHelpButton)
  }

  getOfferHelpButton() {
    return cy.get(this.offerHelpButton)
  }

  getViewHelpBoardLink() {
    return cy.get(this.viewHelpBoardLink)
  }

  getH1Heading() {
    return cy.get(this.h1Heading)
  }

  getSubHeading1() {
    return cy.get(this.subHeading1)
  }

  getSubHeading2() {
    return cy.get(this.subHeading2)
  }
}
export default HomePage
