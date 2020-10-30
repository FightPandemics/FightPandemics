class HelpBoardFilter {
  hbAllPosts = '#HB_AP';
  hbRequestHelp = '#HB_RE';
  hbOfferHelp = '#HB_OF';
  filterButton = '#HB_FI';
  backButton = 'button > svg';
  hbLocationHeading = '.filter-1 .am-accordion-header';
  hbLocationInput = '.ant-select-selection-item';
  hbLocationDropdown = '.ant-select-dropdown';
  hbLocationSubtext = 'small';
  hbShareLocation = '#HB_LO_SL';
  hbProvidersHeading = '.filter-2 .am-accordion-header';
  hbProvidersTags = '.filter-2 a';
  hbTypeHeading = '.filter-3 .am-accordion-header';
  hbTypeTags = '.filter-3 a';
  quitFiltersButton = '#HB_FI_QF';
  applyFiltersButton = '#HB_FI_VR';
  closeSelectedTags = 'div a.am-button.tag-closable';

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

  getFilterButton() {
    return cy.get(this.filterButton);
  }

  getBackButton() {
    return cy.get(this.backButton);
  }

  getHbLocationHeading() {
    return cy.get(this.hbLocationHeading);
  }

  getHbLocationInput() {
    return cy.get(this.hbLocationInput);
  }

  getHbLocationDropdown() {
    return cy.get(this.hbLocationDropdown);
  }

  getHbLocationSubtext() {
    return cy.get(this.hbLocationSubtext);
  }

  getHbShareLocation() {
    return cy.get(this.hbShareLocation);
  }

  getHbProvidersHeading() {
    return cy.get(this.hbProvidersHeading);
  }

  getHbProvidersTags() {
    return cy.get(this.hbProvidersTags);
  }

  getHbTypeHeading() {
    return cy.get(this.hbTypeHeading);
  }

  getHbTypeTags() {
    return cy.get(this.hbTypeTags);
  }

  getQuitFiltersButton() {
    return cy.get(this.quitFiltersButton);
  }

  getApplyFiltersButton() {
    return cy.get(this.applyFiltersButton);
  }

  getCloseSelectedTags() {
    return cy.get(this.closeSelectedTags);
  }
}

export default HelpBoardFilter;
