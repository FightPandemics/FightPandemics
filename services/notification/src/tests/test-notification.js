const { describe } = require("mocha");
const { expect } = require("chai");
const { handler } = require("../lambda");

describe("Hello world unit test suite example", () => {
  it("returns Hello World", async () => {
    const context = {
      callbackWaitsForEmptyEventLoop: false,
    };
    const response = await handler(null, context);
    expect(response.body).to.equal('"Hello world!"');
    expect(response.statusCode).to.equal(200);
  });
});
