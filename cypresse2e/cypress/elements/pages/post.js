class Post{

    likeButton = 'div[id^="HB_LK"]';
    commentButton = 'div[id^="HB_CM"]';
    shareButton = 'div[id^="PO_SH"]';
    postHeader = 'div.card-header';
    postTitle = 'h4';
    modalWindowShareVia = 'div[role="document"]';
    modalWindowShareViaH4Title = 'div.am-modal-body h4';
    modalWindowCloseButton = 'span.am-modal-close-x';
    modalWindowOrgPostButton = 'button[aria-label="email"]';
    modalWindowFacebookButton = 'button[aria-label="facebook"]';
    modalWindowLinkedinButton = 'button[aria-label="linkedin"]';
    modalWindowRedditButton = 'button[aria-label="reddit"]';
    modalWindowTelegramButton = 'button[aria-label="telegram"]';
    modalWindowTwitterButton = 'button[aria-label="twitter"]';
    modalWindowWhatsappButton = 'button[aria-label="whatsapp"]';
    modalWindowSharingUrlInput = 'div > input[type=text]';


    constructor() { }

    getLikeButtonSelector(){
        return this.likeButton;
    }

    getCommentButtonSelector(){
        return this.commentButton;
    }

    getShareButton(){
        return cy.get(this.shareButton);
    }

    getShareButton(){
        return cy.get(this.shareButton);
    }

    getPostHeader(){
        return cy.get(this.postHeader);
    }

    getPostTitle(){
        return cy.get(this.postTitle);
    }
    
    getModalWindowShareViaSelector(){
        return this.modalWindowShareVia;
    }
    getModalWindowShareVia(){
        return cy.get(this.modalWindowShareVia);
    }
    getModalWindowShareViaH4Title(){
        return cy.get(this.modalWindowShareViaH4Title);
    }
    getModalWindowCloseButton(){
        return cy.get(this.modalWindowCloseButton);
    }
    getModalWindowOrgPostButton(){
        return cy.get(this.modalWindowOrgPostButton);
    }
    getModalWindowFacebookButton(){
        return cy.get(this.modalWindowFacebookButton);
    }
    getModalWindowLinkedinButton(){
        return cy.get(this.modalWindowLinkedinButton);
    }
    getModalWindowRedditButton(){
        return cy.get(this.modalWindowRedditButton);
    }
    getModalWindowTelegramButton(){
        return cy.get(this.modalWindowTelegramButton);
    }
    getModalWindowTwitterButton(){
        return cy.get(this.modalWindowTwitterButton);
    }
    getModalWindowWhatsappButton(){
        return cy.get(this.modalWindowWhatsappButton);
    }
    getModalWindowSharingUrlInput(){
        return cy.get(this.modalWindowSharingUrlInput);
    }
}

export default Post;