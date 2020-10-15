const {Client} = require("@googlemaps/google-maps-services-js");
const {
    config: { geo },
  } = require("../../../../config");
  
var places = [];

const getDoctorFacilities = async (location, maxFacilities) => { 
    const client = new Client({});
    await client.placesNearby({ params: { location: location, type: 'doctor', rankby: 'distance', key: geo.googleMapsApiKey, }
    })
    .then((r) => {
        places = r.data.results.length > 0 ? r.data.results.slice(0, maxFacilities) : r.data.results ;
    })
    .catch((e) => {
        console.log(e);
    });
    return places;
}
exports.getDoctorFacilities = getDoctorFacilities;