let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);

let url= 'http://localhost:3000/api/';
let schedulePath = 'schedule';
let query = '?hairdressingSalonID=';
let hairdressingSalonID = 1;



describe('Schedule suites for Get',()=>{

  it('should get the whole list of Schedules', (done) => {
  let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MiwiZW1haWwiOiJqZWFuRGV2VGVzdEBnbWFpbC5jb20iLCJuYW1lIjoiQmFyYmVyU2hvLUV4dHJlbWUiLCJhY2NvdW50VHlwZSI6IkhhaXJkcmVzc2luZ1NhbG9uIiwiaWF0IjoxNjAwNjI1MTgxLCJleHAiOjE2MDA3MTE1ODF9.5y-HZJouOrY-Qy8B_hkWp_1uI4fMVGBLdEcQExz4O4Q8Cctsvj5K1XTkqfI1SrhaVG4nmOKUoQu2Jgi5jA-T4Q';
  chai.request(url)
  .get(schedulePath + query + hairdressingSalonID)
  .set('Authorization', `Bearer ${token}`)
    .end( function(err,res){
      console.log(res.body)
      expect(res).to.have.status(200);
      expect(res.body[0].hairdressingSalonID).to.be.equals(hairdressingSalonID);
      done();
    });
  });
  
  it('should get an Unauthorized error when there is not token', (done) => {
    chai.request(url)
    .get(schedulePath)
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
    .get(schedulePath)
    .set('Authorization', `Bearer ${invalidToken}`)
      .end( function(err,res){
        console.log(res.body)
        expect(res).to.have.status(401);
        expect(res.body.details).to.be.equals('The token is not valid');
        done();
      });
    }); 
});


describe('Schedule suites for Post',()=>{

  it('should get a bad request error based on unique violation', (done) => {
  let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MiwiZW1haWwiOiJqZWFuRGV2VGVzdEBnbWFpbC5jb20iLCJuYW1lIjoiQmFyYmVyU2hvLUV4dHJlbWUiLCJhY2NvdW50VHlwZSI6IkhhaXJkcmVzc2luZ1NhbG9uIiwiaWF0IjoxNjAwNjI1MTgxLCJleHAiOjE2MDA3MTE1ODF9.5y-HZJouOrY-Qy8B_hkWp_1uI4fMVGBLdEcQExz4O4Q8Cctsvj5K1XTkqfI1SrhaVG4nmOKUoQu2Jgi5jA-T4Q';
  chai.request(url)
  .post(schedulePath + query + hairdressingSalonID)
  .set('Authorization', `Bearer ${token}`)
  .send(
    [
      {
        'weekDayID': 2,
        'shiftStarts': '10:00:00',
        'shiftEnds': '17:00:00'
      }
    ]
  )
  .end( function(err,res){
      console.log(res.body)
      expect(res).to.have.status(400);
      expect(res.body.details.message).to.be.equals('weekday_id must be unique');
      done();
    });
  });


  it('should get a bad request error based on invalid weekDay', (done) => {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MiwiZW1haWwiOiJqZWFuRGV2VGVzdEBnbWFpbC5jb20iLCJuYW1lIjoiQmFyYmVyU2hvLUV4dHJlbWUiLCJhY2NvdW50VHlwZSI6IkhhaXJkcmVzc2luZ1NhbG9uIiwiaWF0IjoxNjAwNjI1MTgxLCJleHAiOjE2MDA3MTE1ODF9.5y-HZJouOrY-Qy8B_hkWp_1uI4fMVGBLdEcQExz4O4Q8Cctsvj5K1XTkqfI1SrhaVG4nmOKUoQu2Jgi5jA-T4Q';
    chai.request(url)
    .post(schedulePath + query + hairdressingSalonID)
    .set('Authorization', `Bearer ${token}`)
    .send(
      [
        {
          'weekDayID': 5480,
          'shiftStarts': '10:00:00',
          'shiftEnds': '17:00:00'
        }
      ]
    )
    .end( function(err,res){
        console.log(res.body)
        expect(res).to.have.status(400);
        expect(res.body.details.message).to.be.equals('Some of the constraints are not defined properly or they does not exist in the database');
        done();
      });
    });


    it('should get a bad request error based on a missing field', (done) => {
      let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MiwiZW1haWwiOiJqZWFuRGV2VGVzdEBnbWFpbC5jb20iLCJuYW1lIjoiQmFyYmVyU2hvLUV4dHJlbWUiLCJhY2NvdW50VHlwZSI6IkhhaXJkcmVzc2luZ1NhbG9uIiwiaWF0IjoxNjAwNjI1MTgxLCJleHAiOjE2MDA3MTE1ODF9.5y-HZJouOrY-Qy8B_hkWp_1uI4fMVGBLdEcQExz4O4Q8Cctsvj5K1XTkqfI1SrhaVG4nmOKUoQu2Jgi5jA-T4Q';
      chai.request(url)
      .post(schedulePath + query + hairdressingSalonID)
      .set('Authorization', `Bearer ${token}`)
      .send(
        [
          {
            'shiftStarts': '10:00:00',
            'shiftEnds': '17:00:00'
          }
        ]
      )
      .end( function(err,res){
          console.log(res.body)
          expect(res).to.have.status(400);
          expect(res.body.details.name).to.be.equals('ValidationError');
          done();
        });
      }); 

      it('should get a bad request error based on invalid field', (done) => {
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MiwiZW1haWwiOiJqZWFuRGV2VGVzdEBnbWFpbC5jb20iLCJuYW1lIjoiQmFyYmVyU2hvLUV4dHJlbWUiLCJhY2NvdW50VHlwZSI6IkhhaXJkcmVzc2luZ1NhbG9uIiwiaWF0IjoxNjAwNjI1MTgxLCJleHAiOjE2MDA3MTE1ODF9.5y-HZJouOrY-Qy8B_hkWp_1uI4fMVGBLdEcQExz4O4Q8Cctsvj5K1XTkqfI1SrhaVG4nmOKUoQu2Jgi5jA-T4Q';
        chai.request(url)
        .post(schedulePath + query + hairdressingSalonID)
        .set('Authorization', `Bearer ${token}`)
        .send(
          [
            {
              'weekDayID': 1,
              'shiftStarts': 'invalidDate',
              'shiftEnds': 'invalidDate'
            }
          ]
        )
        .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(400);
            expect(res.body.details.name).to.be.equals('ValidationError');
            done();
          });
        }); 
  
});