let chai = require('chai');
const expect = require('chai').expect;
let hSalonPath = 'haircutPlatformAccount';
const testHelper = require('./test.helper');

describe('haircutPlatformAccount suites. Post/',()=>{
    
    let haircutPlatformAccount = {
        firstName: "Andrew",
        lastName: "Vega",
        email:"salonTest@gmail.com",
        password:"Admin@123",
        age: 18,
        genderID: 2
    };

    it('should be able to create a new account', (done) => {
        let currentPA = haircutPlatformAccount;
        currentPA.email = testHelper.createRamdonEmail();
        chai.request(testHelper.baseURL)
        .post(hSalonPath)
        .send(          
            currentPA
        )
        .end( function(err,res){
            expect(res).to.have.status(201);
            expect(res.body.client).to.not.be.undefined;
            expect(res.body.client.age).to.be.equals(currentPA.age)
            expect(res.body.client.email).to.be.equals(currentPA.email);
            expect(res.body.client.password).to.be.undefined;
            expect(res.body.token).to.not.be.undefined;
            done();
          });
    });

    it('should get a bad request error based on email already exists hs', (done) => {
        haircutPlatformAccount.email = "salonTest@gmail.com";
        chai.request(testHelper.baseURL)
        .post(hSalonPath)
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
        .post(hSalonPath)
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
        .post(hSalonPath)
        .send(          
            currentPA
        )
        .end( function(err,res){
            testHelper.expectedBadRequestErrorBasedOnInvalidConstraints(res,done);
          });
    });


    it('should get a bad request error based on a missing field', (done) => {
        chai.request(testHelper.baseURL)
        .post(hSalonPath)
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
        .post(hSalonPath)
        .send(          
            currentPA
        )
        .end( function(err,res){
            testHelper.expectedBadRequestErrorBasedOnInvalidField(res,done);    
        });
    });

});
