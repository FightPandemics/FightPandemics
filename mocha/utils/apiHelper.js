const supertest = require('supertest');


exports.sendPOSTRequest = async (baseUrl, apiEndPoint, requestBody) => {
    try {
        let res = await supertest(baseUrl).post(apiEndPoint).retry(2)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(requestBody);
        return res;
    } catch (err) {
        console.log('Error in sending POST Request: ', err);
    }
};