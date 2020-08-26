export const asyncGetGeoLocation = () => {
  return new Promise((resolve, reject) => {
    const onGeoSuccess = (pos) => {
      const {
        coords: { latitude, longitude },
      } = pos;
      resolve({ lat: latitude, lng: longitude });
    };
    const onGeoError = (err) => {
      // We expect this to be a GeolocationPositionError object
      reject(err);
    };
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
  });
};
