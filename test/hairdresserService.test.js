let chai = require('chai');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const testHelper = require('./test.helper');
chai.use(chaiHttp);
let url= 'http://localhost:3000/api/';
let path = 'hairdresserService';

describe('HairdresserServices suite. Post/',()=>{
    let serviceTitle = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
    let service = {
        title: serviceTitle,
        code: serviceTitle +"- servcie",
        description: "Service description",
        cost: 1000,
        timeDuration: 20,
        genderID: 1,
        isMeasurable: true 
    }

    it('should create a new service', (done) => {
        chai.request(url)
        .post(path)
        .set('Authorization', `Bearer ${testHelper.hsToken}`)
        .send(
            service
        )
        .end( function(err,res){
            expect(res).to.have.status(201);
            expect(res.body.title).to.be.equals(service.title);
            expect(res.body.cost).to.be.equals(service.cost);
            expect(res.body.timeDuration).to.be.equals(service.timeDuration);
            expect(res.body.hairdressingSalonID).to.be.equals(1);
            done();
        });
    });


    it('should get an Unauthorized error when token is invalid', (done) => {
        chai.request(url)
        .post(path)
        .set('Authorization', `Bearer ${testHelper.invalidToken}`)
        .send(
            service
        )
        .end( function(err,res){
           testHelper.expectedUnauthorizedErrorWhenTokenIsInvalid(res,done);
        });
    });

    it('should get an Unauthorized error when there is not token', (done) => {
        chai.request(url)
        .post(path)
        .send(
            service
        )
        .end( function(err,res){
           testHelper.expectedUnauthorizedErrorWhenThereISNotToken(res,done);
        });
    });

    it('should get an Unauthorized Error based on invalid permissions', (done) => {
        chai.request(url)
        .post(path)
        .set('Authorization', `Bearer ${testHelper.clientToken}`)
        .send(
            service
        )
        .end( function(err,res){
           testHelper.expectedUnauthorizedErrorBasedOnInvalidPermissions(res,done);
        });
    });

    it('should get a bad request error based on a missing fields', (done) => {
        chai.request(url)
        .post(path)
        .set('Authorization', `Bearer ${testHelper.hsToken}`)
        .send(
            {
                title: 'title_example'
            }
        )
        .end( function(err,res){
            testHelper.expectedBadRequestErrorBasedOnAMissingField(res,done);
        });
    });
    
});



describe('HairdresserServices suite. Get/',()=>{
    let query = '?hairdressingSalonID=';
    let hsID = 1;

    it('should get a list of services using hsToken', (done) => {
        chai.request(url)
        .get(path + query + hsID)
        .set('Authorization', `Bearer ${testHelper.hsToken}`)
        .end( function(err,res){
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.gt(0);
            expect(res.body[0].title).to.not.be.undefined;
            expect(res.body[0].hairdressingSalonID).to.be.equals(hsID);
            done();
        });
    });

    it('should get a list of services using clientToken', (done) => {
        chai.request(url)
        .get(path + query + hsID)
        .set('Authorization', `Bearer ${testHelper.clientToken}`)
        .end( function(err,res){
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.gt(0);
            expect(res.body[0].title).to.not.be.undefined;
            expect(res.body[0].hairdressingSalonID).to.be.equals(hsID);
            done();
        });
    });


    it('should get an Unauthorize error when token is invalid', (done) => {
        chai.request(url)
        .get(path + query + hsID)
        .set('Authorization', `Bearer ${testHelper.invalidToken}`)
        .end( function(err,res){
            testHelper.expectedUnauthorizedErrorWhenTokenIsInvalid(res,done);
        });
    });

});