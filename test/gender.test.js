let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let url= 'http://localhost:3000/api/';
let genderPath = 'gender';
const testHelper = require('./test.helper');
chai.use(chaiHttp);


describe('Gender suites. Get/',()=>{

  it('should get the whole gendersList', (done) => {
  chai.request(url)
  .get(genderPath)
  .set('Authorization', `Bearer ${testHelper.hsToken}`)
    .end( function(err,res){
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.length(3);
      done();
    });
  });
  
  it('should get an Unauthorized error when there is not token', (done) => {
    chai.request(url)
    .get(genderPath)
      .end( function(err,res){
        testHelper.expectedUnauthorizedErrorWhenThereISNotToken(res,done);
      });
    });

  it('should get an Unauthorized error when token is invalid', (done) => {
    let invalidToken = 'invalidToken@$3%.asdfasdf.332dff';
    chai.request(url)
    .get(genderPath)
    .set('Authorization', `Bearer ${invalidToken}`)
      .end( function(err,res){
        testHelper.expectedUnauthorizedErrorWhenTokenIsInvalid(res,done);
      });
    }); 
});