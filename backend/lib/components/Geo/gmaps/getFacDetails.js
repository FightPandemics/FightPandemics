const {Client} = require("@googlemaps/google-maps-services-js");
const Place = require('./utils/place.js');
const {
    config: { geo },
  } = require("../../../../config");

const PLACE_DETAILS_FIELDS = [
    "formatted_address",
    "geometry",
    "url",
    "adr_address",
    "business_status",
    "formatted_phone_number",
    "international_phone_number",
    "opening_hours"
  ];

var placesWithDetails = [];

const getFacilityDetails = async (location, places) => { 
    const client = new Client({});

    for (const item of places) {
        await client.placeDetails({
            params: { key: geo.googleMapsApiKey, place_id: item.place_id, fields: PLACE_DETAILS_FIELDS }
        })
        .then((r) => {          
            var placeWithDetails = {
                name: item.name,
                place_id: item.place_id,
                type: item.type,
                formatted_address: r.data.result.formatted_address,
                geometry: JSON.stringify(r.data.result.geometry),
                url: r.data.result.url,
                adr_address: r.data.result.adr_address,
                business_status: r.data.result.business_status,
                formatted_phone_number: r.data.result.formatted_phone_number,
                international_phone_number: r.data.result.international_phone_number,
                opening_hours: r.data.result.opening_hours == undefined ? '' : JSON.stringify(r.data.result.opening_hours),
                distance: '' 
            };
            placesWithDetails.push(placeWithDetails);
        })
        .catch((e) => {
            console.log(e);
        });
    };
    return placesWithDetails;
}
exports.getFacilityDetails = getFacilityDetails;