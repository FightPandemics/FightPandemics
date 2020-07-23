export const asyncGetGeoLocation = () => {
  return new Promise((resolve, reject) => {
    const onGeoSuccess = (pos) => {
      const {
        coords: { latitude, longitude },
      } = pos;
      resolve({ lat: latitude, lng: longitude });
    };
    const onGeoError = () => {
      reject(new Error(geolocationPositionErrorInstance.message));
    };
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
  });
};
