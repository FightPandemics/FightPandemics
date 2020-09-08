const { describe } = require("mocha");
const { expect } = require("chai");
const { handler } = require("../lambda");

describe("Hello world unit test suite example", () => {
  it("returns Hello World", async () => {
    const response = await handler(null, null);
    expect(response.body).to.equal('"Hello world!"');
    expect(response.statusCode).to.equal(200);
  });
});
