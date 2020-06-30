describe('FightPandemics Home screen', () => {
    context('User opens Home screen ', () => {
        beforeEach(() => {
            cy.visit('http://localhost');
          });
  
      it('Home screen greetings H1', () => {
        cy.contains('h1', 'A place to offer and receive help')
      });

      it('Subheading', () => {
        cy.contains('div > p:nth-child(3)', 'Pandemics will continue to happen.')
        cy.contains('div > p:nth-child(4)', 'We help communities prepare and respond.')
      });

      it('Link to Feed screen - View comunity posting', () => {
        cy.get('a[href^="/feed"]').should('be.visible').and('have.attr', 'href', '/feed')
        cy.contains('a p', 'View Community Postings')
      });
    });
})
