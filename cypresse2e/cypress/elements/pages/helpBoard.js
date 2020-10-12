class HelpBoard{

    fpLogo = '.am-navbar.am-navbar-light a img';
    helpBoardpageTitle = 'h1';
    addPostButton = 'button > img#HB_CP'
    noPostsAvailableTextElement = '//*/a[@id="HB_CP"]//parent::div';
    addPostLink = 'a#HB_CP';
    firstPostOnHelpBoard = 'div.feed-posts > div:nth-child(1) > div > div > div:nth-child(1)'
    helpBoard = 'div.feed-posts'


    constructor() { }

    visit() {
        cy.visit('feed');
    }

    getFpLogoLocator() {
        return this.fpLogo;
    }

    getHelpBoardPageTitleLocator() {
        return this.helpBoardpageTitle;
    }

    getAddPostButton(){
        return cy.get(this.addPostButton);
    }

    getNoPostsAvailableDiv(){
        return this.noPostsAvailableTextElement;
    }

    getaddPostLink(){
        return this.addPostLink;
    }

    getaddPostLinkElement(){
        return cy.get(this.addPostLink);
    }
    
    getNoPostsAvailableTextElement(){
        return cy.xpath(this.noPostsAvailableTextElement);
    }

    getFirstPostOnHelpBoard(){
        return cy.get(this.getFirstPostOnHelpBoard);
    }

    getFirstPostOnHelpBoardSelector(){
        return this.firstPostOnHelpBoard;
    }

    getHelpBoardSelector(){
        return this.helpBoard;
    }

}

export default HelpBoard;