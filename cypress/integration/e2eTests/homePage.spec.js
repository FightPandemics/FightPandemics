import HomePage from './homePage';

const home = new HomePage();

context('FightPandemics', () => {
  beforeEach(() => {

    home.visit();
  })

  it('Landing Page contains all elements', () => {
    home.getFirstLineText().should('have.text', 'Pandemics will continue to happen.');
    home.getSecondLineText().should('have.text', 'We help communities prepare and respond.');
    home.getLogo().should('be.visible');
    home.getNeedHelpElement().should(($div) => {
      const text = $div.text()
      expect(text).to.include('Need Help')
    })
      .and('be.visible');
    home.getGiveHelpElement().should(($div) => {
      const text = $div.text()
      expect(text).to.include('Give Help')
    })
      .and('be.visible');

  })


})