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
