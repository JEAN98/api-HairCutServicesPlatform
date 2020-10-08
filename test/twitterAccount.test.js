let chai = require('chai');
const expect = require('chai').expect;
let twitterAccountPath = 'twitterAccount';
const testHelper = require('./test.helper');

describe('facebookAccount suites. Post/',() => 
{
    
    let twitterAccount = {
        username: "twitterUsername",
        twitterID: "123123f4frfv",
        token: "AV2BJ34NGOI402NASDF546>?145434!==W3NR4IG2ASDFASDF=4JNGKASD;?43GASDF=",
    };

    it('should be able to create a new account', (done) => {
        let currentPA = twitterAccount;
        currentPA.twitterID = testHelper.createRamdonEmail();
        chai.request(testHelper.baseURL)
        .post(twitterAccountPath)
        .send(          
            currentPA
        )
        .end( function(err,res){
            expect(res).to.have.status(201);
            expect(res.body.client).to.not.be.undefined;
            expect(res.body.client.email).to.be.equals(currentPA.email);
            expect(res.body.client.facebookID).to.be.undefined;
            expect(res.body.client.token).to.be.undefined;
            expect(res.body.token).to.not.be.undefined;
            done();
          });
    });

    it('should get a bad request error based on twitterID already exists', (done) => {
        twitterAccount.twitterID = "1234578493gasfdnbe34h4e5n";
        chai.request(testHelper.baseURL)
        .post(twitterAccountPath)
        .send(          
            twitterAccount
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.details.error).to.be.equals('twitterID already exists');
            done();
          });
    });

    it('should get a bad request error based on a missing field', (done) => {
        chai.request(testHelper.baseURL)
        .post(twitterAccountPath)
        .send(          
            {
                username: "Mirella"
            }
        )
        .end( function(err,res){
            testHelper.expectedBadRequestErrorBasedOnAMissingField(res,done);
          });
    });

    it('should get a bad request error based on an invalid field', (done) => {
        let currentPA = twitterAccount;
        currentPA.twitterID = 123;

        chai.request(testHelper.baseURL)
        .post(twitterAccountPath)
        .send(          
            currentPA
        )
        .end( function(err,res){
            testHelper.expectedBadRequestErrorBasedOnInvalidField(res,done);    
        });
    });

});
