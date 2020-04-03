const nock = require("nock");
const { config } = require("../../config");
const { createUser } = require("./auth");

const generateUUID = () =>
  [...Array(24)].map(() => (Math.random() * 36).toString(36)).join("");

describe("createUser", () => {
  test("username and password method", async () => {
    const user = {
      connection: "Username-Password-Authentication",
      email: "john.doe@gmail.com",
      password: "Password123!",
      user_metadata: {
        name: "John",
        surname: "Doe",
      },
      email_verified: false,
      verify_email: false,
      app_metadata: {},
    };

    const apiResponse = {
      created_at: new Date().toISOString(),
      email: user.email,
      email_verified: user.email_verified,
      identities: [
        {
          connection: user.connection,
          user_id: generateUUID(),
          provider: "auth0",
          isSocial: false,
        },
      ],
      name: user.email,
      nickname: `${user.user_metadata.name.toLowerCase()}.${user.user_metadata.surname.toLowerCase()}`,
      picture: "https://s.gravatar.com/avatar/example.png",
      updated_at: new Date().toISOString(),
      user_id: `auth0|${generateUUID()}`,
      user_metadata: {
        name: user.user_metadata.name,
        surname: user.user_metadata.surname,
      },
    };

    nock(config.auth.host).post("/api/v2/users").reply(201, apiResponse);

    const response = await createUser(user);
    expect(response).toStrictEqual(apiResponse);
  });
});
