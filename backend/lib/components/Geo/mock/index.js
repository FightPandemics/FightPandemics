// mocks geolocation for local dev so no key is needed for unrelated work
const mockedLocations = [
  {
    address: "Venice Beach, Venice, FL 34285, USA",
    city: "Venice",
    coordinates: [-82.4575967, 27.1000553],
    country: "US",
    state: "FL",
    zip: "34285",
  },
  {
    address: "Venice, FL, USA",
    city: "Venice",
    coordinates: [-82.4542632, 27.09977749999999],
    country: "US",
    state: "FL",
  },
  {
    address: "Venice, Metropolitan City of Venice, Italy",
    city: "Venice",
    coordinates: [12.3155151, 45.4408474],
    country: "IT",
    state: "Veneto",
  },
  {
    address: "Venice, Los Angeles, CA, USA",
    city: "Los Angeles",
    coordinates: [-118.4694832, 33.98504689999999],
    country: "US",
    neighborhood: "Venice",
    state: "CA",
  },
  {
    address: "Venice Ave, Staten Island, NY 10304, USA",
    coordinates: [-74.0927225, 40.6024931],
    country: "US",
    neighborhood: "Todt Hill",
    state: "NY",
    zip: "10304",
  },
];

const getAddressPredictions = async () => {
  return {
    predictions: mockedLocations.map((loc, idx) => ({
      description: loc.address,
      place_id: idx,
    })),
  };
};

const getLocationDetailsByPlaceId = async (placeId) => {
  return {
    location: mockedLocations[placeId],
    original: "Mocked",
  };
};

const getLocationByLatLng = async () => {
  return {
    location: mockedLocations[0],
    original: "Mocked",
  };
};

module.exports = {
  getAddressPredictions,
  getLocationByLatLng,
  getLocationDetailsByPlaceId,
};
