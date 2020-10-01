class HelpBoard{

    fpLogo = '.am-navbar.am-navbar-light a img';
    helpBoardpageTitle = 'h1';
    addPostButton = 'button > img#HB_CP'



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
        return cy.get(addPostButton);
    }

}

export default HelpBoard;