let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('../src/app');
const expect = require('chai').expect;
chai.use(chaiHttp);
const testHelper = require('./test.helper');

let url= 'http://localhost:3000/api/';
let schedulePath = 'schedule';
let query = '?hairdressingSalonID=';
let hairdressingSalonID = 1;



describe('Schedule suites for Get/',()=>{

  it('should get the whole list of Schedules', (done) => {
  chai.request(url)
  .get(schedulePath + query + hairdressingSalonID)
  .set('Authorization', `Bearer ${testHelper.hsToken}`)
    .end( function(err,res){
      expect(res).to.have.status(200);
      expect(res.body[0].hairdressingSalonID).to.be.equals(hairdressingSalonID);
      done();
    });
  });
  
  it('should get an Unauthorized error when there is not token', (done) => {
    chai.request(url)
    .get(schedulePath)
      .end( function(err,res){
        testHelper.expectedUnauthorizedErrorWhenThereISNotToken(res,done);
      });
    });

  it('should get an Unauthorized error when token is invalid', (done) => {
    let invalidToken = 'invalidToken@$3%.asdfasdf.332dff';
    chai.request(url)
    .get(schedulePath)
    .set('Authorization', `Bearer ${invalidToken}`)
      .end( function(err,res){
        testHelper.expectedUnauthorizedErrorWhenTokenIsInvalid(res,done);
      });
    }); 
});


describe('Schedule suites. Post/',()=>{

  it('should get a bad request error based on unique violation', (done) => {
  chai.request(url)
  .post(schedulePath + query + hairdressingSalonID)
  .set('Authorization', `Bearer ${testHelper.hsToken}`)
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
      testHelper.expectedBadRequestErrorBasedOnUniqueViolation(res);
      expect(res.body.details.message).to.be.equals('weekday_id must be unique');
      done();
    });
  });


  it('should get a bad request error based on invalid weekDay', (done) => {
    chai.request(url)
    .post(schedulePath + query + hairdressingSalonID)
    .set('Authorization', `Bearer ${testHelper.hsToken}`)
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
        testHelper.expectedBadRequestErrorBasedOnInvalidConstraints(res,done);
      });
    });


    it('should get a bad request error based on a missing field', (done) => {
      chai.request(url)
      .post(schedulePath + query + hairdressingSalonID)
      .set('Authorization', `Bearer ${testHelper.hsToken}`)
      .send(
        [
          {
            'shiftStarts': '10:00:00',
            'shiftEnds': '17:00:00'
          }
        ]
      )
      .end( function(err,res){
          testHelper.expectedBadRequestErrorBasedOnAMissingField(res,done);
        });
      }); 

      it('should get a bad request error based on invalid field', (done) => {
        chai.request(url)
        .post(schedulePath + query + hairdressingSalonID)
        .set('Authorization', `Bearer ${testHelper.hsToken}`)
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
          testHelper.expectedBadRequestErrorBasedOnInvalidField(res,done);
          });
      }); 
});