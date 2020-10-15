class Header{
    fightPandemicsLogo = 'div.am-navbar-left img';
    aboutUsLink = 'li #NAV_AU';
    helpBoardLink = 'li #NAV_HB';
    signInLink = 'li #NAV_SI';
    joinNowLink = 'li #NAV_JN';
    feedbackButton = 'button#NAV_FDB';

    constructor(){}

    visit(){
        cy.visit('');
    }   

    getLogo(){
        return cy.get(this.fightPandemicsLogo);
    }

    getFpLogoLocator() {
        return this.fightPandemicsLogo;
    }

    getAboutUsLink(){
        return cy.get(this.aboutUsLink);
    }

    getHelpBoardLink(){
        return cy.get(this.helpBoardLink);
    }
    
    getSignInLink(){
        return cy.get(this.signInLink);
    }

    getJoinNowLink(){
        return cy.get(this.joinNowLink);
    } 
    
    getFeedbackButton(){
        return cy.get(this.feedbackButton);
    }
}
export default Header;