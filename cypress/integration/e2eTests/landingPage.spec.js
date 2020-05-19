context('FightPandemics', () => {
    beforeEach(() => {
      cy.visit(Cypress.config().baseUrl)
    })
    
    it('Need Help ', () => {
      cy.get('div.sc-fzoLsD.fYZyZu > div:nth-child(1) > a > div')
        .click();
      cy.get('div.rsw_2f.rsw_3G > div > h2')
      //   .click();
      // cy.get('.alert.alert-danger > ul > li')
      //   .first()
        .should('have.text', 'What type of help do you need?')
    })
    
    // it('Shop - Subscribe - invalid email address', () => {
    //   cy.get('.hidden-xs-down')
    //     .click();
    //   cy.get('.alert')
    //     .first()
    //     .should('contain.text', 'Invalid email address.')
    // })
    
   })