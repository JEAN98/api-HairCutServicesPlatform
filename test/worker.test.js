let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const testHelper = require('./test.helper');
let path = 'worker';

describe('Worker suites for Post/',()=> {
    let worker = {
        identificationCard: testHelper.createRamdonIDCard(),
         firstName: testHelper.createRamdonName(),
         lastName: "Ramos",
         genderID: 1
     };

    it('should create a new worker', (done) => {
        chai.request(testHelper.baseURL)
        .post(path)
        .set('Authorization', `Bearer ${testHelper.hsToken}`)
        .send(worker)
        .end( function(err,res){
            expect(res).to.have.status(201);
            expect(res.body.identificationCard).to.be.equals(worker.identificationCard);
            expect(res.body.genderID).to.be.equals(worker.genderID);
            expect(res.body.hairdressingSalonID).to.not.be.undefined;
            done();
        });
    });

    it('should get an Unauthorized Error based on invalid permissions', (done) => {
        chai.request(testHelper.baseURL)
        .post(path)
        .set('Authorization', `Bearer ${testHelper.clientToken}`)
        .send(worker)
        .end( function(err,res){
            testHelper.expectedUnauthorizedErrorBasedOnInvalidPermissions(res,done);
        });
    });

    it('should get an Unauthorized error when there is not token', (done) => {
        chai.request(testHelper.baseURL)
        .post(path)
        .send(
            worker
        )
        .end( function(err,res){
           testHelper.expectedUnauthorizedErrorWhenThereISNotToken(res,done);
        });
    });

    it('should get an Unauthorized error when token is invalid', (done) => {
        chai.request(testHelper.baseURL)
        .post(path)
        .set('Authorization', `Bearer ${testHelper.invalidToken}`)
        .send(
            worker
        )
        .end( function(err,res){
           testHelper.expectedUnauthorizedErrorWhenTokenIsInvalid(res,done);
        });
    });

    it('should get a bad request error based on a missing fields', (done) => {
        chai.request(testHelper.baseURL)
        .post(path)
        .set('Authorization', `Bearer ${testHelper.hsToken}`)
        .send(
            {
                firstName: "Mary",
            }
        )
        .end( function(err,res){
            testHelper.expectedBadRequestErrorBasedOnAMissingField(res,done);
        });
    });

    it('should get a bad request error based on invalid fields', (done) => {
        let currentWorker = worker;
        currentWorker.firstName = 123456789;
        chai.request(testHelper.baseURL)
        .post(path)
        .set('Authorization', `Bearer ${testHelper.hsToken}`)
        .send(
            currentWorker
        )
        .end( function(err,res){
            testHelper.expectedBadRequestErrorBasedOnInvalidField(res,done);
        });
    });

});

describe('Worker suites for Get/',()=> {
    it('should get a list of workers using hsToken', (done) => {
        chai.request(testHelper.baseURL)
        .get(path)
        .set('Authorization', `Bearer ${testHelper.hsToken}`)
        .end( function(err,res){
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.gt(0);
            expect(res.body[0].identificationCard).to.not.be.undefined;
            expect(res.body[0].hairdressingSalonID).to.not.be.undefined;
            done();
        });
    });

    it('should get a list of workers using hsToken and the query', (done) => {
        let query = '?isActive=true';
        chai.request(testHelper.baseURL)
        .get(path + query)
        .set('Authorization', `Bearer ${testHelper.hsToken}`)
        .end( function(err,res){
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.gt(0);
            expect(res.body[0].identificationCard).to.not.be.undefined;
            expect(res.body[0].isActive).to.be.equals(true);
            expect(res.body[0].hairdressingSalonID).to.not.be.undefined;
            done();
        });
    });

    it('should get an Unauthorized error when token is invalid', (done) => {
        chai.request(testHelper.baseURL)
        .get(path)
        .set('Authorization', `Bearer ${testHelper.invalidToken}`)
        .end( function(err,res){
           testHelper.expectedUnauthorizedErrorWhenTokenIsInvalid(res,done);
        });
    });

    it('should get an Unauthorized error when there is not token', (done) => {
        chai.request(testHelper.baseURL)
        .get(path)
        .end( function(err,res){
           testHelper.expectedUnauthorizedErrorWhenThereISNotToken(res,done);
        });
    });


    it('should get a bad request error based on invalid fields', (done) => {
        let query = '?isActive=123456789';
        chai.request(testHelper.baseURL)
        .get(path+query)
        .set('Authorization', `Bearer ${testHelper.hsToken}`)
        .end( function(err,res){
            testHelper.expectedBadRequestErrorBasedOnInvalidField(res,done);
        });
    });


});