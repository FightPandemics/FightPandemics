describe('FightPandemics Navigation bar', () => {
    context('When user is not logged in Register and Login button are visible', () => {
        beforeEach(() => {
          cy.visit('http://localhost');
          });
  
      it('Login button should be visible when user is not logged in', () => {
        cy.get('a[href^="/auth/login"]').should('be.visible').and('have.attr', 'href', '/auth/login')
      });
  
      it('Register button should be visible when user is not logged in', () => {
        cy.get('a.registerLink').should('be.visible').and('have.attr', 'href', '/auth/signup')
      })
    });
})
