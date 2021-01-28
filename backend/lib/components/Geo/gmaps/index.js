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
const INVALID_PARTIAL_NAMES_BY_TYPE = [
  {
    type: "pharmacy",
    invPartialNames: [
      "Journal of Pharmacy",
      "Society of ",
      " Llc",
      " LLC",
      "Pharmaceuticals Inc",
      "Pharmaceuticals Co"
    ]
  }
];
const IMPERIAL_SYSTEM_COUNTRIES = [
  "LR",
  "MM",
  "US",
];
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
  let results = [];

  //Eliminate most invalid establishment category entries based on incorrect input by google business users
  const invPartNamesByType = INVALID_PARTIAL_NAMES_BY_TYPE.filter( item => item.type === type );
  if ((data.results.length > 0) && (invPartNamesByType.length > 0)) {
    results = data.results.filter(place =>  
      validPlaceNameForType(place.name, invPartNamesByType[0].invPartialNames) 
    );
  } else {
    results = data.results;
  };

  return results.length > 0
    ? results.slice(0, MAX_FACILITIES).map((place) => ({ ...place, type }))
    : results;
};

const validPlaceNameForType = (placeName, invPartialNames) => {
  for (var i = 0; i < invPartialNames.length; i++) {
    if (placeName.includes(invPartialNames[i])) {
      return false;
    }; 
  };
  return true;
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
  //need to get country in order to specify correct distance units
  const sourceLocation = await getLocationByLatLng(lat, lng);
  const units = IMPERIAL_SYSTEM_COUNTRIES.includes(sourceLocation.location.country) ? "imperial" : "metric";
  const { data } = await client.distancematrix({
    params: {
      destinations: destinationLocations,
      key: geo.googleMapsApiKey,
      origins: [location],
      units: units,
    },
  });

  return places.map((place, i) => {
    const { distance } = data.rows[0].elements[i];
    // instead of "distance", might have just "status": "ZERO_RESULTS"
    return { ...place, distance: distance ? distance.text : "" };
  });
};

const sortPlacesByDistance = async (places) => {
  //Sort by distance based on meters, kilometers, miles or no distance supplied.  
  let placesWithKilometers = [];
  if (places.length > 0) {
    placesWithKilometers =  places.map((place) => {
      return {...place, kilometers: getKilometersForPlace(place.distance) };
    });
    return placesWithKilometers.sort((a, b) => a.kilometers - b.kilometers);
  } else {
    return places;
  };
};

const getKilometersForPlace = (placeDistance) => {
  if (placeDistance.includes(" mi")) { return placeDistance.split(" ")[0] * 1.6 };
  if (placeDistance.includes(" m")) { return placeDistance.split(" ")[0] * 0.001 };
  if (placeDistance.includes(" km")) { return placeDistance.split(" ")[0] };
  return 2000;
};

const getHealthFacilityPlaces = async (lat, lng, type) => {
  const places = await getNearbyPlacesByType(lat, lng, type);
  if (places.length === 0) return places;

  const placesWithDetails = await Promise.all(places.map(getPlaceDetails));

  const placesWithDistances = await getPlacesDistances(lat, lng, placesWithDetails);

  return placesSortedByDistance = await sortPlacesByDistance(placesWithDistances);
};

module.exports = {
  getAddressPredictions,
  getHealthFacilityPlaces,
  getLocationByLatLng,
  getLocationDetailsByPlaceId,
};
