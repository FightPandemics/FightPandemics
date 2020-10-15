import HelpBoard from '../../../elements/pages/helpBoard'

describe('FightPandemics Help Board Page for unauthorized user', () => {

    const helpBoard = new HelpBoard();
    var h1Heading = "Help Board";
    var noPostsAvailableText = "Sorry, there are currently no relevant posts available. Please try using a different filter search or";

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

        it('Unauthorized user is redirected to SignIn page when clicking Add Post Button', () => {          
            var addPostButton = helpBoard.getAddPostButton();
            addPostButton.click({ force: true });
            cy.validateCorrectScreenIsOpen("auth/login");
        });

        it('Unauthorized user sees a message that posts are not available - Help Board is empty', () => {     
            //there is no post on the Help Board
            cy.get("body").then($body => {
                if ($body.find(helpBoard.getAddPostLink()).length > 0) {   
                    helpBoard.getNoPostsAvailableTextElement().contains(noPostsAvailableText);
                    var addPostLink = helpBoard.getAddPostLinkElement();
                    addPostLink.click({ force: true });
                    cy.validateCorrectScreenIsOpen("auth/login");
                }else{
                    cy.log("THERE IS A POST ON THE HELP BOARD");
                
                }
            });              
          });
});


});