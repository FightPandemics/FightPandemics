import HelpBoard from '../../../elements/pages/helpBoard';
import Logo from '../../../elements/pages/fpLogo';

describe('FightPandemics Help Board Page for unauthorized user', () => {
  const helpBoard = new HelpBoard();
  const logo = new Logo();
  var noPostsAvailableText =
    'Sorry, there are currently no relevant posts available. Please try using a different filter search or';

  context('User opens Help Board', () => {
    beforeEach(() => {
      helpBoard.visit();
    });

    it('FP logo is visible and clickable', () => {
      cy.checkFpLogoIsVisibleAndClickable(logo.getFpLogoLocator());
    });

    it('Unauthorized user is redirected to SignIn page when clicking Add Post Button', () => {
      helpBoard.getAddPostButton().click({ force: true });
      cy.validateCorrectScreenIsOpen('auth/login');
    });

    it.skip('Help Board is empty - Unauthorized user is redirected to SignIn page when clicking Add Post link', () => {
      //there is no post on the Help Board
      helpBoard.getNoPostsAvailableTextElement().contains(noPostsAvailableText);
      var addPostLink = helpBoard.getAddPostLinkElement();
      addPostLink.click({ force: true });
      cy.validateCorrectScreenIsOpen('auth/login');
    });
  });
});
