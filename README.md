![staging](https://github.com/FightPandemics/FightPandemics/workflows/staging/badge.svg)
![production](https://github.com/FightPandemics/FightPandemics/workflows/production/badge.svg)

#  FightPandemics.com Overview

Currently, there is no easy way to match all that are in need with those that are providing help, at the same time is difficult to find all the information at the local and global level of the different initiatives, projects, researchers, donors, investors, FREE or discounted tools for builders, the grants available and other relevant information. That's why Fight Pandemics was born.

Please check our notion to get a better understanding of the problem that we are trying to solve: https://www.notion.so/fightpandemics/FightPandemics-Overview-cd01dcfc05f24312ac454ac94a37eb5e

## Technologies
Before getting started please be familiar with the stack below. Additionally it is important to understand basic [Git](https://gist.github.com/blackfalcon/8428401) and [Github](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests) for smooth collaboration as a team.

- **Frontend**
    - React Hooks, Ant Design, Ant Design Mobile,  styled-components
- **Backend**
    - Fastify, MongoDB, Mongoose
    - Auth0, Google Maps API
- **DevOps**
    - Docker, Terraform, Nginx, AWS

## Project Setup

1. Fork or Clone this repository
2. There are two ways to set up the app: Docker or Local Setup. It is strongly recommended to use the Docker Setup, but if you are unable to install Docker, you have the option of setting up the app locally.

If, at any point, you are having trouble setting up the app, please use Slack's search bar to search for exisiting questions. Also do not hesitate to ask us for assistance in the `#engineering` Slack channel! In order to speed up assistance, please mention the method that you are using to set up the app, as well as the operating system that you are using.

### Docker Setup

1. Follow the steps for your OS to install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/). Note that depending on the Docker install, Docker Compose may already be included, so it would not be necessary to install Docker Compose separately.
1. Copy `backend/.env.example_docker` to `backend/.env`
1. Replace `TODO` entries in the `.env` file with correct values (this is not needed to run the project in a responding but non-functional state).
    - For `AIRTABLE` and `AUTH` variable values, either use Slack's search bar to search for exisiting requests, ask in the #engineering Slack channel, or consult the [non-engineer guide](https://www.notion.so/fightpandemics/Instructions-for-UI-testing-for-non-engineers-26d1237683d649f1a45f01e1b5a6c24b).
1. Run `docker-compose up` this will take quite some time. (`Starting the development server...` is not the final line).
1. Finally, navigate to [localhost:3000](http://localhost:3000) in your browser - the page title should be "Fight Pandemics" and you should see a styled page.
1. To import posts data from Airtable run `docker-compose exec backend-service npm run import-posts`. By default 100 records are returned. To get a specific number of records pass a numeric argument, e.g. `docker-compose exec backend-service npm run import-posts -- 10`. Use `-1` to get all records (~2500 as of this writing).

### Local Setup

If, for some reason, you are unable to use Docker, you can still set up the app locally. Note that you can set up each of these three services separately, but some functionality may not work. For example, if only the client is running, none of the calls to the backend will work.

#### MongoDB

Follow the MongoDB [installation instructions](https://docs.mongodb.com/manual/installation/) for your operating system.

#### Client

1. Install [nvm](https://github.com/nvm-sh/nvm) (for Mac/Linux), or [nvm-windows](https://github.com/coreybutler/nvm-windows) (for Windows).
1. Using nvm, install Node 12.16.2: `nvm install 12.16.2`.
1. Enter the `client` directory and run `npm install`.
1. Start the client app by running `npm start`, and wait for the app to start up. (`Starting the development server...` is not the final line).
1. Finally, navigate to [localhost:3000](http://localhost:3000) in your browser - the page title should be "Fight Pandemics" and you should see a styled page.

#### Backend

1. If not already installed, [install MongoDB](https://docs.mongodb.com/manual/installation/).
1. If not already installed, install nvm and Node 12.16.2 (see steps 1 and 2 in the Client section above).
1. Enter the `backend` directory and run `npm install`.
1. Copy the `.env.example_local` in the `backend` directory to `.env`.
1. Replace `TODO` entries in `backend/.env` with correct values (this is not needed to run the project in a responding but non-functional state).
    - For  `AIRTABLE` and `AUTH` variable values, either use Slack's search bar to search for exisiting requests, ask in the #engineering Slack channel, or consult the [non-engineer guide](https://www.notion.so/fightpandemics/Instructions-for-UI-testing-for-non-engineers-26d1237683d649f1a45f01e1b5a6c24b).
1. Start the backend server by running `npm start`. NOTE: If you want the server to automatically restart on code changes, run `npm run dev` instead.
1. The backend can be accessed at `localhost:8000` using cURL, Postman, or a similar API testing tool.
1. To import posts data from Airtable, from the `backend` directory, run `npm run import-posts`. By default 100 records are returned. To get a specific number of records pass a numeric argument, e.g. `npm run import-posts -- 10`. Use `-1` to get all records (~2500 as of this writing).

#### Geolocation

We are using the Google Maps API via our backend for geolocation requirements. It is not required for most frontend and backend development and is mocked with a limited set of fixed results when no key is present. This is to reduce friction for developer onboarding. If you need to work on this feature ask in Slack engineering channel about how to get your own development key.

### Contributing

Check the issues and projects tab of the original repository for available tickets. Please follow our [instructions](https://www.notion.so/fightpandemics/How-to-create-a-ticket-in-GitHub-3ee2abb2d7f24b90ac35553dd0a117c4) on how to properly open an issue and make pull requests to our repo.

Additionally please review the "Important Notes and Considerations" section in this README.

### Time sensitive issues

Due to the importance of what we are trying to accomplish and the fact that some features are critical for certain releases, sometimes issues need to be completed within a specfic timeframe. In order to ensure that this can happen, it is very important that you communicate your progress with the team in either the engineering or general standups. Please also try and push your code to GitHub every day that you work on an issue.

In the event that there is an upcoming deadline for a particular feature, someone from the team may try and contact you to see what the current status is and if you possibly need help with the task. If we don't hear anything from you after 48 hours, another engineer might have to take over the issue and it will be re-assigned on GitHub. Therefore it is CRITICAL that you have your current code pushed to GitHub so that others can possibly use your work as a reference to ensure the issue gets completed as quickly as possible.

### API Documentation

To check the API documentation which is automatically generated using [fastify-oas](https://www.npmjs.com/package/fastify-oas) , go to `http://localhost:8000/api/documentation`

## Adding NPM dependencies to package.json

Note that whenever you add a new NPM dependency, you must run `npm install` from within the container. This is because
NPM dependency installs may not necessarily be cross-platform. There are two ways that you can install the dependencies
within the container:

### Backend
Run `docker-compose run backend-service npm install`, or `cd` into the `backend` directory and run `npm run install-docker`.

### Client
Run `docker-compose run client npm install`, or `cd` into the `client` directory and run `npm run install-docker`.

Be sure to also commit any changes to the `package-lock.json` so that dependencies used by third-parties are also locked to specific versions.

## Important Notes and Considerations

We are noting any special considerations and handling done in the code so that developers are aware of these caveats
while developing. This is a living document, so feel free to add any notes that you feel are worth mentioning here.

### Development Workflow
We collaborate closely with the design and product team. The design team provides us with designs of the application on Figma. While the product team provides us with MVP requirements on Notion.

* Please be sure to often merge or rebase the latest from the staging branch into your feature/working branches to minimize merge conflicts and so that it doesn't fall too far behind staging.
* If possible, try to keep changes in pull requests small so that it'll be faster for reviewers to review and easier for contributors to make revisions. If you foresee there will be many changes, make sure to commit often. This will help break down a pull request more easily.

### Backend

* API requests are validated using [Ajv](https://github.com/epoberezkin/ajv) and JSON schema's are defined with [FluentSchema](https://github.com/fastify/fluent-schema)
    * By default, the schema's allow additional properties unless explicitly set that additional properties are not allowed.
        There's a utility function `strictSchema()` in `lib/endpoints/schemas/utils.js` that can be used to initialize all schema's.
    * Rather than silently suppress additional properties, as is the default behavior for Fastify's ajv configuration,
        we are instead returning a 400 bad request error if additional properties are passed in. This makes it easier to
        debug issues due to a misspelled property name.
    * Read more about validation in Fastify in the docs https://www.fastify.io/docs/v2.2.x/Validation-and-Serialization/#validation
* Endpoint handlers should use async functions, and return values or throw httpErrors.
    * This is using some sensible defaults provided by https://github.com/fastify/fastify-sensible
    * If an error is thrown, a generic error handler returns a 500 Internal Server Error response and logs the error details,
        without returning all error details in the response.
    * Some more useful tools are provided by fastify-sensible such as built-in `fastify.httpErrors` and `fastify.to()` to [wrap async-await](https://github.com/scopsy/await-to-js)
    * Read more in the Fastify documentation about using asyc/await with fastify https://www.fastify.io/docs/latest/Routes/#async-await

### Frontend
* We have the beginnings of a theme. The file can be found here: `src/constants/theme.js` which has sections for typography, colors, buttons styles and media queries.
    * Limit the use of inline styling.
    * Limit the use of `px` values, currently the root font size is 62.5%, `1rem = 10px`
    * No use of `.css` or `.scss` files, please style with styled-components instead.
* Use assets such as icons from the designs on Figma
    * Select the screen that you are going to design
    * On the left side of Figma, unlock the screen (Only the one that you are going to use)
    * Select an icon or component -> right click -> Copy/Paste -> Copy as CSS/SVG
    * You can also get exact CSS values on the top right of Figma
    * After you are done with your screen, lock it again!!
* Use absolute imports. We have a resolved path of `client/src`. For example, import like this: `import Button from "components/Button"`, rather than `import Button from "../../components/Button`.
* For most components, we can use components from Ant Design and override styling where needed. Please refrain from reinventing the wheel.
    ```
        import styled from "styled-components";
        import { Button } from "antd";

        const StyledButton = styled(Button)`
            // target antd selectors and override styles here
        `;
    ```
* For new pages, create a new route in `client/src/routes.js` and import a page component from `client/src/pages`
* Refrain from making the Redux state too big as it will affect speed performance. React’s Context API is ONLY helpful for avoiding nested prop threading so stick with Redux where Context fails.

#### Internationalization

- We are using [i18next](https://www.i18next.com/overview/api) to manage localization on our platform. If you need to add text or change existing text, please do so in the `src/locales/translations/en_US` file. [Lokalise](https://lokalise.com/) is the tool we use to manage our translations. It is configured to automatically pull changes in `en_US` from `staging` branch and edit or add new keys on the Lokalise platform so our volunteers can go and translate the new changes.

 - In order to not bottleneck development, keys that have not been translated in a language will be filled with the English translation. Once translations are completed on Lokalise, it will then initiate a PR to merge the translations into `staging`

## Deployment

### Git Branching Model

- When a Github issue is started, create a branch with the `feature/` prefix. Every push to branches with this prefix will automatically deploy to the review AWS environment. See the [Review branches](#review-branches) section for details on how to access this build.

- After a pull request for a `feature/` branch is approved, it is merged into the `staging` branch. This will trigger an automatic deployment to the staging AWS environment. Note that changes may take several minutes to take effect. The staging app is accessible at https://staging.fightpandemics.work.

- When we are ready to release to production, a pull request is opened to merge the `staging` branch to `production`. After this pull request is approved and merged, it will trigger an automatic deployment to the production AWS environment. Note that changes may take several minutes to take effect. The production app is accessible at https://fightpandemics.com

- A `hotfix/` branch is created if there is a critical fix that needs to be deployed to production as soon as possible, but staging has untested code that is not safe to deploy to production.
    - This branch must be created off the `production` branch.
    - Every push to `hotfix/` branches will automatically deploy to the review AWS environment. See the [Review branches](#review-branches) section for details on how to access this build.
    - The pull request for a hotfix must be opened to merge into the `production` branch rather than the `staging` branch.
    - Hotfixes must be tested in the staging AWS environment before being merged to the `production` branch. In order to deploy only the hotfix to the staging enviroment, create and push a git tag with a `hotfix-` prefix. This will trigger a deployment to the staging environment: `git tag -a hotfix-<GITHUB_ISSUE_NUMBER> && git push origin hotfix-<GITHUB_ISSUE_NUMBER>`. Note that if there are changes in the `staging` branch that are not yet in the `production` branch, this deployment may impact testing done by QA in the staging environment, so it is best practice to coordinate with the QA team before deploying a hotfix to the staging environment.
    - After QA has tested the hotfix in the staging environment, the hotfix PR is merged to the `production` branch, where it will automatically deploy to the production AWS environment.
    - After merging the hotfix into the `production` branch, open another pull request to backmerge the hotfix into the `staging` environment (i.e. merge `production` into `staging`). The `Create a merge commit` merge method should be used for this pull request.

- All pull request merges to the `staging` branch, and all `hotfix/` merges to the `production` branch are done using the `Squash and Merge` strategy. This allows for a cleaner commit history by combining all commits in a branch into a single commit. The message for this squashed commit must use the following convention:
```
<GITHUB_TICKET_NUMBER(S)> - <BRIEF_TICKET_DESCRIPTION>

- Additional comments if necessary, for more context
```
Example:
```
#1127/#1130 - Update Git Branching Model

- Update Readme
- Update Github workflows
- Update PR template
```
- When merging `staging` into `production`, and vice versa, the `Create a merge commit` merge method should be used to preserve commit history.

### Review branches

Every time you push code up to this repository on a branch with the `feature/` or `hotfix/` prefix, a review build based off of your feature branch will be deployed to AWS. For the build to deploy successfully you must be a member of this organization (ask in Slack) and push to this repo. Pull requests are still welcome from forked repos, just omit the `feature/` or `hotfix/` prefix to skip this build step.

You can view the build logs in [GitHub Actions](https://github.com/FightPandemics/FightPandemics/actions). After the build successfully completes, you can view the URL to which your app was deployed by clicking on the "Deployment URL" step in the `Deploy Review Build` job in the workflow run for your build:

![Deployment URL](images/deployment_url.png?raw=true)

Note that it may take a few minutes for the app to be accessible, or for changes to be reflected, since it takes time for AWS to spin up the Docker containers.

Please note that review builds are shut down if no new commits are pushed to the branch in more than a day. This is controlled by an AWS Lambda function that runs every day at midnight PST. In order to revive the review build, simply push a new commit to the branch, merge or rebase from staging, or click the "Rerun all jobs" button on the review build page in Github Actions.

### Staging

When a pull request is merged to staging, it will automatically be deployed to the staging environment. You can view the build logs in [GitHub Actions](https://github.com/FightPandemics/FightPandemics/actions). After the build successfully completes, wait a few minutes for the changes to be reflected, and then access the staging app at http://staging.fightpandemics.work.

### Production

When a pull request is merged to production, it will automatically be deployed to the production environment. You can view the build logs in [GitHub Actions](https://github.com/FightPandemics/FightPandemics/actions). After the build successfully completes, wait a few minutes for the changes to be reflected, and then access the production app at https://fightpandemics.com.
