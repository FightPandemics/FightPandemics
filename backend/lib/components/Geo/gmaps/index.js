const { Client } = require("@googlemaps/google-maps-services-js");
const {
  config: { geo },
} = require("../../../../config");
const Location = require("./utils/Location");
const Place = require('./utils/place.js');
const getDoctorFac = require("./getDocFacilities.js");
const getFacDetails = require("./getFacDetails.js");
const getFacDistances = require("./getFacDistances.js");

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

const getHealthFacilityPlaces = async (lat, lng) => {
  const MAX_HOSPITAL_FACILITIES = 5;
  const MAX_DOCTOR_FACILITIES = 5;
  const location = [lat, lng];
  
  var places = [];
  
  await client.placesNearby({ params: { key: geo.googleMapsApiKey, location: location, type: 'hospital', radius: 50000 } })
    .then((r) => {
      const hospPlaces = r.data.results.length > 0 ? r.data.results.slice(0, MAX_HOSPITAL_FACILITIES) : r.data.results ;
      hospPlaces.forEach(function(item) {
          hospital = new Place(item.name, item.place_id, 'hospital');    
          places.push(hospital);
      });
    })
    .then(() => {
      return getDoctorFac.getDoctorFacilities(location, MAX_DOCTOR_FACILITIES);
    })
    .then(function(result) { 
      result.forEach(function(item) {
          doctor = new Place(item.name, item.place_id, 'doctor');   
          places.push(doctor);
      });
    })
    .then(() => {
      return getFacDetails.getFacilityDetails(location, places); 
    })
    .then((result) => {
      var placesWithDetails = places.map(obj => result.find(o => o.place_id === obj.place_id) || obj);
      return getFacDistances.getFacilityDistances(location, placesWithDetails);
    })
    .then((result) => {
      places = places.map(obj => result.find(o => o.place_id === obj.place_id) || obj);
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
