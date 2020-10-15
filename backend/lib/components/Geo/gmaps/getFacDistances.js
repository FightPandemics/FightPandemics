const {Client} = require("@googlemaps/google-maps-services-js");
const Place = require('./utils/place.js');
const {
    config: { geo },
  } = require("../../../../config");

var placesWithDistances = [];

const getFacilityDistances = async (location, places) => { 
    const client = new Client({});
    var originLoCation = {lat: Number(location[0]), lng: Number(location[1])};

    for (const item of places) {
        var destinationGeometry = JSON.parse(item.geometry);
        await client.distancematrix({
            params: { origins: [originLoCation], destinations: [destinationGeometry.location], key: geo.googleMapsApiKey }
        })
        .then((r) => {          
            var placeWithDistance = {
                name: item.name,
                place_id: item.place_id,
                type: item.type,
                formatted_address: item.formatted_address,
                geometry: item.geometry,
                url: item.url,
                adr_address: item.adr_address,
                business_status: item.business_status,
                formatted_phone_number: item.formatted_phone_number,
                international_phone_number: item.international_phone_number,
                opening_hours: item.opening_hours,
                distance: r.data.rows[0].elements[0].distance.text 
            };
            placesWithDistances.push(placeWithDistance);
        })
        .catch((e) => {
            console.log(e);
        });
    };
    return placesWithDistances;
}
exports.getFacilityDistances = getFacilityDistances;