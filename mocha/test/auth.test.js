const requestModule = require("supertest");
const { expect } = require('chai');
const httpStatus = require('http-status');
const APP_URL = process.env.MOCHA_URL 

beforeEach(async () => {

  credentialsWithWrongPassword = {
    email: 'userDontExists@gmail.com',
    password: 'Test1234;'
  };
});

  it("User is not able to log in with the wrong credentials", () => { 
    return requestModule(APP_URL)
      .post('/api/auth/login')
      .send(credentialsWithWrongPassword)
      .expect(httpStatus.UNAUTHORIZED)     
      .then((res) => {    
        //console.log(res) 
        expect(res.body).to.have.a.property('error').to.be.equal('Unauthorized');
        expect(res.body).to.have.a.property('message').to.be.equal('Wrong email or password.');
      });
});

  it("User gets an error when trying to change the password with invalid email", () => {
    return requestModule(APP_URL)
      .post('/api/auth/change-password')
      .send({ "email": "emailgmail.ua"})
      .expect(httpStatus.BAD_REQUEST)     
      .then((res) => {
        //console.log(res)
        expect(res.body).to.have.a.property('error').to.be.equal('Bad Request');
        expect(res.body).to.have.a.property('message').to.be.equal('body.email should match format "email"');
      });
  }); 
