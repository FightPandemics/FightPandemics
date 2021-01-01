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
const FACILITY_RADIUS_BY_TYPE = {
  doctor: 1500,
  hospital: 50000,
  pharmacy: 5000,
};
const FACILITY_DETAILS_FIELDS = [
  "formatted_address",
  "geometry",
  "url",
  "adr_address",
  "business_status",
  "formatted_phone_number",
  "international_phone_number",
  "opening_hours",
];
const MAX_FACILITIES = 10;

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

const getNearbyPlacesByType = async (lat, lng, type) => {
  const location = { lat, lng };
  const radius = FACILITY_RADIUS_BY_TYPE[type];
  const { data } = await client.placesNearby({
    params: {
      key: geo.googleMapsApiKey,
      location,
      radius,
      type,
    },
  });
  return data.results.length > 0
    ? data.results.slice(0, MAX_FACILITIES).map((place) => ({ ...place, type }))
    : data.results;
};

const getPlaceDetails = async (place) => {
  const { data } = await client.placeDetails({
    params: {
      fields: FACILITY_DETAILS_FIELDS,
      key: geo.googleMapsApiKey,
      place_id: place.place_id,
    },
  });
  return {
    adr_address: data.result.adr_address,
    business_status: data.result.business_status,
    formatted_address: data.result.formatted_address,
    formatted_phone_number: data.result.formatted_phone_number,
    geometry_location: data.result.geometry.location,
    international_phone_number: data.result.international_phone_number,
    name: place.name,
    open_now:
      data.result.opening_hours === undefined || data.result.opening_hours.open_now === undefined
        ? ""
        : JSON.stringify(data.result.opening_hours.open_now),
    opening_hours_periods:
      data.result.opening_hours === undefined || data.result.opening_hours.periods === undefined
        ? []
        : data.result.opening_hours.periods,
    place_id: place.place_id,
    type: place.type,
    url: data.result.url,
  };
};

const getPlacesDistances = async (lat, lng, places) => {
  const location = { lat, lng };
  const destinationLocations = places.map(
    (place) => place.geometry_location, 
  );

  const { data } = await client.distancematrix({
    params: {
      destinations: destinationLocations,
      key: geo.googleMapsApiKey,
      origins: [location],
    },
  });

  return places.map((place, i) => {
    const { distance } = data.rows[0].elements[i];
    // instead of "distance", might have just "status": "ZERO_RESULTS"
    return { ...place, distance: distance ? distance.text : "" };
  });
};

const getHealthFacilityPlaces = async (lat, lng, type) => {
  const places = await getNearbyPlacesByType(lat, lng, type);
  if (places.length === 0) return places;

  const placesWithDetails = await Promise.all(places.map(getPlaceDetails));

  return getPlacesDistances(lat, lng, placesWithDetails);
};

module.exports = {
  getAddressPredictions,
  getHealthFacilityPlaces,
  getLocationByLatLng,
  getLocationDetailsByPlaceId,
};
