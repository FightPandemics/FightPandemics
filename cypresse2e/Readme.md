**Style convention for writing tests:**

1. Variables naming convention: variables should be declared with a camelCase with a leading lowercase character example: requestHelpButton
2. Method names conventions: method should be declared with a camelCase with a leading lowercase character example: getOfferHelpButton()
3. Convention for naming files: should be declared with a camelCase with a leading lowercase character example: homePage.js
4. Convention for naming classes: should be declared with a PascalCase with a leading uppercase character example: HomePage
5. Set a state using cy.request example: for a logged in user. https://stackoverflow.com/questions/50685302/page-object-pattern-in-cypress. It will create flake-free and fast tests.
6. Page Objects are defined in the elements/pages folder
7. Tests are defined in the integration/e2eTests

**How to generate mochawesome report:**

*For local:*

1. Make sure to `cd cypresse2e`.
2. Run `npm run test` to run all tests or run `npx cypress run --spec "cypress/integration/e2eTests/folderName/testName.spec.js"` to run an individual test - e.g (npm cypress run --spec "cypress/integration/e2eTests/footer/footer.spec.js").
3. After test(s) finishes, run `npm run report` to generate html report.
4. Right click on the 'mochawesome.html' file in the 'mochawesome-report' folder and select the 'Open Containing Folder' option. After the folder opens, double click on the html file to view the generated test report.
5. **Note**: If you are running an individual test and you want to delete the json files in the 'mochawesome-report' folder  generated from previous test runs to prevent them from showing up in the html, run `npm run pretest` before running a new test. 

*For docker-compose:*

1. Make sure to `cd cypresse2e`.
2. Run `docker-compose build cypress-e2e` (this only needs to be run one time unless changes are made in cypresse2e --> package.json).
3. Run `docker-compose run cypress-e2e` to run all tests. (If you want to run individual tests, then it will need to be run locally).
4. After test(s) finishes, the 'mochawesome html' report should generate automatically.
5. Right click on the 'mochawesome.html' file in the 'mochawesome-report' folder and select the 'Open Containing Folder' option. After the folder opens, double click on the html file to view the generated test report.
