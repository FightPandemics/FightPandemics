import HelpBoard from '../../../elements/pages/helpBoard'
import Post from '../../../elements/pages/post'

describe('FightPandemics Post for unauthorized user', () => {

    const helpBoard = new HelpBoard();
    const post = new Post();
    const shareViaModalWindowTitle = "Share via..."
 

    context('User opens Help Board', () => {
        beforeEach(() => {
            helpBoard.visit();
        });

        it('Unauthorized user is redirected to SignIn page when clicking on Like button', () => {        
            cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(($firstPost) => { 
                cy.get(post.getLikeButtonSelector()).click();
                cy.validateNewScreenIsOpen("auth/login");
            })                                                      
        });

        it('Unauthorized user is redirected to SignIn page when clicking on Comment button', () => {     
            cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(($firstPost) => { 
                cy.get(post.getCommentButtonSelector()).click();
                cy.validateNewScreenIsOpen("auth/login");
            })                                          
        });

        it('Unauthorized user can share a post. Share via... modal window is diplayed.', () => {    
            cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(($firstPost) => { 
                post.getShareButton().click();
            })  
            cy.get(post.getModalWindowShareViaSelector()).within(($modalWindow) => { 
                var modalWindowTitle = post.getModalWindowShareViaH4Title();
                modalWindowTitle.should('be.visible').contains(shareViaModalWindowTitle);
                var modalWindowEmailButton = post.getModalWindowOrgPostButton();
                modalWindowEmailButton.should('have.attr', 'title', 'Org post').and('be.visible'); 
                var modalWindowFacebookButton = post.getModalWindowFacebookButton();
                modalWindowFacebookButton.should('have.attr', 'aria-label', 'facebook').and('be.visible'); 
                var modalWindowLinkedinButton = post.getModalWindowLinkedinButton();
                modalWindowLinkedinButton.should('have.attr', 'aria-label', 'linkedin').and('be.visible');
                var modalWindowRedditButton = post.getModalWindowRedditButton();
                modalWindowRedditButton.should('have.attr', 'aria-label', 'reddit').and('be.visible');
                var modalWindowTelegramButton = post.getModalWindowTelegramButton();
                modalWindowTelegramButton.should('have.attr', 'aria-label', 'telegram').and('be.visible');
                var modalWindowTwitterButton = post.getModalWindowTwitterButton();
                modalWindowTwitterButton.should('have.attr', 'aria-label', 'twitter').and('be.visible');
                var modalWindowWhatsappButton = post.getModalWindowWhatsappButton();
                modalWindowWhatsappButton.should('have.attr', 'aria-label', 'whatsapp').and('be.visible');
                var sharingPostLink = post.getModalWindowSharingUrlInput();
                sharingPostLink.should('have.attr', 'value').and('contain', "/post/");
                var closeModalWindowButton = post.getModalWindowCloseButton();
                closeModalWindowButton.should('be.visible').click();
            

            })
            post.getModalWindowShareVia().should('not.exist');                                                       
        });

        it('Unauthorized user can click on a post header and is redirected to the post\'s author screen', () => {     
            cy.get(helpBoard.getFirstPostOnHelpBoardSelector()).within(($firstPost) => { 
                post.getPostHeader().click();
                cy.validateNewScreenIsOpen("organisation");
            })                                          
        });
});

});
