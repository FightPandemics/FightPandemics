Cypress.Commands.add('checkFpLogoIsVisibleAndClickable', (fpLogoLocator) => { 
    var fpLogo = cy.get(fpLogoLocator);
    fpLogo.should('be.visible').and('have.attr', 'alt', 'Fight Pandemics logo').click();
});

Cypress.Commands.add('pageContainsHeadingAndImage', (pageHeadingLocator, heading, pageImageLocator) => { 
    var pageHeading = cy.get(pageHeadingLocator);
    pageHeading.should('be.visible').contains(heading);
    var pageImage = cy.get(pageImageLocator);
    pageImage.should('be.visible');
});