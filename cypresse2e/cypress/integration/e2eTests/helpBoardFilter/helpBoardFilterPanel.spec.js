import HelpBoardFilter from '../../../elements/pages/helpBoardFilterPanel';
import { LOCATION } from '../../constants';

describe('FightPandemics Help Board Filters', () => {

    const helpBoardFilter = new HelpBoardFilter();

    context('Filtering posts by offer help or request help on Help Board', () => {
        beforeEach(() => {
            helpBoardFilter.visit();
        });

        it('Offering Help filter on Help Board is visible and clickable', () => {
            postCategory(helpBoardFilter.getHbOfferHelp());
        });

        it('Requesting Help filter on Help Board is visible and clickable', () => {
            postCategory(helpBoardFilter.getHbRequestHelp());
        });

        it('All Posts filter on Help Board is visible and clickable', () => {
            postCategory(helpBoardFilter.getHbAllPosts());
        });

        it('Quit Filters button is visible and clickable', () => {
            helpBoardFilter.getFilterButton()
                .should('be.visible').click();
            helpBoardFilter.getCookieBanner()
                .should('be.visible').click({ force: true });
            helpBoardFilter.getQuitFiltersButton()
                .should('be.visible').click();
        });

        it('Back button is visible and clickable', () => {
            helpBoardFilter.getFilterButton()
                .should('be.visible').click();
            helpBoardFilter.getBackButton()
                .should('be.visible').click();
        });

    });

    context('Filtering posts by provider, type and location on Help Board', () => {
        before(() => {
            helpBoardFilter.visit();
        });

        it('Filters button on Help Board is visible and clickable', () => {
            helpBoardFilter.getFilterButton()
                .should('be.visible').click();
        });

        it('Location filter is expandable and collapsible', () => {
            toggleFilterHeadingOpen(helpBoardFilter.getHbLocationHeading(), 'Location');
            toggleFilterHeadingClose(helpBoardFilter.getHbLocationHeading());
            toggleFilterHeadingOpen(helpBoardFilter.getHbLocationHeading(), 'Location');
        });

        it('Type in location field and see the list of locations', () => {
            var locationField = helpBoardFilter.getHbLocationInput();
            locationField.should('be.visible').click({force:true});
            locationField.type(LOCATION);
            helpBoardFilter.getHbLocationDropdown().should('be.visible');
            locationField.click({force:true});
        });

        it('Location subtext is visible', () => {
            helpBoardFilter.getHbLocationSubtext()
                .should('be.visible').contains('Enter address, zip code, or city');
        });

        it('Share location link is visible and clickable', () => {
            var shareLocation = helpBoardFilter.getHbShareLocation();
            shareLocation.should('be.visible').contains('Share My Location');
            shareLocation.click({ force: true });
        });

        it('Providers filter is expandable and collapsible', () => {
            toggleFilterHeadingOpen(helpBoardFilter.getHbProvidersHeading(), 'Providers');
            toggleFilterHeadingClose(helpBoardFilter.getHbProvidersHeading());
            toggleFilterHeadingOpen(helpBoardFilter.getHbProvidersHeading(), 'Providers');
        });

        it('Select and unselect Provider tags', () => {
            selectFilterTags(helpBoardFilter.getHbProvidersTags());
            unselectFilterTags(helpBoardFilter.getHbProvidersTags());
        });

        it('Type filter is expandable and collapsible', () => {
            toggleFilterHeadingOpen(helpBoardFilter.getHbTypeHeading(), 'Type');
            toggleFilterHeadingClose(helpBoardFilter.getHbTypeHeading());
            toggleFilterHeadingOpen(helpBoardFilter.getHbTypeHeading(), 'Type');
        });

        it('Select and unselect Type tags', () => {
            selectFilterTags(helpBoardFilter.getHbTypeTags());
            unselectFilterTags(helpBoardFilter.getHbTypeTags());
        });

        it('View Results button is visible and clickable', () => {
            helpBoardFilter.getCookieBanner()
                .should('be.visible').click({ force: true });
            helpBoardFilter.getViewResultsButton()
                .should('be.visible').click();
        });

    });

    function postCategory(getMethod) {
        (getMethod).should('be.visible').click();
    }

    function selectFilterTags(getMethod) {
        (getMethod).should('be.visible').click({ multiple: true, force: true })
        getMethod.each(($tag, index, $list) => {
            cy.wrap($tag).should('have.class', 'tag-selected')
        });
    }

    function unselectFilterTags(getMethod) {
        (getMethod).should('be.visible').click({ multiple: true, force: true });
    }

    function toggleFilterHeadingOpen(getMethod, headerName) {
        (getMethod).should('be.visible')
            .click().should('have.attr', 'aria-expanded', 'true').contains(headerName);
    }

    function toggleFilterHeadingClose(getMethod) {
        (getMethod).should('be.visible')
            .click().should('have.attr', 'aria-expanded', 'false');
    }

});