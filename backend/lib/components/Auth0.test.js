const nock = require("nock");
const {
  config: { auth },
} = require("../../config");
const { oauth, createUser } = require("./Auth0");
const { createToken } = require("./Jwt");
const { generateUUID, dateToEpoch } = require("../utils");

describe("oauth", () => {
  test("call Auth0 oauth api everytime the authorization expires", async () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const scope = "read:users update:users delete:users create:users";
    const token = await createToken({
      iss: auth.host,
      sub: `${generateUUID({ range: 32 })}@clients`,
      aud: `${auth.host}/api/v2/`,
      iat: dateToEpoch(now),
      exp: dateToEpoch(tomorrow),
      azp: generateUUID({ range: 32 }),
      scope,
      gty: "client-credentials",
    });

    const apiResponse = {
      access_token: token,
      scope,
      expires__in: 86400, // 1 day
      token_type: "Bearer",
    };

    nock(auth.host).post("/oauth/token").reply(200, apiResponse);

    const response = await oauth();
    expect(response).toStrictEqual(token);
  });
});

describe("createUser", () => {
  test("Username-Password-Authentication method", async () => {
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
          user_id: generateUUID({ range: 24 }),
          provider: "auth0",
          isSocial: false,
        },
      ],
      name: user.email,
      nickname: `${user.user_metadata.name.toLowerCase()}.${user.user_metadata.surname.toLowerCase()}`,
      picture: "https://s.gravatar.com/avatar/example.png",
      updated_at: new Date().toISOString(),
      user_id: `auth0|${generateUUID({ range: 24 })}`,
      user_metadata: {
        name: user.user_metadata.name,
        surname: user.user_metadata.surname,
      },
    };

    nock(auth.host).post("/api/v2/users").reply(201, apiResponse);

    const response = await createUser(user);
    expect(response).toStrictEqual(apiResponse);
  });
});
