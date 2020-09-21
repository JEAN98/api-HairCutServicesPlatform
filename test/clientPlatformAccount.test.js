let chai = require('chai');
const expect = require('chai').expect;
let url= 'http://localhost:3000/api/';
let hSalonPath = 'haircutPlatformAccount';
var randomEmail = require('random-email');

describe('haircutPlatformAccount suites. Post/',()=>{
    
    let haircutPlatformAccount = {
        firstName: "Andrew",
        lastName: "Vega",
        birthday: "1998/07/22",
        email:"salonTest@gmail.com",
        password:"Admin@123",
        genderID: 2
    };

    it('should be able to create a new account', (done) => {
        let currentPA = haircutPlatformAccount;
        currentPA.email = randomEmail();
        chai.request(url)
        .post(hSalonPath)
        .send(          
            currentPA
        )
        .end( function(err,res){
            expect(res).to.have.status(201);
            expect(res.body.client).to.not.be.undefined;
            expect(res.body.client.email).to.be.equals(currentPA.email);
            expect(res.body.client.password).to.be.undefined;
            expect(res.body.token).to.not.be.undefined;
            done();
          });
    });

    it('should get a bad request error based on email already exists as HairdressingSalon', (done) => {
        haircutPlatformAccount.email = "salonTest@gmail.com";
        chai.request(url)
        .post(hSalonPath)
        .send(          
            haircutPlatformAccount
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.details.error).to.be.equals('The email already exists as HairdressingSalon');
            done();
          });
    });

    it('should get a bad request error based on email already exists as client', (done) => {
        haircutPlatformAccount.email = "hcAccounts@qa.com";
        chai.request(url)
        .post(hSalonPath)
        .send(          
            haircutPlatformAccount
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.details.error).to.be.equals('The email already exists as Client');
            done();
          });
    });

    it('should get a bad request error based on invalid genderID', (done) => {
        let currentPA = haircutPlatformAccount;
        currentPA.genderID = 50478;
        currentPA.email= 'email@qa.com';

        chai.request(url)
        .post(hSalonPath)
        .send(          
            currentPA
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.details.message).to.be.equals('Some of the constraints are not defined properly or they does not exist in the database');
            done();
          });
    });


    it('should get a bad request error based on a missing field', (done) => {
        chai.request(url)
        .post(hSalonPath)
        .send(          
            {
                firstName: "Mirella"
            }
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.details.name).to.be.equals('ValidationError');
            done();
          });
    });

    it('should get a bad request error based on an invalid field', (done) => {
        let currentPA = haircutPlatformAccount;
        currentPA.password = 123;
        currentPA.lastName = 85;

        chai.request(url)
        .post(hSalonPath)
        .send(          
            currentPA
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.details.name).to.be.equals('ValidationError');
            done();
          });
    });

});
