
export const asyncGetGeoLocation = () => {
    return new Promise((resolve, reject) => {
        const onGeoSuccess = (pos) => {
            const { coords } = pos;
            resolve(coords);
        };
        const onGeoError = () => {
            reject(new Error('failed getting location'));
        };
        navigator.geolocation.getCurrentPosition(onGeoSuccess,onGeoError);
    });
};
