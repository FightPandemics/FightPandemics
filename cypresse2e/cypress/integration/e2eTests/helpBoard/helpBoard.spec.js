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

        it('Unauthorized user is redirected to SignIn page when cliking Add Post Button', () => {          
            var addPostButton = helpBoard.getAddPostButton();
            addPostButton.click({ force: true });
            validateSignInScreenIsOpen();
        });

        it('Unauthorized user sees a message that posts are not available - Help Board is empty', () => {     
            //there is no post on the Help Board
            cy.get("body").then($body => {
                if ($body.find(helpBoard.getaddPostLink()).length > 0) {   
                    helpBoard.getNoPostsAvailableTextElement().contains(noPostsAvailableText);
                    var addPostLink = helpBoard.getaddPostLinkElement();
                    addPostLink.click({ force: true });
                    validateSignInScreenIsOpen();  
                }else{
                    cy.log("THERE IS A POST ON THE HELP BOARD");
                
                }
            });              
          });

        it('Unauthorized user is redirected to SignIn page when clicking on Like button', () => {     
            //there is a post on the Help Board     
            cy.get("body").then($body => {
                if ($body.find(helpBoard.getHelpBoardSelector()).length > 0) {   
                    cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(($firstPost) => { 
                        cy.get(helpBoard.getLikeButtonSelector()).click();
                        validateSignInScreenIsOpen();
                    })                                  
                }
            });          
        });

        it('Unauthorized user is redirected to SignIn page when clicking on Comment button', () => {     
        //there is a post on the Help Board     
            cy.get("body").then($body => {
                if ($body.find(helpBoard.getHelpBoardSelector()).length > 0) {   
                    cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(($firstPost) => { 
                        cy.get(helpBoard.getCommentButtonSelector()).click();
                        validateSignInScreenIsOpen();
                    })                              
                }  
            });
      });
});

    function validateSignInScreenIsOpen(){
        cy.on("url:changed", (newUrl) => {
            expect(newUrl).to.contain("auth/login")
          })
    }

});