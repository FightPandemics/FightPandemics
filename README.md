#  FightPandemics.com Overview

Currently, there is no easy way to find all the information at the local and global level for the different people that are affected by the pandemic, the different projects that need volunteers, the FREE or discounted tools for builders, the grants available and other relevant information. That's why Fight Pandemics was born.

Please check our notion to get a better understanding of the problem that we are trying to solve: https://www.notion.so/fightpandemics/FightPandemics-105070e6e889448eabf7591607846cc2

## Technologies
- **Frontend**
    - React Hooks, Ant Design, Ant Design Mobile,  styled-components
    - Mobile first design
        - Mobile: https://www.figma.com/file/4cV84H1jyMo0rJEAl3HNnJ/FightPandemics-landing-page?node-id=11%3A2
        - Desktop: coming soon
    - Use assets such as icons from the designs on Figma  
        - Select an icon -> right click -> Copy/Paste -> Copy as CSS/SVG
        -  You can also get exact CSS values on Figma
    - No use of `.css` or `.scss` files, please style with styled-components instead
    - Limit the use of inline styling
    - No Redux, as the project grow, we will likely use React's Context API
    - No use of other libraries like Material UI

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
