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
        let token = 'InvalidToken';
        chai.request(url)
        .post(path)
        .set('Authorization', `Bearer ${token}`)
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
