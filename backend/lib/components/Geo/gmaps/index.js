const { Client } = require("@googlemaps/google-maps-services-js");
const {
  config: { geo },
} = require("../../../../config");
const schema = require("../../../endpoints/schema/geo.js")
const Location = require("./utils/Location");
const Place = require("./utils/place.js");

const PLACE_AUTOCOMPLETE_TYPE = "geocode";
const PLACE_DETAILS_FIELDS = [
  "address_component",
  "formatted_address",
  "geometry/location",
];
const FACILITY_RADIUS = [
  {type: "hospital", radius: 50000},
  {type: "doctor", radius: 1500},
  {type: "pharmacy", radius: 5000}
];
const FACILITY_DETAILS_FIELDS = [
  "formatted_address",
  "geometry",
  "url",
  "adr_address",
  "business_status",
  "formatted_phone_number",
  "international_phone_number",
  "opening_hours"
];

const client = new Client({});

const getNearbyPlacesByType = async (params, maxPlaces) => { 
  const { data } = await client.placesNearby({ params });
  return data.results.length > 0 ? data.results.slice(0, maxPlaces) : data.results;
};

const getFacilityDetails = async (places) => {
  let placesWithDetails = []; 
  for (const item of places) {
    const { data } = await client.placeDetails({
      params: { key: geo.googleMapsApiKey, place_id: item.place_id, fields: FACILITY_DETAILS_FIELDS }
    });    
    let placeWithDetails = {
      name: item.name,
      place_id: item.place_id,
      type: item.type,
      formatted_address: data.result.formatted_address,
      geometry: JSON.stringify(data.result.geometry),
      url: data.result.url,
      adr_address: data.result.adr_address,
      business_status: data.result.business_status,
      formatted_phone_number: data.result.formatted_phone_number,
      international_phone_number: data.result.international_phone_number,
      opening_hours: data.result.opening_hours == undefined ? "" : JSON.stringify(data.result.opening_hours),
      distance: "" 
    };
    placesWithDetails.push(placeWithDetails);
  };
  return placesWithDetails;
};

const getFacilityDistances = async (location, places) => { 
  let placesWithDistances = [];
  let destinationLocations = [];

  for (const item of places) {
    let destinationGeometry = JSON.parse(item.geometry);
    destinationLocations.push(destinationGeometry.location);
  };
  const { data } = await client.distancematrix({
    params: { origins: [location], destinations: destinationLocations, key: geo.googleMapsApiKey }
  }); 
  for (let i = 0; i < places.length; i++) {
    let placeWithDistance = {
      name: places[i].name,
      place_id: places[i].place_id,
      type: places[i].type,
      formatted_address: places[i].formatted_address,
      geometry: places[i].geometry,
      url: places[i].url,
      adr_address: places[i].adr_address,
      business_status: places[i].business_status,
      formatted_phone_number: places[i].formatted_phone_number,
      international_phone_number: places[i].international_phone_number,
      opening_hours: places[i].opening_hours,
      distance: data.rows[0].elements[i].distance.text 
    };
    placesWithDistances.push(placeWithDistance);
  };
  return placesWithDistances;
};

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

const getHealthFacilityPlaces = async (lat, lng, type) => {
  const MAX_FACILITIES = 10;
  const location = { lat: lat, lng: lng };
  const radius = FACILITY_RADIUS.find(o => o.type === type).radius;
  
  let places = [];
  
  await getNearbyPlacesByType({ key: geo.googleMapsApiKey, location: location, type: type, radius: radius }, MAX_FACILITIES )
    .then((result) => {
      result.forEach(function(item) {
        const place = new Place(item.name, item.place_id, type); 
        places.push(place);
      });
    })
    .then(() => {
      return getFacilityDetails(places); 
    })
    .then((result) => {
      let placesWithDetails = places.map(place => result.find(o => o.place_id === place.place_id) || place);
      return getFacilityDistances(location, placesWithDetails);
    })
    .then((result) => {
      places = places.map(place => result.find(o => o.place_id === place.place_id) || place);
    })
    .catch((e) => {
      console.log(e);
  });
  return places;
};

module.exports = {
  getAddressPredictions,
  getLocationByLatLng,
  getLocationDetailsByPlaceId,
  getHealthFacilityPlaces,
};
