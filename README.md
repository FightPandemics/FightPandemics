#  FightPandemics.com Overview

Currently, there is no easy way to find all the information at the local and global level for the different people that are affected by the pandemic, the different projects that need volunteers, the FREE or discounted tools for builders, the grants available and other relevant information. That's why Fight Pandemics was born.

## **Personas**

- **Sick or Vulnerable Individuals**
    1. Don't need medical Support: find local groups that are helping with buying groceries (cooperatives, telegram, WhatsApp groups) or any other local help outside of medical support.
    2. Medical support: List of local apps, local emergency numbers and other local resources.
- **Individuals that want to contribute with time at the local and global lever**
    1. Local Support: find local groups that are that are helping with buying groceries (cooperatives, telegram, WhatsApp groups), 3D printing or any other local help outside of medical support.
    2. Global Support: find teams that are working on solutions for fighting the pandemic (Software, Content, Blockchain DAOs)
- **Individuals that want to contribute with other resources.**
    1. Global and local grants and funds by Governments, VCs, Angels and crowdfunding campaigns.
    2. Global and local tools and services (For FREE, or reduced in price)

    If you are interested please join our slack group:

## Getting Started
1. Create `client/.env` and add the `REACT_APP_AIRTABLE_API_KEY` and `REACT_APP_AIRTABLE_BASE` environment variables to it.
1. `cp backend/.env.example backend/.env`
1. Run `docker-compose up` and goto `localhost:3000` in the browser.

## Adding NPM dependencies to package.json

Note that whenever you add a new NPM dependency, you must run `npm install` from within the container. This is because
NPM dependency installs may not necessarily be cross-platform. There are two ways that you can install the dependencies
within the container:

### Backend
Run `docker-compose run backend-service npm install`, or `cd` into the `backend` directory and run `npm run install-docker`.

### Client
Run `docker-compose run client npm install`, or `cd` into the `client` directory and run `npm run install-docker`.

Be sure to also commit any changes to the `package-lock.json` so that dependencies used by third-parties are locked to
specific versions.
