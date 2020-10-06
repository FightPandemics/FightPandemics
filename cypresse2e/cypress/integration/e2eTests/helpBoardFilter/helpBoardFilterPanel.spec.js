import HelpBoardFilter from '../../../elements/pages/helpBoardFilterPanel';

describe('FightPandemics Help Board Filters', () => {

    const helpBoardFilter = new HelpBoardFilter();

    context('User applies filters on Help Board', () => {
        before(() => {
            helpBoardFilter.visit();
        });

        it('Offering Help filter on Help Board is visible and clickable', async () => {
            helpBoardFilter.getHbOfferHelp()
                .should('be.visible').click();
        });

        it('Requesting Help filter on Help Board is visible and clickable', async () => {
            helpBoardFilter.getHbRequestHelp()
                .should('be.visible').click();
        });

        it('All Posts filter on Help Board is visible and clickable', async () => {
            helpBoardFilter.getHbAllPosts()
                .should('be.visible').click();
        });

        it('Filters button on Help Board is visible and clickable', async () => {
            helpBoardFilter.getFilterButton()
                .should('be.visible').click();
        });

        it('Quit Filters button is visible and clickable', async () => {
            helpBoardFilter.getQuitFiltersButton()
                .should('be.visible').click();
        });

        it('View Results button is visible and clickable', async () => {
            helpBoardFilter.getViewResultsButton()
                .should('be.visible').click();
        });

    });

});