**How to generate mochawesome report for backend tests:**

_For docker-compose:_

1. Run `docker-compose build mocha-integration` in initial setup.
2. Run `docker-compose run mocha-integration` to run all tests.
3. After tests finish, the 'mochawesome html' report should generate automatically.
4. Right click on the 'mochawesome.html' file in the 'mocha/mochawesome-report' folder and select the 'Open Containing Folder' option. After the folder opens, double click on the html file to view the generated test report.
