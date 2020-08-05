var shouldModule = require("should");
var requestModule = require("supertest");
var expectModule = require("chai").expect;
var baseUrl = 'https://staging.fightpandemics.work';
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
      requestModule(baseUrl)
      .post('/api/auth/login')
      .send(userCredentials)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
    it("User logs in successfully with the correct credentials", function(done){
        this.timeout(500);
        setTimeout(done, 300);
        requestModule(baseUrl)
        .get('/api/auth/login')
        .set('Authorization', 'Bearer ' + token),
        function(error,response,body){
                expect(response.statusCode).to.equal(200);
                console.log(body);
            done();
        };
    });
});