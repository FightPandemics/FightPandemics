const { Client } = require("@googlemaps/google-maps-services-js");
const {
  config: { geo },
} = require("../../../../config");
const Location = require("./utils/Location");

const PLACE_AUTOCOMPLETE_TYPE = "geocode";
const PLACE_DETAILS_FIELDS = [
  "address_component",
  "formatted_address",
  "geometry/location",
];

const client = new Client({});

const getAddressPredictions = async (input, sessiontoken) => {
  const params = {
    input,
    key: geo.googleMapsApiKey,
    sessiontoken,
    types: PLACE_AUTOCOMPLETE_TYPE,
  };
  const { data } = await client.placeAutocomplete({ params });
  return data;
};

const getLocationDetailsByPlaceId = async (placeId, sessiontoken) => {
  const params = {
    fields: PLACE_DETAILS_FIELDS,
    key: geo.googleMapsApiKey,
    place_id: placeId,
    sessiontoken,
  };
  const { data } = await client.placeDetails({ params });
  return {
    location: new Location(data.result).toSubdocument,
    original: data,
  };
};

const getLocationByLatLng = async (lat, lng) => {
  const params = {
    key: geo.googleMapsApiKey,
    latlng: { lat, lng },
  };
  const { data } = await client.reverseGeocode({ params });
  return {
    location: new Location(data.results).toSubdocument,
    original: data,
  };
};

module.exports = {
  getAddressPredictions,
  getLocationByLatLng,
  getLocationDetailsByPlaceId,
};
