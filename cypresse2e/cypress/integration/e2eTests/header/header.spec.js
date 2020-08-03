import Header from '../../../elements/pages/Header';

describe('FightPandemics Navigation bar', () => {

  const header = new Header();

    context('When user is not logged in Register and Login button are visible', () => {
        beforeEach(() => {
            header.visit();
          });
 
      it('Logo is present and visible', () => {
        header.getLogo().should('be.visible').and('have.attr', 'alt', 'Fight Pandemics logo');
      });

      it('Login and Registers buttons should be visible when user is not logged in', () => {
        var signInLink = header.getSignInLink();
        signInLink.should('be.visible').and('have.attr', 'href', '/auth/login');
        var joinInLink = header.getJoinNowLink();
        joinInLink.should('be.visible').and('have.attr', 'href', '/auth/signup');
      });
  
      it('About us, Help Board and Feedback buttons are visible', () => {
        header.getAboutUsLink().should('be.visible').and('have.attr', 'href', '/about-us');
        header.getHelpBoardLink().should('be.visible').and('have.attr', 'href', '/feed');
        header.getFeedbackButton().find('img').should('have.attr', 'alt','Icon')
      })
    });
})