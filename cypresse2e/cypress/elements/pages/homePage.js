class HomePage{

    requestHelpButton = "#HP_RE";
    offerHelpButton = "#HP_OF";
    viewHelpBoardLink = "#HP_VHB";
    viewHelpBoardLinkParent = "#HP_VHB";
    h1Heading = "h1";
    subHeading1 = "div > p:nth-child(3)";
    subHeading2 = "div > p:nth-child(4)";
    cookieBanner = "#cookie-banner-text";
    cookieBannerClose = "#cookie-banner-close";
    cookieBannerCookiesPolicy = "#cookie-banner-cookies-policy";
    cookieBannerPrivacyPolicy = "#cookie-banner-privacy-policy";
    cookieBannerTermsAndConditions = "#cookie-banner-terms-and-conditions";

    constructor(){}

    visit(){
        cy.visit('');
    }

    getRequestHelpButton(){
        return cy.get(this.requestHelpButton);
    }

    getOfferHelpButton(){
        return cy.get(this.offerHelpButton);
    }

    getViewHelpBoardLink(){
        return cy.get(this.viewHelpBoardLink);
    }

    getH1Heading(){
        return cy.get(this.h1Heading);
    }

    getSubHeading1(){
        return cy.get(this.subHeading1);
    }

    getSubHeading2(){
        return cy.get(this.subHeading2);
    }

    getCookieBanner() {
        return cy.get(this.cookieBanner);
    }

    getCookieBannerClose() {
        return cy.get(this.cookieBannerClose);
    }

    getCookieBannerCookiesPolicy() {
        return cy.get(this.cookieBannerCookiesPolicy);
    }

    getCookieBannerPrivacyPolicy() {
        return cy.get(this.cookieBannerPrivacyPolicy);
    }

    getCookieBannerTermsAndConditions() {
        return cy.get(this.cookieBannerTermsAndConditions);
    }

}
export default HomePage;
