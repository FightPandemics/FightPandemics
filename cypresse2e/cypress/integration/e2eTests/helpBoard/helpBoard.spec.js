import HelpBoard from '../../../elements/pages/helpBoard'

describe('FightPandemics Help Board Page for unauthorized user', () => {

    const helpBoard = new HelpBoard();
    var h1Heading = "Help Board";

    context('User opens Help Board', () => {
        beforeEach(() => {
            helpBoard.visit();
        });


        it('FP logo is visible and clickable', () => {
            cy.checkFpLogoIsVisibleAndClickable(helpBoard.getFpLogoLocator());

        });
        
        it('Help Board page contains heading', () => {          
            cy.pageContainsHeading(helpBoard.getHelpBoardPageTitleLocator(),h1Heading);
        });

        it('Unauthorized user is redirected to SignIn page when cliking Add Post Button', () => {          
            var addPostButton = helpBoard.getAddPostButton();
            addPostButton.click({ force: true });
            cy.on("url:changed", (newUrl) => {
                expect(newUrl).to.contain("auth/login")
              })
        });

    });
});