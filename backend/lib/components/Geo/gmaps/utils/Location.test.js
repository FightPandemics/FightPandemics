const assert = require("assert");

const Location = require("./Location");

describe("Test geolocation Location util class for Google Maps API result(s)", () => {
  it("Should produce subdocument for gmaps place/details result with full details", () => {
    // place_id=EjA1IEFydGh1ciBTdHJlZXQgV2VzdCwgVGhvcm5idXJ5LCBPbnRhcmlvLCBDYW5hZGEiMBIuChQKEgmvblgT1XQqiBEwy1V62GLLPRAFKhQKEgmt3-XB1QoqiBEaKwtTJIpSTw
    // &fields=address_component,formatted_address,geometry
    const gmapsResult = {
      address_components: [
        {
          long_name: "5",
          short_name: "5",
          types: ["street_number"],
        },
        {
          long_name: "Arthur Street West",
          short_name: "Arthur St W",
          types: ["route"],
        },
        {
          long_name: "Thornbury",
          short_name: "Thornbury",
          types: ["neighborhood", "political"],
        },
        {
          long_name: "The Blue Mountains",
          short_name: "The Blue Mountains",
          types: ["locality", "political"],
        },
        {
          long_name: "Grey County",
          short_name: "Grey County",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Ontario",
          short_name: "ON",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Canada",
          short_name: "CA",
          types: ["country", "political"],
        },
        {
          long_name: "N0H 2P0",
          short_name: "N0H 2P0",
          types: ["postal_code"],
        },
      ],
      formatted_address: "5 Arthur St W, Thornbury, ON N0H 2P0, Canada",
      geometry: {
        location: {
          lat: 44.5620158,
          lng: -80.4532732,
        },
      },
    };
    const expected = {
      address: "5 Arthur St W, Thornbury, ON N0H 2P0, Canada",
      city: "The Blue Mountains",
      coordinates: [-80.4532732, 44.5620158],
      country: "CA",
      neighborhood: "Thornbury",
      state: "ON",
      zip: "N0H 2P0",
    };
    const actual = new Location(gmapsResult).toSubdocument;
    assert.deepEqual(actual, expected);
  });
  it("Should produce subdocument for gmaps place/details result with medium details", () => {
    // No zip, neighborhood
    // from place/details/json?place_id=ChIJ2Y7LAInCzRIRkCuP_aUZCAQ&fields=address_component,formatted_address,geometry
    const gmapsResult = {
      address_components: [
        {
          long_name: "Harrow",
          short_name: "Harrow",
          types: ["locality", "political"],
        },
        {
          long_name: "Greater London",
          short_name: "Greater London",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "England",
          short_name: "England",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "United Kingdom",
          short_name: "GB",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Harrow, UK",
      geometry: {
        location: {
          lat: 51.580559,
          lng: -0.3419949999999999,
        },
      },
    };
    const expected = {
      address: "Harrow, UK",
      city: "Harrow",
      coordinates: [-0.3419949999999999, 51.580559],
      country: "GB",
      state: "England",
    };

    const actual = new Location(gmapsResult).toSubdocument;
    assert.deepEqual(actual, expected);
  });
  it("Should produce subdocument for gmaps place/details result with few details", () => {
    // Only country
    // from place/details/json?place_id=ChIJTVvkHR8cfW8RgQrUxfSd2Vk&fields=address_component,formatted_address,geometry
    const gmapsResult = {
      address_components: [
        {
          long_name: "Nauru",
          short_name: "NR",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Nauru",
      geometry: {
        location: {
          lat: -0.522778,
          lng: 166.931503,
        },
      },
    };
    const expected = {
      address: "Nauru",
      coordinates: [166.931503, -0.522778],
      country: "NR",
    };

    const actual = new Location(gmapsResult).toSubdocument;
    assert.deepEqual(actual, expected);
  });
  it("Should produce subdocument with neighborhood for gmaps place/details with sublocality instead of neighborhood", () => {
    // from place/details/json?place_id=ChIJzRMqMYtFqEcRavniE5lwMzA&fields=address_component,formatted_address,geometry
    const gmapsResult = {
      address_components: [
        {
          long_name: "Neukölln",
          short_name: "Neukölln",
          types: ["sublocality_level_1", "sublocality", "political"],
        },
        {
          long_name: "Berlin",
          short_name: "Berlin",
          types: ["locality", "political"],
        },
        {
          long_name: "Dahme-Spreewald",
          short_name: "Dahme-Spreewald",
          types: ["administrative_area_level_3", "political"],
        },
        {
          long_name: "Berlin",
          short_name: "Berlin",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Germany",
          short_name: "DE",
          types: ["country", "political"],
        },
      ],
      formatted_address: "Neukölln, Berlin, Germany",
      geometry: {
        location: {
          lat: 52.4407709,
          lng: 13.4445071,
        },
      },
    };

    const expected = {
      address: "Neukölln, Berlin, Germany",
      city: "Berlin",
      coordinates: [13.4445071, 52.4407709],
      country: "DE",
      neighborhood: "Neukölln",
      state: "Berlin",
    };

    const actual = new Location(gmapsResult).toSubdocument;
    assert.deepEqual(actual, expected);
  });
  it("Should produce subdocument with city for gmaps place/details with postal_town instead of locality", () => {
    // from place/details/json?place_id=ChIJH0KgOTYTdkgRYjcfqlxBg74&fields=address_component,formatted_address,geometry
    const gmapsResult = {
      address_components: [
        {
          long_name: "226-212",
          short_name: "226-212",
          types: ["street_number"],
        },
        {
          long_name: "Imperial Drive",
          short_name: "A4090",
          types: ["route"],
        },
        {
          long_name: "Rayners Lane",
          short_name: "Rayners Lane",
          types: ["sublocality_level_1", "sublocality", "political"],
        },
        {
          long_name: "Harrow",
          short_name: "Harrow",
          types: ["postal_town"],
        },
        {
          long_name: "Greater London",
          short_name: "Greater London",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "England",
          short_name: "England",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "United Kingdom",
          short_name: "GB",
          types: ["country", "political"],
        },
        {
          long_name: "HA2 7JW",
          short_name: "HA2 7JW",
          types: ["postal_code"],
        },
      ],
      formatted_address: "226-212 A4090, Rayners Lane, Harrow HA2 7JW, UK",
      geometry: {
        location: {
          lat: 51.5764592,
          lng: -0.3696955000000001,
        },
      },
    };

    const expected = {
      address: "226-212 A4090, Rayners Lane, Harrow HA2 7JW, UK",
      city: "Harrow",
      coordinates: [-0.3696955000000001, 51.5764592],
      country: "GB",
      neighborhood: "Rayners Lane",
      state: "England",
      zip: "HA2 7JW",
    };

    const actual = new Location(gmapsResult).toSubdocument;
    assert.deepEqual(actual, expected);
  });
  it("Should produce subdocument for 1st result from gmaps reverse geocode", () => {
    // from geocode/json?latlng=43.39,-79.20
    const gmapsResults = [
      {
        address_components: [
          {
            long_name: "Niagara-on-the-Lake",
            short_name: "Niagara-on-the-Lake",
            types: ["locality", "political"],
          },
          {
            long_name: "Regional Municipality of Niagara",
            short_name: "Regional Municipality of Niagara",
            types: ["administrative_area_level_2", "political"],
          },
          {
            long_name: "Ontario",
            short_name: "ON",
            types: ["administrative_area_level_1", "political"],
          },
          {
            long_name: "Canada",
            short_name: "CA",
            types: ["country", "political"],
          },
        ],
        formatted_address: "Niagara-on-the-Lake, ON, Canada",
        geometry: {
          bounds: {
            northeast: {
              lat: 43.450472,
              lng: -79.042765,
            },
            southwest: {
              lat: 43.1407979,
              lng: -79.27302,
            },
          },
          location: {
            lat: 43.2549988,
            lng: -79.0772616,
          },
          location_type: "APPROXIMATE",
          viewport: {
            northeast: {
              lat: 43.450472,
              lng: -79.042765,
            },
            southwest: {
              lat: 43.1407979,
              lng: -79.27302,
            },
          },
        },
        place_id: "ChIJsQIX2RRf04kRwKIRfVRRAXY",
        types: ["locality", "political"],
      },
      {
        address_components: [
          {
            long_name: "Regional Municipality of Niagara",
            short_name: "Regional Municipality of Niagara",
            types: ["administrative_area_level_2", "political"],
          },
          {
            long_name: "Ontario",
            short_name: "ON",
            types: ["administrative_area_level_1", "political"],
          },
          {
            long_name: "Canada",
            short_name: "CA",
            types: ["country", "political"],
          },
        ],
        formatted_address: "Regional Municipality of Niagara, ON, Canada",
        geometry: {
          bounds: {
            northeast: {
              lat: 43.450472,
              lng: -78.9059441,
            },
            southwest: {
              lat: 42.6867019,
              lng: -79.78729799999999,
            },
          },
          location: {
            lat: 43.0581645,
            lng: -79.29021329999999,
          },
          location_type: "APPROXIMATE",
          viewport: {
            northeast: {
              lat: 43.450472,
              lng: -78.9059441,
            },
            southwest: {
              lat: 42.6867019,
              lng: -79.78729799999999,
            },
          },
        },
        place_id: "ChIJt96TyZ5M04kRliMZDZNGf-8",
        types: ["administrative_area_level_2", "political"],
      },
      {
        address_components: [
          {
            long_name: "Ontario",
            short_name: "ON",
            types: ["administrative_area_level_1", "political"],
          },
          {
            long_name: "Canada",
            short_name: "CA",
            types: ["country", "political"],
          },
        ],
        formatted_address: "Ontario, Canada",
        geometry: {
          bounds: {
            northeast: {
              lat: 56.931393,
              lng: -74.3206479,
            },
            southwest: {
              lat: 41.6765559,
              lng: -95.1562271,
            },
          },
          location: {
            lat: 51.253775,
            lng: -85.323214,
          },
          location_type: "APPROXIMATE",
          viewport: {
            northeast: {
              lat: 56.931393,
              lng: -74.3206479,
            },
            southwest: {
              lat: 41.6765559,
              lng: -95.1562271,
            },
          },
        },
        place_id: "ChIJrxNRX7IFzkwRCR5iKVZC-HA",
        types: ["administrative_area_level_1", "political"],
      },
      {
        address_components: [
          {
            long_name: "Canada",
            short_name: "CA",
            types: ["country", "political"],
          },
        ],
        formatted_address: "Canada",
        geometry: {
          bounds: {
            northeast: {
              lat: 83.6381,
              lng: -50.9766,
            },
            southwest: {
              lat: 41.6765559,
              lng: -141.00187,
            },
          },
          location: {
            lat: 56.130366,
            lng: -106.346771,
          },
          location_type: "APPROXIMATE",
          viewport: {
            northeast: {
              lat: 83.6381,
              lng: -50.9766,
            },
            southwest: {
              lat: 41.6765559,
              lng: -141.00187,
            },
          },
        },
        place_id: "ChIJ2WrMN9MDDUsRpY9Doiq3aJk",
        types: ["country", "political"],
      },
    ];
    const expected = {
      address: "Niagara-on-the-Lake, ON, Canada",
      city: "Niagara-on-the-Lake",
      coordinates: [-79.0772616, 43.2549988],
      country: "CA",
      state: "ON",
    };

    const actual = new Location(gmapsResults).toSubdocument;
    assert.deepEqual(actual, expected);
  });
  it("Should produce empty subdocument for gmaps reverse geocode with ZERO_RESULT", () => {
    // from geocode/json?latlng=10,102
    const gmapsResults = [];
    const expected = {};

    const actual = new Location(gmapsResults).toSubdocument;
    assert.deepEqual(actual, expected);
  });
});
