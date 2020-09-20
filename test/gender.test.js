let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let url= 'http://localhost:3000/api/';
let genderPath = 'gender';

chai.use(chaiHttp);


describe('Gender suites',()=>{

  it('should get the whole gendersList', (done) => {
  let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MiwiZW1haWwiOiJqZWFuRGV2VGVzdEBnbWFpbC5jb20iLCJuYW1lIjoiQmFyYmVyU2hvLUV4dHJlbWUiLCJhY2NvdW50VHlwZSI6IkhhaXJkcmVzc2luZ1NhbG9uIiwiaWF0IjoxNjAwNjI1MTgxLCJleHAiOjE2MDA3MTE1ODF9.5y-HZJouOrY-Qy8B_hkWp_1uI4fMVGBLdEcQExz4O4Q8Cctsvj5K1XTkqfI1SrhaVG4nmOKUoQu2Jgi5jA-T4Q';
  chai.request(url)
  .get(genderPath)
  .set('Authorization', `Bearer ${token}`)
    .end( function(err,res){
      console.log(res.body)
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.length(3);
      done();
    });
  });
  
  it('should get an Unauthorized error when there is not token', (done) => {
    chai.request(url)
    .get(genderPath)
      .end( function(err,res){
        console.log(res.body)
        expect(res).to.have.status(401);
        expect(res.body.details).to.be.equals('The request does not have the authentication header');
        done();
      });
    });

  it('should get an Unauthorized error when token is invalid', (done) => {
    let invalidToken = 'invalidToken@$3%.asdfasdf.332dff';
    chai.request(url)
    .get(genderPath)
    .set('Authorization', `Bearer ${invalidToken}`)
      .end( function(err,res){
        console.log(res.body)
        expect(res).to.have.status(401);
        expect(res.body.details).to.be.equals('The token is not valid');
        done();
      });
    }); 
});