#  FightPandemics.com Overview

Currently, there is no easy way to find all the information at the local and global level for the different people that are affected by the pandemic, the different projects that need volunteers, the FREE or discounted tools for builders, the grants available and other relevant information. That's why Fight Pandemics was born.

Please check our notion to get a better understanding of the problem that we are trying to solve: https://www.notion.so/fightpandemics/FightPandemics-105070e6e889448eabf7591607846cc2

## Technologies
- **Frontend**
    - React Hooks, Ant Design, Ant Design Mobile,  styled-components
    - Mobile first design
    - No use of `.css` or `.scss` files
    - No Redux
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

TODO
