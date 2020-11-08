const { describe } = require("mocha");
const { expect } = require("chai");
const { TemplateBuilder } = require("../helpers/template-builder");

describe("TemplateBuilder tests", () => {
  it("builds templates for instant email notifications", () => {
    const builder = new TemplateBuilder("https://fightpandemics.com", "abc");
    const notifications = [
      {
        _id: "5f8b9228653a234a3a62d27f",
        action: "like",
        post: { id: "5f87ab5524acbb001d812fd1", title: "Test post 1" },
        receiver: {
          _id: "5f60488a1f5b72120034d148",
          hide: { address: false },
          needs: { medicalHelp: false, otherHelp: false },
          objectives: {
            donate: false,
            shareInformation: false,
            volunteer: true,
          },
          type: "Individual",
          __t: "IndividualUser",
          firstName: "Manny",
          lastName: "Karyampudi",
          location: {
            address: "Venice Beach, Venice, FL 34285, USA",
            city: "Venice",
            coordinates: [-82.4575967, 27.1000553],
            country: "US",
            state: "FL",
            zip: "34285",
          },
          authId: "google-oauth2|108676035332759709990",
          email: "some.fake.email@gmail.com",
          createdAt: "2020-10-15T01:51:52.534Z",
          updatedAt: "2020-10-15T01:51:52.534Z",
          __v: 0,
        },
        triggeredBy: {
          id: "5f88f281c2de24001d579daa",
          name: "Test Manny org",
          type: "Startup",
        },
        createdAt: "2020-10-17T01:51:52.534Z",
        readAt: null,
        emailSentAt: {
          instant: null,
          daily: null,
          weekly: null,
          biweekly: null,
        },
      },
      {
        _id: "5f8b9228655a231a3a62d27f",
        action: "like",
        post: { id: "5f87ab5524acbb002d812fd1", title: "Test post 2" },
        receiver: {
          _id: "5f60488a2f5b72420034d148",
          hide: { address: false },
          needs: { medicalHelp: false, otherHelp: false },
          notifyPrefs: {
            instant: {
              comment: true,
              like: true,
              message: true,
              share: true,
            },
            digest: {
              daily: true,
              weekly: true,
              biweekly: true,
            },
          },
          objectives: {
            donate: false,
            shareInformation: false,
            volunteer: true,
          },
          type: "Individual",
          __t: "IndividualUser",
          firstName: "Naruto",
          lastName: "Uzumaki",
          location: {
            address: "Konohagakure",
            city: "Konohagakure",
            coordinates: [135.0, 35.1000553],
            country: "LF",
            state: "",
            zip: "12345",
          },
          authId: "google-oauth2|108676053332759709990",
          email: "naruto@leafvillage.com",
          createdAt: "2020-10-15T01:51:52.534Z",
          updatedAt: "2020-10-15T01:51:52.534Z",
          __v: 0,
        },
        triggeredBy: {
          id: "5f88f281c2de24001d579daa",
          name: "Test Manny org",
          type: "Startup",
        },
        createdAt: "2020-10-17T01:51:52.534Z",
        readAt: null,
        emailSentAt: {
          instant: null,
          daily: null,
          weekly: null,
          biweekly: null,
        },
      },
      {
        _id: "5f8b9228653a214a3b62d27f",
        action: "like",
        post: { id: "5f87ab5524acbb001d812fd1", title: "Test post 1" },
        receiver: {
          _id: "5f60488a1f5b72130044d148",
          hide: { address: false },
          needs: { medicalHelp: false, otherHelp: false },
          notifyPrefs: {
            instant: {
              comment: false,
              like: false,
              message: false,
              share: true,
            },
            digest: {
              daily: false,
              weekly: false,
              biweekly: false,
            },
          },
          objectives: {
            donate: false,
            shareInformation: false,
            volunteer: true,
          },
          type: "Individual",
          __t: "IndividualUser",
          firstName: "Bob",
          lastName: "Saget",
          location: {
            address: "Broderick Street, San Francisco, CA 94115, USA",
            city: "San Francisco",
            coordinates: [37.786896, -122.441778],
            country: "US",
            state: "CA",
            zip: "94115",
          },
          authId: "google-oauth2|108676090732734109990",
          email: "bob.saget@fullhouse.com",
          createdAt: "2020-10-15T01:51:52.534Z",
          updatedAt: "2020-10-15T01:51:52.534Z",
          __v: 0,
        },
        triggeredBy: {
          id: "5f88f281c2de24001d579daa",
          name: "Test Manny org",
          type: "Startup",
        },
        createdAt: "2020-10-17T01:51:52.534Z",
        readAt: null,
        emailSentAt: {
          instant: null,
          daily: null,
          weekly: null,
          biweekly: null,
        },
      },
      {
        _id: "5f8b9237653a214a3b62d27f",
        action: "share",
        post: { id: "5f87ab5524acbb001d812fd1", title: "Test post 1" },
        receiver: {
          _id: "5f60488a1f5b72130044d148",
          hide: { address: false },
          needs: { medicalHelp: false, otherHelp: false },
          notifyPrefs: {
            instant: {
              comment: false,
              like: false,
              message: false,
              share: true,
            },
            digest: {
              daily: false,
              weekly: false,
              biweekly: false,
            },
          },
          objectives: {
            donate: false,
            shareInformation: false,
            volunteer: true,
          },
          type: "Individual",
          __t: "IndividualUser",
          firstName: "Bob",
          lastName: "Saget",
          location: {
            address: "Broderick Street, San Francisco, CA 94115, USA",
            city: "San Francisco",
            coordinates: [37.786896, -122.441778],
            country: "US",
            state: "CA",
            zip: "94115",
          },
          authId: "google-oauth2|108676090732734109990",
          email: "bob.saget@fullhouse.com",
          createdAt: "2020-10-15T01:51:52.534Z",
          updatedAt: "2020-10-15T01:51:52.534Z",
          __v: 0,
        },
        sharedVia: "facebook",
        triggeredBy: {
          id: "5f88f281c2de24001d579daa",
          name: "Test Manny org",
          type: "Startup",
        },
        createdAt: "2020-10-17T01:51:52.534Z",
        readAt: null,
        emailSentAt: {
          instant: null,
          daily: null,
          weekly: null,
          biweekly: null,
        },
      },
      {
        _id: "5f8b9237653a214a3b62d46e",
        action: "comment",
        post: { id: "5f87ab5524acbb001d812fd1", title: "Test post 1" },
        receiver: {
          _id: "5f60488a1f5b72130044d148",
          hide: { address: false },
          needs: { medicalHelp: false, otherHelp: false },
          notifyPrefs: {
            instant: {
              comment: true,
              like: false,
              message: false,
              share: true,
            },
            digest: {
              daily: false,
              weekly: false,
              biweekly: false,
            },
          },
          objectives: {
            donate: false,
            shareInformation: false,
            volunteer: true,
          },
          type: "Individual",
          __t: "IndividualUser",
          firstName: "Bob",
          lastName: "Saget",
          location: {
            address: "Broderick Street, San Francisco, CA 94115, USA",
            city: "San Francisco",
            coordinates: [37.786896, -122.441778],
            country: "US",
            state: "CA",
            zip: "94115",
          },
          authId: "google-oauth2|108676090732734109990",
          email: "bob.saget@fullhouse.com",
          createdAt: "2020-10-15T01:51:52.534Z",
          updatedAt: "2020-10-15T01:51:52.534Z",
          __v: 0,
        },
        triggeredBy: {
          id: "5f88f281c2de24001d579daa",
          name: "Test Manny org",
          type: "Startup",
        },
        createdAt: "2020-10-17T01:51:52.534Z",
        commentText: "Nice post dude",
        readAt: null,
        emailSentAt: {
          instant: null,
          daily: null,
          weekly: null,
          biweekly: null,
        },
      },
    ];
    const emails = builder.build("instant", notifications);
    expect(emails.length).to.equal(4);
    expect(emails[0].notificationId).to.equal("5f8b9228653a234a3a62d27f");
    expect(emails[0].toEmailAddress).to.equal("some.fake.email@gmail.com");
    expect(emails[0].subject).to.equal(
      "Test Manny org liked your post: Test post 1",
    );
    expect(emails[1].notificationId).to.equal("5f8b9228655a231a3a62d27f");
    expect(emails[1].toEmailAddress).to.equal("naruto@leafvillage.com");
    expect(emails[1].subject).to.equal(
      "Test Manny org liked your post: Test post 2",
    );
    expect(emails[2].notificationId).to.equal("5f8b9237653a214a3b62d27f");
    expect(emails[2].toEmailAddress).to.equal("bob.saget@fullhouse.com");
    expect(emails[2].subject).to.equal(
      "Test Manny org shared your post: Test post 1",
    );
    expect(emails[2].htmlBody).to.contain(
      "Test Manny org shared your post via Facebook: Test post 1",
    );
    expect(emails[2].textBody).to.contain(
      "Test Manny org shared your post via Facebook: Test post 1",
    );
    expect(emails[3].notificationId).to.equal("5f8b9237653a214a3b62d46e");
    expect(emails[3].toEmailAddress).to.equal("bob.saget@fullhouse.com");
    expect(emails[3].subject).to.equal(
      "Test Manny org commented on your post: Test post 1",
    );
  });
});
