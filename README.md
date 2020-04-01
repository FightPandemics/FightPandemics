#  FightPandemics.com Overview

Currently, there is no easy way to find all the information at the local and global level for the different people that are affected by the pandemic, the different projects that need volunteers, the FREE or discounted tools for builders, the grants available and other relevant information. That's why Fight Pandemics was born.

## **Personas**

- **Sick or Vulnerable Individuals**
    1. Don't need medical Support: find local groups that are helping with buying groceries (cooperatives, telegram, WhatsApp groups) or any other local help outside of medical support.
    2. Medical support: List of local apps, local emergency numbers and other local resources.
- **Individuals that want to contribute with time at the local and global lever**
    1. Local Support: find local groups that are that are helping with buying groceries (cooperatives, telegram, WhatsApp groups), 3D printing or any other local help outside of medical support.
    2. Global Support: find teams that are working on solutions for fighting the pandemic (Software, Content, Blockchain DAOs)
- I**ndividuals that want to contribute with other resources.**
    1. Global and local grants and funds by Governments, VCs, Angels and crowdfunding campaigns.
    2. Global and local tools and services (For FREE, or reduced in price)
    
    If you are interested please join our slack group:

https://join.slack.com/t/fightpandemics/shared_invite/zt-d22gzk51-IMItXWfVQswn4YvHmKajnw

## Getting Started
Use Yarn package manager, don't forget to commit the yarn.lock files when updating dependencies

1. Make sure mongodb and Node are installed and that the mongod process is running.
2. Add your mongo URI and secret key to `backend/config/keys_dev.js`.
3. Run `yarn install` in both the root and `client` folders.
4. Create `client/.env` and add the `REACT_APP_AIRTABLE_API_KEY` and `REACT_APP_AIRTABLE_BASE` secrets to it.
5. Run `yarn run dev` to start the Express server and open the React app in the browser.
6. Separately run the geo-service with `python app.py` after installing the requirements in a virtual env `venv`
