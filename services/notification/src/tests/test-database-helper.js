const { describe } = require("mocha");
const { expect } = require("chai");
const { DatabaseHelper } = require("../helpers/database-helper");

const config = {
  database: "fightpandemics",
  host: "localhost",
  port: "27017",
  protocol: "mongodb",
};

describe("DatabaseHelper tests", () => {
  it("finds notifications", async () => {
    // WIP. We need to mock MongoDB.
    // const dbHelper = new DatabaseHelper(config);
    // await dbHelper.connect()
    // const notifications = await dbHelper.findNotifications();
    // for (const notification of notifications) {
    //   console.log(JSON.stringify(notification));
    // }
  });
});
