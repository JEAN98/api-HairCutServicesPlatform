let chai = require('chai');
const expect = require('chai').expect;
let facebookAccountPath = 'facebookAccount';
const testHelper = require('./test.helper');

describe('facebookAccount suites. Post/',() => 
{
    
    let haircutPlatformAccount = {
        firstName: "Facebook",
        facebookID: "123123f4frfv",
        lastName: "Test",
        email:"facebook@gmail.com",
        token: "AV2BJ34NGOI402NASDF546>?145434!==W3NR4IG2ASDFASDF=4JNGKASD;?43GASDF=",
        age: 18,
        genderID: 1
    };

    it('should be able to create a new account', (done) => {
        let currentPA = haircutPlatformAccount;
        currentPA.email = testHelper.createRamdonEmail();
        chai.request(testHelper.baseURL)
        .post(facebookAccountPath)
        .send(          
            currentPA
        )
        .end( function(err,res){
            expect(res).to.have.status(201);
            expect(res.body.client).to.not.be.undefined;
            expect(res.body.client.age).to.be.equals(currentPA.age)
            expect(res.body.client.email).to.be.equals(currentPA.email);
            expect(res.body.client.facebookID).to.be.undefined;
            expect(res.body.client.token).to.be.undefined;
            expect(res.body.token).to.not.be.undefined;
            done();
          });
    });

    it('should get a bad request error based on email already exists hs', (done) => {
        haircutPlatformAccount.email = "salonTest@gmail.com";
        chai.request(testHelper.baseURL)
        .post(facebookAccountPath)
        .send(          
            haircutPlatformAccount
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.details.error).to.be.equals('The email already exists');
            done();
          });
    });

    it('should get a bad request error based on email already exists as client', (done) => {
        haircutPlatformAccount.email = "hcAccounts@qa.com";
        chai.request(testHelper.baseURL)
        .post(facebookAccountPath)
        .send(          
            haircutPlatformAccount
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.details.error).to.be.equals('The email already exists');
            done();
          });
    });

    it('should get a bad request error based on invalid genderID', (done) => {
        let currentPA = haircutPlatformAccount;
        currentPA.genderID = 50478;
        currentPA.email= 'email@qa.com';

        chai.request(testHelper.baseURL)
        .post(facebookAccountPath)
        .send(          
            currentPA
        )
        .end( function(err,res){
            testHelper.expectedBadRequestErrorBasedOnInvalidConstraints(res,done);
          });
    });


    it('should get a bad request error based on a missing field', (done) => {
        chai.request(testHelper.baseURL)
        .post(facebookAccountPath)
        .send(          
            {
                firstName: "Mirella"
            }
        )
        .end( function(err,res){
            testHelper.expectedBadRequestErrorBasedOnAMissingField(res,done);
          });
    });

    it('should get a bad request error based on an invalid field', (done) => {
        let currentPA = haircutPlatformAccount;
        currentPA.password = 123;
        currentPA.lastName = 85;

        chai.request(testHelper.baseURL)
        .post(facebookAccountPath)
        .send(          
            currentPA
        )
        .end( function(err,res){
            testHelper.expectedBadRequestErrorBasedOnInvalidField(res,done);    
        });
    });

});
