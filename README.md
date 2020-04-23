#  FightPandemics.com Overview

Currently, there is no easy way to match all that are in need with those that are providing help, at the same time is difficult to find all the information at the local and global level of the different initiatives, projects, researchers, donors, investors, FREE or discounted tools for builders, the grants available and other relevant information. That's why Fight Pandemics was born.

Please check our notion to get a better understanding of the problem that we are trying to solve: https://www.notion.so/fightpandemics/FightPandemics-105070e6e889448eabf7591607846cc2

## Technologies
- **Frontend**
    - React Hooks, Ant Design, Ant Design Mobile,  styled-components
    - Mobile first design
- **Backend**
    - Fastify, MongoDB
    - Auth0, Google Maps API
- **DevOps**
    - Docker

## Getting Started
1. Fork or clone the repo
2. Check the projects tab for available tickets
3. Create `client/.env` and add the `REACT_APP_AIRTABLE_API_KEY` and `REACT_APP_AIRTABLE_BASE` environment variables to it.
4. `cp backend/.env.example backend/.env`
5. Run `docker-compose up` and goto `localhost:3000` in the browser.

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


## Other Resources ##
Inital project setup: https://www.notion.so/fightpandemics/Instructions-for-UI-testing-for-non-engineers-26d1237683d649f1a45f01e1b5a6c24b


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

Every time you push code up to the repository, a build based off of your feature branch will be deployed to AWS. You
can view the build logs in [GitHub Actions](https://github.com/FightPandemics/FightPandemics/actions). After the build
successfully completes, you can access your built app at `<branch_name>.fightpandemics.xyz`, where `<branch_name>` is
the *sanitized* branch name of your feature branch (i.e. if the branch name has a `/` in it, it will be converted to a
`-`, e.g. `feature/hot-potato` will be converted to `feature-hot-potato`).

_Coming soon: deployment to staging, and production._
