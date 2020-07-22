export const asyncGetGeoLocation = () => {
  return new Promise((resolve, reject) => {
    const onGeoSuccess = (pos) => {
      const {
        coords: { latitude, longitude },
      } = pos;
      resolve({ lat: latitude, lng: longitude });
    };
    const onGeoError = () => {
      reject(new Error("The acquisition of the geolocation failed because at least one internal source of position returned an internal error."));
    };
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
  });
};
