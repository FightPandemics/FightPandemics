var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = 'https://staging.fightpandemics.work:443';
var util = require("util");
//setting up the test data
const userCredentials = {
    email: 'fptest20@pokemail.net',
    password: 'TestTest!'
  }
  describe("Auth", function(){
    var token = null;
//including login in before method, so it is done before every test
  before(function(done){
    request
      .post(baseUrl+ '/api/auth/login')
      .send(userCredentials)
      .end(function(err, response){
         expect(response.statusCode).to.equal(200);
         expect(token).should.not.be.empty;
        token = response.body.token;
        done();
      });
  });
    it("User logs in successfully with the correct credentials", function(done){
        request(baseUrl)
        .get('/api/auth/login')
        .set('Authorization', 'Bearer ' + token),
        function(error,response,body){
                expect(response.statusCode).to.equal(200);
                console.log(body);
            done();
        };
    });
});