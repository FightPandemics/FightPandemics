Style convention for writing tests:

1. Variables naming convention: variables should be declared with a camelCase with a leading lowercase character example: requestHelpButton
2. Method names conventions: method should be declared with a camelCase with a leading lowercase character example: getOfferHelpButton()
3. Set a state using cy.request example: for a logged in user. https://stackoverflow.com/questions/50685302/page-object-pattern-in-cypress. It will create flake-free and fast tests.
4. Page Objects are located in the elements folder
5. Tests are located in the integration/e2eTests