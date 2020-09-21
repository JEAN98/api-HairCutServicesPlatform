let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let url= 'http://localhost:3000/api/';
let hSalonPath = 'hairdressingSalon';

describe('HairdressingSalon suites. Post/',()=>{
    
    let hairdressingSalon = {
        name: "BarberShop-Test",
        description: "MaryStyle ofrece un sin número de servicios para sus clientes",
        email: "salonTest@gmail.com", 
        password: "Admin@123",
        lunchStarts: "10:00:00",
        lunchEnds: "01:00:00", 
        latitud: -123.3,
        longitud: 123,
        website: "https://medium.com/east-pole/surprised-by-joi-35a3558eda30",
        genderID: 2
    };

    it('should get a bad request error based on email already exists', (done) => {
        chai.request(url)
        .post(hSalonPath)
        .send(          
            hairdressingSalon
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.details.error).to.be.equals('The email already exists as HairdressingSalon');
            done();
          });
    });

    it('should get a bad request error based on invalid genderID', (done) => {
        let currentHS = hairdressingSalon;
        currentHS.genderID = 50478;
        currentHS.email= 'email@qa.com';

        chai.request(url)
        .post(hSalonPath)
        .send(          
            currentHS
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
                name: "BarberShop-Test"
            }
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.details.name).to.be.equals('ValidationError');
            done();
          });
    });

    it('should get a bad request error based on an invalid field', (done) => {
        let currentHS = hairdressingSalon;
        currentHS.lunchStarts = "xyz";
        currentHS.lunchEnds = "xyz";

        chai.request(url)
        .post(hSalonPath)
        .send(          
            currentHS
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.details.name).to.be.equals('ValidationError');
            done();
          });
    });

});


describe('HairdressingSalon suites. Get/',()=>{

    it('should get an Unauthorized error when there is not token', (done) => {
        chai.request(url)
        .get(hSalonPath)
          .end( function(err,res){
            expect(res).to.have.status(401);
            expect(res.body.details).to.be.equals('The request does not have the authentication header');
            done();
          });
    });


    it('should get an Unauthorized error when token is invalid', (done) => {
        let invalidToken = 'invalidToken@$3%.asdfasdf.332dff';
        chai.request(url)
        .get(hSalonPath)
        .set('Authorization', `Bearer ${invalidToken}`)
          .end( function(err,res){
            expect(res).to.have.status(401);
            expect(res.body.details).to.be.equals('The token is not valid');
            done();
          });
    }); 


    it('should get a list of HairdressingSalon ', (done) => {
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MiwiZW1haWwiOiJqZWFuRGV2VGVzdEBnbWFpbC5jb20iLCJuYW1lIjoiQmFyYmVyU2hvLUV4dHJlbWUiLCJhY2NvdW50VHlwZSI6IkhhaXJkcmVzc2luZ1NhbG9uIiwiaWF0IjoxNjAwNjI1MTgxLCJleHAiOjE2MDA3MTE1ODF9.5y-HZJouOrY-Qy8B_hkWp_1uI4fMVGBLdEcQExz4O4Q8Cctsvj5K1XTkqfI1SrhaVG4nmOKUoQu2Jgi5jA-T4Q';
        chai.request(url)
        .get(hSalonPath)
        .set('Authorization', `Bearer ${token}`)
          .end( function(err,res){
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.gt(0);
            expect(res.body[0].email).to.not.be.undefined;
            expect(res.body[0].genderID).to.not.be.undefined;
            expect(res.body[0].password).to.be.undefined;
            expect(res.body[0].gender_id).to.be.undefined;
            done();
          });
    }); 
});