class HelpBoardFilter {

    hbAllPosts = '#HB_AP';
    hbRequestHelp = '#HB_RE';
    hbOfferHelp = '#HB_OF';
    filterButton = '#HB_FI';
    backButton = '';
    expandWidget = '.arrow';
    hbLocationHeading = '#HB_LO';
    hbLocationInput = '.ant-select-selection-item';
    // hbLocationDropdown = 'HB_LO_EAZ_list_0';
    hbLocationSubtext = 'small';
    hbShareLocation = '#HB_LO_SL';
    hbProvidersHeading = '#HB_PV';
    hbTypeHeading = '#HB_TP';
    hbProvidersAndType = '.am-accordion-content-box a';
    quitFiltersButton = '#HB_FI_QF';
    viewResultsButton = '#HB_FI_VR';
    cookieBanner = '#cookie-banner-close';

    constructor() {}

    visit() {
        cy.visit('feed');
    }

    getHbAllPosts() {
        return cy.get(this.hbAllPosts);
    }

    getHbRequestHelp() {
        return cy.get(this.hbRequestHelp);
    }

    getHbOfferHelp() {
        return cy.get(this.hbOfferHelp);
    }

    getFilterButton () {
        return cy.get(this.filterButton);
    }

    getBackButton () {
        return cy.get(this.backButton);
    }

    getExpandWidget () {
        return cy.get(this.expandWidget);
    }

    getHbLocationHeading () {
        return cy.get(this.hbLocationHeading);
    }

    getHbLocationInput () {
        return cy.get(this.hbLocationInput);
    }

    // hetHbLocationDropdown () {
    //     return cy.get(this.hbLocationDropdown);
    // }

    getHbLocationSubtext () {
        return cy.get(this.hbLocationSubtext);
    }

    getHbShareLocation () {
        return cy.get(this.hbShareLocation);
    }

    getHbProvidersHeading () {
        return cy.get(this.hbProvidersHeading);
    }

    getHbTypeHeading () {
        return cy.get(this.hbTypeHeading);
    }

    getHbProvidersAndType () {
        return cy.get(this.hbProvidersAndType);
    }

    getQuitFiltersButton () {
        return cy.get(this.quitFiltersButton);
    }

    getViewResultsButton () {
        return cy.get(this.viewResultsButton);
    }

    getCookieBanner () {
        return cy.get(this.cookieBanner);
    }
}

export default HelpBoardFilter;