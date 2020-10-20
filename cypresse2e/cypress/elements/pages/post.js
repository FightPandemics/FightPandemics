class Post{

    likeButton = 'div[id^="HB_LK"]';
    commentButton = 'div[id^="HB_CM"]';
    shareButton = 'div[id^="PO_SH"]';
    postHeader = 'div.card-header';
    postTitle = 'h4';
    postAuthorUrl = 'div.card-header > a';
    postTags = 'div.am-card-body';
    postPageLink = 'a[href^="/post/"]';
    modalWindowShareVia = 'div[role="document"]';
    modalWindowShareViaH4Title = 'div.am-modal-body h4';
    modalWindowCloseButton = 'span.am-modal-close-x';
    modalWindowEmailButton = 'button[aria-label="email"]';
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

    getPostHeader(){
        return cy.get(this.postHeader);
    }

    getPostTitle(){
        return cy.get(this.postTitle);
    }

    getPostAuthorUrl(){
        return cy.get(this.postAuthorUrl);
    }

    getPostAuthorUrlSelector(){
        return this.postAuthorUrl;
    }

    getPostTags(){
        return cy.get(this.postTags);
    }

    getPostPageLink(){
        return cy.get(this.postPageLink);
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
    getModalWindowEmailButton(){
        return cy.get(this.modalWindowEmailButton);
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