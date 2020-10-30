import HelpBoardFilter from '../../../elements/pages/helpBoardFilterPanel';
import CookieBanner from '../../../elements/pages/cookieBanner';
import inputValues from '../../../fixtures/inputValues';

describe('FightPandemics Help Board Filters', () => {
  const helpBoardFilter = new HelpBoardFilter();
  const cookieBanner = new CookieBanner();

  context('Filtering posts by offer help or request help on Help Board', () => {
    beforeEach(() => {
      helpBoardFilter.visit();
    });

    it('Offering Help filter on Help Board is visible and clickable', () => {
      seeAndClickElement(helpBoardFilter.getHbOfferHelp());
    });

    it('Requesting Help filter on Help Board is visible and clickable', () => {
      seeAndClickElement(helpBoardFilter.getHbRequestHelp());
    });

    it('All Posts filter on Help Board is visible and clickable', () => {
      seeAndClickElement(helpBoardFilter.getHbAllPosts());
    });

    it('Filters button on Help Board is visible and clickable', () => {
      seeAndClickElement(helpBoardFilter.getFilterButton());
    });

    it('Quit Filters button is visible and clickable', () => {
      seeAndClickElement(helpBoardFilter.getFilterButton());
      closeCookieBanner();
      seeAndClickElement(helpBoardFilter.getQuitFiltersButton());
    });

    it('Back button is visible and clickable', () => {
      seeAndClickElement(helpBoardFilter.getFilterButton());
      seeAndClickElement(helpBoardFilter.getBackButton());
    });

    it('Remove selected tags from first filter panel', () => {
      seeAndClickElement(helpBoardFilter.getFilterButton());
      toggleFilterHeadingOpen(
        helpBoardFilter.getHbProvidersHeading(),
        'Providers',
      );
      selectFilterTags(helpBoardFilter.getHbProvidersTags());
      closeCookieBanner();
      seeAndClickElement(helpBoardFilter.getApplyFiltersButton());
      unselectFilterTags(helpBoardFilter.getCloseSelectedTags());
    });
  });

  context(
    'Filtering posts by provider, type and location on Help Board',
    () => {
      before(() => {
        helpBoardFilter.visit();
        seeAndClickElement(helpBoardFilter.getFilterButton());
      });

      it('Location filter is expandable and collapsible, user can type location and see list, location subtext is visible, share location is visible and clickable', () => {
        toggleFilterHeadingOpen(
          helpBoardFilter.getHbLocationHeading(),
          'Location',
        );
        toggleFilterHeadingClose(helpBoardFilter.getHbLocationHeading());
        toggleFilterHeadingOpen(
          helpBoardFilter.getHbLocationHeading(),
          'Location',
        );

        var locationField = helpBoardFilter.getHbLocationInput();
        locationField.should('be.visible').click({ force: true });
        locationField.type(inputValues.location);
        helpBoardFilter.getHbLocationDropdown().should('be.visible');
        locationField.click({ force: true });

        helpBoardFilter
          .getHbLocationSubtext()
          .should('be.visible')
          .contains('Enter address, zip code, or city');

        var shareLocation = helpBoardFilter.getHbShareLocation();
        shareLocation.should('be.visible').contains('Share My Location');
        shareLocation.click({ force: true });
      });

      it('Providers filter is expandable and collapsible, select and unselect Provider tags ', () => {
        toggleFilterHeadingOpen(
          helpBoardFilter.getHbProvidersHeading(),
          'Providers',
        );
        toggleFilterHeadingClose(helpBoardFilter.getHbProvidersHeading());
        toggleFilterHeadingOpen(
          helpBoardFilter.getHbProvidersHeading(),
          'Providers',
        );

        selectFilterTags(helpBoardFilter.getHbProvidersTags());
        unselectFilterTags(helpBoardFilter.getHbProvidersTags());
      });

      it('Type filter is expandable and collapsible, select and unselect Type tags', () => {
        toggleFilterHeadingOpen(helpBoardFilter.getHbTypeHeading(), 'Type');
        toggleFilterHeadingClose(helpBoardFilter.getHbTypeHeading());
        toggleFilterHeadingOpen(helpBoardFilter.getHbTypeHeading(), 'Type');

        selectFilterTags(helpBoardFilter.getHbTypeTags());
        unselectFilterTags(helpBoardFilter.getHbTypeTags());
      });

      it('Apply Filters button is visible and clickable', () => {
        closeCookieBanner();
        seeAndClickElement(helpBoardFilter.getApplyFiltersButton());
      });
    },
  );

  function seeAndClickElement(getMethod) {
    getMethod.should('be.visible').click();
  }

  function selectFilterTags(getMethod) {
    getMethod.should('be.visible').click({ multiple: true, force: true });
    //checks tag is visually filled when selected
    getMethod.each(($tag, index, $list) => {
      cy.wrap($tag).should('have.class', 'tag-selected');
    });
  }

  function unselectFilterTags(getMethod) {
    getMethod.should('be.visible').click({ multiple: true, force: true });
  }

  function toggleFilterHeadingOpen(getMethod, headerName) {
    getMethod
      .should('be.visible')
      .click()
      .should('have.attr', 'aria-expanded', 'true')
      .contains(headerName);
  }

  function toggleFilterHeadingClose(getMethod) {
    getMethod
      .should('be.visible')
      .click()
      .should('have.attr', 'aria-expanded', 'false');
  }

  function closeCookieBanner() {
    cookieBanner
      .getCookieBannerClose()
      .should('be.visible')
      .click({ force: true });
  }
});
