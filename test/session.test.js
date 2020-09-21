let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
let url= 'http://localhost:3000/api/';
let hsSession = 'hairdressingSalon/session';
let hcPlatformSession = 'clientPlatformAccount/session';

describe('Sesion HairdressingSalon suites. Post/',()=>{
    it('should get a valid session', (done) => {
        let email = 'salonTest@gmail.com';
        chai.request(url)
        .post(hsSession)
        .send(
            {
              'email': email,
              'password': 'Admin@123'
            }
        )
        .end( function(err,res){
            expect(res).to.have.status(201);
            expect(res.body.token).to.not.be.undefined;
            expect(res.body.hairdressingSalon).to.not.be.undefined;
            expect(res.body.hairdressingSalon.password).to.be.undefined;
            expect(res.body.hairdressingSalon.email).to.be.equals(email);
            done();
        });
    });

    it('should get an Unauthorized error based on invalid credentials', (done) => {
        chai.request(url)
        .post(hsSession)
        .send(
            {
              'email': 'invalid@gmail.com',
              'password': 'invalidPassword'
            }
        )
        .end( function(err,res){
            expect(res).to.have.status(401);
            expect(res.body.token).to.be.undefined;
            expect(res.body.hairdressingSalon).to.be.undefined;
            expect(res.body.title).to.be.equals('Failed to create session');
            expect(res.body.error).to.be.equals('The email or password are invalid');
            done();
        });
    });

    it('should get an Unauthorized error by client credentials', (done) => {
        chai.request(url)
        .post(hsSession)
        .send(
            {
              'email': 'hcAccounts@qa.com',
              'password': 'Admin@123'
            }
        )
        .end( function(err,res){
            expect(res).to.have.status(401);
            expect(res.body.token).to.be.undefined;
            expect(res.body.hairdressingSalon).to.be.undefined;
            expect(res.body.title).to.be.equals('Failed to create session');
            expect(res.body.error).to.be.equals('The email or password are invalid');
            done();
        });
    });

    it('should get an Validation error based on missing fields', (done) => {
        chai.request(url)
        .post(hsSession)
        .send(
            {
              'password': 'Admin@123'
            }
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.token).to.be.undefined;
            expect(res.body.hairdressingSalon).to.be.undefined;
            expect(res.body.title).to.be.undefined;
            expect(res.body.details.name).to.be.equals('ValidationError');
            done();
        });
    });

    it('should get an Validation error based on invalid fields', (done) => {
        chai.request(url)
        .post(hsSession)
        .send(
            {
              'email': 123456789,
              'password': 123456789
            }
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.token).to.be.undefined;
            expect(res.body.hairdressingSalon).to.be.undefined;
            expect(res.body.title).to.be.undefined;
            expect(res.body.details.name).to.be.equals('ValidationError');
            done();
        });
    });
});

describe('Sesion clientPlatformAccount suites. Post/',()=>{
    it('should get a valid session', (done) => {
        let email = 'hcAccounts@qa.com';
        chai.request(url)
        .post(hcPlatformSession)
        .send(
            {
              'email': email,
              'password': 'Admin@123'
            }
        )
        .end( function(err,res){
            expect(res).to.have.status(201);
            expect(res.body.token).to.not.be.undefined;
            expect(res.body.client).to.not.be.undefined;
            expect(res.body.client.password).to.be.undefined;
            expect(res.body.client.email).to.be.equals(email);
            done();
        });
    });

    it('should get an Unauthorized error based on invalid credentials', (done) => {
        chai.request(url)
        .post(hcPlatformSession)
        .send(
            {
              'email': 'invalid@gmail.com',
              'password': 'invalidPassword'
            }
        )
        .end( function(err,res){
            expect(res).to.have.status(401);
            expect(res.body.token).to.be.undefined;
            expect(res.body.hairdressingSalon).to.be.undefined;
            expect(res.body.title).to.be.equals('Failed to create session');
            expect(res.body.error).to.be.equals('The email or password are invalid');
            done();
        });
    });

    it('should get an Unauthorized error by HairdressingSalon credentials', (done) => {
        let email = 'salonTest@gmail.com';
        chai.request(url)
        .post(hcPlatformSession)
        .send(
            {
              'email': email,
              'password': 'Admin@123'
            }
        )
        .end( function(err,res){
            expect(res).to.have.status(401);
            expect(res.body.token).to.be.undefined;
            expect(res.body.hairdressingSalon).to.be.undefined;
            expect(res.body.title).to.be.equals('Failed to create session');
            expect(res.body.error).to.be.equals('The email or password are invalid');
            done();
        });
    });

    it('should get an Validation error based on missing fields', (done) => {
        chai.request(url)
        .post(hcPlatformSession)
        .send(
            {
              'password': 'Admin@123'
            }
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.token).to.be.undefined;
            expect(res.body.hairdressingSalon).to.be.undefined;
            expect(res.body.title).to.be.undefined;
            expect(res.body.details.name).to.be.equals('ValidationError');
            done();
        });
    });

    it('should get an Validation error based on invalid fields', (done) => {
        chai.request(url)
        .post(hcPlatformSession)
        .send(
            {
              'email': 123456789,
              'password': 123456789
            }
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.token).to.be.undefined;
            expect(res.body.hairdressingSalon).to.be.undefined;
            expect(res.body.title).to.be.undefined;
            expect(res.body.details.name).to.be.equals('ValidationError');
            done();
        });
    });
});


