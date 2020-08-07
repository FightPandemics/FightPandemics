const requestModule = require("supertest");
const { expect } = require('chai');
const httpStatus = require('http-status');
const app = 'https://staging.fightpandemics.work';
const userPosts = { "title":"Test","content":"Test","types":["Others"],"visibility":"state","expireAt":"forever","objective":"offer" }

beforeEach(async () => {
    userCredentials = {
    email: 'yourEmail',
    password: 'password;'
  };
});

describe('Post', function(){
    it('User logs in successfully with the correct credentials', authLogin());
    it('User post successfully with credentials', function(done){
        requestModule(app)
            .get('/api/posts')
            .send(userPosts)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(function(err, res){
            if (err) return done(err);
            console.log(res.body);
            done()
        });
    });
});

function authLogin() {
    return function(done) {
        requestModule(app)
            .post('/api/auth/login')
            .send(userCredentials)
            .expect(httpStatus.OK)
            .end(onResponse);
        function onResponse(err, res) {
           if (err) return done(err);
           return done();
        }
    };
};