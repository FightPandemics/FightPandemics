Style convention for writing tests:

1. Variables naming convention: variables should be declared with a camelCase with a leading lowercase character example: requestHelpButton
2. Method names conventions: method should be declared with a camelCase with a leading lowercase character example: getOfferHelpButton()
3. Convention for naming files: should be declared with a camelCase with a leading lowercase character example: homePage.js
4. Convention for naming classes: should be declared with a PascalCase with a leading uppercase character example: HomePage
5. Set a state using cy.request example: for a logged in user. https://stackoverflow.com/questions/50685302/page-object-pattern-in-cypress. It will create flake-free and fast tests.
6. Page Objects are defined in the elements/pages folder
7. Tests are defined in the integration/e2eTests

How to generate mochawesome report:

1. Run all tests in docker-compose by running 'npm run test' or you can choose a specific test suite to run.
2. After test(s) finishes, run 'npm run generate:html:report'.
3. Right click on the 'cypress-tests-report.html' file in the 'TestReport' folder and select the 'Open Containing Folder' option. After the folder opens, double click on the html file to view the generated test report.
4. To start clean or delete the existing html and all mochawesome json files in the 'TestReport' and 'mochawesome-report' folders run 'npm run clean:reports'. This will prevent multiple old json files from accumulating in the 'mochawesome-report' folder and remove old tests from appearing in the html file each time you generate the report.
