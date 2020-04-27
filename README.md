#  FightPandemics.com Overview

Currently, there is no easy way to match all that are in need with those that are providing help, at the same time is difficult to find all the information at the local and global level of the different initiatives, projects, researchers, donors, investors, FREE or discounted tools for builders, the grants available and other relevant information. That's why Fight Pandemics was born.

Please check our notion to get a better understanding of the problem that we are trying to solve: https://www.notion.so/fightpandemics/FightPandemics-Overview-cd01dcfc05f24312ac454ac94a37eb5e

## Technologies
- **Frontend**
    - React Hooks, Ant Design, Ant Design Mobile,  styled-components
    - Mobile first design
- **Backend**
    - Fastify, MongoDB
    - Auth0, Google Maps API
- **DevOps**
    - Docker

## Getting Started as a Non-Technical Contributor

Follow the inital project setup for non-engineers described in [Notion](https://www.notion.so/fightpandemics/Instructions-for-UI-testing-for-non-engineers-26d1237683d649f1a45f01e1b5a6c24b).

## Getting Started as a Developer

1. If you want to contribute, fork this repository
2. Clone it to your local development machine
3. Copy `client/.env.example` to `client/.env`
3. Copy `backend/.env.example` to `backend/.env`
4. Replace `TODO` entries in both files with correct values (this is not needed to run the project in a responding but non-functional state). Consult the [non-engineer guide](https://www.notion.so/fightpandemics/Instructions-for-UI-testing-for-non-engineers-26d1237683d649f1a45f01e1b5a6c24b) and ask in Slack for AUTH variable values.
5. Run `docker-compose up` this will take quite some time. (`Starting the development server...` is not the final line).
6. Finally, navigate to [localhost:3000](http://localhost:3000) in your browser - the page title should be "Fight Pandemics" and you should see a styled page.

Contributing:

* Check the projects tab of the original repository for available tickets.

To check the API documentation which is automatically generated using [fastify-oas](https://www.npmjs.com/package/fastify-oas) , go to `http://localhost:8000/documentation`

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

### Backend

* Set `.additionalProperties(false)` for each schema defined with FluentSchema, to return a 400 bad request error if any
additional properties not defined in the schema are passed in through the request.
    * We are using [FluentSchema](https://github.com/fastify/fluent-schema) to validate backend requests. This is the
    default validator for Fastify, our backend framework. FluentSchema uses ajv under the hood, and compiles to the
    more standard JSON Schema.
    * Rather than silently suppress additional properties, as is the default behavior for Fastify's ajv configuration,
    we are instead returning a 400 bad request error if additional properties are passed in. This makes it easier to
    debug issues due to a misspelled property name.

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

## Deployment

### Review branches

Every time you push code up to the repository, a build based off of your feature review branch will be deployed to AWS. Note that in order for a build to run, the branch name must have the `feature/` prefix. You can view the build logs in [GitHub Actions](https://github.com/FightPandemics/FightPandemics/actions). After the build successfully completes, you can access your built app at `<branch_name>.fightpandemics.xyz`, where `<branch_name>` is the *sanitized* branch name of your feature branch (i.e. if the branch name has a `/` in it, it will be converted to a `-`, e.g. `feature/hot-potato` will be converted to `feature-hot-potato`). Note that it may take a few minutes for the app to be accessible, or for changes to be reflected, since it takes time for AWS to spin up the Docker containers.

### Staging

When a pull request is merged to master, it will automatically be deployed to the staging environment. You can view the build logs in [GitHub Actions](https://github.com/FightPandemics/FightPandemics/actions). After the build successfully completes, wait a few minutes for the changes to be reflected, and then access the staging app at http://staging.fightpandemics.work.

### Production

Coming soon...
