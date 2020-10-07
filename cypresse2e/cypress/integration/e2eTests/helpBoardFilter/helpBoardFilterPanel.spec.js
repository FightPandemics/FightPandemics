import HelpBoardFilter from '../../../elements/pages/helpBoardFilterPanel';
import { LOCATION } from '../../constants';

describe('FightPandemics Help Board Filters', () => {

    const helpBoardFilter = new HelpBoardFilter();

    context('User filters posts by offer help or request help on Help Board', () => {
        beforeEach(() => {
            helpBoardFilter.visit();
        });

        it('Offering Help filter on Help Board is visible and clickable', () => {
            helpBoardFilter.getHbOfferHelp()
                .should('be.visible').click();
        });

        it('Requesting Help filter on Help Board is visible and clickable', () => {
            helpBoardFilter.getHbRequestHelp()
                .should('be.visible').click();
        });

        it('All Posts filter on Help Board is visible and clickable', () => {
            helpBoardFilter.getHbAllPosts()
                .should('be.visible').click();
        });
    });

    context('User filters posts by type and location on Help Board', () => {
        before(() => {
            helpBoardFilter.visit();
        });

        it('Filters button on Help Board is visible and clickable', () => {
            helpBoardFilter.getFilterButton()
                .should('be.visible').click();
        });

        it('Location filter is clickable and expandable', () => {
            helpBoardFilter.getHbLocationHeading()
                .should('be.visible').click();
        });

        it('User can type in location field and see a list of available locations', () => {
            var locationField = helpBoardFilter.getHbLocationInput();
            locationField.should('be.visible').click();
            locationField.type(LOCATION);
            // .and('have.attr', 'aria-activedescendant', 'HB_LO_EAZ_list_0');
        });

        it('Location subtext is visible', () => {
            helpBoardFilter.getHbLocationSubtext()
                .should('be.visible')
                .contains('Enter address, zip code, or city');
        });

        it('Share location link is visible and clickable', () => {
            var shareLocation = helpBoardFilter.getHbShareLocation();
            shareLocation.should('be.visible').contains('Share My Location');
            // shareLocation.click({ force: true });
        });

        it('View Results button is visible and clickable', () => {
            helpBoardFilter.getCookieBanner()
                .should('be.visible').click({ force: true });
            helpBoardFilter.getViewResultsButton()
                .should('be.visible').click();
        });

    });

    context('User exits filters on Help Board', () => {
        before(() => {
            helpBoardFilter.visit();
        });

        it('Quit Filters button is visible and clickable', () => {
            helpBoardFilter.getFilterButton()
                .should('be.visible').click();
            helpBoardFilter.getCookieBanner()
                .should('be.visible').click({ force: true });
            helpBoardFilter.getQuitFiltersButton()
                .should('be.visible').click();
        });

    });

});